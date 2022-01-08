import get from 'lodash/get';

import Constants from './Constants';

const { 
  className: {
    def, warm
  }
} = Constants;

const dateBuilder = (d) => {
  const months = Constants.months;
  const days = Constants.days;

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const shouldDisplayDetails = (weather) => Object.keys(weather).length !== 0;

const getWeatherDetails = (result) => get(result, 'weather[0].description');

const getLocationDetails = (result) => {
  const city = get(result, 'name', 'Kubu Raya');
  const country = get(result, 'sys.Country', '');

  return country === '' 
    ? city
    : `${city}, ${country}`
};

const getRawTemperature = (result) => get(result, 'main.temp');

const getTemperature = (result) => {
  const temp = getRawTemperature(result);

  return temp === undefined
    ? '-'
    : `${Math.round(temp)}°C`;
};

const getClassName = (result) => {
  const hasDetail = shouldDisplayDetails(result);
  const isWarm = hasDetail && getRawTemperature(result) >= 25;
  const getClassBasedOnWeather = isWarm ? warm : def;

  return hasDetail ? getClassBasedOnWeather : def;
};

export {
  dateBuilder,
  shouldDisplayDetails,
  getWeatherDetails,
  getLocationDetails,
  getTemperature,
  getClassName
};
