import React from 'react'
import { ChevronDown } from 'react-feather'
import { days, meals, foodGroups, recommendations } from '../api/meals/data'

class MealsView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeDay: 'monday',
      intakes: {}
    }

    days.forEach(day => {
      meals.forEach(meal => {
        if (!(day in this.state.intakes)) {
          this.setState({ intakes: this.state.intakes[day] = {} })
        }
        this.setState({ intakes: this.state.intakes[day][meal] = { portions: 0 } })
      })
    })

    console.log(this.state)

    this.changeActiveDay = this.changeActiveDay.bind(this)
    this.updatePortion = this.updatePortion.bind(this)
  }

  changeActiveDay(day) {
    this.setState({ activeDay: day })
  }

  updatePortion(meal, amount) {
    // TODO: improve state change
    this.setState(state => (state.intakes[this.state.activeDay][meal].portions += amount, state))
  }

  render() {
    return (
      <div>
        <nav className="flex mb-3">
          {days.map((day, index) => {
            return <div key={index}
                        onClick={() => this.changeActiveDay(day)}
                        className={'mr-2 pb-2 border-solid border-primary cursor-pointer' + (day === this.state.activeDay ? ' border-b-2' : '')}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </div>
          })}
        </nav>

        <div className="grid columns-3" style={{ gridTemplateColumns: 'max-content 1fr 1fr' }}>
          {meals.map((meal, index) => {
            return <div key={index} style={{ display: 'contents' }}>
              <h2 className="mb-2 mr-2 text-lg font-semibold">{meal.charAt(0).toUpperCase() + meal.slice(1)}</h2>

              <div className="mr-5">
                <label htmlFor={`foodGroup${index}`} className="label">
                  Food group
                </label>
                <div className="relative">
                  <select className="select" id={`foodGroup${index}`}>
                    <option disabled hidden selected>Food group</option>
                    {foodGroups.map((foodGroup, index) => {
                      return <option key={index}>{foodGroup.name}</option>
                    })}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor={`portion${index}`} className="label">
                  Portion
                </label>
                <div className="custom-number-input h-10 w-32">
                  <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                    <button onClick={() => this.updatePortion(meal, -1)}
                            data-action="decrement"
                            className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                      <span className="m-auto text-2xl">−</span>
                    </button>
                    <input type="number appearance-none"
                           className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                           name={`portion${index}`}
                           id={`portion${index}`}
                           value={this.state.intakes[this.state.activeDay][meal].portions} />
                    <button onClick={() => this.updatePortion(meal, 1)}
                            data-action="increment"
                            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                      <span className="m-auto text-2xl">+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    )
  }
}

export default MealsView
