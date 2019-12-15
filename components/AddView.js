import React from 'react'
import { days, meals, foodGroups, recommendations } from '../api/meals/data'
import MealView from './MealView'

class AddView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentDay: 'monday',
      intakes: {}
    }

    days.forEach(day => {
      this.state.intakes[day] = {}
      meals.forEach(meal => {
        this.state.intakes[day][meal] = []
      })
    })

    this.updateCurrentDay = this.updateCurrentDay.bind(this)
    this.addIntake = this.addIntake.bind(this)
  }

  updateCurrentDay(day) {
    this.setState({ currentDay: day })
  }

  addIntake(meal, { foodGroupId, portions }) {
    /* Get intakes to update it after */
    let intakes = JSON.parse(localStorage.getItem('intakes'))

    /* Update the intake */

    // If the day doesn't exist, initialize it
    if (!intakes[this.state.currentDay]) {
      intakes[this.state.currentDay] = {}
    }

    // If the meal doesn't exist, initialize it
    if (!intakes[this.state.currentDay][meal]) {
      intakes[this.state.currentDay][meal] = []
    }

    const intake = intakes[this.state.currentDay][meal].find(intake => intake.foodGroupId === foodGroupId)
    // If the intake doesn't exist in the current day's target meal
    if (!intake) {
      // Add the intake to the current day's target meal
      intakes[this.state.currentDay][meal].push({
        foodGroupId: foodGroupId,
        portions: portions
      })
    } else {
      // Else, ust update the existing intake's portions
      for (const i in intakes[this.state.currentDay][meal]) {
        if (intakes[this.state.currentDay][meal][i].foodGroupId === foodGroupId) {
          intakes[this.state.currentDay][meal][i].portions += portions
          break
        }
      }
    }

    /* Update the stored intakes with the updated ones */
    localStorage.setItem('intakes', JSON.stringify(intakes))
  }

  componentDidMount() {
    /* Init the localStorage if not already and link it with the state */
    if (!localStorage.getItem('intakes')) {
      localStorage.setItem('intakes', JSON.stringify(this.state.intakes))
    }

    this.setState({ intakes: JSON.parse(localStorage.getItem('intakes')) })
  }

  render() {
    return (
      <div className={this.props.className}>
        <nav className="flex justify-center py-4 mb-5">
          {days.map((day, index) => {
            return (
              <div key={index}
                   onClick={() => this.updateCurrentDay(day)}
                   className={'mr-2 py-2 px-4 bg-transparent rounded-full cursor-pointer'
                   + (day === this.state.currentDay ? ' text-white bg-primary' : '')}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </div>
            )
          })}
        </nav>

        <div>
          {meals.map((meal, index) => {
            return (
              <MealView key={index}
                        className="mb-8"
                        name={meal.charAt(0).toUpperCase() + meal.slice(1)}
                        intakes={this.state.intakes[this.state.currentDay][meal]}
                        addIntake={intake => this.addIntake(meal, intake)} />
            )
          })}
        </div>
      </div>
    )
  }
}

export default AddView
