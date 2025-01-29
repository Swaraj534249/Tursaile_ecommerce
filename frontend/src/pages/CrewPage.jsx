import React from 'react'
import { Crews } from '../features/crew/components/Crews'
import { Navbar } from '../features/navigation/components/Navbar'
import {Footer} from '../features/footer/Footer'

export const CrewPage = () => {
  return (
    <>
    <Navbar/>
    <Crews/>
    <Footer/>
    </>
  )
}
