import './SearchForm.css';
import { newsApi } from '../../utils/NewsApi';
import { useState } from 'react';

const SearchForm = ({ buttonText = 'Search', handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInput = event => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    newsApi
      .getNewsByQuery(searchQuery)
      .then(res => {
        const { articles } = res;
        handleSearch(articles);
      })
      .catch(err => console.log(err));
    setSearchQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className='search-form'>
      <input
        onChange={handleInput}
        value={searchQuery || ''}
        name='search'
        className='search-form__input'
        type={'search'}
        placeholder='Enter topic'
      ></input>
      <button className='search-form__submit' type={'submit'}>
        {buttonText}
      </button>
    </form>
  );
};

export default SearchForm;
