import React from 'react'
import Link from 'next/link'

class HomeView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={this.props.className}>
        Week overview<br />

        <Link href="/manage"><a className="btn btn--primary">Manage</a></Link>
      </div>
    )
  }
}

export default HomeView
