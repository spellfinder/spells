import React from 'react';
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Autosuggest from 'react-bootstrap-autosuggest'

class FiltersForm extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      open: true,
    }
  }

  renderTraitBadges() {
    return ''
  }

  render() {
    const open = this.state.open
    return (
      <Container className="rounded bg-light mb-3 p-1">
        <h3
          onClick={() => this.setState({ open: !open })}
          aria-controls="filters_form"
          aria-expanded={open}
        >
          Filters
        </h3>
        <Collapse in={this.state.open}><div id="filters_form">
          <Form inline>
            <Form.Group controlId="minSpellLevel">
              <Form.Label>Min. Spell level</Form.Label>
              <Form.Control className="filters mx-1" type="number" min="0" max="10" defaultValue="0"/>
            </Form.Group>
            <Form.Group controlId="maxSpellLevel">
              <Form.Label>Max. Spell level</Form.Label>
              <Form.Control className="filters form-control mx-1" type="number" min="0" max="10" defaultValue="10"/>
            </Form.Group>
            <Form.Group controlId="spellName">
              <Form.Label>Spell name:</Form.Label>
              <Form.Control className="filters form-control mx-1" type="text"/>
            </Form.Group>
            <Form.Group controlId="spellList">
              <Form.Label>Spell list:</Form.Label>
              <Form.Control as="select" className="filters mx-1">
                <option value="">All</option>
                {this.props.spellLists.map(list => (
                  <option value={list}>{list}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="spellType">
              <Form.Label>Type:</Form.Label>
              <Form.Control as="select" class="filters mx-1">
                <option value="">All</option>
                <option value="power">Power</option>
                <option value="spell">Spell</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="spellRarity">
              <Form.Label>Rarity:</Form.Label>
              <Form.Control as="select" className="filters mx-1">
                <option value="-1">All</option>
                <option value="0">Common</option>
                <option value="1">Uncommon</option>
                <option value="2">Rare</option>
                <option value="3">Unique</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <Form inline>
            <Form.Group className="mt-2 traits-section">
              <Form.Label>Traits</Form.Label>
              <Autosuggest
                datalist={['auditory', '']}
                placeholder='Find trait...'
              />
              <Button href="#" variant="primary">Add trait</Button>
              <div id="active_trait_filters">
                {this.renderTraitBadges()}
              </div>
            </Form.Group>
          </Form>
        </div></Collapse>
      </Container>
    );
  }
}

export default FiltersForm;
