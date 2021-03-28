import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { List, Avatar } from 'antd';
import Nav from './Nav';
import Spinner from './components/layout/Spinner';

function ScreenSource({ onHandleFlag, flag, token, onHandleLang }) {
  const [loading, setLoading] = useState(false);
  const [sourceList, setSourceList] = useState([]);

  useEffect(() => {
    setLoading(true);
    const APIResultsLoading = async () => {
      const data = await fetch(
        `https://newsapi.org/v2/sources?country=${flag}&apiKey=${process.env.REACT_APP_NEWSAPI_SECRET_KEY}`
      );
      const body = await data.json();
      console.log(body.sources[0].language);
      setSourceList(body.sources);
      setLoading(false);
    };

    APIResultsLoading();
  }, [flag]);

  const changeCountry = async (country) => {
    const data = await fetch(`/choose-country/${token}/${country}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const body = await data.json();
    console.log(body);
    // return data;
  };

  // Styles
  const styleBorderFr = { marginLeft: '5px', cursor: 'pointer' };
  const styleBorderUk = { marginLeft: '5px', cursor: 'pointer' };

  if (flag === 'fr') {
    styleBorderFr.border = '4px solid #dedede';
  }
  if (flag === 'gb') {
    styleBorderUk.border = '4px solid #dedede';
  }

  // Spinner
  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Nav />

      <div className='Banner'>
        <Avatar
          size={64}
          style={styleBorderFr}
          src='/images/france.jpg'
          onClick={() => {
            onHandleFlag('fr');
            changeCountry('fr');
          }}
        />
        <Avatar
          size={64}
          style={styleBorderUk}
          src='/images/uk.png'
          onClick={() => {
            onHandleFlag('gb');
            changeCountry('gb');
          }}
        />
      </div>

      <div className='HomeThemes'>
        <List
          itemLayout='horizontal'
          dataSource={sourceList}
          renderItem={(source) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`/images/${source.category}.png`} />}
                title={
                  <Link
                    to={`/screenarticlesbysource/${source.id}`}
                    onClick={() => onHandleLang(source.language)}
                  >
                    {source.name}
                  </Link>
                }
                description={source.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { token: state.token, flag: state.flag };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHandleFlag: (cnty) => {
      dispatch({ type: 'changeFlag', payload: cnty });
    },
    onHandleLang: (lang) => {
      dispatch({ type: 'changeLang', payload: lang });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSource);
