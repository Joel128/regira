import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:3000/api";

export default () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const createIssue = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title", title);
        data.append("description", description);
        
        const options = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        fetch(`${URL}/issues`, options)
            .then((res) => res.json())
            .then((data) => {
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <h1>New Issue</h1>
            <form onSubmit={createIssue}>
                <input
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );

}