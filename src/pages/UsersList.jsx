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

    const [open, setOpen] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null)

    const handleClose = useCallback(() => {
        setSelectedUserId(null)
        setOpen(false)
    }, [])
    const handleOpen = useCallback((id) => {
        setSelectedUserId(id)
        setOpen(true)
    }, [])

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        const renderedUsers = users.ids.map(userId => (
            <UserCard key={userId} id={userId} name={users.entities[userId].name} onOpen={handleOpen} />
        ))
        content = (<>
            <section>
                <h2>Users</h2>
                <div>{renderedUsers}</div>
            </section>
            <Modal open={open} onClose={handleClose} key={selectedUserId}>
                {selectedUserId && <AlbumsListByUser userId={selectedUserId} />}
            </Modal>
        </>)
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return content
}

export default UsersList