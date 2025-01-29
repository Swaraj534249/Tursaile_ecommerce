import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRankAsync, resetRankUpdateStatus, selectRankUpdateStatus, selectRank, updateRankByIdAsync } from '../../rank/RankSlice'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Chip, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DirectionsBoatFilledOutlinedIcon from '@mui/icons-material/DirectionsBoatFilledOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import {noOrdersAnimation} from '../../../assets/index'
import Lottie from 'lottie-react'


export const Ranks = () => {

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const rank=useSelector(selectRank)
  const [editIndex,setEditIndex]=useState(-1)
  const rankUpdateStatus=useSelector(selectRankUpdateStatus)
  const theme=useTheme()
  const is1620=useMediaQuery(theme.breakpoints.down(1620))
  const is1200=useMediaQuery(theme.breakpoints.down(1200))
  const is820=useMediaQuery(theme.breakpoints.down(820))
  const is480=useMediaQuery(theme.breakpoints.down(480))

  const {register,handleSubmit,formState: { errors },} = useForm()

  useEffect(()=>{
    dispatch(getAllRankAsync())
  },[dispatch])


  useEffect(()=>{
    if(rankUpdateStatus==='fulfilled'){
      toast.success("Status udpated")
    }
    else if(rankUpdateStatus==='rejected'){
      toast.error("Error updating rank status")
    }
  },[rankUpdateStatus])

  useEffect(()=>{
    return ()=>{
      dispatch(resetRankUpdateStatus())
    }
  },[])


  const handleUpdateRank=(data)=>{
    const update={...data,_id:rank[editIndex]._id}
    setEditIndex(-1)
    dispatch(updateRankByIdAsync(update))
  }


  const editOptions=['Pending','Dispatched','Out for delivery','Delivered','Cancelled']

  const getStatusColor=(status)=>{
    if(status==='Pending'){
      return {bgcolor:'#dfc9f7',color:'#7c59a4'}
    }
    else if(status==='Dispatched'){
      return {bgcolor:'#feed80',color:'#927b1e'}
    }
    else if(status==='Out for delivery'){
      return {bgcolor:'#AACCFF',color:'#4793AA'}
    }
    else if(status==='Delivered'){
      return {bgcolor:"#b3f5ca",color:"#548c6a"}
    }
    else if(status==='Cancelled'){
      return {bgcolor:"#fac0c0",color:'#cc6d72'}
    }
  }


  return (

    <Stack justifyContent={'center'} alignItems={'center'}>

      <Stack mt={5} mb={3} component={'form'} noValidate onSubmit={handleSubmit(handleUpdateRank)}>

        {
          rank.length?
          <TableContainer sx={{width:is1620?"95vw":"auto",overflowX:'auto'}} component={Paper} elevation={2}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell >Rank Name</TableCell>
                  <TableCell >Rank Type</TableCell>
                  <TableCell >Category / Sub Category</TableCell>
                  <TableCell >Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {
                rank.length && rank.map((rank,index) => (

                  <TableRow key={rank._id} sx={{ '&:last-child td, &:last-child th': { brank: 0 } }}>
                    <TableCell component="th" scope="row">{index+1}</TableCell>
                    <TableCell >{rank.rankname}</TableCell>
                    <TableCell >{rank.type}</TableCell>
                    <TableCell >{rank.catagory}<br />
                    {rank.subcategory}</TableCell>
                    <TableCell >

                      {
                        editIndex===index?(
                          <Button>

                            <IconButton type='submit'><CheckCircleOutlinedIcon/></IconButton>
                          </Button>
                        )
                        :
                        <IconButton onClick={()=>setEditIndex(index)}><EditOutlinedIcon/></IconButton>
                      }
                      {/* <IconButton onClick={()=>navigate(`/vessels/${rank._id}`)} title='Vessels'><DirectionsBoatFilledOutlinedIcon/></IconButton> */}

                    </TableCell>

                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
          :
          <Stack width={is480?"auto":'30rem'} justifyContent={'center'}>

            <Stack rowGap={'1rem'}>
                <Lottie animationData={noOrdersAnimation}/>
                <Typography textAlign={'center'} alignSelf={'center'} variant='h6' fontWeight={400}>There are no rank currently</Typography>
            </Stack>
              

          </Stack>  
        }
    
    </Stack>
    
    </Stack>
  )
}
