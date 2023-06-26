import React from 'react'
import PropTypes from 'prop-types'
import AlbumCard from '../features/albums/AlbumCard';
import { useGetAlbumsByUserIdQuery } from '../features/albums/albumSlice';
import PhotosListByAlbum from '../features/photos/PhotosListByAlbum';
import { useGetUsersQuery } from '../features/users/userSlice';

const AlbumsListByUser = ({ userId }) => {

  const { user, isSuccess: isSuccessUser } = useGetUsersQuery('getUsers', {
    selectFromResult: ({ data, isSuccess }) => ({
        user: data?.entities[userId],
        isSuccess
    }),
})

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
        <h2>Albums by user: {isSuccessUser ? user?.name: ""}</h2>
        <div>{renderedAlbums}</div>
      </section>
    )
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return content
}

AlbumsListByUser.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default AlbumsListByUser