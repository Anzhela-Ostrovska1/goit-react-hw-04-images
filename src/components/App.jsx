import { useEffect, useState } from 'react';

import Searchbar from './Modal/Searchbar';
import ImageGallery from './Modal/ImageGallery';
import Loader from './Modal/Loader';
import Api from '../services/api';
import Button from './Modal/Button';

export default function App() {
  const [pictureName, setPictureName] = useState('');
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);

  const handleFormSubmit = newPictureName => {
    setError(null);
    setPictureName(newPictureName);
    setPictures([]);
    setPage(1);
  };

  const loadMorePictures = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    setIsLoading(true);
    if (!pictureName) {
      setIsLoading(false);
      return;
    }

    Api.fetchPictures(pictureName, page)
      .then(({ hits, totalHits }) => {
        setPictures(prevPictures => [...prevPictures, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / 12));
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [pictureName, page]);

  const renderImageGallery = () => {
    return (
      <>
        {error && <h1>{error.message}</h1>}
        <ImageGallery pictures={pictures} />
        {isLoading ? (
          <Loader />
        ) : (
          loadMore && <Button onClick={loadMorePictures} />
        )}
      </>
    );
  };

  return (
    <div style={{ maxWidth: 1170, margin: '0 auto', padding: 20 }}>
      <Searchbar onSubmit={handleFormSubmit} />
      {renderImageGallery()}
    </div>
  );
}
