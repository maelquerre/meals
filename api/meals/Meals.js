class Meals {

  weekIntake

  constructor(initialWeekIntake) {
    this.daysNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    this.mealsNames = ['breakfast', 'lunch', 'snack', 'dinner']
    this.weekIntake = initialWeekIntake
  }

  generateMeals() {
    this.daysNames.forEach(dayName => {
      // Add missing days
      if (this.weekIntake[dayName] === undefined) {
        this.weekIntake[dayName] = {} // Initialise day
      }

      // Add missing meals
      this.mealsNames.forEach(mealName => {
        if (this.weekIntake[dayName][mealName] === undefined) {
          this.weekIntake[dayName][mealName] = [] // Initialise meal
          this.weekIntake[dayName][mealName].push({ foodGroupId: 1, portions: 2 })
        }
      })
    })
    return this.weekIntake
  }
}

export default Meals
