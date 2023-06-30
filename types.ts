const { CLValueBuilder, CLAccountHash, CLByteArray, CLKey, CLPublicKey } = require("casper-js-sdk");

// default
export default function _none(){

}

// helpers
export function accountHashConstructor(account_hash: string){
    const uint8Array = Uint8Array.from(Buffer.from(account_hash, 'hex'));
    const byteArray = new CLAccountHash(uint8Array);
    const key = CLValueBuilder.key(byteArray);
    return key;
}

// construct account hash CLValue, no prefix
export function clKeyConstructor(hash_value: string){
    const uint8Array = Uint8Array.from(Buffer.from(hash_value, 'hex'));
    const byteArray = new CLByteArray(uint8Array);
    const key = new CLKey(byteArray);
    return key;
}

export function serializeAnyHash(hash_value: string){
    if (hash_value.startsWith("account")){
        return accountHashConstructor(hash_value.substring(13));
    }
    else if (hash_value.startsWith("hash")){
        return clKeyConstructor(hash_value.substring(5));
    }
    else{
        return clKeyConstructor(hash_value);
    }
}

// Hex-Key to Byte-Key
export function publicKeyToBytes(hex_key: string){
    return CLPublicKey.fromHex(hex_key);
}
