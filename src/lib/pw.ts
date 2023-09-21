import {writable} from "svelte/store";
import CryptoJS from "crypto-js";

const pw = writable('')
export const encrypt = (content: string, password: string) => CryptoJS.AES.encrypt(JSON.stringify({content}), password).toString()
export const decrypt = (crypted: string, password: string) => {
    try {
        return JSON.parse(CryptoJS.AES.decrypt(crypted, password).toString(CryptoJS.enc.Utf8)).content
    } catch (e) {
        console.error(e)
        return null;
    }
}

export default pw