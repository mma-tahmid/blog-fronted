import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-hot-toast";


const CreateUpdateFrom = () => {
    let { postId } = useParams();
    // const navigate = useNavigate();
    // const [authenticated, setAuthenticated] = useState(false);



    const [formData, setFormData] = useState({
        title: "",
        content: "",
        img: ""
    });

    let [Data, setData] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem('authorization');
        if (token) {
            setAuthenticated(true); // Set authenticated to true if token exists
        } else {
            setAuthenticated(false);
        }

        (async () => {
            let res = await axios.get("https://blog-backend-qdvz.onrender.com/api/v1/ReadBlogByID/" + postId);
            setFormData(res.data['data']);
            setData(true);

        })();
    }, []);



    const inputonChange = (property, value) => {
        setFormData({ ...formData, [property]: value });
    };

    const onSubmit = async () => {

        let URL = "https://blog-backend-qdvz.onrender.com/api/v1/create-blog";

        if (postId) {
            URL = `https://blog-backend-qdvz.onrender.com/api/v1/UpdateBlog/${postId}`;
        }
        const res = await axios.post(
            URL,
            formData
        );
        if (res.status === 200) {
            toast.success("Save Changes");
            // navigate("/");
        } else {
            toast.error("Failed Create");
        }
    };

    return (
        authenticated && localStorage.getItem("role") === "admin" ? (
            <div className="container mt-4">
                <input
                    value={formData.title}
                    onChange={(e) => inputonChange("title", e.target.value)}
                    className="form-control mb-2"
                    type="text"
                    placeholder="Title"
                />
                <textarea
                    value={formData.content}
                    onChange={(e) => inputonChange("content", e.target.value)}
                    className="form-control mb-2"
                    rows="6" // Adjust the number of rows to control the height
                    placeholder="Content"
                />
                <input
                    value={formData.img}
                    onChange={(e) => inputonChange("img", e.target.value)}
                    className="form-control mb-2"
                    type="text"
                    placeholder="Image URL"
                />

                <button onClick={onSubmit} className="btn btn-primary">
                    Submit
                </button>

            </div>
        ) : (

            <div className="container">
                <div className="row">
                    <div className="col-md-12 card">
                        <h1 className="text-center">You are not authorized to access this page</h1>
                    </div>
                </div>
            </div>
        )
    );
};

export default CreateUpdateFrom;