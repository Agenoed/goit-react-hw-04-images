import React, { Component } from 'react';
import SearchBar from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './App.module.css';
export class App extends Component {
  state = {
    data: [],
    currentPage: 1,
    searchData: '',
    isLoading: false,
    error: null,
    total: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevState.searchData !== this.state.searchData
    ) {
      this.fetchData();
    } else {
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchData: query,
      currentPage: 1,
      data: [],
      error: null,
      total: 0,
    });
  };

  fetchData = () => {
    const { currentPage, searchData } = this.state;
    this.setState({ isLoading: true });

    fetch(
      `https://pixabay.com/api/?q=${searchData}&page=${currentPage}&key=31882217-972b08f02187a04a9df548d0a&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(data => {
        if (data.ok) {
          return data.json();
        }
        return Promise.reject(new Error(`No picture with name ${searchData}`));
      })
      .catch(error => this.setState({ error }))
      .then(data => {
        this.setState(prevState => ({
          data: [...prevState.data, ...data.hits],
          total: data.totalHits,
        }));
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };
  render() {
    const { total, isLoading, error } = this.state;
    const shouldRenderLoadMoreButton = total > 12 && !isLoading;
    return (
      <div className={css.App}>
        {error && <h1>Error!</h1>}

        <SearchBar onSubmit={this.onChangeQuery} />
        <ImageGallery images={this.state.data} />
        {isLoading && <Loader />}
        {shouldRenderLoadMoreButton && <Button loadMore={this.loadMore} />}
      </div>
    );
  }
}
