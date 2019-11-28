import '../styles/index.css'

import React from 'react'
import App from 'next/app'
import Head from 'next/head'

class Layout extends React.Component {
  render() {
    const { children } = this.props
    return <div className='layout'>{children}</div>
  }
}

export default class Meals extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>Meals</title>
          <link href="https://cdn.jsdelivr.net/gh/glascode/grid-system@master/css/grid-system.min.css" rel="stylesheet" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    )
  }
}
