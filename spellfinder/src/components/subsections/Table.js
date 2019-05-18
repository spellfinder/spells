import React from 'react';
import Table from 'react-bootstrap/Table';

function SubTable(props) {
  const headers = props.content.headers;
  const rows = props.content.rows;

  return (
    <Table striped size="sm">
      {headers && (
        <thead><tr>
          {headers.map(h => { return <th scope="col">{h}</th> })}
        </tr></thead>
      )}
      <tbody>
      {rows.map(row => {
        return (
          <tr>
            {row.map(cell => { return (<td>{cell}</td>) })}
          </tr>
        )
      })}
      </tbody>
    </Table>
  )
}

export default SubTable;