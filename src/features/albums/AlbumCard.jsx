import React from 'react'
import PropTypes from 'prop-types';
import styles from './AlbumCard.module.css'

const AlbumCard = ({ title, children}) => {

   return (
      <article className={styles.container}>
         <h3>{title}</h3>
         <div>{children}</div>
      </article>
   )
}

AlbumCard.propTypes = {
   title: PropTypes.string.isRequired,
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]).isRequired
 };

export default React.memo(AlbumCard)