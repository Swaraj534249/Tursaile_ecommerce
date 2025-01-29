import {axiosi} from '../../config/axios'


export const createVesselManager=async(order)=>{
    try {
        const res=await axiosi.post("/vesselManagers",order)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getVesselManagerByUserId=async(id)=>{
    try {
        const res=await axiosi.get(`/vesselManagers/user/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getAllVesselManagers=async()=>{
    try {
        const res=await axiosi.get(`/vesselManagers`)
        console.log(res.data);
               
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateVesselManagerById=async(update)=>{
    try {
        const res=await axiosi.patch(`/vesselManagers/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}