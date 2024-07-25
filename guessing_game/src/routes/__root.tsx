import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect, useState } from "react";
import App from '../App';
import InputComponent from "../components/InputName";
import RulesModal from "../components/RulesModal";

export const Route = createRootRoute ({
  component:RootComponent

})

  export default function RootComponent(){
    const[showNameInput,setShowNameInput]=useState(false)
    const[showRules,setShowRules]=useState(false)
    const[,setUserName]=useState('')
  
    useEffect(()=>{
      const hasShownRules=localStorage.getItem('hasShownRules')
      if(!hasShownRules){
        setShowRules(true)
      }
    },[])
  
    const handleClose=()=>{
      setShowRules(false)
      setShowNameInput(true)
      localStorage.setItem('hasShownRules','true')
    }

    const handleNameSubmit=(name:string)=>{
      setUserName(name)
      setShowNameInput(false)
    }

    if(showRules){
      return <RulesModal onClose={handleClose}/>
    }

    if(showNameInput){
      return <InputComponent onSubmit={handleNameSubmit}/>
    }
    
    return(
    <>
        <App/>
        <TanStackRouterDevtools />
    </>
    )
  }