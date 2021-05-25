import { Switch, Route, Redirect } from "react-router-dom";
import { AddItemPage } from "./components/add-item-page";

import { DetailPage } from "./components/detail-page";
import { useLocalStorage } from "./hook/useLocalStorage";

const initialState = {
  tasks: {
    "task-1": { id: "task-1", title: "first", description: "card-1" },
    "task-2": { id: "task-2", title: "second", description: "card-2" },
    "task-3": { id: "task-3", title: "third", description: "card-3" },
    "task-4": { id: "task-4", title: "fourth", description: "card-4" },
    "task-5": { id: "task-5", title: "fifth", description: "card-5" },
  },
  columns: {
    "not-started": {
      id: "not-started",
      title: "Not started",
      taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5"],
    },
    "in-progress": {
      id: "in-progress",
      title: "In Progress",
      taskIds: [],
    },
    completed: {
      id: "completed",
      title: "Completed",
      taskIds: [],
    },
  },
  columnOrder: ["not-started", "in-progress", "completed"],
};

const App = () => {
  const [state, setState] = useLocalStorage("notion", initialState);

  return (
    <div className="container p-3">
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <DetailPage {...props} state={state} setState={setState} />
          )}
        />
        <Route
          exact
          path="/add-item"
          render={(props) => (
            <AddItemPage {...props} state={state} setState={setState} />
          )}
        />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
