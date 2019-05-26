import React from 'react';

function Header() {
  return (
    <header className="text-white bg-primary rounded-bottom mb-3 p-2">
      <h1>
        Spell finder{' '}
        <small><a className="text-white" href="http://paizo.com/pathfinderplaytest">Pathfinder Playtest</a></small>
      </h1>
      <div><a className="text-white" href="/Changelog.txt">v2.0.0 (Changelog)</a></div>
    </header>
  );
}

export default Header;
