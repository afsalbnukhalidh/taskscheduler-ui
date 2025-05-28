import Table from 'react-bootstrap/Table';

function MyTable({ data, columns }) {
  return (
    <Table bordered hover responsive>
      <thead className="table-secondary">
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.key}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
export default MyTable;