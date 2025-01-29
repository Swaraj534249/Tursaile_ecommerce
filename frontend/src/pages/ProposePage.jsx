import React from 'react'
import { Proposes } from '../features/propose/components/Proposes.jsx'
import { Navbar } from '../features/navigation/components/Navbar'
import {Footer} from '../features/footer/Footer'

export const ProposePage = () => {
  return (
    <>
    <Navbar/>
    <Proposes/>
    <Footer/>
    </>
  )
}
