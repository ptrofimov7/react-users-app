import React from 'react'
import PropTypes from 'prop-types'
import styles from './UserCard.module.css'
import { Link } from 'react-router-dom'

const UserCard = ({ name, id, onOpen }) => {
   return (
      <article className={styles.container} onClick={e => e.stopPropagation()}>
         <h3>{name}</h3>
         <div className={styles.actions}>
            <Link to={`/user/${id}/post`} className={styles.linkPosts}>Posts</Link>
            <button className={styles.btnAlbums} onClick={() => onOpen(id)}>Albums</button>
         </div>
      </article>
    )
}

UserCard.propTypes = {
   name: PropTypes.string.isRequired,
   id: PropTypes.number.isRequired,
   onOpen: PropTypes.func.isRequired
};

export default React.memo(UserCard)