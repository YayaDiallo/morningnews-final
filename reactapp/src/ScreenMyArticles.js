import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Card, Icon, Alert } from 'antd';
import Nav from './Nav';

const { Meta } = Card;

function ScreenMyArticles({ deleteToWishList, token }) {

  const [myArticles, setMyArticles] = useState([]);


  useEffect(() => {
    const databaseResultsLoading = async () => {
      const data = await fetch(`/wishList/${token}`);
      const body = await data.json();
      setMyArticles(body.wishListUser)
    };
  databaseResultsLoading();
  },[token])

  return (
    <div>
      <Nav />
      <div className='Banner' />
      {myArticles.length < 1 ? (
        <Alert
          style={{ marginTop: '5px', textAlign: 'center' }}
          message={<h1>No Articles in Wish List</h1>}
          type='info'
        />
      ) : (
        <div className='Card'>
          {myArticles.map((article, index) => (
            <div
              key={index}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Card
                style={{
                  width: 300,
                  margin: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                cover={<img alt='example' src={article.url} />}
                actions={[
                  <Icon type='read' key='ellipsis2' />,
                  <Icon
                    type='delete'
                    key='ellipsis'
                    onClick={() => deleteToWishList(article.title)}
                  />,
                ]}
              >
                <Meta title={article.title} description={article.description} />
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {token: state.token}
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteToWishList: (title) => {
      dispatch({ type: 'deleteWishList', payload: title });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
