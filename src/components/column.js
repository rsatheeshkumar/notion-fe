import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import Task from "./card";

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

const Move = styled.div`
  width: 20px;
  height: 20px;
  background: orange;
  border-radius: 50%;
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
            <Move {...provided.dragHandleProps}></Move>
          </Header>
          <Droppable droppableId={column.id} type="task">
            {(provided) => (
              <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                {tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    columnId={column.id}
                  />
                ))}
                {provided.placeholder}
                <Link
                  className="btn btn-white text-secondary"
                  to={`/add-item?column=${column.id}&type=new&id=${uuid()}`}
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
