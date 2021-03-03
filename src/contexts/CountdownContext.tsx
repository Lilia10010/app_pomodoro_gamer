import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  isActive: boolean;
  hasFinished: boolean;

  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

let countdownTimeout : NodeJS.Timeout

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChalleng } = useContext(ChallengesContext)

    const [time, setTime] = useState(0.05 * 60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)
    // const [isPaused, setIsPaused] = useState(null)
  
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    //   const { startNewChalleng } = useContext(ChallengesContext);
  

    function startCountdown(){
        setIsActive(true)
        
      }
    
      function resetCountdown(){
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setHasFinished(false) 
        setTime(0.05 * 60)   
      }
      // function pauseCountdown(){
      //   clearTimeout(countdownTimeout)
      //   isPaused ? false : true
           
      // }
    
      useEffect(() => {
        if(isActive && time > 0){
          countdownTimeout = setTimeout(() => {
            setTime(time -1)
          }, 1000)
        } else if (isActive && time === 0){
          setHasFinished(true)
          setIsActive(false)
          startNewChalleng()
          
        }
      }, [isActive, time])

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        isActive,
        hasFinished,        

        startCountdown,
        resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  );

}