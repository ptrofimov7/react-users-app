import React from 'react'
import { useGetPostsByUserIdQuery } from '../features/posts/postSlice';
import PostCard from '../features/posts/PostCard';
import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../features/users/userSlice';

const PostsListByUser = () => {

    const { userId } = useParams()
    const { user, isSuccess: isSuccessUser } = useGetUsersQuery('getUsers', {
        selectFromResult: ({ data, isSuccess }) => ({
            user: data?.entities[userId],
            isSuccess
        }),
    })

    const {
        data: postsByUser,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsByUserIdQuery(userId)

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        const renderedUsers = postsByUser.ids.map(postId => (
            <PostCard key={postId} id={postId} title={postsByUser.entities[postId].title} body={postsByUser.entities[postId].body} />
        ))
        content = (
            <section>
                <h2>Posts by user: {isSuccessUser ? user?.name: ""}</h2>
                <div>{renderedUsers}</div>
            </section>
        )
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return content
}

export default PostsListByUser