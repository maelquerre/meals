import React from 'react'

function IntakeCard(props) {
  return (
    <div className="flex flex-col py-4 px-6 bg-gray-200 rounded-lg">
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
