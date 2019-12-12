import React from 'react'
import { ChevronDown, Plus, Minus } from 'react-feather'
import { days, meals, foodGroups, recommendations } from '../api/meals/data'

class MealsView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentDay: 'monday',
      intakes: {}
    }

    days.forEach(day => {
      this.state.intakes[day] = {}
      meals.forEach(meal => {
        this.state.intakes[day][meal] = { portions: 0 }
      })
    })

    this.changeCurrentDay = this.changeCurrentDay.bind(this)
    this.updatePortion = this.updatePortion.bind(this)
  }

  changeCurrentDay(day) {
    this.setState({ currentDay: day })
  }

  updatePortion(meal, amount) {
    let newIntakes = { ...this.state.intakes }
    if ((newIntakes[this.state.currentDay][meal].portions += amount) >= 0) {
      this.setState({ intakes: newIntakes })
    }
  }

  addMeal(meal) {

  }

  render() {
    return (
      <div>
        <nav className="flex justify-between mb-5">
          {days.map((day, index) => {
            return <div key={index}
                        onClick={() => this.changeCurrentDay(day)}
                        className={'mr-2 pb-2 border-solid border-b-2 cursor-pointer'
                        + (day === this.state.currentDay ? ' border-primary' : '')}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </div>
          })}
        </nav>

        <div>
          {meals.map((meal, index) => {
            return <div key={index}
                        className="mb-8">
              <h2 className="mb-4 text-lg font-semibold">{meal.charAt(0).toUpperCase() + meal.slice(1)}</h2>

              <div className="flex items-end">
                <div className="mr-8">
                  <label htmlFor={`foodGroup${index}`}
                         className="block mb-2 text-sm uppercase">
                    Food group
                  </label>
                  <div className="relative">
                    <select className="select h-10"
                            id={`foodGroup${index}`}
                            defaultValue={'default'}>
                      <option disabled hidden value="default">Choose a food group</option>
                      {foodGroups.map((foodGroup, index) => {
                        return <option key={index}>{foodGroup.name}</option>
                      })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>
                <div className="mr-8">
                  <label htmlFor={`portion${index}`} className="block mb-2 text-sm uppercase">
                    Portion
                  </label>
                  <div className="custom-number-input h-10 w-32">
                    <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                      <button onClick={() => this.updatePortion(meal, -1)}
                              data-action="decrement"
                              className="bg-gray-200 text-gray-700 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer focus:outline-none focus:shadow-outline">
                        <Minus className="m-auto" size={16} />
                      </button>
                      <input type="number"
                             className="pointer-events-none outline-none select-none text-center w-full bg-gray-200 text-md  text-gray-700"
                             name={`portion${index}`}
                             id={`portion${index}`}
                             value={this.state.intakes[this.state.currentDay][meal].portions} />
                      <button onClick={() => this.updatePortion(meal, 1)}
                              data-action="increment"
                              className="bg-gray-200 text-gray-700 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer focus:outline-none focus:shadow-outline">
                        <Plus className="m-auto" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="btn btn--primary"
                          onClick={() => {}}>
                    Add
                  </button>
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
