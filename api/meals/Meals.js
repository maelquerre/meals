Array.prototype.random = function () {
  return this[Math.floor((Math.random() * this.length))]
}

Object.prototype.random = function () {
  return this[Object.keys(this)[Math.floor(Math.random() * Object.keys(this).length)]]
}

class Meals {
  constructor(initialIntakes, intakesPreferences) {
    this.daysNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    this.mealsNames = ['breakfast', 'lunch', 'snack', 'dinner']
    this.intakes = initialIntakes
    this.intakesPreferences = intakesPreferences
  }

  /**
   * Generates meals.
   *
   * @param mealsPreferences An object containing arrays of excluded foodGroups for each meal.
   * @returns {*}
   */
  generateMeals(mealsPreferences) {
    this.daysNames.forEach(dayName => {
      // Add missing days
      if (!this.intakes[dayName]) {
        this.intakes[dayName] = {} // Initialize day
      }

      // Add missing meals
      this.mealsNames.forEach(mealName => {
        if (!this.intakes[dayName][mealName]) {
          this.intakes[dayName][mealName] = [] // Initialize meal

          let intakePreference
          do {
            intakePreference = this.intakesPreferences.random()

          } while (!this.isValid(intakePreference, dayName, mealsPreferences[mealName]))

          this.intakes[dayName][mealName].push({ foodGroupId: intakePreference.foodGroupId,  })
        }
      })
    })
    return this.intakes
  }

  isValid(intakePreference, day, mealPreferences) {
    if (mealPreferences.includes(intakePreference.foodGroupId)) {
      return false
    }

    return true
  }
}

export default Meals
