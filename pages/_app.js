import React from 'react'
import App from 'next/app'
import Head from 'next/head'

import '../styles/index.css'


class Layout extends React.Component {
  render() {
    const { children } = this.props
    return <>
      <main className="w-11/12 m-auto">{children}</main>
    </>
  }
}

export default class Meals extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>Meals</title>
          <link href="https://cdn.jsdelivr.net/gh/Glascode/matrix@master/css/matrix.min.css" rel="stylesheet" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    )
  }
}
