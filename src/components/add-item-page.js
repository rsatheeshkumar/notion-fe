import queryString from "query-string";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { NewItem } from "./new-item";

export const AddItemPage = ({ state, setState, history }) => {
  const { tasks, columns } = state;
  // {state.columnOrder.map((columnId, index) => {
  //   const columns = state.columns[columnId];
  //   const tasks = state.columns[columnId].taskIds.map(
  //     (taskId) => state.tasks[taskId]
  //   );
  console.log(state);

  const {
    column = "not-started",
    id = uuid(),
    type = "new",
  } = queryString.parse(history.location.search);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(newTitle, newDescription);

    if (newTitle && newDescription) {
      setState((prev) => ({
        ...prev,
        tasks: [
          ...prev.tasks,
          { [tasks["task-id"]]: { id, newTitle, newDescription } },
        ],
      }));
      setNewTitle("");
      setNewDescription("");
      history.push("/");
    }
  };

  const onDelete = () => {
    console.log(tasks.filter((tasksItems) => tasksItems.id !== id));
    console.log({
      [column]: state.details[column].filter(
        (columnItem) => columnItem.id !== id
      ),
    });
  };

  const isView = type === "view";
  const item = isView ? tasks.find((item) => item.id === id) : null;

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
                  class="btn-close"
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
