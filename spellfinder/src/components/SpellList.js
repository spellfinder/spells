import React from 'react';
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'

import SpellCard from './SpellCard'
import { getAllSpells } from '../lib/data'

class SpellList extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {}
  }

  componentDidMount() {
    getAllSpells().then(all => this.setState({ spellData: all }))
  }

  render() {
    const spellData = this.state.spellData;
    if (!spellData) {
      return null;
    }
    return (
      <Container>
        <ListGroup className="container">
          {Object.entries(spellData).map(([k, o]) => {
            return (<SpellCard key={k} details={o} />)
          })}
        </ListGroup>
      </Container>
    );
  }
}

export default SpellList;
