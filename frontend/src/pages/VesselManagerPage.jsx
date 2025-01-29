import React from 'react'
import { VesselManagers } from '../features/vesselManager/components/VesselManagers'
import { Navbar } from '../features/navigation/components/Navbar'
import {Footer} from '../features/footer/Footer'

export const VesselManagerPage = () => {
  return (
    <>
    <Navbar/>
    <VesselManagers/>
    <Footer/>
    </>
  )
}
