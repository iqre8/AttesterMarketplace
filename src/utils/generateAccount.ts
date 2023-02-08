import {mnemonicGenerate, mnemonicToMiniSecret} from "@polkadot/util-crypto";
import * as Kilt from "@kiltprotocol/sdk-js";

export function generateAccount(mnemonic = mnemonicGenerate()) {
  const signingKeyPairType = 'sr25519'
  const keyring = new Kilt.Utils.Keyring({
    ss58Format: 38,
    type: signingKeyPairType,
  })
  const account = keyring.addFromMnemonic(mnemonic) as Kilt.KiltKeyringPair
  return { account, mnemonic }
}