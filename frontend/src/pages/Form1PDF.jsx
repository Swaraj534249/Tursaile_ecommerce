import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProposeByForm1Async, selectSelectedFilename } from '../features/propose/ProposeSlice'
import { useParams } from 'react-router-dom'

export const Form1PDF = () => {
    
    const {fileName}=useParams()

    const dispatch=useDispatch()
    const seletedFileName=useSelector(selectSelectedFilename)

    useEffect(()=>{
        if(fileName){
            dispatch(getProposeByForm1Async(fileName))
        }
    },[fileName])

    console.log(fileName);
    console.log(seletedFileName);
    

  return (
    <>
    <a href={`/form1/${fileName}`} download> Download PDF </a>
    </>
  )
}
