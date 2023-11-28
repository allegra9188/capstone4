import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";

import { useGetTasksQuery } from "./taskSlice";

import "./Tasks.less";

/** Main interface for user to interact with their tasks */
export default function Tasks() {
  const token = useSelector(selectToken);
  const { data: tasks, isLoading } = useGetTasksQuery();

  if (!token) {
    return <p>Please log in</p>;
  }

  return (
    <div className="tasks">
      This is home page
    </div>
  );
}
