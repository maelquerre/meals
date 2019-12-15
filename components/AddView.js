import React from 'react'
import { days, meals, foodGroups, recommendations } from '../api/meals/data'
import AddFoodCard from './AddFoodCard'
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
        this.state.intakes[day][meal] = []
      })
    })

    this.updateCurrentDay = this.updateCurrentDay.bind(this)
    this.addFood = this.addFood.bind(this)
  }

  updateCurrentDay(day) {
    this.setState({ currentDay: day })
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
              <div key={index} className="mb-8">
                <h2 className="mb-4 text-3xl">{meal.charAt(0).toUpperCase() + meal.slice(1)}</h2>

                <div className="grid columns-4">
                  {this.state.intakes[this.state.currentDay][meal].map((intake, index) => {
                    return (
                      <FoodCard key={index}
                                id={intake.foodGroupId}
                                name={foodGroups.find(foodGroup => foodGroup.id === intake.foodGroupId).name}
                                portions={intake.portions} />
                    )
                  })}
                  <AddFoodCard addFood={this.addFood} />
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
