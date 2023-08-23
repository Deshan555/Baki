import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { TaskType } from "../lib/type";
import { TasksQuery, CREATE_TASK } from "../graphql/schemas";
import { TaskCard } from "./TaskCard";
import { PlusIcon } from "../lib/icons";

export default function Tasks() {
  const { loading, error, data } = useQuery(TasksQuery);
  const [createTask] = useMutation(CREATE_TASK);

  const [newTask, setNewTask] = useState({
    title: "",
    done: false,
    completed: false,
  });

  const handleCreate = async () => {
    try {
      await createTask({
        variables: { input: newTask },
        refetchQueries: [{ query: TasksQuery }],
      });
      setNewTask({
        title: "",
        done: false,
        completed: false,
      });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  const incompleteTasksCount =
    data?.tasks?.filter((task: TaskType) => !task.completed)?.length + 1 || 0;

  return (
    <div>
      <p className="py-4 text-slateText">
        You currently have {incompleteTasksCount} task
        {incompleteTasksCount !== 0 ? "s" : ""} that are in progress and marked
        as incomplete.
      </p>

      <div className="flex item-center justify-between">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask.title}
          onChange={(event) =>
            setNewTask({ ...newTask, title: event.target.value })
          }
          className="border border-slateGrey p-2 w-full rounded shadow-md"
        />

        <button
          onClick={handleCreate}
          aria-label="create task"
          className="ml-2 p-2 bg-sky-700 rounded shadow-md text-white hover:bg-sky-800 duration-150"
        >
          <PlusIcon className="text-2xl" />
        </button>
      </div>
      {data?.tasks?.map((task: TaskType) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
