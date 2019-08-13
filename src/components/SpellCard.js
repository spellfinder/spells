import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

import Subsection from './subsections/Subsection';

const rarities = ['common', 'uncommon', 'rare', 'unique'];
const rarity_class = ['secondary', 'warning', 'danger', 'primary'];
const spellProperties = [
  'area', 'duration', 'target', 'range', 'trigger', 'requirements',
  'cost', 'save', 'domain'
];


function translateCast(cast) {
  const actions = cast.actions && cast.actions.replace(
    /a/g, '🔶'
  ).replace(
    /r/g, '↩'
  ).replace(
    /f/g, '🔷'
  )
  return `${actions || cast.time} (${cast.components.join(', ')})`
}


function capitalize(str) {
  let words = str.split(' ');
  words = words.map((word) => {
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  });
  return words.join(' ');
}

function processSubsections(desc) {
  let main = desc.main;
  const result = [];
  while (main.indexOf('$') >= 0) {
    result.push(
      <p>{main.slice(0, main.indexOf('$'))}</p>
    )
    const sub = desc.subsections[main.slice(main.indexOf('$') + 13, main.indexOf('}'))]
    result.push(<Subsection dataType={sub.type} content={sub.content} />)
    main = main.slice(main.indexOf('}') + 1)
  }

  return result;
}


class SpellCard extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      expanded: false,
    }
  }

  renderExpandedData() {
    const spell_data = this.props.details;

    return (
      <div className="spell-detail">
        <ul className="list-inline">
          {this.renderTraits(spell_data.traits)}
          {this.renderPropertyTags(spell_data)}
        </ul>
        <hr></hr>
        <div>{this.renderDescription(spell_data.description)}</div>
        {this.renderHeighten(spell_data.heightened)}
      </div>
    );
  }

  renderTraits(traits) {
    return traits.map(trait => {
      return <Badge as="li" variant="info" className="trait-badge mr-1">{trait}</Badge>
    })
  }

  renderPropertyTags(spellData) {
    const renderedProps = spellProperties.map(prop => {
      if (spellData[prop]) {
        return (
          <li className="list-inline-item">
            <strong>{prop}{': '}</strong>{spellData[prop]}
          </li>
        )
      } else {
        return ''
      }
    })

    return (
      <>
        {spellData.traditions && (
          <li className="list-inline-item">
            <strong>{'traditions: '}</strong>{spellData.traditions.sort().join(', ')}
          </li>
        )}
        {renderedProps}
        <li className="list-inline-item"><strong>{'cast: '}</strong>{translateCast(spellData.cast)}</li>
      </>
    );
  }

  renderDescription(desc) {
    if (!desc.subsections) {
      return <p>{desc.main}</p>
    } else {
      return processSubsections(desc)
    }
  }

  renderHeighten(heightened) {
    if (!heightened) {
      return;
    }
    return (
      <>
        <hr></hr>
        <Row as="dl">
          <Col as="dt" sm={3}>{'Heightened'}</Col>
          <Col as="dd" sm={9}>{'-'}</Col>
          {Object.entries(heightened).map(([k, v]) => {
            return (
              <>
                <Col as="dt" sm={3}>{k}</Col>
                <Col as="dd" sm={9}>{v}</Col>
              </>
            )
          })}
        </Row>
      </>
    )
  }

  render() {
    const details = this.props.details
    return (
      <ListGroup.Item className="justify-content-center" action onClick={() => this.setState({expanded: !this.state.expanded})}>
        <h5 className="w-100 spellcard-header">
          {capitalize(details.name)}{' '}
          <Badge variant="dark">{capitalize(details.type)}{' '}{details.level}</Badge>
          <Badge variant={rarity_class[details.rarity]}>{capitalize(rarities[details.rarity])}</Badge>
        </h5>
        {this.state.expanded && this.renderExpandedData()}
      </ListGroup.Item>
    )
  }
}

export default SpellCard;
