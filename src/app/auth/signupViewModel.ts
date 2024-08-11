import api from "@/src/api"
import { makeAutoObservable } from "mobx"

class SignupViewModel {
    email: string
    password: string
    password2: string
    role: string
    signupMessage: string | undefined
    signupError: boolean
    signupSuccess: boolean
    isLoading: boolean

    constructor() {
        this.email = ''
        this.password = ''
        this.password2 = ''
        this.role = 'student'
        this.signupMessage = ''
        this.signupError = false
        this.signupSuccess = false
        this.isLoading = false

        makeAutoObservable(this)
    }

    async signup() {
        this.setIsLoading(true)
        this.setSignupError(false)
        const result = await api.signup(this.email, this.password, this.password2, this.role)

        if (result.success) {
            this.setSignupSuccess(true)
            await api.setRole(result.data.user?.id, this.role)

            
        }
        else {
            this.setSignupError(true)
            this.setSignupMessage(result.message)
        }

        this.setIsLoading(false)
    }

    setEmail(email: string) {
        this.email = email
    }

    setPassword(password: string) {
        this.password = password
    }

    setPassword2(password: string) {
        this.password2 = password
    }

    setRole(role: string) {
        this.role = role
    }

    setSignupMessage(message: string | undefined) {
        this.signupMessage = message
    }

    setSignupSuccess(success: boolean) {
        this.signupSuccess = success
    }

    setSignupError(error: boolean) {
        this.signupError = error
    }

    setIsLoading(loading: boolean) {
        this.isLoading = loading
    }

}

export default new SignupViewModel()