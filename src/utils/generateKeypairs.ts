import {mnemonicGenerate,
        mnemonicToMiniSecret,
        sr25519PairFromSeed,
        keyExtractPath,
        keyFromPath,
        blake2AsU8a
      } from "@polkadot/util-crypto";
import * as Kilt from "@kiltprotocol/sdk-js";
import {generateAccount} from "./generateAccount";

/**
 * Generates keypairs based on a mnemonic
 * @param mnemonic if no mnemonic is given, we create a new one.
 */
export function generateKeypairs(mnemonic = mnemonicGenerate()) {
  const { account } = generateAccount(mnemonic)
  const authentication = {
    ...account.derive('//did//0'),
    type: 'sr25519'
  } as Kilt.KiltKeyringPair
  const keyAgreement = generateKeyAgreement(mnemonic)
  const assertionMethod = {
    ...account.derive('//did//assertion//0'),
    type: 'sr25519'
  } as Kilt.KiltKeyringPair
  const capabilityDelegation = {
    ...account.derive('//did//delegation//0'),
    type: 'sr25519'
  } as Kilt.KiltKeyringPair

  return {
    authentication: [authentication],
    keyAgreement: [keyAgreement],
    assertionMethod: [assertionMethod],
    capabilityDelegation: [capabilityDelegation]
  }
}

export function generateKeyAgreement(mnemonic: string):  Kilt.KiltEncryptionKeypair {
  const secretKeyPair = sr25519PairFromSeed(mnemonicToMiniSecret(mnemonic))
  const { path } = keyExtractPath('//did//keyAgreement//0')
  const { secretKey } = keyFromPath(secretKeyPair, path, 'sr25519')
  return Kilt.Utils.Crypto.makeEncryptionKeypairFromSeed(blake2AsU8a(secretKey))
}