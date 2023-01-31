import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

export function ImageGalleryItem({ image }) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

return (
  <>
    <img
      src={image.webformatURL}
      alt={image.tags}
      className={css.ImageGalleryItemImage}
      onClick={toggleModal}
    />
    {showModal && (
      <Modal onClose={toggleModal}>
        <img src={image.largeImageURL} alt={image.tags} />
      </Modal>
    )}
  </>
);
}
ImageGalleryItem.propTypes = {
  image: PropTypes.objectOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
