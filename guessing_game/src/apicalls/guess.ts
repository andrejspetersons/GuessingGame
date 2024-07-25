import axios from "axios";


const config = {
    headers: {
      "Content-Type":"application/json",
    }
  };
export async function makeGuess(number:string):Promise<{countM:number,countP:number}>{
    try{
      console.log(JSON.stringify(number))
      const response=await axios.post("http://localhost:5000/api/number",{number},config)
    return response.data
    }catch(error){
        console.error("Error cause function makeGuess",error)
        throw error
    }
}

export async function resetNumber():Promise<void>{
  try{
    await axios.post("http://localhost:5000/reset",config)
  }
  catch(error){
    console.error("Error cause function resetNumber",error)
    throw error
  }
}

export async function getNumber():Promise<number>{
  try{
    const response=await axios.get("http://localhost:5000/number")
    return response.data
  }
  catch(error){
    console.error("Error cause function getNumber",error)
    throw error
  }
}
