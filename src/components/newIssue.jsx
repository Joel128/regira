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
        

    }

}