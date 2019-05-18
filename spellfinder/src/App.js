import React from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import FiltersForm from './components/FiltersForm';
import SortForm from './components/SortForm';
import SpellList from './components/SpellList';
import { getAllSpells } from './lib/data'

class App extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {}
  }

  componentDidMount() {
    getAllSpells().then(all => this.setState({ filteredSpells: all, spellData: all }))
  }

  render() {
    return (
      <>
        <Header />
        <FiltersForm spellLists={['arcane']}/>
        <SortForm />
        <SpellList spellData={this.state.filteredSpells} />
        <Footer />
      </>
    );
  }
}

export default App;
