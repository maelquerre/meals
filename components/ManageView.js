import React from 'react'
import * as utils from '../api/meals/utils'
import * as data from '../api/meals/data'
import Meals from '../api/meals/Meals'
import MealView from './MealView'

class ManageView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentDay: 'monday',
      intakes: [],
      portionsPreferences: data.recommendations,
      excludedPreferences: [{ meal: 'breakfast', foodGroupId: 7 }]
    }

    this.updateCurrentDay = this.updateCurrentDay.bind(this)
    this.updateIntakes = this.updateIntakes.bind(this)
    this.addIntake = this.addIntake.bind(this)
    this.removeIntake = this.removeIntake.bind(this)
    this.generateMeals = this.generateMeals.bind(this)
  }

  generateMeals() {
    const meals = new Meals(this.state.intakes, this.state.portionsPreferences, this.state.excludedPreferences)
    meals.createMeals(data.days, data.meals).then(intakes => {
      this.updateIntakes(intakes)
    })
  }

  updateCurrentDay(day) {
    this.setState({ currentDay: day })
  }

  updateIntakes(intakes) {
    localStorage.setItem('intakes', JSON.stringify(intakes))
    this.setState({ intakes: intakes })
  }

  addIntake(newIntake) {
    /* Get intakes array to update it after */
    let intakes = JSON.parse(localStorage.getItem('intakes'))

    // Check if the intake to add already exists
    const index = intakes.findIndex(intake => utils.intakeEquals(intake, newIntake))

    // If the intake already exists
    if (index > -1) {
      // Just update the existing intake's portions
      intakes[index].portions += newIntake.portions
    } else {
      // Else, add the new intake
      intakes.push({
        day: newIntake.day,
        meal: newIntake.meal,
        foodGroupId: newIntake.foodGroupId,
        portions: newIntake.portions
      })
    }

    /* Update intakes with the updated array */
    this.updateIntakes(intakes)
  }

  removeIntake(intake) {
    /* Get intakes array to update it after */
    let intakes = JSON.parse(localStorage.getItem('intakes'))

    const index = intakes.findIndex(oldIntake => utils.intakeEquals(oldIntake, intake))
    if (index > -1) {
      intakes.splice(index, 1)
      this.updateIntakes(intakes)
    }
  }

  componentDidMount() {
    /* Init the localStorage intakes if it doesn't already exist and link it with the state */
    if (!localStorage.getItem('intakes')) {
      localStorage.setItem('intakes', JSON.stringify(this.state.intakes))
    }

    this.setState({ intakes: JSON.parse(localStorage.getItem('intakes')) })
  }

  render() {
    return (
      <div className={this.props.className}>
        <nav className="flex justify-center py-4 mb-5">
          {data.days.map((day, index) => {
            return (
              <div key={index}
                   onClick={() => this.updateCurrentDay(day)}
                   className={'mr-2 py-2 px-4 bg-transparent rounded-full cursor-pointer'
                   + (day === this.state.currentDay ? ' text-white bg-primary' : '')}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </div>
            )
          })}
          <button onClick={this.generateMeals}
                  className={'py-2 px-4 text-white bg-primary rounded-full'}>
            Generate
          </button>
        </nav>

        <div>
          {data.meals.map((meal, index) => {
            return (
              <MealView key={index}
                        className="mb-8"
                        name={meal.charAt(0).toUpperCase() + meal.slice(1)}
                        intakes={this.state.intakes.filter(intake => intake.day === this.state.currentDay && intake.meal === meal)}
                        addIntake={intake => this.addIntake({ day: this.state.currentDay, meal: meal, ...intake })}
                        removeIntake={this.removeIntake} />
            )
          })}
        </div>
      </div>
    )
  }
}

export default ManageView
