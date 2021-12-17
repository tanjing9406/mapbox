import CryptoJs from 'crypto-js'

export function encryptPassword(pwd) {
    const key = CryptoJs.enc.Utf8.parse("radarhb3ZA==HLRD")
    const encryptedData = CryptoJs.AES.encrypt(pwd, key, {
        mode: CryptoJs.mode.ECB,
        padding: CryptoJs.pad.Pkcs7
    });
    return encryptedData.toString();
}
