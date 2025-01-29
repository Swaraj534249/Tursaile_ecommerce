import {axiosi} from '../../config/axios'


export const createCrew=async(order)=>{
    try {
        const res=await axiosi.post("/crews",order)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getCrewByUserId=async(id)=>{
    try {
        const res=await axiosi.get(`/crews/user/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getCrewByRank=async(rank)=>{
    try {        
        const res=await axiosi.get(`/crews/rank/${rank}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getAllCrews=async()=>{
    try {
        const res=await axiosi.get(`/crews`)               
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateCrewById=async(update)=>{
    try {
        const res=await axiosi.patch(`/crews/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}