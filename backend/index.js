require("dotenv").config()
const express=require('express')
const cors=require('cors')
const morgan=require("morgan")
const cookieParser=require("cookie-parser")
const authRoutes=require("./routes/Auth")
const userRoutes=require("./routes/User")
const vesselOwnerRoutes=require("./routes/VesselOwner")
const vesselManagerRoutes=require("./routes/VesselManager")
const vesselRoutes=require("./routes/Vessel")
const rankRoutes=require("./routes/Rank")
const crewRoutes=require("./routes/Crew")
const crewingAgentRoutes=require("./routes/CrewingAgent")
const proposeRoutes=require("./routes/Propose")
const { connectToDB } = require("./database/db")


// server init
const server=express()

// database connection
connectToDB()


// middlewares
server.use(cors({origin:process.env.ORIGIN,credentials:true,exposedHeaders:['X-Total-Count'],methods:['GET','POST','PATCH','DELETE']}))
server.use(express.json())
server.use(cookieParser())
server.use(morgan("tiny"))

// routeMiddleware
server.use("/auth",authRoutes)
server.use("/users",userRoutes)
server.use("/vesselOwners",vesselOwnerRoutes)
server.use("/vesselManagers",vesselManagerRoutes)
server.use("/vessels",vesselRoutes)
server.use("/rank",rankRoutes)
server.use("/crews",crewRoutes)
server.use("/crewingAgents",crewingAgentRoutes)
server.use("/proposes",proposeRoutes)



server.get("/",(req,res)=>{
    res.status(200).json({message:'running'})
})

server.listen(8000,()=>{
    console.log('server [STARTED] ~ http://localhost:8000');
})