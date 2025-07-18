import React from 'react'
import Layout from './Layout/Layout'
import Banner from '../Components/Banner'
import Expertise from '../Components/Expertise'
import About from '../Components/About'
import Contact from '../Components/Contact'
import FeaturedBlog from '../Components/FeaturedBlog'

export default function Home() {
  return (
    <>
        <Layout >
            <Banner />
            <Expertise />
            <About />
            <FeaturedBlog />
            <Contact /> 
        </ Layout>
    </>
  )
}
