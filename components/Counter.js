import React from 'react'
import { Minus, Plus } from 'react-feather'

function Counter(props) {
  return (
    <div className={`relative flex-shrink-0 flex mt-1 md:mb-6 rounded overflow-hidden ${props.className}`}>
      <button onClick={props.decrement}
              onMouseDown={event => event.preventDefault()}
              className="h-full px-2 text-gray-700 md:hover:bg-gray-200 rounded-l cursor-pointer">
        <Minus className="m-auto" size={16} />
      </button>

      <div className="flex items-center justify-center md:px-1 w-full text-center text-gray-700">
        {props.value}
      </div>

      <button onClick={props.increment}
              onMouseDown={event => event.preventDefault()}
              className="h-full px-2 text-gray-700 md:hover:bg-gray-200 rounded-r cursor-pointer">
        <Plus className="m-auto" size={16} />
      </button>
    </div>
  )
}

export default Counter
