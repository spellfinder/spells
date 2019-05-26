import React from 'react';
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'

import SpellCard from './SpellCard'

class SpellList extends React.Component {
  render() {
    const spellData = this.props.spellData;
    if (!spellData) {
      return null;
    }
    return (
      <Container>
        <ListGroup className="container">
          {spellData.map(([k, o]) => {
            return (<SpellCard key={k} details={o} />)
          })}
        </ListGroup>
      </Container>
    );
  }
}

export default SpellList;
