import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import IssueCard from "./IssueCard";

const Boxes = [
  { state: "backlog", titol: "Pendent" },
  { state: "in_progress", titol: "En progres" },
  { state: "done", titol: "Fet" },
  { state: "closed", titol: "Tancat" },
  { state: "review", titol: "Revisio" },
];

const Item = ({ eliminaItem, data }) => {
  const [{ isDragging }, drag_ref] = useDrag(() => ({
    type: ItemType,
    item: { type: ItemType, id: data.id },
  }));
  return (
    <IssueCard
      reference={drag_ref}
      data={data}
      isDragging={isDragging}
      remove={eliminaItem}
    />
  );
};

const Box = ({ children, caixa, mouItem }) => {
  const [{ isOver }, drop_ref] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => {
      mouItem(item, caixa.state);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  return (
    <div
      ref={drop_ref}
      className={`bg-slate-100 p-3 mih-[300px] border %{isOver ? 'border-blue-500' : ''}`}
    >
      <h2 className="text-x1 text-center mb-4">{caixa.titol}</h2>
      {children}
    </div>
  );
};

export default () => {
  const [projects, setProjects] = useState([]);
  const [issues, setIssues] = useState([]);
  const id = useParams().id;
  const navigate = useNavigate();
  const { actualitza, setActualiza } = useState(0);
  const [error, setError] = useState("");
  const URL = "http://localhost:3000/api";

  const mouItem = (item, state) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ state }),
    };
    fetch(`${URL}/issues/${item.id}`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        }
        setActualiza(actualitza + 1);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const eliminaItem = (item) => {
    const options = {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${URL}/issues/${item.id}`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        }
        setActualiza(actualitza + 1);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const options = {
    method: "GET",
    credentials: "include",
  };

  useEffect(() => {
    fetch(`${URL}/projects/${id}`, options)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [actualitza]);

  useEffect(() => {
    fetch(`${URL}/issues/project/${id}`, options)
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  console.log(projects);

  if (error) {
    return <p>{error}</p>;
  }

  if (!projects) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <>
        <div className="flex justify-between">
          <h1>Projecte: {projects?.name}</h1>
          <button
            className="border p-3 bg-red-200"
            onClick={() => redirect(`/issue/new/${id}`)}
          >
            Nova tasca
          </button>
        </div>
        <hr />
        <br />
        <br />

        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-5 gap-3">
            {Boxes.map((caixa) => (
              <Box key={caixa.state} caixa={caixa} mouItem={mouItem}>
                {projects.Issues.filter((e) => e.state == caixa.state).map(
                  (e) => (
                    <Item key={e.id} eliminaItem={eliminaItem} data={e} />
                  )
                )}
              </Box>
            ))}
          </div>
        </DndProvider>
      </>
    </div>
  );
};
