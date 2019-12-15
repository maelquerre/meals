import React from 'react'
import { foodGroups, meals } from '../api/meals/data'
import IntakeCard from './IntakeCard'
import NewIntakeCard from './NewIntakeCard'

class MealView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      intakes: props.intakes
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <h2 className="mb-4 text-3xl">{this.props.name}</h2>

        <div className="grid columns-4">
          {this.state.intakes.map((intake, index) => {
            return (
              <IntakeCard key={index}
                          id={intake.foodGroupId}
                          name={foodGroups.find(foodGroup => foodGroup.id === intake.foodGroupId).name}
                          portions={intake.portions} />
            )
          })}
          <NewIntakeCard addIntake={this.props.addIntake} />
        </div>
      </div>
    )
  }
}

export default MealView
