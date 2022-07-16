import { reduceDays } from './timeDiffs.ts';

class NewsApi {
  constructor(baseUrl, apiKey, fromOffset = 7) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
    this._fromOffset = fromOffset;
    const date = new Date();
    this._todaysDate = reduceDays(date, 0);
    this._fromDate = reduceDays(date, this._fromOffset);
    console.log(this._fromDate);
  }

  _handleResponse = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

  getNewsByQuery = (param) => {
    return fetch(
      `${this._baseUrl}?q=${param}&from=${this._fromDate}&to=${this._todaysDate}&sortedBy=publishedAt&pageSize=100&apiKey=${this._apiKey}`
    ).then(this._handleResponse);
  };
}

export const newsApi = new NewsApi('https://nomoreparties.co/news/v2/everything', '86ad54dd62e841a587816647ddf6c6d7');
