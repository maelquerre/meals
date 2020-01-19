function fetcher(url) {
  return fetch(url).then(response => response.json())
}

/**
 * Returns `true` if two given intakes are the same.
 *
 * @param intake the first intake to be tested
 * @param day the day of the second intake to be tested
 * @param meal the meal of the second intake to be tested
 * @param foodGroupId the food group ID of the second intake to be tested
 * @returns {boolean} `true` if the two intakes are the same ; `false` otherwise
 */
function intakeEquals(intake, { day, meal, foodGroupId }) {
  return intake.day === day && intake.meal === meal && intake.foodGroupId == foodGroupId
}

/**
 * Returns a random item from a given array
 *
 * @param array the given array
 * @returns {*} a random item from the given array
 */
function randomItem(array) {
  return array[Math.floor((Math.random() * array.length))]
}

export { fetcher, intakeEquals, randomItem }
