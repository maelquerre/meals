import React from 'react'
import Spinner from '../components/Spinner'

class LoadingView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={this.props.className}>
        <Spinner />
      </div>
    )
  }
}

export default LoadingView
