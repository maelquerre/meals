import React from 'react'

import { Trash2 } from 'react-feather'

function IntakeCard(props) {
  return (
    <div className="relative flex flex-col py-4 px-6 bg-gray-200 rounded-lg border border-transparent">
      <button onClick={props.removeIntake}
              className="absolute top-0 right-0 p-4 focus:outline-none"
              title="Remove intake">
        <Trash2 size={16} className="text-gray-600" />
      </button>

      <img src={`/images/food/${props.id}.png`}
           className="w-1/2 mx-auto mt-4 mb-8" />

      <div className="h-full flex flex-col items-center justify-center">
        <div className="text-lg text-center px-4 mb-4">{props.name}</div>
        <div className="text-center mb-4">{props.portions} {props.portions > 1 ? 'portions' : 'portion'}</div>
      </div>
    </div>
  )
}

export default IntakeCard
