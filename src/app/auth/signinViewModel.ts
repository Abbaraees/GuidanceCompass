import api from "@/src/api"
import { makeAutoObservable } from "mobx"

class SignInViewModel {
    email: string
    password: string
    loginSuccess: boolean
    loginError: boolean
    isLoading: boolean
    loginMessage: string | undefined

    constructor() {
        this.email = ''
        this.password = ''
        this.isLoading = false
        this.loginSuccess = false
        this.loginError = false
        this.loginMessage = ''

        makeAutoObservable(this)
    }

    async login() {
        this.setIsLoading(true)
        this.setLoginError(false)
        
        const result = await api.login(this.email, this.password)
        if (result.success) {
            this.setSuccess(true)
            this.setIsLoading(false)
        }
        else {
            this.setLoginError(true)
            this.setLoginMessage(result.message)
            this.setIsLoading(false)
        }
    }

    setEmail(email: string) {
        this.email = email
    }

    setPassword(password: string) {
        this.password = password
    }

    setLoginMessage(message: string | undefined) {
        this.loginMessage = message
    }

    setLoginError(error: boolean) {
        this.loginError = error
    }
    
    setIsLoading(loading: boolean) {
        this.isLoading = loading
    }

    setSuccess(success: boolean) {
        this.loginSuccess = success
    }

    setError(error: boolean) {
        this.loginError = error
    }
}

export default new SignInViewModel()