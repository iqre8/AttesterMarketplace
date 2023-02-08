import * as Kilt from '@kiltprotocol/sdk-js'

import { createClaim } from './createClaim'
import { generateLightDid } from './generateDid'

export function generateCredential(
  claimerDid: Kilt.DidUri,
  claimAttributes: Kilt.IClaim['contents'],
  ctype: Kilt.ICType
): Kilt.ICredential {
  // Create claim.
  const claim = createClaim(claimerDid, ctype, claimAttributes)

  // Create credential and request attestation.
  console.log('Claimer -> create request')
  return Kilt.Credential.fromClaim(claim)
}