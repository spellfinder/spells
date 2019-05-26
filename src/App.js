import React from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import FiltersForm from './components/FiltersForm';
import SortForm from './components/SortForm';
import SpellList from './components/SpellList';
import { getAllSpells, getByList } from './lib/data'

const sortMethods = {
  'alpha-asc': (a, b) => (a[0] > b[0]) ? 1 : -1,
  'alpha-desc': (a, b) => (a[0] < b[0]) ? 1 : -1,
  'level-asc':  (a, b) => a[1].level - b[1].level,
  'level-desc': (a, b) => b[1].level - a[1].level,
}


class App extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      currentSortCriteria: 'alpha-asc',
      spellLists: [],
      traits: [],
    }
  }

  componentDidMount() {
    getAllSpells().then(all => {
      const traits = new Set();
      Object.values(all).forEach(o => {
        o.traits.forEach(trait => traits.add(trait))
      })
      this.setState({
        filteredSpells: Object.entries(all),
        spellData: all,
        traits: Array.from(traits).sort(),
      });
    })

    getByList().then(
      byList => this.setState({ spellsByList: byList, spellLists: Object.keys(byList) })
    )
  }

  reorderList(criteria) {
    this.setState((state, props) => ({
      filteredSpells: this.state.filteredSpells.sort(sortMethods[criteria]),
      currentSortCriteria: criteria
    }));
  }

  filterList(filters) {
    const newList = [];

    for (const k in this.state.spellData) {
      const o = this.state.spellData[k];
      if (o.level < filters.minSpellLevel || o.level > filters.maxSpellLevel) {
        continue;
      }
      if (o.name.toLowerCase().indexOf(filters.spellName.toLowerCase()) < 0) {
        continue;
      }
      if (filters.spellList && this.state.spellsByList[filters.spellList].indexOf(k) < 0) {
        continue;
      }
      if (filters.spellType && filters.spellType !== o.type.toLowerCase()) {
        continue;
      }
      if (filters.spellRarity >= 0 && filters.spellRarity != o.rarity) {
        continue;
      }
      if (filters.spellTraits.length) {
        if (!filters.spellTraits.every(function(item) { return o.traits.indexOf(item) >= 0; })) {
          continue;
        }
      }
      newList.push([k, o]);
    }

    this.setState({
      filteredSpells: newList.sort(sortMethods[this.state.currentSortCriteria])
    })
  }

  render() {
    return (
      <>
        <Header />
        <FiltersForm
          traits={this.state.traits}
          spellLists={this.state.spellLists}
          onChange={this.filterList.bind(this)}
        />
        <SortForm onChange={this.reorderList.bind(this)} />
        <SpellList spellData={this.state.filteredSpells} />
        <Footer />
      </>
    );
  }
}

export default App;
