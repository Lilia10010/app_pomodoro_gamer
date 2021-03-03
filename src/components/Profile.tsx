import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile(){
  const { level } = useContext(ChallengesContext)
    return(
        <div className={styles.profileContainer}>
        <img src="https://github.com/lilia10010.png" alt="Lília Paula"/>
        <div>
          <strong>Lília Paula</strong>
          <p>
            <img src="icons/level.svg" alt="Level"/>
            Level {level} </p>
        </div>
      </div>
    )
}