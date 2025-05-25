import React, { useEffect, useState } from "react";
import API from "../api";
import Table from "../Table/Table";
import ErrorModal from "../ErrorModal/ErrorModal";

const TaskList = ({ userId }) => {
  const [errorShow, setErrorShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    API.get(`api/Task/GetTaskByUserId`, {
      params: { userId: userId }
    })
      .then((response) => {
        setTasks(response.data.getTaskByUserId || []);
      })
      .catch((error) => {
        setErrorMsg(error.response?.data?.message || error.message || "Unknown error");
        setErrorShow(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  const columns = [
    { key: "taskName", title: "Task Name" },
    { key: "comment", title: "Comment" },
    { key: "status", title: "Status" },
    { key: "startTime", title: "Start Time" },
    { key: "endTime", title: "End Time" }
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Task List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table data={tasks} columns={columns} />
      )}

      <ErrorModal
        show={errorShow}
        onClose={() => setErrorShow(false)}
        message={errorMsg}
      />
    </div>
  );
};

export default TaskList;
