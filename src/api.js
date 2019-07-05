import axios from 'axios';
import { mockEvents } from './mock-events';

export const getSuggestions = async (query) => {
  if (window.location.href.startsWith('http://localhost')) {
    return [
      {
        city: 'Munich',
        country: 'de',
        localized_country_name: 'Germany',
        name_string: 'Munich, Germany',
        zip: 'meetup3',
        lat: 48.14,
        lon: 11.58
      },
      {
        city: 'Munich',
        country: 'us',
        localized_country_name: 'USA',
        state: 'ND',
        name_string: 'Munich, North Dakota, USA',
        zip: '58352',
        lat: 48.66,
        lon: -98.85
      }
    ];
  }

  const token = await getAccessToken();
  if (token) {
    const url = 'https://api.meetup.com/find/locations?&sign=true&photo-host=public&query='
    + query
    + '&access_token='+ token;

    const result = await axios.get(url);
    return result.data;
  }
  return [];
};

export async function getEvents(lat, lon) {

  if (window.location.href.startsWith('http://localhost')) {
    return mockEvents.events;
  }

  const token = await getAccessToken();
  if (token) {
    let url = 'https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public'
      + '&access_token=' + token;
    if (lat && lon) {
      url += '&lat=' + lat + '&lon=' + lon;
    }
    const result = await axios.get(url);
    return result.data.events;
  }

}



const getOrRenewAccessToken = async (type, key) => {
  let url;
  if (type === 'get') {
    url = `https://2bpftkaveh.execute-api.eu-central-1.amazonaws.com/dev/api/token/${key}`;
  } else if (type === 'renew') {
    url = `https://2bpftkaveh.execute-api.eu-central-1.amazonaws.com/dev/api/token/refresh/${key}`;
  }

  const tokenInfo = await axios.get(url);

  localStorage.setItem('access_token', tokenInfo.data.access_token);
  localStorage.setItem('refresh_token', tokenInfo.data.refresh_token);
  localStorage.setItem('last_saved_time', Date.now());

  return tokenInfo.data.access_token;
}

export const getAccessToken = () => {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    const searchParams = new URLSearchParams(window.location.search);

    const code = searchParams.get('code');

    if(!code) {
      window.location.href = 'https://secure.meetup.com/oauth2/authorize?client_id=dctr036lji26j6sd8730j2u7fk&response_type=code&redirect_uri=https://getmouth.github.io/meetup/';
      return null;
    }
    return getOrRenewAccessToken('get', code);
  }

  const lastSavedTime = localStorage.getItem('last_saved_time');
  if (accessToken && (Date.now() - lastSavedTime < 3600000)) {
    return accessToken;
  }

  const refreshToken = localStorage.getItem('refresh_token');
  return getOrRenewAccessToken('renew', refreshToken);
}


