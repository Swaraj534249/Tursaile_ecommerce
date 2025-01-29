import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { createVesselManager, getAllVesselManagers, getVesselManagerByUserId, updateVesselManagerById } from './VesselManagerApi'


const initialState={
    status:"idle",
    vesselManagerUpdateStatus:"idle",
    vesselManagerFetchStatus:"idle",
    vesselManagers:[],
    currentVesselManager:null,
    errors:null,
    successMessage:null
}

export const createVesselManagerAsync=createAsyncThunk("vesselManagers/createVesselManagerAsync",async(vesselManager)=>{
    const createdVesselManager=await createVesselManager(vesselManager)
    return createdVesselManager
})

export const getAllVesselManagersAsync=createAsyncThunk("vesselManagers/getAllVesselManagersAsync",async()=>{
    const vesselManagers=await getAllVesselManagers()    
    return vesselManagers
})

export const getVesselManagerByUserIdAsync=createAsyncThunk("vesselManagers/getVesselManagerByUserIdAsync",async(id)=>{
    const vesselManagers=await getVesselManagerByUserId(id)
    return vesselManagers
})

export const updateVesselManagerByIdAsync=createAsyncThunk("vesselManagers/updateVesselManagerByIdAsync",async(update)=>{
    const updatedVesselManager=await updateVesselManagerById(update)
    return updatedVesselManager
})

const vesselManagerSlice=createSlice({
    name:'vesselManagerSlice',
    initialState:initialState,
    reducers:{
        resetCurrentVesselManager:(state)=>{
            state.currentVesselManager=null
        },
        resetVesselManagerUpdateStatus:(state)=>{
            state.vesselManagerUpdateStatus='idle'
        },
        resetVesselManagerFetchStatus:(state)=>{
            state.vesselManagerFetchStatus='idle'
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(createVesselManagerAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(createVesselManagerAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.vesselManagers.push(action.payload)
                state.currentVesselManager=action.payload
            })
            .addCase(createVesselManagerAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(getAllVesselManagersAsync.pending,(state)=>{
                state.vesselManagerFetchStatus='pending'
            })
            .addCase(getAllVesselManagersAsync.fulfilled,(state,action)=>{
                state.vesselManagerFetchStatus='fulfilled'
                state.vesselManagers=action.payload
            })
            .addCase(getAllVesselManagersAsync.rejected,(state,action)=>{
                state.vesselManagerFetchStatus='rejected'
                state.errors=action.error
            })

            .addCase(getVesselManagerByUserIdAsync.pending,(state)=>{
                state.vesselManagerFetchStatus='pending'
            })
            .addCase(getVesselManagerByUserIdAsync.fulfilled,(state,action)=>{
                state.vesselManagerFetchStatus='fulfilled'
                state.vesselManagers=action.payload
            })
            .addCase(getVesselManagerByUserIdAsync.rejected,(state,action)=>{
                state.vesselManagerFetchStatus='rejected'
                state.errors=action.error
            })

            .addCase(updateVesselManagerByIdAsync.pending,(state)=>{
                state.vesselManagerUpdateStatus='pending'
            })
            .addCase(updateVesselManagerByIdAsync.fulfilled,(state,action)=>{
                state.vesselManagerUpdateStatus='fulfilled'
                const index=state.vesselManagers.findIndex((vesselManager)=>vesselManager._id===action.payload._id)
                state.vesselManagers[index]=action.payload
            })
            .addCase(updateVesselManagerByIdAsync.rejected,(state,action)=>{
                state.vesselManagerUpdateStatus='rejected'
                state.errors=action.error
            })
    }
})

// exporting reducers
export const {resetCurrentVesselManager,resetVesselManagerUpdateStatus,resetVesselManagerFetchStatus}=vesselManagerSlice.actions

// exporting selectors
export const selectVesselManagerStatus=(state)=>state.VesselManagerSlice.status
export const selectVesselManagers=(state)=>state.VesselManagerSlice.vesselManagers
export const selectVesselManagersErrors=(state)=>state.VesselManagerSlice.errors
export const selectVesselManagersSuccessMessage=(state)=>state.VesselManagerSlice.successMessage
export const selectCurrentVesselManager=(state)=>state.VesselManagerSlice.currentVesselManager
export const selectVesselManagerUpdateStatus=(state)=>state.VesselManagerSlice.vesselManagerUpdateStatus
export const selectVesselManagerFetchStatus=(state)=>state.VesselManagerSlice.vesselManagerFetchStatus

export default vesselManagerSlice.reducer