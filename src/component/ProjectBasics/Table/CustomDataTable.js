// components/CustomDataTable.js
import React from 'react';
import DataTable from 'react-data-table-component';

const CustomDataTable = ({
  columns,
  data,
  progressPending,
  pagination,
  paginationServer,
  onChangePage,
  onChangeRowsPerPage,
  totalRows,
}) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      progressPending={progressPending}
      pagination={pagination}
      paginationServer={paginationServer}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      paginationTotalRows={totalRows}
      highlightOnHover
      responsive
      persistTableHead
    />
  );
};

export default CustomDataTable;
