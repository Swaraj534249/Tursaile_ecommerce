import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { createRank, getAllRank, getRankByUserId, updateRankById } from './RankApi'


const initialState={
    status:"idle",
    rankUpdateStatus:"idle",
    rankFetchStatus:"idle",
    rank:[],
    currentRank:null,
    errors:null,
    successMessage:null
}

export const createRankAsync=createAsyncThunk("rank/createRankAsync",async(rank)=>{
    const createdRank=await createRank(rank)
    return createdRank
})

export const getAllRankAsync=createAsyncThunk("rank/getAllRankAsync",async()=>{
    const rank=await getAllRank()
    return rank
})

export const getRankByUserIdAsync=createAsyncThunk("rank/getRankByUserIdAsync",async(id)=>{
    const rank=await getRankByUserId(id)
    return rank
})

export const updateRankByIdAsync=createAsyncThunk("rank/updateRankByIdAsync",async(update)=>{
    const updatedRank=await updateRankById(update)
    return updatedRank
})

const rankSlice=createSlice({
    name:'rankSlice',
    initialState:initialState,
    reducers:{
        resetCurrentRank:(state)=>{
            state.currentRank=null
        },
        resetRankUpdateStatus:(state)=>{
            state.rankUpdateStatus='idle'
        },
        resetRankFetchStatus:(state)=>{
            state.rankFetchStatus='idle'
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(createRankAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(createRankAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.rank.push(action.payload)
                state.currentRank=action.payload
            })
            .addCase(createRankAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(getAllRankAsync.pending,(state)=>{
                state.rankFetchStatus='pending'
            })
            .addCase(getAllRankAsync.fulfilled,(state,action)=>{
                state.rankFetchStatus='fulfilled'
                state.rank=action.payload
            })
            .addCase(getAllRankAsync.rejected,(state,action)=>{
                state.rankFetchStatus='rejected'
                state.errors=action.error
            })

            .addCase(getRankByUserIdAsync.pending,(state)=>{
                state.rankFetchStatus='pending'
            })
            .addCase(getRankByUserIdAsync.fulfilled,(state,action)=>{
                state.rankFetchStatus='fulfilled'
                state.rank=action.payload
            })
            .addCase(getRankByUserIdAsync.rejected,(state,action)=>{
                state.rankFetchStatus='rejected'
                state.errors=action.error
            })

            .addCase(updateRankByIdAsync.pending,(state)=>{
                state.rankUpdateStatus='pending'
            })
            .addCase(updateRankByIdAsync.fulfilled,(state,action)=>{
                state.rankUpdateStatus='fulfilled'
                const index=state.rank.findIndex((rank)=>rank._id===action.payload._id)
                state.rank[index]=action.payload
            })
            .addCase(updateRankByIdAsync.rejected,(state,action)=>{
                state.rankUpdateStatus='rejected'
                state.errors=action.error
            })
    }
})

// exporting reducers
export const {resetCurrentRank,resetRankUpdateStatus,resetRankFetchStatus}=rankSlice.actions

// exporting selectors
export const selectRankStatus=(state)=>state.RankSlice.status
export const selectRank=(state)=>state.RankSlice.rank
export const selectRankErrors=(state)=>state.RankSlice.errors
export const selectRankSuccessMessage=(state)=>state.RankSlice.successMessage
export const selectCurrentRank=(state)=>state.RankSlice.currentRank
export const selectRankUpdateStatus=(state)=>state.RankSlice.rankUpdateStatus
export const selectRankFetchStatus=(state)=>state.RankSlice.rankFetchStatus

export default rankSlice.reducer