import React from 'react'
import PropTypes from 'prop-types'
import styles from './PostCard.module.css'

const PostCard = ({ title, body}) => {
   return (
      <article className={styles.container}>
         <h3>{title}</h3>
         <p>{body}</p>
      </article>
   )
}

PostCard.propTypes = {
   title: PropTypes.string.isRequired,
   body: PropTypes.string.isRequired,
};

export default React.memo(PostCard)