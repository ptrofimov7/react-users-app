import React from 'react'
import PropTypes from 'prop-types'
import AlbumCard from '../features/albums/AlbumCard';
import { useGetAlbumsByUserIdQuery } from '../features/albums/albumSlice';
import PhotosListByAlbum from '../features/photos/PhotosListByAlbum';

const AlbumsListByUser = ({ userId, userName }) => {

  const {
    data: albumsByUserId,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAlbumsByUserIdQuery(userId)

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    const renderedAlbums = albumsByUserId.ids.map(albumId => (
      <AlbumCard key={albumId} id={albumId} title={albumsByUserId.entities[albumId].title}>
        <PhotosListByAlbum albumId={albumId}></PhotosListByAlbum>
      </AlbumCard>
    ))
    content = (
      <section>
        <h2>Albums by user: {userName}</h2>
        <div>{renderedAlbums}</div>
      </section>
    )
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return content
}

AlbumsListByUser.propTypes = {
  userName: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};

export default AlbumsListByUser