import React from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Task from "./card";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  width: 300px;
  background: white;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;

const Column = ({ column, tasks, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Header>
            <Title>{column.title}</Title>
          </Header>
          <Droppable droppableId={column.id} type="task">
            {(provided) => (
              <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                {tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    column={column}
                  />
                ))}
                {provided.placeholder}
                <Link
                  className="btn btn-white text-secondary"
                  to={`/add-item?id=${uuid()}&column=${column.title}&type=new`}
                >
                  + New
                </Link>
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};
export default Column;
