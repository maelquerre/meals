import * as utils from './utils'

class Meals {
  /**
   *
   * @param initialIntakes
   * @param portionsPreferences
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
          do {
            portionsPreference = utils.randomItem(this.portionsPreferences)
          } while (this.intakes.find(intake => utils.intakeEquals(intake, {
            day: day,
            meal: meal,
            foodGroupId: portionsPreference.foodGroupId
          }))
          && !this.isExcluded(portionsPreference.foodGroupId, meal)
          && !this.hasReachedLimit(portionsPreference, day))

          const newIntake = {
            day: day,
            meal: meal,
            foodGroupId: portionsPreference.foodGroupId,
            portions: 1
          }
          this.intakes.push(newIntake)
        })
      })

      resolve(this.intakes)
    })
  }

  isExcluded(foodGroupId, meal) {
    return this.excludedPreferences.find(exclusion => exclusion.foodGroupId == foodGroupId && exclusion.meal === meal)
  }

  hasReachedLimit(portionsPreference, day) {
    switch (portionsPreference.period) {
      case 'day':
        return portionsPreference.portions < this.totalPortionsByDay(portionsPreference.foodGroupId, day)
      case 'week':
        return portionsPreference.portions < this.totalPortions(portionsPreference.foodGroupId)
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
