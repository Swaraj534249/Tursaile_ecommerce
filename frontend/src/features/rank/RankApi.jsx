import {axiosi} from '../../config/axios'


export const createRank=async(order)=>{
    try {
        const res=await axiosi.post("/rank",order)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getRankByUserId=async(id)=>{
    try {
        const res=await axiosi.get(`/rank/user/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getAllRank=async()=>{
    try {
        const res=await axiosi.get(`/rank`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateRankById=async(update)=>{
    try {
        const res=await axiosi.patch(`/rank/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}