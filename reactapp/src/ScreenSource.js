import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { List, Avatar } from 'antd';
import Nav from './Nav';
import Spinner from './components/layout/Spinner';

function ScreenSource({ onHandleFlag, flag }) {
  const { lang, cnty } = flag;

  const [loading, setLoading] = useState(false);
  const [sourceList, setSourceList] = useState([]);

  useEffect(() => {
    setLoading(true);
    const APIResultsLoading = async () => {
      const data = await fetch(
        `https://newsapi.org/v2/sources?language=${lang}&country=${cnty}&apiKey=f4ca1120bfaa403ab776b990f7e96bee`
      );
      const body = await data.json();
      setSourceList(body.sources);
      setLoading(false);
    };

    APIResultsLoading();
  }, [lang, cnty]);

  // Styles
  const flagStyles = {
    marginRight: '5px',
    cursor: 'pointer',
  };

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
          style={flagStyles}
          src='/images/france.jpg'
          onClick={() => onHandleFlag('fr', 'fr')}
        />
        <Avatar
          size={64}
          style={flagStyles}
          src='/images/uk.png'
          onClick={() => onHandleFlag('en', 'gb')}
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
                  <Link to={`/screenarticlesbysource/${source.id}`}>
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

const mapStateToProps = (flag) => {
  return flag;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHandleFlag: (lang, cnty) => {
      dispatch({ type: 'changeFlag', payload: { lang, cnty } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSource);
