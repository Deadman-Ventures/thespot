export const generateJwt = () => {
    return ''
}

export const generatePasswordSalt = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let salt = '';
    for (let i = 0; i < length; i++) {
        salt += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return salt;
}