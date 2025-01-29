import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { createPropose, getAllProposes, getProposeByForm1, getProposeById, updateProposeById } from './ProposeApi'


const initialState={
    proposeAddStatus:"idle",
    proposeUpdateStatus:"idle",
    proposeFetchStatus:"idle",
    proposes:[],
    currentPropose:null,
    selectedPropose:null,
    selectedFilename:null,
    errors:null,
    successMessage:null
}

export const createProposeAsync=createAsyncThunk("proposes/createProposeAsync",async(propose)=>{
    const createdPropose=await createPropose(propose)
    return createdPropose
})

export const getAllProposesAsync=createAsyncThunk("proposes/getAllProposesAsync",async()=>{
    const proposes=await getAllProposes()
    return proposes
})

export const getProposeByIdAsync=createAsyncThunk("proposes/getProposeByIdAsync",async(id)=>{
    const selectedPropose=await getProposeById(id)    
    return selectedPropose
})

export const getProposeByForm1Async=createAsyncThunk("proposes/getProposeByForm1Async",async(fileName)=>{
    const selectedFilename=await getProposeByForm1(fileName)
    // console.log(selectedFilename);    
    return selectedFilename
})

export const updateProposeByIdAsync=createAsyncThunk("proposes/updateProposeByIdAsync",async(update)=>{
    const updatedPropose=await updateProposeById(update)
    return updatedPropose
})

const proposeSlice=createSlice({
    name:'proposeSlice',
    initialState:initialState,
    reducers:{
        resetCurrentPropose:(state)=>{
            state.currentPropose=null
        },
        resetProposeUpdateStatus:(state)=>{
            state.proposeUpdateStatus='idle'
        },
        resetProposeFetchStatus:(state)=>{
            state.proposeFetchStatus='idle'
        },
        resetProposeAddStatus:(state)=>{
            state.proposeAddStatus='idle'
        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(createProposeAsync.pending,(state)=>{
                state.proposeAddStatus='pending'
            })
            .addCase(createProposeAsync.fulfilled,(state,action)=>{
                state.proposeAddStatus='fulfilled'
                state.proposes.push(action.payload)
                state.currentPropose=action.payload
            })
            .addCase(createProposeAsync.rejected,(state,action)=>{
                state.proposeAddStatus='rejected'
                state.errors=action.error
            })

            .addCase(getAllProposesAsync.pending,(state)=>{
                state.proposeFetchStatus='pending'
            })
            .addCase(getAllProposesAsync.fulfilled,(state,action)=>{
                state.proposeFetchStatus='fulfilled'
                state.proposes=action.payload
            })
            .addCase(getAllProposesAsync.rejected,(state,action)=>{
                state.proposeFetchStatus='rejected'
                state.errors=action.error
            })

            .addCase(getProposeByIdAsync.pending,(state)=>{
                state.proposeFetchStatus='pending'
            })
            .addCase(getProposeByIdAsync.fulfilled,(state,action)=>{
                state.proposeFetchStatus='fulfilled'
                state.selectedPropose=action.payload
            })
            .addCase(getProposeByIdAsync.rejected,(state,action)=>{
                state.proposeFetchStatus='rejected'
                state.errors=action.error
            })

            .addCase(getProposeByForm1Async.pending,(state)=>{
                state.proposeFetchStatus='pending'
            })
            .addCase(getProposeByForm1Async.fulfilled,(state,action)=>{
                state.proposeFetchStatus='fulfilled'
                state.selectedFilename=action.payload
            })
            .addCase(getProposeByForm1Async.rejected,(state,action)=>{
                state.proposeFetchStatus='rejected'
                state.errors=action.error
            })

            .addCase(updateProposeByIdAsync.pending,(state)=>{
                state.proposeUpdateStatus='pending'
            })
            .addCase(updateProposeByIdAsync.fulfilled,(state,action)=>{
                state.proposeUpdateStatus='fulfilled'
                const index=state.proposes.findIndex((propose)=>propose._id===action.payload._id)
                state.proposes[index]=action.payload
            })
            .addCase(updateProposeByIdAsync.rejected,(state,action)=>{
                state.proposeUpdateStatus='rejected'
                state.errors=action.error
            })
    }
})

// exporting selectors
export const selectProposeAddStatus=(state)=>state.ProposeSlice.proposeAddStatus
export const selectProposes=(state)=>state.ProposeSlice.proposes
export const selectProposesErrors=(state)=>state.ProposeSlice.errors
export const selectProposesSuccessMessage=(state)=>state.ProposeSlice.successMessage
export const selectCurrentPropose=(state)=>state.ProposeSlice.currentPropose
export const selectProposeUpdateStatus=(state)=>state.ProposeSlice.proposeUpdateStatus
export const selectProposeFetchStatus=(state)=>state.ProposeSlice.proposeFetchStatus
export const selectSelectedPropose=(state)=>state.ProposeSlice.selectedPropose
export const selectSelectedFilename=(state)=>state.ProposeSlice.selectedFilename

// exporting reducers
export const {resetCurrentPropose,resetProposeUpdateStatus,resetProposeFetchStatus,resetProposeAddStatus}=proposeSlice.actions

export default proposeSlice.reducer