interface Article {
  keyword: string;
  title: string;
  text: string;
  date: string;
  source: string;
  link: string;
  image: string;
  _id: string;
}

class MainApi {
  _baseUrl: string;
  _authToken: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  _handleResponse = async (res) => (res.ok ? res.json() : Promise.reject(await res.json()));

  _fetch = (endpoint: string, method: string, body?: any): Promise<unknown> =>
    fetch(`${this._baseUrl}${endpoint}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        authorization: `Bearer ${this._authToken}`,
        'Content-Type': 'application/json',
      },
    }).then(this._handleResponse);

  userSignin = (email: string, password: string) => this._fetch('/signin', 'POST', { email, password });

  userSignup = (email: string, password: string, name: string) => this._fetch('/signup', 'POST', { email, password, name });

  saveArticle = (article: Article) => this._fetch('/articles', 'POST', article);

  deleteArticle = (articleId: string) => this._fetch(`/articles/${articleId}`, 'DELETE');

  getCurrentUser = () => this._fetch('/users/me', 'GET');

  getUserArticles = () => this._fetch('/articles', 'GET').then(this._convertCardFormat);

  _convertCardFormat = (cards) => {
    return cards.map((article: Article) => {
      return {
        keyword: article.keyword,
        title: article.title,
        description: article.text,
        publishedAt: article.date,
        url: article.link,
        urlToImage: article.image,
        source: { name: article.source },
        id: article._id,
      };
    });
  };

  setUserToken = (token: string) => (this._authToken = token);
}

export const mainApi = new MainApi('https://api.omri-news.students.nomoredomainssbs.ru');
