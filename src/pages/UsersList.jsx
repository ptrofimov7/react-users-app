import React, { useCallback, useState } from 'react'
import { useGetUsersQuery } from '../features/users/userSlice';
import UserCard from '../features/users/UserCard';
import Modal from '../components/Modal';
import AlbumsListByUser from './AlbumsListByUser';

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('getUsers')


    const [openUserId, setOpenUserId] = useState(null)

    const onClose = () => {
        setOpenUserId(null)
    }
    const onOpen = useCallback((id) => {
        setOpenUserId(id)
    }, [])

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        const renderedUsers = users.ids.map(userId => (
            <UserCard key={userId} id={userId} name={users.entities[userId].name} onOpen={onOpen} />
        ))
        content = (<>
            <section>
                <h2>Users</h2>
                <div>{renderedUsers}</div>
            </section>
            {openUserId && (
                <Modal openUserId={openUserId} onClose={onClose}>
                    <AlbumsListByUser userId={openUserId} userName={users.entities[openUserId].name}>
                    </AlbumsListByUser>
                </Modal>)}
        </>)
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return content
}

export default UsersList