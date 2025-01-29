import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCrewsAsync, resetCrewUpdateStatus, selectCrewUpdateStatus, selectCrews, updateCrewByIdAsync } from '../../crew/CrewSlice'
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


export const Crews = () => {

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const crews=useSelector(selectCrews)
  const [editIndex,setEditIndex]=useState(-1)
  const crewUpdateStatus=useSelector(selectCrewUpdateStatus)
  const theme=useTheme()
  const is1620=useMediaQuery(theme.breakpoints.down(1620))
  const is1200=useMediaQuery(theme.breakpoints.down(1200))
  const is820=useMediaQuery(theme.breakpoints.down(820))
  const is480=useMediaQuery(theme.breakpoints.down(480))

  const {register,handleSubmit,formState: { errors },} = useForm()

  useEffect(()=>{
    dispatch(getAllCrewsAsync())
  },[dispatch])


  useEffect(()=>{
    if(crewUpdateStatus==='fulfilled'){
      toast.success("Status udpated")
    }
    else if(crewUpdateStatus==='rejected'){
      toast.error("Error updating crew status")
    }
  },[crewUpdateStatus])

  useEffect(()=>{
    return ()=>{
      dispatch(resetCrewUpdateStatus())
    }
  },[])


  const handleUpdateCrew=(data)=>{
    const update={...data,_id:crews[editIndex]._id}
    setEditIndex(-1)
    dispatch(updateCrewByIdAsync(update))
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

      <Stack mt={5} mb={3} component={'form'} noValidate onSubmit={handleSubmit(handleUpdateCrew)}>

        {
          crews.length?
          <TableContainer sx={{width:is1620?"95vw":"auto",overflowX:'auto'}} component={Paper} elevation={2}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell >Crew Name</TableCell>
                  <TableCell >Crew Details</TableCell>
                  <TableCell >Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {
                crews.length && crews.map((crew,index) => (

                  <TableRow key={crew._id} sx={{ '&:last-child td, &:last-child th': { bcrew: 0 } }}>
                    <TableCell component="th" scope="row">{index+1}</TableCell>
                    <TableCell >{crew.name}<br />
                    {crew.indosno}<br />
                    {crew.passport}<br />
                    {crew.mobile}<br />
                    {crew.email}<br />
                    </TableCell>
                    <TableCell >{crew.rankname}<br />
                    {crew.cdc}<br />
                    {crew.coc}<br />
                    </TableCell>
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
                      {/* <IconButton onClick={()=>navigate(`/vessels/${crew._id}`)} title='Vessels'><DirectionsBoatFilledOutlinedIcon/></IconButton> */}

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
                <Typography textAlign={'center'} alignSelf={'center'} variant='h6' fontWeight={400}>There are no crews currently</Typography>
            </Stack>
              

          </Stack>  
        }
    
    </Stack>
    
    </Stack>
  )
}
