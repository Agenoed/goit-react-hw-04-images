import { useState, useEffect } from 'react';
import SearchBar from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './App.module.css';
export function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!searchData) {
      return;
    }
    setIsLoading(true);
    fetch(
      `https://pixabay.com/api/?q=${searchData}&page=${currentPage}&key=31882217-972b08f02187a04a9df548d0a&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(data => {
        if (data.ok) {
          return data.json();
        }
        return Promise.reject(new Error(`No picture with name ${searchData}`));
      })
      .then(data => {
        setData(prevData => {
          return [...prevData, ...data.hits];
        });
        setTotal(data.totalHits);
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [currentPage, searchData]);

  const onChangeQuery = query => {
    if (query !== searchData) {
      setSearchData(query);
      setCurrentPage(1);
      setData([]);
      setError(null);
      setTotal(0);
    }
  };

  const loadMore = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  const shouldRenderLoadMoreButton =
    data.length < total && !isLoading && data.length !== 0;

  return (
    <div className={css.App}>
      {error && <h1>Error!</h1>}

      <SearchBar onSubmit={onChangeQuery} />
      <ImageGallery images={data} />
      {isLoading && <Loader />}
      {shouldRenderLoadMoreButton && <Button loadMore={loadMore} />}
    </div>
  );
}
