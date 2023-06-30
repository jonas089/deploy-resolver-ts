const { Keys, CLPublicKey } = require("casper-js-sdk");
const fs = require("fs");

export class KeyManager{
  public path: string;
  constructor (path: string){
    this.path = path;
  }
  updateKeyPath(path: string){
    this.path = path;
  }
  newKeys(){
    const k = Keys.Ed25519.new();
    let public_key = k.exportPublicKeyInPem();
    let private_key = k.exportPrivateKeyInPem();
    fs.writeFile(this.path + 'public.pem', public_key, (err: NodeJS.ErrnoException | null) => {
      if (err) {
        console.error(err);
      }
    });
    fs.writeFile(this.path + 'secret_key.pem', private_key, (err: NodeJS.ErrnoException | null) => {
      if (err) {
        console.error(err);
      }
    });
  }
  asymmetricKeyPair(){
    return Keys.Ed25519.loadKeyPairFromPrivateFile(this.path + 'secret_key.pem')
  }
  publicKeyHex(){
    return CLPublicKey.fromEd25519(Keys.Ed25519.parsePublicKeyFile(this.path + 'public.pem')).toHex();
  }
}

export function createKeys() {
  let keymanager = new KeyManager('./bin/');
  keymanager.newKeys();
}
