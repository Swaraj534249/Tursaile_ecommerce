import {axiosi} from '../../config/axios'


export const createVessel=async(order)=>{
    try {
        const res=await axiosi.post("/vessels",order)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getVesselByUserId=async(id)=>{
    try {
        
        const res=await axiosi.get(`/vessels/user/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const fetchVesselByVesselOwnerId=async(id)=>{
    try {
        const res=await axiosi.get(`/vessels/vesselOwner/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getAllVessels=async()=>{
    try {
        const res=await axiosi.get(`/vessels`)
        console.log(res.data);
               
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateVesselById=async(update)=>{
    try {
        const res=await axiosi.patch(`/vessels/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}