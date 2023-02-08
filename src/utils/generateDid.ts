import {mnemonicGenerate} from "@polkadot/util-crypto";
import * as Kilt from "@kiltprotocol/sdk-js";
import {generateKeypairs} from "./generateKeypairs";
export async function createFullDid(submitterAccount: Kilt.KiltKeyringPair): Promise<{
                                                                                      mnemonic: string
                                                                                      fullDid: Kilt.DidDocument
                                                                                      }> {
  const mnemonic = mnemonicGenerate()
  const {
    authentication,
    keyAgreement,
    assertionMethod,
    capabilityDelegation
  } = generateKeypairs(mnemonic)

  const api = Kilt.ConfigService.get('api')
  const fullDidCreationTx = await Kilt.Did.getStoreTx(
    {
      authentication: authentication,
      keyAgreement: keyAgreement,
      assertionMethod: assertionMethod,
      capabilityDelegation: capabilityDelegation
    },
    submitterAccount.address,
    async ({ data }) => ({
      signature: authentication[0].sign(data),
      keyType: authentication[0].type
    })
  )

  //slow
  await Kilt.Blockchain.signAndSubmitTx(fullDidCreationTx, submitterAccount)
  const didUri = Kilt.Did.getFullDidUriFromKey(authentication[0])
  const encodedFullDid = await api.call.did.query(Kilt.Did.toChain(didUri))
  const {document} = Kilt.Did.linkedInfoFromChain(encodedFullDid)
  // console.log(`#DOCUMENT ${JSON.stringify(document)}`)
  if (!document) {
    throw new Error('Full DID was not successfully created.')
  } else {
    return { mnemonic, fullDid: document }
  }
}


export function generateLightDid(mnemonic: string): Kilt.DidDocument {
  const { authentication, keyAgreement } = generateKeypairs(mnemonic);
  // console.log(authentication)
  // console.log(keyAgreement)
  return Kilt.Did.createLightDidDocument({
    authentication: authentication as Kilt.NewLightDidVerificationKey,
    keyAgreement: keyAgreement
  })
}