import { useState } from "react";
import { TaskType } from "../lib/type";
import { useMutation } from "@apollo/client";
import { DELETE_TASK, TasksQuery, UPDATE_TASK } from "../graphql/schemas";

export type TaskCardProps = {
  task: TaskType;
};

export function TaskCard({ task }: TaskCardProps) {
  const [deleteTask] = useMutation(DELETE_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({ ...task });

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

  const handleUpdate = async () => {
    try {
      await updateTask({
        variables: {
          id: task.id,
          input: {
            title: updatedTask.title,
            done: updatedTask.done,
            completed: updatedTask.completed,
          },
        },
        refetchQueries: [{ query: TasksQuery }],
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleComplete = () => {
    setUpdatedTask({ ...updatedTask, completed: !updatedTask.completed });
    handleUpdate();
  };

  return (
    <div className={`p-4 border ${task.completed ? "opacity-60" : ""}`}>
      <div>
        {isEditing ? (
          <>
            <input
              type="text"
              value={updatedTask.title}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, title: e.target.value })
              }
            />

            <button onClick={handleUpdate}>Save</button>
          </>
        ) : (
          <>
            <h1>{task.title}</h1>
          </>
        )}
        <p>Done: {task.done ? "Yes" : "No"}</p>
        <button onClick={handleComplete}>
          {task.completed ? "Mark as Not Completed" : "Mark as Completed"}
        </button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
    </div>
  );
}
