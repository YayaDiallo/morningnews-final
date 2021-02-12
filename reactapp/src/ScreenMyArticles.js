import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Card, Icon, Alert } from 'antd';
import Nav from './Nav';

const { Meta } = Card;

function ScreenMyArticles({ wishList, deleteToWishList }) {
  return (
    <div>
      <Nav />
      <div className='Banner' />
      {wishList.length < 1 ? (
        <Alert
          style={{ marginTop: '5px', textAlign: 'center' }}
          message={<h1>No Articles in Wish List</h1>}
          type='info'
        />
      ) : (
        <div className='Card'>
          {wishList.map((article, index) => (
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

const mapStateToProps = (wishList) => {
  return wishList;
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteToWishList: (title) => {
      dispatch({ type: 'deleteWishList', payload: title });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
