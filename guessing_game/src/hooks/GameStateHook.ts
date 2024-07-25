import { useEffect, useState } from "react";
import { GuessProps } from "../components/TryListComponent";

export function useGameState(){
    const [digits,setDigits]=useState(['','','',''])
    const [guessList,setGuessList]=useState<GuessProps[]>([])
    const [guessesMade,setGuessesMade] =useState(0)
    const [attempts,setAttempts]=useState(8)
    const [userName,setUserName]=useState('Untitled')

    useEffect(()=>{
        const currentGuesses=localStorage.getItem('guessesMade')
        const currentAttempts=localStorage.getItem('attemptsLeft')
        const name=localStorage.getItem('UserName')
        const guessesHistory=localStorage.getItem('guessList')

        if(currentGuesses&&currentAttempts){
            setGuessesMade(Number(currentGuesses))
            setAttempts(Number(currentAttempts))
        }

        if(name){
            setUserName(name)
        }

        if(guessesHistory){
            setGuessList(JSON.parse(guessesHistory))
        }

    },[])

    return {digits,setDigits,
        guessList,setGuessList,
        guessesMade,setGuessesMade,
        attempts,setAttempts,
        userName,setUserName}
}