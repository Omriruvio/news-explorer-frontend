import { reduceDays } from './timeDiffs.ts';

class NewsApi {
  constructor(baseUrl, apiKey, fromOffset = 7, isSecondary = false) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
    this._fromOffset = fromOffset;
    this._isSecondary = isSecondary;
    const date = new Date();
    this._todaysDate = reduceDays(date, 0);
    this._fromDate = reduceDays(date, this._fromOffset);
    if (this._isSecondary) {
      this._headers = { 'x-api-key': this._apiKey };
    }
  }

  _handleResponse = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

  getNewsByQuery = (param) => {
    return fetch(
      `${this._baseUrl}?q=${param}&from=${this._fromDate}&to=${this._todaysDate}${
        !this._isSecondary ? `&sortedBy=publishedAt&pageSize=100` : '&page_size=100'
      }${this._isSecondary ? '' : `&apiKey=${this._apiKey}`}`,
      { headers: this._headers }
    ).then(this._handleResponse);
  };
}

export const newsApi = new NewsApi('https://nomoreparties.co/news/v2/everything', '86ad54dd62e841a587816647ddf6c6d7');
export const secondaryApi = new NewsApi('https://api.newscatcherapi.com/v2/search', 'OE9L8XnS2P2HR6tZ9XlR46cHb6XLbLZaGAe0iR-ru8Y', 7, true);
