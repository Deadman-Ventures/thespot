export type NewUserInfo = {
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
    dob: Date
}

export type LoginRequest = {
    username: string
    password: string
}

export type LoginResponse = {
    username: string
    message: LoginResponseMessages
    token?: string
}

export enum LoginResponseMessages {
    Success = 'Success',
    InvalidUsername = 'Invalid username.',
    InvalidPassword = 'Invalid password.',
    UsernameExists = 'Username exists.'
}