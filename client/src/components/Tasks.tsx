import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { TaskType } from "../lib/type";
import { TasksQuery, CREATE_TASK } from "../graphql/schemas";
import { TaskCard } from "./TaskCard";

const Tasks = () => {
  const { loading, error, data } = useQuery(TasksQuery);
  const [createTask] = useMutation(CREATE_TASK);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    done: false,
  });

  const handleCreate = async () => {
    try {
      await createTask({
        variables: { input: newTask },
        refetchQueries: [{ query: TasksQuery }],
      });
      setNewTask({
        title: "",
        description: "",
        done: false,
      });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(event) =>
            setNewTask({ ...newTask, title: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(event) =>
            setNewTask({ ...newTask, description: event.target.value })
          }
        />
        <button onClick={handleCreate}>Create Task</button>
      </div>
      {data?.tasks?.map((task: TaskType) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Tasks;
