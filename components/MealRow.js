import React from 'react'
import IntakeCard from './IntakeCard'
import NewIntakeCard from './NewIntakeCard'

function MealRow(props) {
  return (
    <div className={props.className}>
      <div className="mb-4">
        <h2 className="headline">{props.name}</h2>
      </div>

      <div className="grid columns-4 gap-4">
        {props.intakes.length > 0 && props.intakes.map((intake, index) => {
          return (
            <IntakeCard key={index}
                        id={intake.foodGroupId}
                        className="spanx-row md:spanx-1"
                        name={props.foodGroups.find(foodGroup => foodGroup.id == intake.foodGroupId).name}
                        portions={intake.portions}
                        removeIntake={() => props.removeIntake(intake)} />
          )
        })}
        <NewIntakeCard className="spanx-row md:spanx-1"
                       foodGroups={props.foodGroups}
                       addIntake={props.addIntake} />
      </div>
    </div>
  )
}

export default MealRow
