import axios from "axios";
import { useState } from "react";

export const useLoginAdmin = () => {


     let admin:Record<string,any> | null = null
     let error:string | null = null
  const loginAdmin = async (email:string,password:string) =>{
          
          await axios.post("http://localhost:5000/admin/login",{email,password})
          .then((res)=>{
              localStorage.setItem("admin",JSON.stringify(res.data.admin))
           admin = res.data?.admin
          })
          .catch((err)=>{
            error = err.response.data.error
          })
          
          return {admin,error}
        }
        return {loginAdmin}
};


export default useLoginAdmin