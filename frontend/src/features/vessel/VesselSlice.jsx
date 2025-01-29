import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { createVessel, fetchVesselByVesselOwnerId, getAllVessels, getVesselByUserId, updateVesselById } from './VesselApi'


const initialState={
    status:"idle",
    vesselUpdateStatus:"idle",
    vesselFetchStatus:"idle",
    vessels:[],
    currentVessel:null,
    errors:null,
    successMessage:null
}

export const createVesselAsync=createAsyncThunk("vessels/createVesselAsync",async(vessel)=>{
    const createdVessel=await createVessel(vessel)
    return createdVessel
})

export const getAllVesselsAsync=createAsyncThunk("vessels/getAllVesselsAsync",async()=>{
    const vessels=await getAllVessels()
    return vessels
})

export const getVesselByUserIdAsync=createAsyncThunk("vessels/getVesselByUserIdAsync",async(id)=>{
    const vessels=await getVesselByUserId(id)
    return vessels
})

export const fetchVesselByVesselOwnerIdAsync=createAsyncThunk("vessels/fetchVesselByVesselOwnerIdAsync",async(id)=>{
    const vessels=await fetchVesselByVesselOwnerId(id)    
    return vessels
})

export const updateVesselByIdAsync=createAsyncThunk("vessels/updateVesselByIdAsync",async(update)=>{
    const updatedVessel=await updateVesselById(update)
    return updatedVessel
})

const vesselSlice=createSlice({
    name:'vesselSlice',
    initialState:initialState,
    reducers:{
        resetCurrentVessel:(state)=>{
            state.currentVessel=null
        },
        resetVesselUpdateStatus:(state)=>{
            state.vesselUpdateStatus='idle'
        },
        resetVesselFetchStatus:(state)=>{
            state.vesselFetchStatus='idle'
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(createVesselAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(createVesselAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.vessels.push(action.payload)
                state.currentVessel=action.payload
            })
            .addCase(createVesselAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(getAllVesselsAsync.pending,(state)=>{
                state.vesselFetchStatus='pending'
            })
            .addCase(getAllVesselsAsync.fulfilled,(state,action)=>{
                state.vesselFetchStatus='fulfilled'
                state.vessels=action.payload
            })
            .addCase(getAllVesselsAsync.rejected,(state,action)=>{
                state.vesselFetchStatus='rejected'
                state.errors=action.error
            })

            .addCase(getVesselByUserIdAsync.pending,(state)=>{
                state.vesselFetchStatus='pending'
            })
            .addCase(getVesselByUserIdAsync.fulfilled,(state,action)=>{
                state.vesselFetchStatus='fulfilled'
                state.vessels=action.payload
            })
            .addCase(getVesselByUserIdAsync.rejected,(state,action)=>{
                state.vesselFetchStatus='rejected'
                state.errors=action.error
            })

            
            .addCase(fetchVesselByVesselOwnerIdAsync.pending,(state)=>{
                state.vesselFetchStatus='pending'
            })
            .addCase(fetchVesselByVesselOwnerIdAsync.fulfilled,(state,action)=>{
                state.vesselFetchStatus='fulfilled'
                state.vessels=action.payload
            })
            .addCase(fetchVesselByVesselOwnerIdAsync.rejected,(state,action)=>{
                state.vesselFetchStatus='rejected'
                state.errors=action.error
            })

            .addCase(updateVesselByIdAsync.pending,(state)=>{
                state.vesselUpdateStatus='pending'
            })
            .addCase(updateVesselByIdAsync.fulfilled,(state,action)=>{
                state.vesselUpdateStatus='fulfilled'
                const index=state.vessels.findIndex((vessel)=>vessel._id===action.payload._id)
                state.vessels[index]=action.payload
            })
            .addCase(updateVesselByIdAsync.rejected,(state,action)=>{
                state.vesselUpdateStatus='rejected'
                state.errors=action.error
            })
    }
})

// exporting reducers
export const {resetCurrentVessel,resetVesselUpdateStatus,resetVesselFetchStatus}=vesselSlice.actions

// exporting selectors
export const selectVesselStatus=(state)=>state.VesselSlice.status
export const selectVessels=(state)=>state.VesselSlice.vessels
export const selectVesselsErrors=(state)=>state.VesselSlice.errors
export const selectVesselsSuccessMessage=(state)=>state.VesselSlice.successMessage
export const selectCurrentVessel=(state)=>state.VesselSlice.currentVessel
export const selectVesselUpdateStatus=(state)=>state.VesselSlice.vesselUpdateStatus
export const selectVesselFetchStatus=(state)=>state.VesselSlice.vesselFetchStatus
export const selectedVesselStatus=(state)=>state.VesselSlice.selectedVessel

export default vesselSlice.reducer