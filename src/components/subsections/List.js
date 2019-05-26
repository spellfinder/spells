import React from 'react';

function List(props) {
  return (
    <ul>
      {props.content.map(item => { return <li>{item}</li> })}
    </ul>
  )
}

export default List;
