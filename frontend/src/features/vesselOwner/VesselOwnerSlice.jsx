import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { createVesselOwner, getAllVesselOwners, getVesselOwnerByUserId, updateVesselOwnerById } from './VesselOwnerApi'


const initialState={
    status:"idle",
    vesselOwnerUpdateStatus:"idle",
    vesselOwnerFetchStatus:"idle",
    vesselOwners:[],
    currentVesselOwner:null,
    errors:null,
    successMessage:null
}

export const createVesselOwnerAsync=createAsyncThunk("vesselOwners/createVesselOwnerAsync",async(vesselOwner)=>{
    const createdVesselOwner=await createVesselOwner(vesselOwner)
    return createdVesselOwner
})

export const getAllVesselOwnersAsync=createAsyncThunk("vesselOwners/getAllVesselOwnersAsync",async()=>{
    const vesselOwners=await getAllVesselOwners()   
    return vesselOwners
})

export const getVesselOwnerByUserIdAsync=createAsyncThunk("vesselOwners/getVesselOwnerByUserIdAsync",async(id)=>{
    const selectedVesselOwners=await getVesselOwnerByUserId(id)
    return selectedVesselOwners
})

export const updateVesselOwnerByIdAsync=createAsyncThunk("vesselOwners/updateVesselOwnerByIdAsync",async(update)=>{
    const updatedVesselOwner=await updateVesselOwnerById(update)
    return updatedVesselOwner
})

const vesselOwnerSlice=createSlice({
    name:'vesselOwnerSlice',
    initialState:initialState,
    reducers:{
        resetCurrentVesselOwner:(state)=>{
            state.currentVesselOwner=null
        },
        resetVesselOwnerUpdateStatus:(state)=>{
            state.vesselOwnerUpdateStatus='idle'
        },
        resetVesselOwnerFetchStatus:(state)=>{
            state.vesselOwnerFetchStatus='idle'
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(createVesselOwnerAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(createVesselOwnerAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.vesselOwners.push(action.payload)
                state.currentVesselOwner=action.payload
            })
            .addCase(createVesselOwnerAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(getAllVesselOwnersAsync.pending,(state)=>{
                state.status='idle'
            })
            .addCase(getAllVesselOwnersAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.vesselOwners=action.payload
            })
            .addCase(getAllVesselOwnersAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(getVesselOwnerByUserIdAsync.pending,(state)=>{
                state.vesselOwnerFetchStatus='pending'
            })
            .addCase(getVesselOwnerByUserIdAsync.fulfilled,(state,action)=>{
                state.vesselOwnerFetchStatus='fulfilled'
                state.selectedVesselOwners=action.payload
            })
            .addCase(getVesselOwnerByUserIdAsync.rejected,(state,action)=>{
                state.vesselOwnerFetchStatus='rejected'
                state.errors=action.error
            })

            .addCase(updateVesselOwnerByIdAsync.pending,(state)=>{
                state.vesselOwnerUpdateStatus='pending'
            })
            .addCase(updateVesselOwnerByIdAsync.fulfilled,(state,action)=>{
                state.vesselOwnerUpdateStatus='fulfilled'
                const index=state.vesselOwners.findIndex((vesselOwner)=>vesselOwner._id===action.payload._id)
                state.vesselOwners[index]=action.payload
            })
            .addCase(updateVesselOwnerByIdAsync.rejected,(state,action)=>{
                state.vesselOwnerUpdateStatus='rejected'
                state.errors=action.error
            })
    }
})

// exporting reducers
export const {resetCurrentVesselOwner,resetVesselOwnerUpdateStatus,resetVesselOwnerFetchStatus}=vesselOwnerSlice.actions

// exporting selectors
export const selectVesselOwnerStatus=(state)=>state.VesselOwnerSlice.status
export const selectVesselOwners=(state)=>state.VesselOwnerSlice.vesselOwners
export const selectVesselOwnersErrors=(state)=>state.VesselOwnerSlice.errors
export const selectVesselOwnersSuccessMessage=(state)=>state.VesselOwnerSlice.successMessage
export const selectCurrentVesselOwner=(state)=>state.VesselOwnerSlice.currentVesselOwner
export const selectVesselOwnerUpdateStatus=(state)=>state.VesselOwnerSlice.vesselOwnerUpdateStatus
export const selectVesselOwnerFetchStatus=(state)=>state.VesselOwnerSlice.vesselOwnerFetchStatus
export const selectSelectedVesselOwners=(state)=>state.VesselOwnerSlice.selectedVesselOwners

export default vesselOwnerSlice.reducer