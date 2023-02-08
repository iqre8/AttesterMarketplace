import type { ApiPromise } from '@polkadot/api'
import * as Kilt from '@kiltprotocol/sdk-js'

export function getChallenge(): string {
  return Kilt.Utils.UUID.generate()
}

// Verifies validity, ownership & attestation.
export async function verifyPresentation(
  api: ApiPromise,
  presentation: Kilt.ICredentialPresentation,
  challenge: string,
  trustedAttesterUris: Kilt.DidUri[]
): Promise<boolean> {
  try {
    await Kilt.Credential.verifyPresentation(presentation, { challenge })

    const attestationInfo = Kilt.Attestation.fromChain(
      await api.query.attestation.attestations(presentation.rootHash),
      presentation.rootHash
    )
    if (attestationInfo.revoked) {
      return false
    }
    // Returns true if no trusted attester URI is provided or, if it is, if it matches the one that issued the presented credential.
    return trustedAttesterUris.includes(attestationInfo.owner)
  } catch {
    return false
  }
}