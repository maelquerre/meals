import React from 'react'

import { Trash2 } from 'react-feather'

function IntakeCard(props) {
  return (
    <div className={`relative flex md:flex-col py-2 px-3 md:p-4 bg-gray-200 rounded-xl border border-transparent ${props.className}`}>
      <img src={`/images/food/${props.id}.png`}
           alt={props.name}
           className="self-center w-1/6 md:w-1/2 mr-4 md:mr-0 md:mt-4 md:mb-8" />

      <div className="flex-grow flex md:flex-col items-center justify-between md:justify-center mr-4 md:mr-0">
        <div className="text-lg md:text-center text-gray-700 mr-4 md:mr-0 md:mb-4">{props.name}</div>
        <div className="flex-shrink-0 text-center text-gray-600">{props.portions} {props.portions > 1 ? 'portions' : 'portion'}</div>
      </div>

      <button onClick={props.removeIntake}
              className="md:absolute md:top-0 md:right-0 md:p-4 focus:outline-none"
              title="Remove intake">
        <Trash2 size={18} className="text-gray-600" />
      </button>
    </div>
  )
}

export default IntakeCard
