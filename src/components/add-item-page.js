import queryString from "query-string";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { NewItem } from "./new-item";

export const AddItemPage = ({ state, setState, history }) => {
  const {
    column = "not-started",
    id = uuid(),
    type = "new",
  } = queryString.parse(history.location.search);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (newTitle && newDescription) {
      setState((prev) => ({
        ...prev,
        tasks: {
          ...prev.tasks,
          [id]: { id, title: newTitle, description: newDescription },
        },
        columns: {
          ...prev.columns,
          [column]: {
            ...prev.columns[column],
            taskIds: [...prev.columns[column].taskIds, id],
          },
        },
      }));
      setNewTitle("");
      setNewDescription("");
      history.push("/");
    }
  };

  const onDelete = () => {
    const newTasks = { ...state.tasks };
    delete newTasks[id];
    setState((prev) => ({
      ...prev,
      tasks: newTasks,
      columns: {
        ...prev.columns,
        [column]: {
          ...prev.columns[column],
          taskIds: [
            ...prev.columns[column].taskIds.filter((itemId) => item !== id),
          ],
        },
      },
    }));
    history.push("/");
  };

  const isView = type === "view";
  const item = isView ? state.tasks[id] : null;

  return (
    <div className="row">
      {isView && item ? (
        <div className="col">
          <div className="card">
            <h5 className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <span>{item.title}</span>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onDelete}
                ></button>
              </div>
            </h5>
            <div className="card-body">
              <p className="card-text">{item.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <NewItem
          onSubmit={onSubmit}
          title={newTitle}
          setTitle={setNewTitle}
          description={newDescription}
          setDescription={setNewDescription}
        />
      )}
    </div>
  );
};
