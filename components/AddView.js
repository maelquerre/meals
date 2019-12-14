import React from 'react'
import { ChevronDown, Plus, Minus } from 'react-feather'
import { days, meals, foodGroups, recommendations } from '../api/meals/data'
import InputNumber from './InputNumber'
import FoodCard from './FoodCard'

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
        this.state.intakes[day][meal] = [{ foodGroupId: 3, portions: 1 }]
      })
    })

    this.changeCurrentDay = this.changeCurrentDay.bind(this)
    this.updateFoodPortions = this.updateFoodPortions.bind(this)
    this.addFood = this.addFood.bind(this)
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
    if (newIntakes[this.state.currentDay][meal][newIntakes[this.state.currentDay][meal].findIndex(intake => intake.foodGroupId === foodGroupId)].portions += amount >= 1) {
      this.setState({ intakes: newIntakes })
    }
  }

  addFood(foodGroupId) {

  }

  render() {
    return (
      <div className={this.props.className}>
        <nav className="flex justify-center py-4 mb-5">
          {days.map((day, index) => {
            return (
              <div key={index}
                   onClick={() => this.changeCurrentDay(day)}
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
              <div key={index} className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">{meal.charAt(0).toUpperCase() + meal.slice(1)}</h2>

                <div className="grid columns-4">
                  {this.state.intakes[this.state.currentDay][meal].map((intake, index) => {
                    return (
                      <div key={index}
                           className="p-4 bg-gray-100 rounded-lg">
                        <img src={`/food-groups/${intake.foodGroupId}.png`} />
                        {foodGroups.find(foodGroup => foodGroup.id === intake.foodGroupId).name}
                      </div>
                    )
                  })}
                  <FoodCard addFood={this.addFood} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default AddView
