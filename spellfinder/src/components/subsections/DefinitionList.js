import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function translate_subsection_title(sub) {
  var translator = {
    'crit-fail': 'Critical Failure',
    'crit': 'Critical Success',
    'success': 'Success',
    'failure': 'Failure'
  }

  if (translator.hasOwnProperty(sub)) {
    return translator[sub];
  }
  return sub;
}


function DefinitionList(props) {
  return (
    <Row as="dl">
      {Object.entries(props.content).map(([k, v]) => {
        return (
          <>
            <Col as="dt" sm={3}>{translate_subsection_title(k)}</Col>
            <Col as="dd" sm={9}>{v}</Col>
          </>
        )
      })}
    </Row>
  );
}

export default DefinitionList;