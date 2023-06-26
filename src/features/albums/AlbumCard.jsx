import React from 'react'
import styles from './AlbumCard.module.css'

const AlbumCard = ({ title, children, userId, id }) => {
   
   return (
      <article className={styles.container}>
         <h3>{title}</h3>
         <div>{children}</div>
      </article>
   )
}

export default React.memo(AlbumCard)