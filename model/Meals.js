import { intakeEquals, randomItem } from '../utils'

class Meals {
  /**
   * Constructor.
   *
   * @param initialIntakes
   * @param portionsPreferences An array
   * @param includedPreferences An array containing objects of meals associated with included food groups ids.
   */
  constructor(initialIntakes = [], portionsPreferences = [], includedPreferences = []) {
    this.intakes = initialIntakes
    this.portionsPreferences = portionsPreferences
    this.includedPreferences = includedPreferences
  }

  /**
   * Generates meals.
   *
   * @param days
   * @param meals
   * @returns {*}
   */
  generate(days, meals) {
    return new Promise((resolve, reject) => {
      try {
        days.forEach(day => {
          meals.forEach(meal => {
            let preference
            let newIntake

            // Test if a new intake can be added to the day and meal
            do {
              preference = randomItem(this.portionsPreferences)

              newIntake = {
                day: day,
                meal: meal,
                foodGroupId: preference.foodGroupId,
                portions: 1
              }

              // Pick another preference if the new intake is either not
              // included for the current meal or the limit has been reached for
              // the preference
            } while (!this.isIncluded(newIntake) || this.hasReachedLimit(preference, day))

            console.log('addIntake')
            this.addIntake(newIntake)
          })
        })
        resolve(this.intakes)
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Adds portion(s) of an intake to this intakes array.
   *
   * @param newIntake the new intake with portion(s) to be added to this intakes array
   */
  addIntake(newIntake) {
    // Check if the intake to add already exists
    const index = this.intakes.findIndex(intake => intakeEquals(intake, newIntake))

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

  /**
   * Returns `true` if a food group is included in the included preferences
   *
   * @param meal the meal of the food group to be tested
   * @param foodGroupId the ID of the food group to be tested
   * @returns {boolean} `true` if a food group is included in the included preferences ; `false` otherwise
   */
  isIncluded({ meal, foodGroupId }) {
    return this.includedPreferences.findIndex(preference => preference.foodGroupId == foodGroupId && preference.meal === meal) > -1
  }

  /**
   * Returns `true` if a portions preference food group has reached limit for the week or a given day.
   *
   * @param portionsPreference the portions preference to be tested
   * @param day the day to be tested
   * @returns {boolean} `true` if a portion preference has reached limit for the week or a given day ; `false` otherwise
   */
  hasReachedLimit(portionsPreference, day) {
    let hasReachedLimit = false

    switch (portionsPreference.period) {
      case 'day':
        if (portionsPreference.min) {
          hasReachedLimit = hasReachedLimit && this.totalPortionsPerDay(portionsPreference.foodGroupId, day) >= portionsPreference.min
        }
        if (portionsPreference.max) {
          hasReachedLimit = hasReachedLimit && this.totalPortionsPerDay(portionsPreference.foodGroupId, day) >= portionsPreference.max
        }
        break
      case 'week':
        if (portionsPreference.min) {
          hasReachedLimit = hasReachedLimit && this.totalPortions(portionsPreference.foodGroupId) >= portionsPreference.min
        }
        if (portionsPreference.max) {
          hasReachedLimit = hasReachedLimit && this.totalPortions(portionsPreference.foodGroupId) >= portionsPreference.max
        }
        break
    }

    return hasReachedLimit
  }

  /**
   * Returns the total of the portions for a given food group ID in a given day.
   *
   * @param foodGroupId the food group ID to get the total from
   * @param day the day to get the total from
   * @returns {int} the total of the portions for the given food group ID in he given day
   */
  totalPortionsPerDay(foodGroupId, day) {
    const intakes = this.intakes.filter(intake => intake.day === day && intake.foodGroupId == foodGroupId)
    return intakes.map(intake => intake.portions).reduce((total, portions) => total + portions, 0)
  }

  /**
   * Returns the total of the portions for a given food group ID in the week.
   *
   * @param foodGroupId the food group ID to get the total from
   * @returns {int} the total of the portions in the week for the given food group ID
   */
  totalPortions(foodGroupId) {
    const intakes = this.intakes.filter(intake => intake.foodGroupId == foodGroupId)
    return intakes.map(intake => intake.portions).reduce((total, portions) => total + portions, 0)
  }

  getIntakes() {
    return this.intakes
  }
}

export default Meals
