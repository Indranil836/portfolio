import React from 'react'
import Layout from './Layout/Layout'
import { Container } from 'react-bootstrap'
import '../styles/css/Components/Nopage.min.css'

export default function NoPage() {
  return (
    <>
      <Layout >
        <section className='no-page d-flex justify-content-center align-items-center'>
          <h4>404 | No page found</h4>
        </section>
        <Container>
        </Container>
      </ Layout>
    </>
  )
}
