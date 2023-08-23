import { gql } from "@apollo/client";

const TasksQuery = gql`
  query GetTasks {
    tasks {
      id
      title
      done
      completed
    }
  }
`;

const CREATE_TASK = gql`
  mutation CreateTask($input: TaskInput!) {
    createTask(input: $input) {
      id
      title
      done
      completed
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $input: TaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      title
      done
      completed
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

export { TasksQuery, CREATE_TASK, UPDATE_TASK, DELETE_TASK };
