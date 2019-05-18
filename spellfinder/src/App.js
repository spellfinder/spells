import React from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import FiltersForm from './components/FiltersForm';
import SortForm from './components/SortForm';
import SpellList from './components/SpellList';
import { getAllSpells } from './lib/data'

const sortMethods = {
  'alpha-asc': (a, b) => (a[0] > b[0]) ? 1 : -1,
  'alpha-desc': (a, b) => (a[0] < b[0]) ? 1 : -1,
  'level-asc':  (a, b) => a[1].level - b[1].level,
  'level-desc': (a, b) => b[1].level - a[1].level,
}


class App extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {}
  }

  componentDidMount() {
    getAllSpells().then(all => this.setState({ filteredSpells: Object.entries(all), spellData: all }))
  }

  reorderList(criteria) {
    this.setState({
      filteredSpells: this.state.filteredSpells.sort(sortMethods[criteria])
    })
  }

  render() {
    return (
      <>
        <Header />
        <FiltersForm spellLists={['arcane']}/>
        <SortForm onChange={this.reorderList.bind(this)} />
        <SpellList spellData={this.state.filteredSpells} />
        <Footer />
      </>
    );
  }
}

export default App;
