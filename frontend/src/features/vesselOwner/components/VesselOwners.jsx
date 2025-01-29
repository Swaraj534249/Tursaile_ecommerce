import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVesselOwnersAsync, resetVesselOwnerUpdateStatus, selectVesselOwnerUpdateStatus, selectVesselOwners, updateVesselOwnerByIdAsync } from '../../vesselOwner/VesselOwnerSlice'
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


export const VesselOwners = () => {

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const vesselOwners=useSelector(selectVesselOwners)
  const [editIndex,setEditIndex]=useState(-1)
  const vesselOwnerUpdateStatus=useSelector(selectVesselOwnerUpdateStatus)
  const theme=useTheme()
  const is1620=useMediaQuery(theme.breakpoints.down(1620))
  const is1200=useMediaQuery(theme.breakpoints.down(1200))
  const is820=useMediaQuery(theme.breakpoints.down(820))
  const is480=useMediaQuery(theme.breakpoints.down(480))

  const {register,handleSubmit,formState: { errors },} = useForm()

  useEffect(()=>{
    dispatch(getAllVesselOwnersAsync())
  },[dispatch])


  useEffect(()=>{
    if(vesselOwnerUpdateStatus==='fulfilled'){
      toast.success("Status udpated")
    }
    else if(vesselOwnerUpdateStatus==='rejected'){
      toast.error("Error updating vesselOwner status")
    }
  },[vesselOwnerUpdateStatus])

  useEffect(()=>{
    return ()=>{
      dispatch(resetVesselOwnerUpdateStatus())
    }
  },[])


  const handleUpdateVesselOwner=(data)=>{
    const update={...data,_id:vesselOwners[editIndex]._id}
    setEditIndex(-1)
    dispatch(updateVesselOwnerByIdAsync(update))
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

      <Stack mt={5} mb={3} component={'form'} noValidate onSubmit={handleSubmit(handleUpdateVesselOwner)}>

        {
          vesselOwners.length?
          <TableContainer sx={{width:is1620?"95vw":"auto",overflowX:'auto'}} component={Paper} elevation={2}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell >Owner Name</TableCell>
                  <TableCell >Contact Person</TableCell>
                  <TableCell >Crewing Team</TableCell>
                  <TableCell >Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {
                vesselOwners.length && vesselOwners.map((vesselOwner,index) => (

                  <TableRow key={vesselOwner._id} sx={{ '&:last-child td, &:last-child th': { bvesselOwner: 0 } }}>
                    <TableCell component="th" scope="row">{index+1}</TableCell>
                    <TableCell >{vesselOwner.company_shortname} <br />
                    {vesselOwner.company_name}</TableCell>
                    <TableCell >{vesselOwner.cperson_prefix}  {vesselOwner.contactperson}<br />
                    {vesselOwner.phoneno}<br />
                    {vesselOwner.email}<br />
                    {vesselOwner.address}<br />
                    </TableCell>
                    <TableCell >{vesselOwner.crewing_department1}  {vesselOwner.crewing_department11}<br />
                    {vesselOwner.phonecrewing_department1}<br />
                    {vesselOwner.crewemail1}<br />
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
                      <IconButton onClick={()=>navigate(`/vessels/${vesselOwner._id}`)} title='Vessels'><DirectionsBoatFilledOutlinedIcon/></IconButton>

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
                <Typography textAlign={'center'} alignSelf={'center'} variant='h6' fontWeight={400}>There are no vesselOwners currently</Typography>
            </Stack>
              

          </Stack>  
        }
    
    </Stack>
    
    </Stack>
  )
}
