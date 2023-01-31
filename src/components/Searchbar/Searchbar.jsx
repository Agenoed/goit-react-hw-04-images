import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchData, setSearchData] = useState('');
  const handleNameChange = event => {
    setSearchData(event.currentTarget.value.toLowerCase());
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (searchData.trim() === '') {
      return alert('Input search data');
    }
    onSubmit(searchData);
    setSearchData('');
  };
  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          name="searchData"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchData}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
