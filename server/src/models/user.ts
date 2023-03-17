export type User = {
    username: string
    passwordHash: string
    salt: string
    firstName: string
    lastName: string
    email: string
    dob: Date
}

export const getUserByUsername = (username: string): User => {
    return
}

export const userExists = (username: string): boolean => {
    return
}

export const createNewUser = (user: User): User => {
    return
}