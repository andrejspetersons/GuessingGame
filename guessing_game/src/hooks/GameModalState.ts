import { useState } from "react"

export const useModalState=()=>{

    const[isVictoryModalOpen,setIsVictoryModalOpen]=useState(false)
    const[isLooseModalOpen,setIsLooseModalOpen]=useState(false)

    const showVictoryModal=()=>setIsVictoryModalOpen(true)
    const showLooseModal=()=>setIsLooseModalOpen(true)
    const closeModal=()=>{
        setIsVictoryModalOpen(false)
        setIsLooseModalOpen(false)
    }

    return{
        isVictoryModalOpen,
        isLooseModalOpen,
        showVictoryModal,
        showLooseModal,
        closeModal

    }
}