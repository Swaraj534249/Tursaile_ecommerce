import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { createCrew, getAllCrews, getCrewByRank, getCrewByUserId, updateCrewById } from './CrewApi'


const initialState={
    status:"idle",
    vrewUpdateStatus:"idle",
    vrewFetchStatus:"idle",
    crew:[],
    currentCrew:null,
    errors:null,
    successMessage:null
}

export const createCrewAsync=createAsyncThunk("crew/createCrewAsync",async(vrew)=>{
    const createdCrew=await createCrew(vrew)
    return createdCrew
})

export const getAllCrewsAsync=createAsyncThunk("crew/getAllCrewsAsync",async()=>{
    const crew=await getAllCrews()
    return crew
})

export const getCrewByUserIdAsync=createAsyncThunk("crew/getCrewByUserIdAsync",async(id)=>{
    const crew=await getCrewByUserId(id)
    return crew
})

export const getCrewByRankAsync=createAsyncThunk("crew/getCrewByRankAsync",async(rank)=>{
    const crew=await getCrewByRank(rank)    
    return crew
})

export const updateCrewByIdAsync=createAsyncThunk("crew/updateCrewByIdAsync",async(update)=>{
    const updatedCrew=await updateCrewById(update)
    return updatedCrew
})

const vrewSlice=createSlice({
    name:'vrewSlice',
    initialState:initialState,
    reducers:{
        resetCurrentCrew:(state)=>{
            state.currentCrew=null
        },
        resetCrewUpdateStatus:(state)=>{
            state.vrewUpdateStatus='idle'
        },
        resetCrewFetchStatus:(state)=>{
            state.vrewFetchStatus='idle'
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(createCrewAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(createCrewAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.crew.push(action.payload)
                state.currentCrew=action.payload
            })
            .addCase(createCrewAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(getAllCrewsAsync.pending,(state)=>{
                state.vrewFetchStatus='pending'
            })
            .addCase(getAllCrewsAsync.fulfilled,(state,action)=>{
                state.vrewFetchStatus='fulfilled'
                state.crew=action.payload
            })
            .addCase(getAllCrewsAsync.rejected,(state,action)=>{
                state.vrewFetchStatus='rejected'
                state.errors=action.error
            })

            .addCase(getCrewByUserIdAsync.pending,(state)=>{
                state.vrewFetchStatus='pending'
            })
            .addCase(getCrewByUserIdAsync.fulfilled,(state,action)=>{
                state.vrewFetchStatus='fulfilled'
                state.crew=action.payload
            })
            .addCase(getCrewByUserIdAsync.rejected,(state,action)=>{
                state.vrewFetchStatus='rejected'
                state.errors=action.error
            })

            .addCase(getCrewByRankAsync.pending,(state)=>{
                state.vrewFetchStatus='pending'
            })
            .addCase(getCrewByRankAsync.fulfilled,(state,action)=>{
                state.vrewFetchStatus='fulfilled'
                state.crew=action.payload
            })
            .addCase(getCrewByRankAsync.rejected,(state,action)=>{
                state.vrewFetchStatus='rejected'
                state.errors=action.error
            })

            .addCase(updateCrewByIdAsync.pending,(state)=>{
                state.vrewUpdateStatus='pending'
            })
            .addCase(updateCrewByIdAsync.fulfilled,(state,action)=>{
                state.vrewUpdateStatus='fulfilled'
                const index=state.crew.findIndex((vrew)=>vrew._id===action.payload._id)
                state.crew[index]=action.payload
            })
            .addCase(updateCrewByIdAsync.rejected,(state,action)=>{
                state.vrewUpdateStatus='rejected'
                state.errors=action.error
            })
    }
})

// exporting reducers
export const {resetCurrentCrew,resetCrewUpdateStatus,resetCrewFetchStatus}=vrewSlice.actions

// exporting selectors
export const selectCrewStatus=(state)=>state.CrewSlice.status
export const selectCrews=(state)=>state.CrewSlice.crew
export const selectCrewsErrors=(state)=>state.CrewSlice.errors
export const selectCrewsSuccessMessage=(state)=>state.CrewSlice.successMessage
export const selectCurrentCrew=(state)=>state.CrewSlice.currentCrew
export const selectCrewUpdateStatus=(state)=>state.CrewSlice.vrewUpdateStatus
export const selectCrewFetchStatus=(state)=>state.CrewSlice.vrewFetchStatus

export default vrewSlice.reducer