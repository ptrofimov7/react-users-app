import React from 'react'
import PropTypes from 'prop-types';
import styles from './PhotoCard.module.css'

const PhotoCard = ({ title, thumbnailUrl }) => {
   return (
      <figure className={styles.figure}>
         <img
            className={styles.image}
            src={thumbnailUrl}
            alt={title} />
         <figcaption className={styles.imageCaption} title={title}>{title}</figcaption>
      </figure>
   )
}

PhotoCard.propTypes = {
   title: PropTypes.string.isRequired,
   thumbnailUrl: PropTypes.string.isRequired
 };

export default React.memo(PhotoCard)