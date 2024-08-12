import { Session, User, WeakPassword } from "@supabase/supabase-js";
import supabase from "../libs/supabase"
import { Tables, UpdateProfileDataTypes } from "../types";


type LoginResultType = {success: boolean, message: string | undefined, data: {
  user: User,
  session: Session;
  weakPassword?: WeakPassword | undefined;
} | {
  user: null;
  session: null;
  weakPassword?: null | undefined;
}}

type SignupResultType = {
  success: boolean,
  message: string | undefined,
  data: {
    user: User | null;
    session: Session | null;
  } | {
      user: null;
      session: null;
  }
}

class GuidanceCompassApi {

  async login(email: string, password: string) {
    const {data, error} = await supabase.auth.signInWithPassword({email, password})
  
    return new Promise<LoginResultType>( (resolve) => {
      resolve({success: !error, message: error?.message, data})
    })

  }

  async signup(email: string, password: string, password2: string, role: string) {
    const passwordMatch = password == password2
    if (passwordMatch) {
      const {data, error} = await supabase.auth.signUp({email, password})

      return new Promise<SignupResultType>((resolve) => {
        resolve({success: !error, message: error?.message, data})
      })
    }

    return new Promise<SignupResultType>((resolve) => {
      resolve({success: false, message: "Password Doesn't match", data: {user: null, session: null}})
    })
  }

  async setRole(id: string | undefined, role: string) {
    const {error} = await supabase
      .from('profiles')
      .update({role})
      .eq('id', id === undefined ? -1 : id)
      .select()

    return new Promise<{success: boolean}>((resolve, reject) => {
      if (!error) {
        resolve({success: true})
      }
      else
        reject({success: false})
    })
  }

  async updateProfile(id: string, data: UpdateProfileDataTypes) {
    const {error} = await supabase
      .from('profiles')
      .update({...data})
      .eq('id', id)
      .select()

    return new Promise<{success: boolean, message: string | undefined}>((resolve) => {
      resolve({success: !error, message: error?.message})
    })
  }

}

export default new GuidanceCompassApi()