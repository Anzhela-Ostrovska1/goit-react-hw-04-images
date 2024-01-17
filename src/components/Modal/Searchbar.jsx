import { useState } from 'react';
import css from './Modal.module.css';
import searchPicture from '../Modal/pictures/search.png';

export default function Searchbar({ onSubmit }) {
  const [pictureName, setPictureName] = useState('');

  const handleNameChange = event => {
    setPictureName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (pictureName.trim() === '') {
      alert('Please enter the name in the search bar');
      return;
    }
    onSubmit(pictureName);
    setPictureName('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button
          type="submit"
          className={css.SearchFormButton}
          style={{ backgroundImage: `url(${searchPicture})` }}
        >
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={pictureName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}
