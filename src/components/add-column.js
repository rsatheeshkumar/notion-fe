import React, { useState } from "react";

const AddColumn = ({ state, setState, history }) => {
  const [title, setTitle] = useState("");
  const [columnOrder, setColumnOrder] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    if (title && columnOrder) {
      setState((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [columnOrder]: { id: columnOrder, title: title, taskIds: [] },
        },
        columnOrder: [...prev.columnOrder, columnOrder],
      }));
      setTitle("");
      setColumnOrder("");
      history.push("/");
    }
  };
  return (
    <div className="row">
      <form className="col" onSubmit={onSubmit}>
        <h1>Add New Column</h1>
        <div className="mb-3" id="title">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Add title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="column-order" className="form-label">
            Column-Order
          </label>
          <input
            type="text"
            className="form-control"
            id="column-order"
            placeholder="Add Column order"
            value={columnOrder}
            required
            onChange={(e) => setColumnOrder(e.target.value)}
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddColumn;
