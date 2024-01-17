import css from './Modal.module.css';
import { useState } from 'react';
import Modal from './Modal';

export default function ImageGalleryItem({ picture }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <li key={picture.id} className={css.ImageGalleryItem}>
      <img
        onClick={openModal}
        className={css.ImageGalleryItemImage}
        src={picture.webformatURL}
        alt={picture.tags}
      />
      {isModalOpen && <Modal picture={picture} onClose={closeModal} />}
    </li>
  );
}
