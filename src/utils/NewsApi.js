class NewsApi {
  constructor(baseUrl, apiKey, fromOffset = 7) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey; /* '2022-07-11'; */
    this._fromOffset = fromOffset;
  }

  _getFromDate = () => {
    const date = new Date();
    this._fromDate = `${date.getFullYear()}-${date.getMonth() - this._fromOffset}-${date.getDate() + 1}`;
  };

  _handleResponse = res => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

  getNewsByQuery = param => {
    return fetch(`${this._baseUrl}?q=${param}&from=${this._fromDate}&sortedBy=publishedAt&apiKey=${this._apiKey}`).then(this._handleResponse);
  };
}

export const newsApi = new NewsApi('https://newsapi.org/v2/everything', '86ad54dd62e841a587816647ddf6c6d7');
