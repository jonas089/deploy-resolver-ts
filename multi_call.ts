import {resolveContractCall} from './resolve_call';
const {Keys, RuntimeArgs, CLValueBuilder} = require('casper-js-sdk');
import {call_contract} from './call_ep';
import {nodeAddress, contractAddress} from './constants';
import {KeyManager} from './keymanager';

async function multiCall() {
  const keymanager = new KeyManager('./bin/');
  const args = {
    'nodeAddress': nodeAddress,
    'contractHash': contractAddress,
    'binPath': './bin/',
    'entryPointName': 'vote',
    'publicKeyHex': keymanager.publicKeyHex(),
    'chainName': 'casper-test',
    'paymentAmount': 10000000000
  }
  const runtime_args = RuntimeArgs.fromMap({
      'choice': CLValueBuilder.string("choice_A")
  });
  for (let i = 0; i < 5; i++) {
    resolveContractCall(args, runtime_args);
  }
}

multiCall();
