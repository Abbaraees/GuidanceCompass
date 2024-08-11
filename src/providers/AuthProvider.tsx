import { Session } from '@supabase/supabase-js'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { Tables } from '../types'
import supabase from '../libs/supabase'


type AuthContextType = {
  session: Session | null,
  profile: Tables<'profiles'> | null,
  isLoading: boolean,
  setProfile: (profile: any) => void
}


const AuthContext = createContext<AuthContextType>({
  session: null,
  profile: null,
  isLoading: true,
  setProfile: (profile: Tables<'profiles'>) => {}
})



const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchSession = async () => {
      const { data: {session}, error} = await supabase.auth.getSession()

      if (session) {
        setSession(session)
        const {data} = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session?.user.id)
          .single()

          setProfile(data)
      }

      setIsLoading(false)
    }
    
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    fetchSession()
  }, [])

  return (
    <AuthContext.Provider value={{session, profile, isLoading, setProfile}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthProvider