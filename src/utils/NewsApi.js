class NewsApi {
  constructor(baseUrl, apiKey, fromOffset = 7) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey; /* '2022-07-11'; */
    this._fromOffset = fromOffset;
    const date = new Date();
    this._todaysDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    this._fromDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - this._fromOffset}`;
    console.log(this._fromDate);
  }

  _handleResponse = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

  getNewsByQuery = (param) => {
    return fetch(
      `${this._baseUrl}?q=${param}&from=${this._fromDate}&to=${this._todaysDate}&sortedBy=publishedAt&pageSize=100&apiKey=${this._apiKey}`
    ).then(this._handleResponse);
  };
}

export const newsApi = new NewsApi('https://nomoreparties.co/news/v2/top-headlines', '86ad54dd62e841a587816647ddf6c6d7');
