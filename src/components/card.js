import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useHistory } from "react-router";

const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background: white;
`;

const Task = ({ task, index, columnId }) => {
  const history = useHistory();

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() =>
            history.push(`/add-item?column=${columnId}&type=view&id=${task.id}`)
          }
        >
          {task.title}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
