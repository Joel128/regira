import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import IssueCard from "./IssueCard";

const Boxes = [
  { status: "open", titol: "En progres" },

  { status: "closed", titol: "Tancat" },
];
const ItemType = "ISSUE_ITEM";

const Item = ({ eliminaItem, data }) => {
  const [{ isDragging }, drag_ref] = useDrag(() => ({
    type: ItemType,
    item: { type: ItemType, id: data.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
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
      mouItem(item, caixa.status);
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
  const [actualitza, setActualitza] = useState(0);
  const [error, setError] = useState("");
  const URL = "http://localhost:3000/api";

  const mouItem = (item, status) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ status }),
    };
    fetch(`${URL}/issues/${id}`, options)
      .then((res) => res.json())
      .then((data) => {
        setActualitza(actualitza + 1);
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
        setActualitza(actualitza + 1);
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
    fetch(`${URL}/issues/project/${id}`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIssues(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [actualitza]);

  if (error) {
    console.log(error);
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
              <Box key={caixa.status} caixa={caixa} mouItem={mouItem}>
                {issues
                  .filter((e) => e.status == caixa.status)
                  .map((e) => (
                    <Item key={e.id} eliminaItem={eliminaItem} data={e} />
                  ))}
              </Box>
            ))}
          </div>
        </DndProvider>
      </>
    </div>
  );
};
