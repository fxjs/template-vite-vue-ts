import CryptoJS from 'crypto-js';
import CRYPTOJS_ENC_UTF8 from 'crypto-js/enc-utf8';
import { CipherMode, sm2 } from 'sm-crypto';

/**
 * AES加密
 * @param originalText
 * @param secretKey
 */
export function encryptAes(originalText: string, secretKey: string) {
  return CryptoJS.AES.encrypt(originalText, secretKey).toString();
}

/**
 * AES解密
 * @param cipherText
 * @param secretKey
 */
export function decryptAes(cipherText: string, secretKey: string) {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CRYPTOJS_ENC_UTF8);
}

/**
 * Md5加密
 * @param originalText
 */
export function encryptMd5(originalText: string) {
  return CryptoJS.MD5(originalText).toString(CryptoJS.enc.Hex);
}

/**
 * 国密sm2算法加密
 * @param originalText
 * @param publicKey
 * @param cipherMode 加密策略，1 - C1C3C2，0 - C1C2C3，默认为1
 */
export function encryptSm2GM(originalText: string, publicKey: string, cipherMode: CipherMode) {
  return '04' + sm2.doEncrypt(originalText, publicKey, cipherMode);
}
