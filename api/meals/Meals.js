import * as utils from './utils'

class Meals {
  /**
   *
   * @param initialIntakes
   * @param portionsPreferences An array
   * @param excludedPreferences An array containing objects of meals associated with excluded food groups ids.
   */
  constructor(initialIntakes = [], portionsPreferences = [], excludedPreferences = []) {
    this.intakes = initialIntakes
    this.portionsPreferences = portionsPreferences
    this.excludedPreferences = excludedPreferences
  }

  /**
   * Generates meals.
   *
   * @param days
   * @param meals
   * @returns {*}
   */
  createMeals(days, meals) {
    return new Promise((resolve, reject) => {
      days.forEach(day => {
        meals.forEach(meal => {
          let portionsPreference
          let newIntake
          do {
            portionsPreference = utils.randomItem(this.portionsPreferences)

            newIntake = {
              day: day,
              meal: meal,
              foodGroupId: portionsPreference.foodGroupId,
              portions: 1
            }
          } while (this.isExcluded(newIntake) && this.hasReachedLimit(portionsPreference, day))

          this.addIntake(newIntake)
        })
      })

      resolve(this.intakes)
    })
  }

  addIntake(newIntake) {
    // Check if the intake to add already exists
    const index = this.intakes.findIndex(intake => utils.intakeEquals(intake, newIntake))

    // If the intake already exists
    if (index > -1) {
      // Just update the existing intake's portions
      this.intakes[index].portions += newIntake.portions
    } else {
      // Else, add the new intake
      this.intakes.push({
        day: newIntake.day,
        meal: newIntake.meal,
        foodGroupId: newIntake.foodGroupId,
        portions: newIntake.portions
      })
    }
  }

  isExcluded({ meal, foodGroupId }) {
    return this.excludedPreferences.findIndex(exclusion => exclusion.foodGroupId == foodGroupId && exclusion.meal === meal) > -1
  }

  /**
   * Returns true if a portions preference food group has reached limit for a given day.
   *
   * @param portionsPreference the portions preference to be tested
   * @param day the day to be tested
   * @returns {boolean} true if a portion preference has reached limit for a given day ; false otherwise
   */
  hasReachedLimit(portionsPreference, day) {
    switch (portionsPreference.period) {
      case 'day':
        return this.totalPortionsByDay(portionsPreference.foodGroupId, day) >= portionsPreference.max
      case 'week':
        return this.totalPortions(portionsPreference.foodGroupId) >= portionsPreference.max
    }
  }

  totalPortionsByDay(foodGroupId, day) {
    const intakes = this.intakes.filter(intake => intake.day === day && intake.foodGroupId == foodGroupId)
    return intakes.map(intake => intake.portions).reduce((total, portions) => total + portions, 0)
  }

  totalPortions(foodGroupId) {
    const intakes = this.intakes.filter(intake => intake.foodGroupId == foodGroupId)
    return intakes.map(intake => intake.portions).reduce((total, portions) => total + portions, 0)
  }

  getIntakes() {
    return this.intakes
  }
}

export default Meals
