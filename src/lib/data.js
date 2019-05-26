export function getAllSpells() {
  return fetch('/data/all.json')
    .then(response => response.json())
}

export function getByList() {
  return fetch('/data/by-list.json')
    .then(response => response.json())
}
