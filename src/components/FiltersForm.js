import React from 'react';
import Collapse from 'react-bootstrap/Collapse'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Select from 'react-select'

class FiltersForm extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      open: true,
      filters: {
        minSpellLevel: 0,
        maxSpellLevel: 10,
        spellName: "",
        spellList: "",
        spellType: "",
        spellRarity: -1,
        spellTraits: [],
      }
    }
  }

  renderTraitBadges() {
    return ''
  }

  handleValueChange(ev) {
    const filters = this.state.filters;
    filters[ev.target.id] = ev.target.value;
    this.setState({
      filters: filters
    })

    this.props.onChange(filters);
  }

  handleTraitChange(values, action) {
    const filters = this.state.filters;
    filters['spellTraits'] = values.map(o => o.value);
    this.setState({
      filters: filters
    });

    this.props.onChange(filters);
  }

  render() {
    const open = this.state.open
    const changeHandler = this.handleValueChange.bind(this);

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
              <Form.Control onChange={changeHandler} className="filters mx-1" type="number" min="0" max="10" defaultValue="0"/>
            </Form.Group>
            <Form.Group controlId="maxSpellLevel">
              <Form.Label>Max. Spell level</Form.Label>
              <Form.Control onChange={changeHandler} className="filters mx-1" type="number" min="0" max="10" defaultValue="10"/>
            </Form.Group>
            <Form.Group controlId="spellName">
              <Form.Label>Spell name:</Form.Label>
              <Form.Control onChange={changeHandler} className="filters mx-1" type="text"/>
            </Form.Group>
            <Form.Group controlId="spellList">
              <Form.Label>Tradition:</Form.Label>
              <Form.Control as="select" onChange={changeHandler} className="filters mx-1">
                <option key="" value="">All</option>
                {this.props.spellLists.map(list => (
                  <option key={list} value={list}>{list}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="spellType">
              <Form.Label>Type:</Form.Label>
              <Form.Control as="select" onChange={changeHandler} className="filters mx-1">
                <option value="">All</option>
                <option value="focus">Focus</option>
                <option value="spell">Spell</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="spellRarity">
              <Form.Label>Rarity:</Form.Label>
              <Form.Control as="select" onChange={changeHandler} className="filters mx-1">
                <option value="-1">All</option>
                <option value="0">Common</option>
                <option value="1">Uncommon</option>
                <option value="2">Rare</option>
                <option value="3">Unique</option>
              </Form.Control>
            </Form.Group>
            <Select
              onChange={this.handleTraitChange.bind(this)}
              placeholder="Spell traits..."
              className="w-50 my-1 mx-1"
              options={this.props.traits.map(t => ({value: t, label: t}))}
              isMulti
            />
          </Form>
        </div></Collapse>
      </Container>
    );
  }
}

export default FiltersForm;
