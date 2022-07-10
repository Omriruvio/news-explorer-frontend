import './SearchForm.css';
import { useState } from 'react';
import { exampleCards } from '../../constants/mockData';

const SearchForm = ({ buttonText = 'Search', handleSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(exampleCards);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="search-form">
        <input className="search-form__input" type={'search'} placeholder="Nature"></input>
        <button className="search-form__submit" type={'submit'}>
          {buttonText}
        </button>
      </form>
    </>
  );
};

export default SearchForm;
