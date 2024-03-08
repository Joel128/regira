import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:3000/api";

export default () => {
    const [issues, setIssues] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const options = {
        method: "GET",
        credentials: "include",
    };

    useEffect(() => {
        fetch(`${URL}/issues`, options)
            .then((res) => res.json())
            .then((data) => {
                setIssues(data);
            })
            .catch((error) => {
                setError(error);
            });
    }, [])
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Issues</h1>
            <ul>
                {issues.map((issue) => (
                    <li key={issue.id}>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`/issue/${issue.id}`);
                            }}
                        >
                            {issue.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}