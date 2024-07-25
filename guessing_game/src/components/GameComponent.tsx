import { useState } from "react"
import Modal from "react-modal"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { getNumber, makeGuess, resetNumber } from "../apicalls/guess"
import { useModalState } from "../hooks/GameModalState"
import { useGameState } from "../hooks/GameStateHook"
import styles from "../styles/gameControl.module.css"
import { customStyles } from "../styles/react_modal_custome_style"
import TryList from "./TryListComponent"


Modal.setAppElement('#root')

export default function GamePanel(){
    const {digits,setDigits,
        guessList,setGuessList,
        guessesMade,setGuessesMade,
        attempts,setAttempts,
        userName}=useGameState()

    const{isVictoryModalOpen,isLooseModalOpen,showVictoryModal,showLooseModal,closeModal}=useModalState()
    const[secretNumber,setSecretNumber]=useState(0)

    const changeAttempts = () => {
        setAttempts(prevAttempts => {
            const newAttempts = prevAttempts - 1;
            localStorage.setItem("attemptsLeft", newAttempts.toString())
            return newAttempts;
        });

        setGuessesMade(prevGuesses => {
            const newGuessesMade = prevGuesses + 1;
            localStorage.setItem("guessesMade", newGuessesMade.toString())
            return newGuessesMade;
        });
    };

    const handleChange=(index:number,value:string)=>{
        const newDigits=[...digits]
        if(/^\d?$/.test(value))
        {
            newDigits[index]=value
            setDigits(newDigits)
        }
    }

    const showGuessResultMessage=(M:number,P:number)=>{
        toast.info(`M:${M} P:${P}`)
        const changeGuessHistory=()=>{
            setGuessList(
                prevGuessList=>{
                    const updatedGuessHistory=[...prevGuessList,{ digits:[...digits],
                        mCount:M,
                        pCount:P}]
                        localStorage.setItem("guessList",JSON.stringify(updatedGuessHistory))
                        return updatedGuessHistory
                }
            )
        }

        changeGuessHistory()
    }

    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        const allFilled = digits.every(digit => digit.length === 1)
        if (!allFilled) {
            toast.error("Every digit should be valid.")
            return;
        }

        const number=digits.join('')
        const data=await makeGuess(number)

        changeAttempts()
        if(data.countP!=4){
            if(attempts<=1){
                const secretNumber=await getNumber()
                setSecretNumber(secretNumber)
                showLooseModal()                
                return
            }
            else{
                showGuessResultMessage(data.countM,data.countP)
            }
        }
        else{
            const secretNumber=await getNumber()
            setSecretNumber(secretNumber)
            showVictoryModal()
        }
        
       
    }

    const handleRetry=async()=>{
        const resetArray=digits.fill('')
        setDigits(resetArray)
        resetAttempts()
        closeModal()
        guessList.splice(0,guessList.length)
        await resetNumber()
    }

    const resetAttempts=()=>{
        setAttempts(8)
        setGuessesMade(0)
        localStorage.removeItem("guessesMade")
        localStorage.removeItem("attemptsLeft")
        localStorage.removeItem("guessList")
    }

    
    return(
        
        <>
        <form onSubmit={handleSubmit}>
            
        <div className={styles["div"]}>
            <h2>User:{userName}</h2>
            <h2>Attempts Left:{attempts}</h2>
            <h2>Guesses Made:{guessesMade}</h2>
            {digits.map((digit,index)=>
                <input
                    key={index} 
                    type="text" 
                    className={styles["input"]} 
                    min="0" 
                    max="9"
                    
                    minLength={1}
                    maxLength={1}
                    value={digit}
                    onChange={(e)=>handleChange(index,e.target.value)}
                />
            )}
            <button type="submit">Guess</button>
            
        </div>
        <TryList guessList={guessList}></TryList>
        <ToastContainer/>
        </form>
        <Modal
            isOpen={isVictoryModalOpen}
            style={customStyles}
            overlayClassName={styles.overlay}>
            <h2>You win</h2>
            <p>Secret Number = {secretNumber}</p>
            <button onClick={handleRetry}>New Game</button>
        </Modal>

        <Modal
            isOpen={isLooseModalOpen}
            style={customStyles}
            overlayClassName={styles.overlay}>
            <div style={{textAlign:'center'}}>
                <h2>You loose </h2>
                <p>Secret Number = {secretNumber}</p>
                <button onClick={handleRetry}>Retry</button>
            </div>
            
        </Modal>
        </>
    )
}