import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    searchData: '',
  };
  handleNameChange = event => {
    this.setState({ searchData: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchData.trim() === '') {
      return alert('Input search data');
    }
    this.props.onSubmit(this.state.searchData);
    this.setState({ searchData: '' });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
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
            value={this.state.searchData}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
