import React, { useEffect, useState } from "react";
import API from "../api";
import ErrorModal from "../ErrorModal/ErrorModal";
import CustomDataTable from "../ProjectBasics/Table/CustomDataTable"; 
import {jwtDecode} from "jwt-decode";

const TaskList = ({ userId }) => {

  const [projects, setProjects] = useState([]);
  const [pending, setPending] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [userName, setUserName] = useState("");

const fetchProjects = async () => {
  setPending(true);
  try {
    if (!userId) return;

    const res = await API.get(`api/Task/GetTaskByUserId`, {
      params: { userId: userId, page, pageSize: perPage },
    });

    setProjects(res.data.getTaskByUserId || []);
    setTotalRows(res.data.total || 0);
    console.log("Projects fetched successfully:", res.data.getTaskByUserId);
  } catch (error) {
    console.error(error);
  } finally {
    setPending(false);
  }
};

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if(token) {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.name);
    }
    
    fetchProjects();
  }, [userId,page, perPage]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setPage(page);
  };

  
  const columns = [
  { name: "Task Name", selector: row => row.taskName, sortable: true,wrap: true },
  { name: "Comment", selector: row => row.comment, sortable: true, wrap: true,grow:2,minwidth: "300px" },
  { name: "Status", selector: row => row.status, sortable: true, maxwidth: "150px" },
  { name: "Start Time", selector: row => new Date(row.startTime).toLocaleDateString(), sortable: true,maxwidth: "150px" },
  { name: "End Time", selector: row => new Date(row.endTime).toLocaleDateString(), sortable: true, maxwidth: "150px" },
];
  return (
    <div className="container p-4">
      <h3 className="mb-3">{userName}'s Taskboard</h3>
      <CustomDataTable
        columns={columns}
        data={projects}
        progressPending={pending}
        pagination
        paginationServer
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        totalRows={totalRows}
      />
    </div>
  );
};

export default TaskList;
