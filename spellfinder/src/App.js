import React from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import FiltersForm from './components/FiltersForm';
import SortForm from './components/SortForm';

function App() {
  return (
    <>
      <Header />
      <FiltersForm spellLists={['arcane']}/>
      <SortForm />
      <Footer />
    </>
  );
}

export default App;
