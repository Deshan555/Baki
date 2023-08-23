import { useState } from "react";
import { TaskType } from "../lib/type";
import { useMutation } from "@apollo/client";
import { DELETE_TASK, TasksQuery, UPDATE_TASK } from "../graphql/schemas";
import { PenIcon, TrashIcon } from "../lib/icons";

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
    <div className="mt-3 bg-white border border-slateGrey p-4 w-full rounded shadow-md ">
      <div className="flex justify-between">
        {isEditing ? (
          <>
            <input
              type="text"
              value={updatedTask.title}
              onChange={(e) =>
                setUpdatedTask({ ...updatedTask, title: e.target.value })
              }
              className="w-full"
            />

            <button onClick={handleUpdate}>Save</button>
          </>
        ) : (
          <div className="relative flex flex-1">
            <h1
              className={` ${
                task.completed ? "line-through text-slate-400" : ""
              }`}
            >
              {task.title}
            </h1>
            <button
              onClick={handleComplete}
              className="absolute w-full text-transparent"
            >
              .
            </button>
          </div>
        )}
        <div className="flex gap-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`pl-2 ${isEditing ? "text-red-600" : ""}`}
          >
            {isEditing ? (
              "Cancel"
            ) : (
              <PenIcon
                className={`text-2xl text-slateBlack  ${
                  task.completed ? "text-slate-400" : ""
                }`}
              />
            )}
          </button>

          {!isEditing && (
            <button onClick={handleDelete}>
              <TrashIcon
                className={`text-2xl text-slateBlack  ${
                  task.completed ? "text-slate-400" : ""
                }`}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
