
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/PostDetails.css'
import Loader from "../helper/Loader.jsx";



const PostDetails = () => {

    let { postId } = useParams();
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`https://blog-backend-qdvz.onrender.com/api/v1/ReadBlogByID/${postId}`);
                if (res.status === 200) {
                    setPost(res.data['data']); // Assuming your API returns the entire post object
                } else {
                    setError('Error fetching post data');
                }
            } catch (error) {
                setError('Error fetching post data');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [postId]);

    if (loading) {
        return <div>
            <Loader />
        </div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }





    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="card">
                        <img src={post.img} className="card-img-top" alt={post.title} />
                        <div className="card-body">
                            <h1 className="card-title">{post.title}</h1>
                            <p className="card-text">{post.content}</p>
                            <div className="d-flex justify-content-between">
                                <p className="card-text">
                                    <strong>Create Date:</strong> {formatDate(post.createdAt)}
                                </p>
                                <p className="card-text">
                                    <strong>Last Update Date:</strong> {formatDate(post.updatedAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PostDetails;


