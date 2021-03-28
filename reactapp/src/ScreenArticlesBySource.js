import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { Card, Icon, Modal } from 'antd';
import Nav from './Nav';
import Spinner from './components/layout/Spinner';

const { Meta } = Card;

function ScreenArticlesBySource({ addToWishList, token, lang }) {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [articleList, setArticleList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    setLoading(true);
    const findArticles = async () => {
      const data = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=${process.env.REACT_APP_NEWSAPI_SECRET_KEY}`
      );
      const body = await data.json();
      console.log(body);

      setArticleList(body.articles);
      setLoading(false);
    };

    findArticles();
  }, [id]);

  const addToDatabase = async (article) => {
    const data = await fetch(`/add-wishList/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `langFromFront=${lang}&titleFromFront=${article.title}&descriptionFromFront=${article.description}&contentFromFront=${article.content}&urlFromFront=${article.urlToImage}`,
    });
    const body = await data.json();
    console.log(body);
  };

  const showModal = (title, content) => {
    setVisible(true);
    setTitle(title);
    setContent(content);
  };

  const handleOk = (e) => {
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  // Spinner
  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Nav />
      <div className='Banner' />
      <div className='Card'>
        {articleList.map((article, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              style={{
                width: 300,
                margin: '15px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              cover={<img alt='example' src={article.urlToImage} />}
              actions={[
                <Icon
                  type='read'
                  key='ellipsis2'
                  onClick={() => showModal(article.title, article.content)}
                />,
                <Icon
                  type='like'
                  key='ellipsis'
                  onClick={() => {
                    addToWishList(
                      article.title,
                      article.description,
                      article.content,
                      article.urlToImage
                    );
                    addToDatabase(article);
                  }}
                />,
              ]}
            >
              <Meta title={article.title} description={article.description} />
            </Card>
          </div>
        ))}
        <Modal
          title={title}
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{content}</p>
        </Modal>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { token: state.token, lang: state.lang };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToWishList: (title, description, content, url) => {
      dispatch({
        type: 'addToWishList',
        payload: { title, description, content, url },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenArticlesBySource);
