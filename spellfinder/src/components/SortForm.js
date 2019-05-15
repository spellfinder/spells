import React from 'react';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

class SortForm extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <Container className="rounded bg-light mb-3 p-2">
        <Form inline>
          <Form.Group>
          <Form.Label for="sort-box">Sort by:</Form.Label>
          <Form.Control as="select" id="sort-box" className="w-25 ml-2">
            <option value="alpha-asc">A -&gt; Z</option>
            <option value="alpha-desc">Z -&gt; A</option>
            <option value="level-asc"> Level 0 -&gt; 10</option>
            <option value="level-desc">Level 10 -&gt; 0</option>
          </Form.Control>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default SortForm;
