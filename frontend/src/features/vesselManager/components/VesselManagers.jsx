import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVesselManagersAsync, resetVesselManagerUpdateStatus, selectVesselManagerUpdateStatus, selectVesselManagers, updateVesselManagerByIdAsync } from '../VesselManagerSlice'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Chip, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import {noOrdersAnimation} from '../../../assets/index'
import Lottie from 'lottie-react'


export const VesselManagers = () => {

  const dispatch=useDispatch()
  const vesselManagers=useSelector(selectVesselManagers)
  const [editIndex,setEditIndex]=useState(-1)
  const vesselManagerUpdateStatus=useSelector(selectVesselManagerUpdateStatus)
  const theme=useTheme()
  const is1620=useMediaQuery(theme.breakpoints.down(1620))
  const is1200=useMediaQuery(theme.breakpoints.down(1200))
  const is820=useMediaQuery(theme.breakpoints.down(820))
  const is480=useMediaQuery(theme.breakpoints.down(480))

  const {register,handleSubmit,formState: { errors },} = useForm()

  useEffect(()=>{
    dispatch(getAllVesselManagersAsync())
  },[dispatch])


  useEffect(()=>{
    if(vesselManagerUpdateStatus==='fulfilled'){
      toast.success("Status udpated")
    }
    else if(vesselManagerUpdateStatus==='rejected'){
      toast.error("Error updating vesselManager status")
    }
  },[vesselManagerUpdateStatus])

  useEffect(()=>{
    return ()=>{
      dispatch(resetVesselManagerUpdateStatus())
    }
  },[])


  const handleUpdateVesselManager=(data)=>{
    const update={...data,_id:vesselManagers[editIndex]._id}
    setEditIndex(-1)
    dispatch(updateVesselManagerByIdAsync(update))
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

      <Stack mt={5} mb={3} component={'form'} noValidate onSubmit={handleSubmit(handleUpdateVesselManager)}>

        {
          vesselManagers.length?
          <TableContainer sx={{width:is1620?"95vw":"auto",overflowX:'auto'}} component={Paper} elevation={2}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell >Manager Name</TableCell>
                  <TableCell >Contact Person</TableCell>
                  {/* <TableCell >Actions</TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody>

                {
                vesselManagers.length && vesselManagers.map((vesselManager,index) => (

                  <TableRow key={vesselManager._id} sx={{ '&:last-child td, &:last-child th': { bvesselManager: 0 } }}>
                    <TableCell component="th" scope="row">{index+1}</TableCell>
                    <TableCell >{vesselManager.managerShortName} <br />
                    {vesselManager.managerName}</TableCell>
                    <TableCell >{vesselManager.title}  {vesselManager.personName}<br />
                    {vesselManager.phoneno}<br />
                    {vesselManager.email}<br />
                    {vesselManager.address}<br />
                    {vesselManager.country}<br />
                    </TableCell>
                    {/* <TableCell >
                      {
                        editIndex===index?(
                          <Button>
                            <IconButton type='submit'><CheckCircleOutlinedIcon/></IconButton>
                          </Button>
                        )
                        :
                        <IconButton onClick={()=>setEditIndex(index)}><EditOutlinedIcon/></IconButton>
                      }
                    </TableCell> */}

                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
          :
          <Stack width={is480?"auto":'30rem'} justifyContent={'center'}>

            <Stack rowGap={'1rem'}>
                <Lottie animationData={noOrdersAnimation}/>
                <Typography textAlign={'center'} alignSelf={'center'} variant='h6' fontWeight={400}>There are no vesselManagers currently</Typography>
            </Stack>
              

          </Stack>  
        }
    
    </Stack>
    
    </Stack>
  )
}
