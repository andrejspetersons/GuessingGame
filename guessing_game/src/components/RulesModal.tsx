import styles from "../styles/modal.module.css";
//rules window
export type RulesModalProps={
  onClose:()=>void
}

export default function RulesModal({onClose}:RulesModalProps){

    return(
      <div className={styles["div"]}>
        <div className={styles["modal"]}>
          <div className={styles["modal-content"]}>
            <h2>GameRules</h2>
              <li>Program chooses a random secret number with 4 digits</li>
              <li>All digits in the secret number are different</li>
              <li>You have 8 attempts to guess number</li>
              <li>
                After each guess program displays the message "M:m;P:p" where:<br/>
                m-number of matching digits but not on the right places<br/>
                p-number of matching digits on exact places<br/>
              </li>
              <li>
                Samples:<br />
                Secret: 7046 Guess: 8724 Message: M:2; P:0<br />
                Secret: 7046 Guess: 7842 Message: M:0; P:2<br />
              </li>
              <button className={styles["button"]} onClick={onClose}>Ok</button> 
          </div>
        </div>
    </div>
    )
}