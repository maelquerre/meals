import React from 'react'
import { Minus, Plus } from 'react-feather'

class InputNumber extends React.Component {
  constructor(props) {
    super(props)

    this.state
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="flex flex-row h-10 w-full relative bg-transparent mt-1">
          <button onClick={this.props.increment}
                  onMouseDown={event => event.preventDefault()}
                  className="number-control-button">
            <Minus className="m-auto" size={16} />
          </button>
          <input type="number"
                 className="pointer-events-none outline-none select-none text-center w-full bg-gray-200 text-md  text-gray-700"
                 name={this.props.name}
                 id={this.props.id}
                 value={this.props.value} />
          <button onClick={this.props.decrement}
                  onMouseDown={event => event.preventDefault()}
                  className="number-control-button">
            <Plus className="m-auto" size={16} />
          </button>
        </div>
      </div>
    )
  }
}

export default InputNumber
