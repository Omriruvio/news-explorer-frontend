import './SearchForm.css';

const SearchForm = ({ buttonText = 'Search' }) => {
  return (
    <>
      <form className="search-form">
        <input className="search-form__input" type={'search'} placeholder="Nature"></input>
        <button className="search-form__submit" type={'submit'}>
          {buttonText}
        </button>
      </form>
    </>
  );
};

export default SearchForm;
