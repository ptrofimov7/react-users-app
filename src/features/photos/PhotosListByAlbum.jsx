import React from 'react'
import PropTypes from 'prop-types'
import { useGetPhotosByAlbumIdQuery } from './photoSlice';
import PhotosCard from './PhotoCard';
import styles from './PhotosListByAlbum.module.css'

const PhotosListByAlbum = ({ albumId }) => {

    const {
        data: photosByAlbumId,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPhotosByAlbumIdQuery(albumId)

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        const renderedPhotos = photosByAlbumId.ids.slice(0, 5).map(photoId => (
            <PhotosCard key={photoId} id={photoId} title={photosByAlbumId.entities[photoId].title} thumbnailUrl={photosByAlbumId.entities[photoId].thumbnailUrl} />
        ))
        content = (
            <section className={styles.container}>
                <h4 className={styles.title}>Photos</h4>
                <div className={styles.photos}>{renderedPhotos}</div>
            </section>
        )
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return content
}

PhotosListByAlbum.propTypes = {
    albumId: PropTypes.number.isRequired,
};


export default PhotosListByAlbum