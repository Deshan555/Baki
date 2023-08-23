import { gql } from "@apollo/client";

const TasksQuery = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      done
    }
  }
`;

const CREATE_TASK = gql`
  mutation CreateTask($input: TaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      done
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

export { TasksQuery, CREATE_TASK, DELETE_TASK };
