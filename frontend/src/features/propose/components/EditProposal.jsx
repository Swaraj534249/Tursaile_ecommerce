import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams} from 'react-router-dom'
import { createProposeAsync, getProposeByIdAsync, resetProposeAddStatus, selectProposeAddStatus, selectSelectedPropose, updateProposeByIdAsync } from '../../propose/ProposeSlice'
import { Button, FormControl, Input, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useForm, useWatch } from "react-hook-form"
import { toast } from 'react-toastify'


export const EditProposal = () => {

    const {register,handleSubmit,reset,formState: { errors }} = useForm()    

    const {id}=useParams()
    const [vesselOwner,setVesselOwner]=useState(null)
    const [rank,setRank]=useState(null)

    const dispatch=useDispatch()
    // const vesselOwners=useSelector(selectVesselOwners)
    // const vessels=useSelector(selectVessels)
    // const ranks=useSelector(selectRank)
    // const crews=useSelector(selectCrews)
    // const crewingAgents=useSelector(selectCrewingAgents)
    const selectedPropose=useSelector(selectSelectedPropose)
    const proposeAddStatus=useSelector(selectProposeAddStatus)
    const navigate=useNavigate()
    const theme=useTheme()
    const is1100=useMediaQuery(theme.breakpoints.down(1100))
    const is1620=useMediaQuery(theme.breakpoints.down(1620))
    const is1200=useMediaQuery(theme.breakpoints.down(1200))
    const is820=useMediaQuery(theme.breakpoints.down(820))
    const is480=useMediaQuery(theme.breakpoints.down(480))

    console.log(selectedPropose);
    

    useEffect(()=>{
            if(id){
                dispatch(getProposeByIdAsync(id))
            }
        },[id])

        useEffect(()=>{
            console.log(proposeAddStatus);
           if(proposeAddStatus==='fulfilled'){
               reset()
               toast.success("New Proposal added")
               navigate("/propose")
           }
           else if(proposeAddStatus==='rejected'){
               toast.error("Error adding Proposal, please try again later")
           }
       },[proposeAddStatus])

    useEffect(()=>{
        return ()=>{
            dispatch(resetProposeAddStatus())
        }
    },[])

    const handleAddPropose = (data) => {
        const formData = new FormData();
            for (const key in data) {
            if (key === "form1") {
                formData.append(key, data[key][0]);
            } else {
                formData.append(key, data[key]);
            }
        }
        dispatch(createProposeAsync(formData));

    };

    
  return (
    <Stack p={'0 16px'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'} >
        

        <Stack width={is1100?"100%":"60rem"} rowGap={4} mt={is480?4:6} mb={6} component={'form'} noValidate onSubmit={handleSubmit(handleAddPropose)}> 
            
            {/* feild area */}
            <Stack rowGap={3}>

            <TableContainer sx={{width:is1620?"95vw":"auto",overflowX:'auto'}} component={Paper} elevation={2}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell >Vessel Details</TableCell>
                  <TableCell >Crew Details</TableCell>
                  <TableCell >Crewing Agent details</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {
                // proposes.length && proposes.map((propose,index) => (
                    selectedPropose &&

                  <TableRow key={selectedPropose._id} sx={{ '&:last-child td, &:last-child th': { bselectedPropose: 0 } }}>
                    <TableCell >{selectedPropose.vesselOwner.company_shortname} <br />
                    {selectedPropose.vessel.vesselname}</TableCell>
                    <TableCell >{selectedPropose.crew.name}<br />
                    Email : {selectedPropose.crew.email}<br />
                    Phone No. : {selectedPropose.crew.mobile}<br />
                    Indosno : {selectedPropose.crew.indosno}<br />
                    Passport : {selectedPropose.crew.passport}<br />
                    </TableCell>
                    <TableCell >{selectedPropose.crewingAgent.agentName}<br />
                    Email : {selectedPropose.crewingAgent.email}<br />
                    Phone No. : {selectedPropose.crewingAgent.contactNumber}<br />
                    </TableCell>
                  </TableRow>
                // ))
                }

              </TableBody>
            </Table>
          </TableContainer>

                <Stack flexDirection={'row'}>
                    <FormControl fullWidth>
                        <InputLabel id="approval-selection">Approval</InputLabel>
                        <Select {...register("approval",{required:"Approval is required"})} labelId="approval-selection" label="Approval" >
                            <MenuItem value={'Approve'}>Approve</MenuItem>
                            <MenuItem value={'Not Approve'}>Not Approve</MenuItem>
                            <MenuItem value={'Correction'}>Correction</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <Button variant="contained" component="label"> Upload Form 1
                            <input type="file" hidden {...register("form1", { required: "Form 1 is required" })} />
                        </Button>
                    </FormControl>
                </Stack>
                
                <Stack>
                    <Typography variant='h6' fontWeight={400}  gutterBottom>Remark</Typography>
                    <TextField multiline rows={4} {...register("remark",{required:"Remark is required"})}/>
                </Stack>

            </Stack>

            {/* action area */}
            <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480?1:2}>
                <Button size={is480?'medium':'large'} variant='contained' type='submit'>Edit Propose</Button>
                <Button size={is480?'medium':'large'} variant='outlined' color='error' component={Link} to={'/admin/dashboard'}>Cancel</Button>
            </Stack>

        </Stack>

    </Stack>
  )
}
