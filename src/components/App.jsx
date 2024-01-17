import { useEffect, useState } from 'react';

import Searchbar from './Modal/Searchbar';
import ImageGallery from './Modal/ImageGallery';
import Loader from './Modal/Loader';
import Api from '../services/api';
import Button from './Modal/Button';

export default function App() {
  const [pictureName, setPictureName] = useState('');
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);

  const handleFormSubmit = newPictureName => {
    setPictureName(newPictureName);
    setPictures([]);
    setPage(1);
  };

  const loadMorePictures = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (!pictureName) {
      return;
    }

    setStatus('pending');

    Api.fetchPictures(pictureName, page)
      .then(({ hits, totalHits }) => {
        setPictures(prevPictures => [...prevPictures, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / 12));
        setStatus('resolved');
      })

      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [pictureName, page]);

  const renderImageGallery = () => {
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }
    if (status === 'resolved') {
      return (
        <>
          <ImageGallery pictures={pictures} />
          {loadMore && <Button onClick={loadMorePictures} />}
        </>
      );
    }
  };

  return (
    <div style={{ maxWidth: 1170, margin: '0 auto', padding: 20 }}>
      <Searchbar onSubmit={handleFormSubmit} />
      {renderImageGallery()}
    </div>
  );
}
