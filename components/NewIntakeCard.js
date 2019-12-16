import React from 'react'
import { ChevronDown, Minus, Plus } from 'react-feather'
import { foodGroups } from '../api/meals/data'

class NewIntakeCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      foodId: 1,
      foodPortions: 1
    }

    this.updateSelection = this.updateSelection.bind(this)
  }

  updateSelection(event) {
    this.setState({ foodId: event.target.value })
  }

  updateFoodPortion(amount) {
    if (this.state.foodPortions + amount >= 1) {
      this.setState({ foodPortions: this.state.foodPortions + amount })
    }
  }

  render() {
    return (
      <div className="py-4 px-6 bg-gray-100 rounded-lg border border-dashed border-gray-400">
        <img src={`/images/food/${this.state.foodId}.png`}
             className="w-1/2 mx-auto mt-4 mb-8" />

        <div className="relative mb-4">
          <select className="select h-10"
                  value={this.state.foodId}
                  onChange={this.updateSelection}>
            {foodGroups.map((foodGroup, index) => {
              return <option key={index} value={foodGroup.id}>{foodGroup.name}</option>
            })}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown size={18} />
          </div>
        </div>

        <div className="h-8 w-full mb-6">
          <div className="flex h-full w-full relative mt-1">
            <button onClick={() => this.updateFoodPortion(-1)}
                    onMouseDown={event => event.preventDefault()}
                    className="number-control-button bg-white">
              <Minus className="m-auto" size={16} />
            </button>
            <span className="flex items-center justify-center text-center w-full bg-white text-md text-gray-700">
              {this.state.foodPortions} {this.state.foodPortions > 1 ? 'portions' : 'portion'}
            </span>
            <button onClick={() => this.updateFoodPortion(1)}
                    onMouseDown={event => event.preventDefault()}
                    className="number-control-button bg-white">
              <Plus className="m-auto" size={16} />
            </button>
          </div>
        </div>

        <button className="btn btn--primary block w-full"
                onClick={() => this.props.addIntake({
                  foodGroupId: this.state.foodId,
                  portions: this.state.foodPortions
                })}>
          Add
        </button>
      </div>
    )
  }
}

export default NewIntakeCard
