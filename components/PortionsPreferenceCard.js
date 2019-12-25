import React from 'react'
import { Minus, Plus } from 'react-feather'
import Counter from './Counter'

class PortionsPreferenceCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="flex flex-col">
        <img src={`/images/food/${this.props.id}.png`}
             alt={this.props.id}
             className="self-center w-1/2 md:mb-8" />
        <div className="flex-grow text-center">{this.props.name}</div>

        {this.props.min && <Counter decrement={() => this.updateFoodPortion(-1)}
                                    increment={() => this.updateFoodPortion(1)}
                                    value={`min ${this.props.min}`}
                                    className="h-8 md:h-10 bg-gray-200" />}

        {this.props.max && <Counter decrement={() => this.updateFoodPortion(-1)}
                                    increment={() => this.updateFoodPortion(1)}
                                    value={`max ${this.props.max}`}
                                    className="h-8 md:h-10 bg-gray-200" />}
      </div>
    )
  }
}

export default PortionsPreferenceCard
