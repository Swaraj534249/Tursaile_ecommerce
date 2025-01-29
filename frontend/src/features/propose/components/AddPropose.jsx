import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'
import { createProposeAsync, resetProposeAddStatus, selectProposeAddStatus, selectSelectedPropose, updateProposeByIdAsync } from '../../propose/ProposeSlice'
import { Button, FormControl, Input, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useForm, useWatch } from "react-hook-form"
import { selectVesselOwners } from '../../vesselOwner/VesselOwnerSlice'
import { selectCategories } from '../../categories/CategoriesSlice'
import { toast } from 'react-toastify'
import { fetchVesselByVesselOwnerIdAsync, selectVessels } from '../../vessel/VesselSlice'
import { selectRank } from '../../rank/RankSlice'
import { getCrewByRankAsync, selectCrews } from '../../crew/CrewSlice'
import { selectCrewingAgents } from '../../crewingAgent/CrewingAgentSlice'

export const AddPropose = () => {

    const {register,handleSubmit,reset,formState: { errors }} = useForm()    

    const [vesselOwner,setVesselOwner]=useState(null)
    const [rank,setRank]=useState(null)

    const dispatch=useDispatch()
    const vesselOwners=useSelector(selectVesselOwners)
    const vessels=useSelector(selectVessels)
    const ranks=useSelector(selectRank)
    const crews=useSelector(selectCrews)
    const crewingAgents=useSelector(selectCrewingAgents)
    const proposeAddStatus=useSelector(selectProposeAddStatus)
    const navigate=useNavigate()
    const theme=useTheme()
    const is1100=useMediaQuery(theme.breakpoints.down(1100))
    const is480=useMediaQuery(theme.breakpoints.down(480))    

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

    useEffect(()=>{    
        if(vesselOwner){
          dispatch(fetchVesselByVesselOwnerIdAsync(vesselOwner))
        }        
        if(rank){
            dispatch(getCrewByRankAsync(rank))
          }
    },[vesselOwner,rank])


    // const handleAddPropose=(data)=>{
    //     // const newPropose={...data}
    //     const newPropose = new FormData();

    //     // Add form fields to FormData
    //     for (const key in data) {
    //         if (key === "form1") {
    //             newPropose.append(key, data[key][0]); // Append file
    //         } else {
    //             newPropose.append(key, data[key]);
    //         }
    //     }

    //     dispatch(createProposeAsync(newPropose))
    // }

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
                {/* <Stack>
                    <Typography variant='h6' fontWeight={400} gutterBottom>Title</Typography>
                    <TextField {...register("title",{required:'Title is required'})}/>
                </Stack>  */}

                <Stack flexDirection={'row'} >
                    <FormControl fullWidth>
                        <InputLabel id="vessel-owner-selection">Vessel Owner</InputLabel>
                        <Select {...register("vesselOwner",{required:"Vessel Owner is required"})} labelId="vessel-owner-selection" label="Vessel Owner" 
                        onChange={(e)=>setVesselOwner(e.target.value)}
                         >
                            {
                                vesselOwners.map((vesselOwner)=>(
                                    <MenuItem value={vesselOwner._id}>{vesselOwner.company_name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="vessel-selection">Vessel</InputLabel>
                        <Select {...register("vessel",{required:"Vessel is required"})} labelId="vessel-selection" label="Vessel">
                            {
                                vessels.map((vessel)=>(
                                    <MenuItem value={vessel._id}>{vessel.vesselname}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Stack>

                <Stack flexDirection={'row'} >
                    <FormControl fullWidth>
                        <InputLabel id="rank-selection">Rank</InputLabel>
                        <Select {...register("rank",{required:"Rank is required"})} labelId="rank-selection" label="Rank" 
                        onChange={(e)=>setRank(e.target.value)}
                         >
                            {
                                ranks.map((rank)=>(
                                    <MenuItem value={rank.rankname}>{rank.rankname}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="crew-selection">Crew</InputLabel>
                        <Select {...register("crew",{required:"Vessel is required"})} labelId="crew-selection" label="Crew">
                            {
                                crews.map((crew)=>(
                                    <MenuItem value={crew._id}>{crew.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Stack>

                <Stack flexDirection={'row'} >
                    <FormControl fullWidth>
                        <InputLabel id="crew-agent-selection">Crew Agent</InputLabel>
                        <Select {...register("crewingAgent",{required:"Crew Agent is required"})} labelId="crew-agent-selection" label="Crew Agent" 
                         >
                            {
                                crewingAgents.map((crewingAgent)=>(
                                    <MenuItem value={crewingAgent._id}>{crewingAgent.agentName}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    
                </Stack>

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
                <Button size={is480?'medium':'large'} variant='contained' type='submit'>Add Propose</Button>
                <Button size={is480?'medium':'large'} variant='outlined' color='error' component={Link} to={'/admin/dashboard'}>Cancel</Button>
            </Stack>

        </Stack>

    </Stack>
  )
}
