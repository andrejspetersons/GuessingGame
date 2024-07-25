import styles from "../styles/logTries.module.css"

export type GuessProps={
    digits:string[]
    mCount:number
    pCount:number
}
export type Guesses={
    guessList:GuessProps[]
}
export default function TryList({guessList}:Guesses){
    
    return(
       <>
            <div className={styles["tryListContainer"]}>
                {guessList.length>0?(
                    <div>
                        <ul className={styles["guessList"]}>
                            {guessList.map((guess,index)=>(
                            <li key={index} className={styles["guessItem"]}>
                                <span className={styles["guessDigits"]}>Guess:{guess.digits.join('')}</span>
                                <span className={styles["guessCounts"]}>M: {guess.mCount} P: {guess.pCount}</span>    
                            </li>
                            ))}
                        </ul>
                    </div>
                ):(<div>No guesses yet.</div>)}
            </div>
       </>
    )
}