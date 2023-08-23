import { TaskType } from "../lib/type";
import { useMutation } from "@apollo/client";
import { DELETE_TASK, TasksQuery } from "../graphql/schemas";

export type TaskCardProps = {
  task: TaskType;
};

export function TaskCard({ task }: TaskCardProps) {
  const [deleteTask] = useMutation(DELETE_TASK);

  const handleDelete = async () => {
    try {
      await deleteTask({
        variables: { id: task.id },
        refetchQueries: [{ query: TasksQuery }],
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <div>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
        <p>Done: {task.done ? "Yes" : "No"}</p>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
