import React from 'react'
import { foodGroups, meals } from '../api/meals/data'
import IntakeCard from './IntakeCard'
import NewIntakeCard from './NewIntakeCard'

class MealView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="mb-4">
          <h2 className="md:text-xl font-medium uppercase tracking-wide">{this.props.name}</h2>
        </div>

        <div className="grid columns-4 gap-4">
          {this.props.intakes.length > 0 && this.props.intakes.map((intake, index) => {
            return (
              <IntakeCard key={index}
                          id={intake.foodGroupId}
                          className="spanx-row md:spanx-1"
                          name={foodGroups.find(foodGroup => foodGroup.id == intake.foodGroupId).name}
                          portions={intake.portions}
                          removeIntake={() => this.props.removeIntake(intake)} />
            )
          })}
          <NewIntakeCard className="spanx-row md:spanx-1"
                         addIntake={this.props.addIntake} />
        </div>
      </div>
    )
  }
}

export default MealView
