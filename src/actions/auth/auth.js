import encryption from 'js-sha512';


export const passwordEncryption = (plaintext) => {
    const hashedFirstLayer = encryption.sha512(plaintext)
    const processedPlaintext = plaintext + hashedFirstLayer

    return encryption.sha512(processedPlaintext)
}
