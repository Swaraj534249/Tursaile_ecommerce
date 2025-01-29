import {axiosi} from '../../config/axios'


export const createPropose=async(propose)=>{
    try {        
        const res=await axiosi.post("/proposes",propose, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        // console.log(res.data);
        
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getProposeById=async(id)=>{
    try {
        const res=await axiosi.get(`/proposes/form1/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

// export const getProposeByForm1=async(fileName)=>{
//     try {
//         const res=await axiosi.get(`/proposes/${fileName}`)
//         return res.data
//     } catch (error) {
//         throw error.response.data
//     }
// }

export const getProposeByForm1 = async (fileName) => {
    try {
      const res = await axiosi.get(`/proposes/form1/${fileName}`);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }

export const getAllProposes=async()=>{
    try {
        const res=await axiosi.get(`/proposes`)               
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateProposeById=async(update)=>{
    try {
        const res=await axiosi.patch(`/proposes/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}