import './SearchForm.css';
import { newsApi } from '../../utils/NewsApi';
import { useState } from 'react';

const SearchForm = ({ connectionError, buttonText = 'Search', handleSearch, setIsSearching }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('Enter topic');
  const [inputClassName, setInputClassName] = useState('search-form__input');

  const handleInput = (event) => {
    const { value } = event.target;
    setPlaceholder('Enter topic');
    setInputClassName('search-form__input');
    setSearchQuery(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    connectionError(false);
    if (!searchQuery) {
      setPlaceholder('Please enter a keyword.');
      setInputClassName('search-form__input search-form__input_error');
      return;
    }

    setIsSearching(true);

    newsApi
      .getNewsByQuery(searchQuery)
      .then((res) => {
        const { articles } = res;
        handleSearch(articles, searchQuery);
      })
      .catch((err) => {
        connectionError(true);
        console.log(err);
      })
      .finally(() => {
        setSearchQuery('');
        setPlaceholder('Enter topic');
        setInputClassName('search-form__input');
        setIsSearching(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className='search-form'>
      <input
        onChange={handleInput}
        value={searchQuery || ''}
        name='search'
        className={inputClassName}
        type={'search'}
        placeholder={placeholder}
      ></input>
      <button className='search-form__submit' type={'submit'}>
        {buttonText}
      </button>
    </form>
  );
};

export default SearchForm;
