import React from 'react'
import * as utils from '../api/meals/utils'
import * as data from '../api/meals/data'
import Meals from '../api/meals/Meals'
import MealView from './MealView'
import { ChevronDown, ChevronUp } from 'react-feather'

class ManageView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentDay: 'monday',
      intakes: [],
      portionsPreferences: data.recommendations,
      excludedPreferences: [{ meal: 'breakfast', foodGroupId: 7 }],
      navExpanded: false,
      errors: []
    }

    this.updateCurrentDay = this.updateCurrentDay.bind(this)
    this.updateIntakes = this.updateIntakes.bind(this)
    this.addIntake = this.addIntake.bind(this)
    this.removeIntake = this.removeIntake.bind(this)
    this.generateMeals = this.generateMeals.bind(this)

    this.closeNav = this.closeNav.bind(this)
    this.toggleNav = this.toggleNav.bind(this)
  }

  generateMeals() {
    const meals = new Meals(this.state.intakes, this.state.portionsPreferences, this.state.excludedPreferences)
    meals.createMeals(data.days, data.meals).then(intakes => {
      this.updateIntakes(intakes)
    }).catch(error => {
      this.setState({ errors: [...this.state.errors].push(error) })
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
    let intakes = [...this.state.intakes]

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

  closeNav() {
    if (this.state.navExpanded) {
      this.setState({ navExpanded: !this.state.navExpanded })
    }
  }

  toggleNav() {
    this.setState({ navExpanded: !this.state.navExpanded })
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  render() {
    return (
      <>
        <div className="sticky top-0 flex flex-col py-4 mb-5 bg-white z-10">
          <div className="container md:hidden">
            <div className="relative py-2 text-primary cursor-pointer"
                 onClick={this.toggleNav}>
              {this.capitalize(this.state.currentDay)}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                {!this.state.navExpanded && <ChevronDown size={18} />}
                {this.state.navExpanded && <ChevronUp size={18} />}
              </div>
            </div>
          </div>
          <nav className={`container nav flex flex-col md:flex-row md:justify-center flex-wrap md:h-auto ${this.state.navExpanded ? ' expand' : ''}`}>
            {data.days.map((day, index) => {
              return (
                <div key={index}
                     onClick={() => {
                       this.updateCurrentDay(day)
                       this.closeNav()
                     }}
                     className={'py-2 md:px-4 md:mr-2 bg-transparent md:hover:bg-gray-200 md:rounded-full cursor-pointer'
                     + (day === this.state.currentDay ? ' hidden md:block text-white bg-primary md:hover:bg-primary-var' : '')}>
                  {this.capitalize(day)}
                </div>
              )
            })}
          </nav>
          <button onClick={this.generateMeals}
                  className={'hidden py-2 px-4 text-white bg-primary rounded-full'}>
            Generate
          </button>
        </div>

        {data.meals.map((meal, index) => {
          return (
            <MealView key={index}
                      className="container mb-8"
                      name={meal.charAt(0).toUpperCase() + meal.slice(1)}
                      intakes={this.state.intakes.filter(intake => intake.day === this.state.currentDay && intake.meal === meal)}
                      addIntake={intake => this.addIntake({ day: this.state.currentDay, meal: meal, ...intake })}
                      removeIntake={this.removeIntake} />
          )
        })}
      </>
    )
  }
}

export default ManageView
