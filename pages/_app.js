import React from 'react'
import App from 'next/app'
import Head from 'next/head'

import '../styles/index.css'
import Link from 'next/link'
import { Settings } from 'react-feather'

class Layout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <>
        <header className="flex items-center p-4 bg-gray-200">
          <div className="w-1/4" />


          <h1 className="w-2/4 text-3xl text-center font-semibold tracking-tight leading-none">
            <Link href="/">
              <a>Meals</a>
            </Link>
          </h1>

          <div className="w-1/4 flex justify-end md:justify-center">
            <Link href="/settings">
              <a><Settings /></a>
            </Link>
          </div>
        </header>

        <main className="pt-4 pb-8">
          {children}
        </main>
      </>
    )
  }
}

export default class Meals extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>Meals</title>
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="stylesheet" type="text/css" href="https://rsms.me/inter/inter.css" />
          <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/Glascode/matrix@master/dist/matrix.min.css" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    )
  }
}
