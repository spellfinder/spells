import React from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import FiltersForm from './components/FiltersForm';
import SortForm from './components/SortForm';
import SpellList from './components/SpellList';

function App() {
  return (
    <>
      <Header />
      <FiltersForm spellLists={['arcane']}/>
      <SortForm />
      <SpellList />
      <Footer />
    </>
  );
}

export default App;
