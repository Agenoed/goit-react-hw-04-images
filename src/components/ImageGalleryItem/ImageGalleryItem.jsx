import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    return (
      <>
        <img
          src={this.props.image.webformatURL}
          alt={this.props.image.tags}
          className={css.ImageGalleryItemImage}
          onClick={this.toggleModal}
        />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img
              src={this.props.image.largeImageURL}
              alt={this.props.image.tags}
            />
          </Modal>
        )}
      </>
    );
  }
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
