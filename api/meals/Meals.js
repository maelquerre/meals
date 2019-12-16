import * as utils from './utils'

class Meals {
  /**
   *
   * @param initialIntakes
   * @param portionsPreferences
   * @param excludedPreferences An object containing excluded foodGroups for each meal.
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
   * @param portionsPreferences
   * @returns {*}
   */
  createMeals(days, meals, portionsPreferences) {
    days.forEach(day => {
      meals.forEach(meal => {
        let portionsPreference
        let newIntake
        do {
          portionsPreference = utils.randomItem(portionsPreferences)
          newIntake = {
            day: day,
            meal: meal,
            foodGroupId: portionsPreference.foodGroupId,
            portions: portionsPreference.portions
          }

          // If the portionsPreference.foodGroupId-intake is not already in the intakes

        } while (!this.canBeAdded(portionsPreference, day))

        this.intakes.push(newIntake)
      })
    })
  }

  canBeAdded(portionsPreference, day) {
    if (this.portionsPreferences.includes(portionsPreference.foodGroupId)) {
      return false
    }

    switch (portionsPreference.period) {
      case 'day':
        return portionsPreference.portions < this.totalPortionsByDay(portionsPreference.foodGroupId, day)
      case 'week':
        return portionsPreference.portions < this.totalPortions(portionsPreference.foodGroupId)
    }

    return true
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
