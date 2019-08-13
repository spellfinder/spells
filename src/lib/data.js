export function getAllSpells() {
  return fetch('/data/all.json')
    .then(response => response.json())
}
