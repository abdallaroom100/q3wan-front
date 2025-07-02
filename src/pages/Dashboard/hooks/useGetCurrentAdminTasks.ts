import axios from "axios"
import { useEffect } from "react";



 export const useGetCurrentAdminTasks =  () =>{


     let adminToken:string ;
     try {
        if(JSON.parse(localStorage.getItem("admin") || "")?.token){
            adminToken = JSON.parse(localStorage.getItem("admin") || "").token
        }
        
     } catch (error) {
        console.log(error)
     }
      const getCurrentTasks = async () =>{
        await axios.get("http://localhost:5000/admin/tasks",{
            headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${adminToken}`
            }
        }).then((res)=>{
            console.log(res.data)
        })
      }

      useEffect(() => {
         getCurrentTasks()
      }, []);
 }