
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from "react-hot-toast";
import Loader from "../helper/Loader.jsx";
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { getItem } from "localforage";

const ReadData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authorization');
        if (token) {
            setAuthenticated(true);
            fetchData();
        }

        else {
            setAuthenticated(false);
        }
        setAuthChecked(true);





    }, []);





    const fetchData = async () => {
        try {
            const res = await axios.get('https://blog-backend-qdvz.onrender.com/api/v1/read-product');
            if (res.status === 200) {
                setData(res.data['data']);
            } else {
                setError('Error fetching data');
            }
        } catch (error) {
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (itemId) => {
        try {
            const res = await axios.delete(`https://blog-backend-qdvz.onrender.com/api/v1/DeleteBlog/${itemId}`);
            if (res.status === 200) {
                toast.success("Success Delete");
                // Update the data after successful deletion
                fetchData();
            } else {
                setError('Error deleting data');
            }
        } catch (error) {
            setError('Error deleting data');
        }
    };





    if (!authChecked) {
        return <div> <Loader /></div>;
    }



    if (!authenticated) {
        navigate('/login'); // If not authenticated, redirect to login page
    }



    if (loading) {
        return <div> <Loader /></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4 p-3 bg-body-secondary">Latest Blog</h1>
            <div className="row">
                {data.length > 0 ? (
                    data.map(item => (
                        <div className="col-md-4 mb-4" key={item._id}>
                            <div className="card">
                                <img src={item.img} className="card-img-top" alt={item.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.content.length > 100
                                        ? item.content.substring(0, 100) + '...' // Display the first 100 characters and add ellipsis
                                        : item.content}</p>
                                    <Link to={`/post/${item._id}`} className="btn bg-body-tertiary">
                                        Read More
                                    </Link>
                                    {authenticated && localStorage.getItem('role') === 'admin' && (
                                        <>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(item._id)}
                                            >
                                                Delete
                                            </button>
                                            <button>
                                                <Link to={`/update/${item._id}`} className="btn btn-dark">
                                                    Edit
                                                </Link>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        </div>
    );
};

export default ReadData;








































































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
//
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
//
// const ReadData = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await axios.get('http://localhost:8000/api/v1/blogsGet');
//                 if (res.status === 200) {
//                     setData(res.data['data']);
//                 } else {
//                     setError('Error fetching data');
//                 }
//             } catch (error) {
//                 setError('Error fetching data');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, []);
//
//     if (loading) {
//         return <div>Loading...</div>;
//     }
//
//     if (error) {
//         return <div>Error: {error}</div>;
//     }
//
//     return (
//         <div className="container mt-4">
//             <h1 className="mb-4">Read Data</h1>
//             <div className="row">
//                 {data.length > 0 ? (
//                     data.map(item => (
//                         <div className="col-md-4 mb-4" key={item._id}>
//                             <div className="card">
//                                 <img src={item.img} className="card-img-top" alt={item.title} />
//                                 <div className="card-body">
//                                     <h5 className="card-title">{item.title}</h5>
//                                     <Link to={`/post/${item._id}`} className="btn btn-primary">
//                                         Read More
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No data available.</p>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default ReadData;
