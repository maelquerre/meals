import React from 'react'
import Icon from './Icon'
import { days, meals, foodGroups, recommendations } from '../api/meals/data'

class MealsView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeDay: 'monday'
    }
  }

  changeActiveDay(day) {
    this.setState({ activeDay: day })
  }

  render() {
    return (
      <div>
        <nav className="flex mb-3">
          {days.map((day, index) => {
            return <div key={index}
                        onClick={() => this.changeActiveDay(day)}
                        className={"mr-2 pb-2 border-solid border-primary cursor-pointer" + (day === this.state.activeDay ? ' border-b-2' : '')}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </div>
          })}
        </nav>

        <div>
          {meals.map((meal, index) => {
            return <div key={index} className="mb-5">
              <h2 className="mb-2 text-lg font-semibold">{meal.charAt(0).toUpperCase() + meal.slice(1)}</h2>
              <div className="flex">
                <div>
                  <label htmlFor="name" className="label">
                    Food group
                  </label>
                  <div className="relative">
                    <select className="select" id="grid-state">
                      <option disabled hidden selected>Food group</option>
                      {foodGroups.map((foodGroup, index) => {
                        return <option key={index}>{foodGroup.name}</option>
                      })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      {/*<Icon name="chevron-down"/>*/}
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="name" className="label">
                    Quantity
                  </label>
                  <input className="input" />
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
