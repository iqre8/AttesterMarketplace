import * as Kilt from '@kiltprotocol/sdk-js'

export async function attestCredential(
  attesterAccount: Kilt.KiltKeyringPair,
  attesterDid: Kilt.DidUri,
  credential: Kilt.ICredential,
  signCallback: Kilt.SignExtrinsicCallback
): Promise<void> {
  const api = Kilt.ConfigService.get('api')

  // Get CType and root hash from the provided credential.
  const { cTypeHash, claimHash } = Kilt.Attestation.fromCredentialAndDid(
    credential,
    attesterDid
  )

  // Create the tx and authorize it.
  const tx = api.tx.attestation.add(claimHash, cTypeHash, null)
  const extrinsic = await Kilt.Did.authorizeTx(
    attesterDid,
    tx,
    signCallback,
    attesterAccount.address
  )

  console.log(`tx: ${tx}`)
  // Submit the tx to write the attestation to the chain.
  console.log('Attester -> create attestation...')
  await Kilt.Blockchain.signAndSubmitTx(extrinsic, attesterAccount)
}