import React from 'react'
import PropTypes from 'prop-types'
import styles from './UserCard.module.css'
import { Link } from 'react-router-dom'

const UserCard = ({ name, id, onOpen }) => {
   const handleOpen = (e) => {
      e.stopPropagation()
      onOpen(id)
   }
   return (
      <article className={styles.container}>
         <h3>{name}</h3>
         <div className={styles.actions}>
            <Link to={`/user/${id}`} className={styles.linkPosts}>Posts</Link>
            <button className={styles.btnAlbums} onClick={handleOpen}>Albums</button>
         </div>
      </article>
   )
}

UserCard.propTypes = {
   name: PropTypes.string.isRequired,
   id: PropTypes.number.isRequired,
   onOpen: PropTypes.func
};

export default React.memo(UserCard)