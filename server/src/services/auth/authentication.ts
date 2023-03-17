import { LoginRequest, LoginResponse, LoginResponseMessages, NewUserInfo } from "../../types/authentication"
import { createHash } from "crypto"
import { createNewUser, getUserByUsername, userExists } from "../../models/user"
import { generateJwt, generatePasswordSalt } from "./helpers"

export const login = (user: LoginRequest): LoginResponse => {
    const userInDb = getUserByUsername(user.username)
    if (!userInDb) return { username: user.username, message: LoginResponseMessages.InvalidUsername }

    const attemptedHash = createPasswordAndSaltHash(user.password, userInDb.salt)
    if (attemptedHash !== userInDb.passwordHash) return {
        username: user.username,
        message: LoginResponseMessages.InvalidPassword
    }

    const token = generateJwt()
    return { username: user.username, message: LoginResponseMessages.Success, token: token }
}

export const signup = (newUser: NewUserInfo): LoginResponse => {
    if (userExists(newUser.username)) return {
        username: newUser.username,
        message: LoginResponseMessages.UsernameExists
    }

    if (!validatePassword(newUser.password)) return {
        username: newUser.username,
        message: LoginResponseMessages.InvalidPassword
    }

    const salt = generatePasswordSalt(35)

    createNewUser({
        dob: newUser.dob,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        passwordHash: createPasswordAndSaltHash(newUser.password, salt),
        salt: salt
    })

    return { username: newUser.username, message: LoginResponseMessages.Success, token: generateJwt() }
}

export const createPasswordAndSaltHash = (password: string, salt: string) => {
    return createHash('sha256').update(password + salt).digest('hex')
}

export const validatePassword = (password: string) => {
    return password.length > 7 && password.length < 17
}