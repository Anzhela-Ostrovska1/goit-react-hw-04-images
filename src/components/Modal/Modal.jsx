import React, { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ picture, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.Modal}>
        <img
          src={picture.largeImageURL}
          alt={picture.tags}
          className={css.LargeImg}
        />
      </div>
    </div>
  );
};

export default Modal;
