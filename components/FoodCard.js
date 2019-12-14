import React from 'react'
import { ChevronDown, Minus, Plus, PlusCircle } from 'react-feather'
import { foodGroups } from '../api/meals/data'

class FoodCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      foodId: null,
      foodPortion: 1
    }

    this.updateSelection = this.updateSelection.bind(this)
  }

  updateSelection(event) {
    this.setState({ foodId: event.target.value })
  }

  updateFoodPortion(amount) {
    if (this.state.foodPortion + amount) {
      this.setState(state => ({ foodPortion: state.foodPortion + amount }))
    }
  }

  render() {
    return (
      <div className="p-4 bg-gray-100 rounded-lg border border-dashed border-gray-400">
        <div>
          <button className="block ml-auto focus:outline-none"
                  onClick={() => this.props.addFood(this.state.foodId)}>
            <PlusCircle className="text-gray-600" />
          </button>
        </div>
        <img src={`/food-groups/${this.state.foodId}.png`}
             className="w-2/3 m-auto mb-8" />

        <div className="relative mb-4">
          <select className="select h-10"
                  defaultValue={'default'}
                  onChange={this.updateSelection}>
            <option disabled hidden value="default">Choose a food group</option>
            {foodGroups.map((foodGroup, index) => {
              return <option key={index} value={foodGroup.id}>{foodGroup.name}</option>
            })}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown size={18} />
          </div>
        </div>

        <div className="h-8 w-full">
          <div className="flex flex-row h-full w-full relative mt-1">
            <button onClick={() => this.updateFoodPortion(-1)}
                    onMouseDown={event => event.preventDefault()}
                    className="number-control-button bg-white">
              <Minus className="m-auto" size={16} />
            </button>
            <input type="number"
                   className="pointer-events-none outline-none select-none text-center w-full bg-white text-md text-gray-700"
                   value={this.state.foodPortion} />
            <button onClick={() => this.updateFoodPortion(1)}
                    onMouseDown={event => event.preventDefault()}
                    className="number-control-button bg-white">
              <Plus className="m-auto" size={16} />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default FoodCard
