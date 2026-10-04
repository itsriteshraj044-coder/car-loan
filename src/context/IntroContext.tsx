import { createContext, useContext } from 'react'

/** `true` once the logo loading screen has handed over to the site. */
export const IntroContext = createContext(false)
export const useIntroDone = () => useContext(IntroContext)
