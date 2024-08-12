import api from "@/src/api"
import { Tables } from "@/src/types"
import { makeAutoObservable } from "mobx"

class UpateProfileViewModel {
  updateSuccess: boolean = false
  updateError: boolean = false;
  updateMessage: string | undefined = ''
  id: string = ''
  available_hours: string | null = null
  avatar_url: string | null = null
  date_of_birth: string | null = null
  field_of_study: string | null = null
  field_of_work: string | null = null
  full_name: string | null = null
  institution: string | null = null
  position: string | null = null
  qualification: string | null = null
  target_audience: string | null = null
  username: string | null = null
  years_of_experience: string | null = null

  constructor(profile: Tables<'profiles'> | null) {
    if (profile) {
      this.id = profile.id
      this.available_hours = profile.available_hours
      this.avatar_url = profile.avatar_url
      this.date_of_birth = profile.date_of_birth
      this.field_of_study = profile.field_of_study
      this.field_of_work = profile.field_of_work
      this.full_name = profile.full_name
      this.institution = profile.institution
      this.position = profile.position
      this.qualification = profile.qualification
      this.target_audience = profile.target_audience
      this.years_of_experience = profile.years_of_experience
    }
    makeAutoObservable(this)
  }

  setAvailableHours = (hours: string) => this.available_hours = hours
  setAvatarUrl = (url: string) => this.avatar_url = url
  setDateOfBirth = (dob: string) => this.date_of_birth = dob
  setFieldOfStudy = (field: string) => this.field_of_study = field
  setFieldOfWork = (field: string) => this.field_of_work = field
  setFullName = (name: string) => this.full_name = name
  setInstitution = (institution: string) => this.institution = institution
  setPosition = (pos: string) => this.position = pos
  setQualification = (qualification: string) => this.qualification = qualification
  setTargetAudience = (audience: string) => this.target_audience = audience
  setYearOfExperience = (years: string) => this.years_of_experience = years

  setUpdateSuccess = (success: boolean) => this.updateSuccess = success
  setUpdateError = (error: boolean) => this.updateError = error
  setUpdateMessage = (message: string | undefined) => this.updateMessage = message
 
  updateProfile = async () => {
    this.setUpdateError(false)

    const data: Tables<'profiles'> = { 
      available_hours: this.available_hours,
      avatar_url: this.avatar_url,
      date_of_birth: this.date_of_birth,
      field_of_study: this.field_of_study,
      field_of_work: this.field_of_work,
      full_name: this.full_name,
      institution: this.institution,
      position: this.position,
      qualification: this.qualification,
      target_audience: this.target_audience,
      years_of_experience: this.years_of_experience
    }

    const result = await api.updateProfile(this.id, data)

    if (result.success) {
      this.setUpdateSuccess(true)
    }
    else {
      this.setUpdateError(true)
      this.setUpdateMessage(result.message)
    }



  }

}

export default UpateProfileViewModel