export const NewItem = ({
  onSubmit,
  title,
  setTitle,
  description,
  setDescription,
}) => {
  return (
    <div className="row">
      <form className="col" onSubmit={onSubmit}>
        <h1>Add Item</h1>
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
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="5"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
