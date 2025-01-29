import React from 'react'
import { VesselOwners } from '../features/vesselOwner/components/VesselOwners'
import { Navbar } from '../features/navigation/components/Navbar'
import {Footer} from '../features/footer/Footer'

export const VesselOwnerPage = () => {
  return (
    <>
    <Navbar/>
    <VesselOwners/>
    <Footer/>
    </>
  )
}
