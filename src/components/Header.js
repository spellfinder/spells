import React from 'react';

function Header() {
  return (
    <header className="text-white rounded-bottom mb-3 p-2">
      <h1>
        𝕊𝕡𝕖𝕝𝕝𝕗𝕚𝕟𝕕𝕖𝕣{' '}
        <small><a className="text-white subtitle" href="https://paizo.com/pathfinder">for Pathfinder 2E</a></small>
      </h1>
      <div style={{'text-align': 'right'}}><a className="text-white" href="/Changelog.txt">v3.2.0 (Changelog)</a></div>
    </header>
  );
}

export default Header;
