import {axiosi} from '../../config/axios'


export const createVesselOwner=async(order)=>{
    try {
        const res=await axiosi.post("/vesselOwners",order)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getVesselOwnerByUserId=async(id)=>{
    try {
        const res=await axiosi.get(`/vesselOwners/user/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getAllVesselOwners=async()=>{
    try {
        const res=await axiosi.get(`/vesselOwners`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateVesselOwnerById=async(update)=>{
    try {
        const res=await axiosi.patch(`/vesselOwners/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}