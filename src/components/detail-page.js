import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Column from "./column";

const Container = styled.div`
  display: flex;
`;

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const DetailPage = ({ state, setState, history }) => {
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    // console.log(destination, source, result);

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (result.type === "column") {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = { ...state, columnOrder: newColumnOrder };
      setState(newState);
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...start, taskIds: newTaskIds };
      setState({
        ...state,
        columns: { ...state.columns, [newColumn.id]: newColumn },
      });
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newStart = { ...start, taskIds: startTaskIds };
    const newFinish = { ...finish, taskIds: finishTaskIds };

    setState({
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];
                const tasks = state.columns[columnId].taskIds
                  .map((taskId) => state.tasks[taskId])
                  .filter(Boolean);
                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
      <Link
        className="btn btn-white text-secondary p-2 m-2 border border-secondary"
        to="/add-column"
      >
        + New Column
      </Link>
    </>
  );
};
