import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;

const Task = ({ task, index, history, column }) => {
  console.log(history);
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => console.log("clicked")}
        >
          {task.description}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
