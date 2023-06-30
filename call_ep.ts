const {Keys, CasperClient, Contracts, DeployUtil} = require("casper-js-sdk");
const fs = require('fs');
import {nodeAddress, contractAddress} from './constants';
import {createKeys, KeyManager} from './keymanager';
import {publicKeyToBytes} from './types';

// call any entry point with any runtime args => returns a deploy hash or an error
export async function call_contract(args: any, runtime_args: any){
    const client = new CasperClient(args['nodeAddress']);
    let contract = new Contracts.Contract(client);
    contract.setContractHash(args['contractHash']);
    let keymanager = new KeyManager(args['binPath']);
    const req = contract.callEntrypoint(args['entryPointName'], runtime_args,  publicKeyToBytes(args['publicKeyHex']), args['chainName'], args['paymentAmount'], [], 10000000);
    const signedDeploy = DeployUtil.signDeploy(req, keymanager.asymmetricKeyPair());
    const result = signedDeploy.send(args['nodeAddress']).then((res: any) => {
      return res;
    }).catch((error: any) => {
      return error;
    });
    return result;
}

/*
  args: {
    nodeAddress: node URL
    contractHash: hash of the contract
    binPath: path to the binary folder (secret_key.pem, public.pem)
    entryPointName: name of the entry point
    publicKeyHex: public key as hex string
    chainName: name of the network (e.g. casper-test)
    paymentAmount: gas available in motes
  }


*/
