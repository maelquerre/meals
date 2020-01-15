import React from 'react'
import { ChevronDown, Minus, Plus } from 'react-feather'

class NewFoodCard extends React.Component {
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
      <div className={`flex md:flex-col p-3 md:p-4 bg-gray-100 rounded-xl border border-dashed border-gray-400 ${this.props.className}`}>
        <img src={`/images/food/${this.state.foodId}.png`}
             className="self-center w-1/6 md:w-1/2 mr-4 md:mr-0 md:mt-4 md:mb-8" />

        <div className="flex flex-col flex-grow mr-3 md:mr-0">
          <div className="relative md:mb-4 h-10">
            <select className="select"
                    value={this.state.foodId}
                    onChange={this.updateSelection}>
              {this.props.foodGroups.map((foodGroup, index) => {
                return <option key={index} value={foodGroup.id}>{foodGroup.name}</option>
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={18} />
            </div>
          </div>
        </div>

        <button className="btn btn--primary hidden md:block self-stretch"
                onClick={() => this.props.addFoodGroup(this.state.foodId)}>
          Add
        </button>
        <button className="md:hidden self-center p-1 text-white bg-primary rounded-full focus:outline-none"
                onClick={() => this.props.addFoodGroup(this.state.foodId)}>
          <Plus size={18} />
        </button>
      </div>
    )
  }
}

export default NewFoodCard
