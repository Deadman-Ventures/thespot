import { getUserByUsername, User, userExists } from "../../../src/models/user";
import { createPasswordAndSaltHash, login, generateJwt, signup, validatePassword } from "../../../src/services/auth";
import { LoginRequest, LoginResponseMessages, NewUserInfo } from "../../../src/types/authentication"


jest.mock("../../../src/models/user")
jest.mock("../../../src/services/auth/helpers")

describe('unit tests for the authentication services', () => {
    const mockValidUser: User = {
        username: 'test',
        passwordHash: 'a45d6c330b1b1299d86a976649591f0810242a32f421096139534193754e949d',
        salt: 'test_salt',
        firstName: 'steve',
        lastName: 'irwin',
        email: 'steve@email.com',
        dob: new Date('2/2/2022')
    }

    beforeAll(() => {

    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    test('correct hash generated for password with salt', () => {
        const pwd = 'test_pwd'
        const salt = 'test_salt'
        const expected = 'a45d6c330b1b1299d86a976649591f0810242a32f421096139534193754e949d'

        const result = createPasswordAndSaltHash(pwd, salt)

        expect(result).toBe(expected)
    })

    test('login works for valid username and password', () => {
        const user: LoginRequest = {
            username: 'test',
            password: 'test_pwd'
        }
        const mockGetByUsername = getUserByUsername as jest.MockedFunction<typeof getUserByUsername>
        mockGetByUsername.mockReturnValue(mockValidUser)
        const mockGenerateJwt = generateJwt as jest.MockedFunction<typeof generateJwt>
        mockGenerateJwt.mockReturnValue('token')

        const result = login(user)

        expect(result.username).toBe('test')
        expect(result.message).toBe(LoginResponseMessages.Success)
        expect(result.token).toBeTruthy()
    })

    test('login fails for invalid username', () => {
        const user: LoginRequest = {
            username: 'test',
            password: 'test_pwd'
        }

        const result = login(user)

        expect(result.username).toBe('test')
        expect(result.message).toBe(LoginResponseMessages.InvalidUsername)
        expect(result.token).toBeFalsy()
    })

    test('login fails for invalid username password combo', () => {
        const user: LoginRequest = {
            username: 'test',
            password: 'wrong_pwd'
        }
        const mockGetByUsername = getUserByUsername as jest.MockedFunction<typeof getUserByUsername>
        mockGetByUsername.mockReturnValue(mockValidUser)

        const result = login(user)

        expect(result.username).toBe('test')
        expect(result.message).toBe(LoginResponseMessages.InvalidPassword)
        expect(result.token).toBeFalsy()
    })

    test('sign up new valid user', () => {
        const newUser: NewUserInfo = {
            dob: new Date(Date.now()),
            email: 'test@dumbemail.com',
            firstName: 'joe',
            lastName: 'shmoe',
            password: 'long&Compl1cated',
            username: 'cooluser10'
        }
        const mockUserExists = userExists as jest.MockedFunction<typeof userExists>
        mockUserExists.mockReturnValue(false)
        const mockGenerateJwt = generateJwt as jest.MockedFunction<typeof generateJwt>
        mockGenerateJwt.mockReturnValue('token')

        const result = signup(newUser)

        expect(result.username).toBe('cooluser10')
        expect(result.message).toBe(LoginResponseMessages.Success)
        expect(result.token).toBeTruthy()
    })

    test('sign up fails for existing username', () => {
        const newUser: NewUserInfo = {
            dob: new Date(Date.now()),
            email: 'test@dumbemail.com',
            firstName: 'joe',
            lastName: 'shmoe',
            password: 'long&Compl1cated',
            username: 'existinguser'
        }
        const mockUserExists = userExists as jest.MockedFunction<typeof userExists>
        mockUserExists.mockReturnValue(true)
        const mockGenerateJwt = generateJwt as jest.MockedFunction<typeof generateJwt>
        mockGenerateJwt.mockReturnValue('token')

        const result = signup(newUser)

        expect(result.username).toBe('existinguser')
        expect(result.message).toBe(LoginResponseMessages.UsernameExists)
        expect(result.token).toBeFalsy()
    })

    test('sign up fails for invalid password length', () => {
        const newUser: NewUserInfo = {
            dob: new Date(Date.now()),
            email: 'test@dumbemail.com',
            firstName: 'joe',
            lastName: 'shmoe',
            password: 'bad',
            username: 'username'
        }

        const result = signup(newUser)

        expect(result.username).toBe('username')
        expect(result.message).toBe(LoginResponseMessages.InvalidPassword)
        expect(result.token).toBeFalsy()
    })

    test('validate password is valid', () => {
        const validPassword = 'perfectpass'

        const result = validatePassword(validPassword)

        expect(result).toBe(true)
    })

    test('validate password is invalid', () => {
        const validPassword = 'short'

        const result = validatePassword(validPassword)

        expect(result).toBe(false)
    })
})