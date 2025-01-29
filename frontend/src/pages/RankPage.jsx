import React from 'react'
import { Ranks } from '../features/rank/components/Ranks'
import { Navbar } from '../features/navigation/components/Navbar'
import {Footer} from '../features/footer/Footer'

export const RankPage = () => {
  return (
    <>
    <Navbar/>
    <Ranks/>
    <Footer/>
    </>
  )
}
