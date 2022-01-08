import React from 'react';

import {
  dateBuilder,
  shouldDisplayDetails,
  getWeatherDetails,
  getLocationDetails,
  getTemperature,
  getClassName
} from './Utils';

import Constants from './Constants';

const { api } = Constants;

const search = (states) => evt => {
  const { query, setWeather, setQuery } = states;

  if (evt.key === 'Enter' && query !== '') {      
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}&lang=id`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
      });
  }
}

const renderEmptyContent = () => (
  <React.Fragment>
    <div className='empty-box'>
      Silahkan masukkan nama kota di bagian atas
    </div>
  </React.Fragment>
)

const renderContent = (weather) => (
  <React.Fragment>
    <div className='location-box'>
      <div className='location'>{getLocationDetails(weather)}</div>
      <div className='date'>{dateBuilder(new Date())}</div>
    </div>
    <div className='weather-box'>
      <div className='temp'>
        {getTemperature(weather)}
      </div>
      <div className='weather'>
        {getWeatherDetails(weather)}
      </div>
    </div>
  </React.Fragment>
)

function App() {
  const [query, setQuery] = React.useState('');
  const [weather, setWeather] = React.useState({});
  const states = {
    query, setQuery, weather, setWeather
  };

  return (
    <div className={getClassName(weather)}>
      <main>
        <div className='search-box'>
          <input
            type={'text'} 
            className='search-bar'
            placeholder='Masukkan daerah...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search(states)}
          />
        </div>
        {
          shouldDisplayDetails(weather) 
            ? renderContent(weather)
            : renderEmptyContent()
        }
      </main>
    </div>
  )
}

export default App;
