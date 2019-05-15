export function getAllSpells() {
  fetch('/data/all.json')
    .then(response => response.json())
}

export function getByList() {
  fetch('/data/by-list.json')
    .then(response => response.json())
}
