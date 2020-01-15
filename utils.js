function fetcher(url) {
  return fetch(url).then(response => response.json())
}

function intakeEquals(intake, { day, meal, foodGroupId }) {
  return intake.day === day && intake.meal === meal && intake.foodGroupId == foodGroupId
}

function randomItem(array) {
  return array[Math.floor((Math.random() * array.length))]
}

export { fetcher, intakeEquals, randomItem }
