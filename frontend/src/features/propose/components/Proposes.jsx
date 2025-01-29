import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProposesAsync, getProposeByForm1Async, resetProposeUpdateStatus, selectProposeUpdateStatus, selectProposes, updateProposeByIdAsync } from '../../propose/ProposeSlice'
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


export const Proposes = () => {

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const proposes=useSelector(selectProposes)
  const [editIndex,setEditIndex]=useState(-1)
  const proposeUpdateStatus=useSelector(selectProposeUpdateStatus)
  const theme=useTheme()
  const is1620=useMediaQuery(theme.breakpoints.down(1620))
  const is1200=useMediaQuery(theme.breakpoints.down(1200))
  const is820=useMediaQuery(theme.breakpoints.down(820))
  const is480=useMediaQuery(theme.breakpoints.down(480))
  

  const {register,handleSubmit,formState: { errors },} = useForm()

  useEffect(()=>{
    dispatch(getAllProposesAsync())
  },[dispatch])


  useEffect(()=>{
    if(proposeUpdateStatus==='fulfilled'){
      toast.success("Status udpated")
    }
    else if(proposeUpdateStatus==='rejected'){
      toast.error("Error updating propose status")
    }
  },[proposeUpdateStatus])

  useEffect(()=>{
    return ()=>{
      dispatch(resetProposeUpdateStatus())
    }
  },[])


  const handleUpdatePropose=(data)=>{
    const update={...data,_id:proposes[editIndex]._id}
    setEditIndex(-1)
    dispatch(updateProposeByIdAsync(update))
  }

  // const handleDownload=(form1)=>{
  //   if(form1){
  //     dispatch(getProposeByForm1Async(form1))
  //   }
  // }


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

      <Stack mt={5} mb={3} component={'form'} noValidate onSubmit={handleSubmit(handleUpdatePropose)}>

      <IconButton component={Link} to={"/add-propose"}>Add Proposal<EditOutlinedIcon/></IconButton>

        {
          proposes.length?
          <TableContainer sx={{width:is1620?"95vw":"auto",overflowX:'auto'}} component={Paper} elevation={2}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell >Vessel Details</TableCell>
                  <TableCell >Crew Details</TableCell>
                  <TableCell >Crewing Agent details</TableCell>
                  <TableCell >Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {
                proposes.length && proposes.map((propose,index) => (

                  <TableRow key={propose._id} sx={{ '&:last-child td, &:last-child th': { bpropose: 0 } }}>
                    <TableCell component="th" scope="row">{index+1}</TableCell>
                    <TableCell >{propose.vesselOwner.company_shortname} <br />
                    {propose.vessel.vesselname}</TableCell>
                    <TableCell >{propose.crew.name}<br />
                    Email : {propose.crew.email}<br />
                    Phone No. : {propose.crew.mobile}<br />
                    Indosno : {propose.crew.indosno}<br />
                    Passport : {propose.crew.passport}<br />
                    </TableCell>
                    <TableCell >{propose.crewingAgent.agentName}<br />
                    Email : {propose.crewingAgent.email}<br />
                    Phone No. : {propose.crewingAgent.contactNumber}<br />
                    </TableCell>
                    <TableCell >
                        <p>
                          Your browser does not support PDFs. Download the PDF to view it: 
                          <a href={propose.form1.filePath} target="_blank" rel="noopener noreferrer"> Form 1 Document </a>
                        </p>
                      <br/>
                      <IconButton onClick={()=>navigate(`/edit-propose/${propose._id}`)} title='Propose'><DirectionsBoatFilledOutlinedIcon/></IconButton>
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
                <Typography textAlign={'center'} alignSelf={'center'} variant='h6' fontWeight={400}>There are no proposes currently</Typography>
            </Stack>
              

          </Stack>  
        }
    
    </Stack>
    
    </Stack>
  )
}
