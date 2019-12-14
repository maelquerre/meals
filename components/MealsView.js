import React from 'react'
import { ChevronDown, Plus, Minus } from 'react-feather'
import { days, meals, foodGroups, recommendations } from '../api/meals/data'
import InputNumber from './InputNumber'

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
        this.state.intakes[day][meal] = [{ foodGroupId: 3, portions: 1 }]
      })
    })

    this.changeCurrentDay = this.changeCurrentDay.bind(this)
    this.updateFoodPortions = this.updateFoodPortions.bind(this)
  }

  changeCurrentDay(day) {
    this.setState({ currentDay: day })
  }

  updateFoodPortions(meal, foodGroupId, amount) {
    let newIntakes = { ...this.state.intakes }
    if (!newIntakes[this.state.currentDay][meal].find(intake => intake.foodGroupId === foodGroupId)) {
      newIntakes[this.state.currentDay][meal].push({
        foodGroupId: foodGroupId,
        portions: 1
      })
    }
    newIntakes[this.state.currentDay][meal].find(intake => intake.foodGroupId === foodGroupId).portions += amount >= 1 && this.setState({ intakes: newIntakes })
  }

  addMeal(meal) {

  }

  render() {
    return (
      <div>
        <nav className="flex justify-between mb-5">
          {days.map((day, index) => {
            return (
              <div key={index}
                   onClick={() => this.changeCurrentDay(day)}
                   className={'mr-2 pb-2 border-solid border-b-2 cursor-pointer'
                   + (day === this.state.currentDay ? ' border-primary' : '')}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </div>
            )
          })}
        </nav>

        <div>
          {meals.map((meal, index) => {
            return (
              <div key={index} className="mb-8">
                <h2 className="mb-4 text-lg font-semibold">{meal.charAt(0).toUpperCase() + meal.slice(1)}</h2>

                {this.state.intakes[this.state.currentDay][meal].map((intake, index) => {
                  return (
                    <div key={index}>
                      {foodGroups.find(foodGroup => foodGroup.id === intake.foodGroupId).name} ({intake.portions})
                    </div>
                  )
                })}

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
                    <InputNumber className="h-10 w-32"
                                 increment={() => this.updateFoodPortions(meal, 1)}
                                 decrement={() => this.updateFoodPortions(meal, -1)}
                                 name={`portion${index}`}
                                 id={`portion${index}`}
                                 value={1} />
                                 {/*value={this.state.intakes[this.state.currentDay][meal].find(intake => intake.foodGroupId === food)} />*/}
                  </div>
                  <div>
                    <button className="btn btn--primary"
                            onClick={() => {}}>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default MealsView
