const {CasperClient, Keys, RuntimeArgs, CLValueBuilder} = require('casper-js-sdk');
import {call_contract} from './call_ep';
import {nodeAddress, contractAddress} from './constants';
import {KeyManager} from './keymanager';

export async function resolveContractCall(args: any, runtime_args: any) {
  let deployHash = await call_contract(args, runtime_args);
  await console.log("Deploy [Hash/Error]: ", deployHash);

  // [TESTS]
  // successful
  // let deployHash = "9200e3f86f65b9b99a22ecbc83e542ac7d1596f3b6ef789bd04fb310319ffed4"
  // failed
  // let deployHash = "bf5d3fba02278d6caf66a968a00ccc8cd8adee516619ef01007446271f79413f"
  let resolved = false;
  let client = new CasperClient(nodeAddress);
  while (!resolved){
    async function sleep(ms: number): Promise<void> {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    try{
      let status = await client.getDeploy(deployHash);
      try{
        if (status[1]['execution_results'][0]['result']['Success'] != undefined){
          console.log("[YAY] Deploy Succeeded! : ", deployHash);
          resolved = true;
          break;
        }
        else if (status[1]['execution_results'][0]['result']['Failure'] != undefined){
          console.log("[BOO] Deploy Failed! : ", deployHash);
          resolved = true;
          break;
        }
        else{
          console.log("Deploy pending...");
        }
      }
      catch{
        console.log("Deploy pending...");
      }
      await sleep(10000);
    }
    catch(error){
      console.log("[CRITICAL] Failed to get Deploy: ", error);
      break;
    }
  }

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
