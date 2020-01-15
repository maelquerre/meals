import React from 'react'
import Counter from '../Counter'

function PortionsCard(props) {
  return (
    <div className="flex flex-col">
      <img src={`/images/food/${props.id}.png`}
           alt={props.id}
           className="self-center w-1/2 md:mb-8" />
      <div className="flex-grow text-center">{props.name}</div>

      {props.min && <Counter decrement={() => props.updateFoodPortion(-1)}
                             increment={() => props.updateFoodPortion(1)}
                             value={`min ${props.min}`}
                             className="h-8 md:h-10 bg-white" />}

      {props.max && <Counter decrement={() => props.updateFoodPortion(-1)}
                             increment={() => props.updateFoodPortion(1)}
                             value={`max ${props.max}`}
                             className="h-8 md:h-10 bg-white" />}
    </div>
  )
}

export default PortionsCard
