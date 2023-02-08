import * as Kilt from '@kiltprotocol/sdk-js'

export async function ensureStoredCtype(
  attesterAccount: Kilt.KiltKeyringPair,
  attesterDid: Kilt.DidUri,
  signCallback: Kilt.SignExtrinsicCallback,
  ctype: Kilt.ICType
): Promise<Kilt.ICType> {
  try {
    await Kilt.CType.verifyStored(ctype)
    console.log('Ctype already stored. Skipping creation')
    return ctype
  } catch {
    console.log('Ctype not present. Creating it now...')
    const api = Kilt.ConfigService.get('api')
    // Authorize the tx.
    const encodedCtype = Kilt.CType.toChain(ctype)
    const tx = api.tx.ctype.add(encodedCtype)
    const extrinsic = await Kilt.Did.authorizeTx(
      attesterDid,
      tx,
      signCallback,
      attesterAccount.address
    )
    await Kilt.Blockchain.signAndSubmitTx(extrinsic, attesterAccount)
    return ctype
  }
}

export function domainLinkageCType(): Kilt.ICType {
  return Kilt.CType.fromProperties('Domain Linkage Credential', {
    id: {
      type: 'string'
    },
    origin: {
      type: 'string'
    }
  })
  // $id: 'kilt:ctype:0x9d271c790775ee831352291f01c5d04c7979713a5896dcf5e81708184cc5c643',
  // $schema: 'http://kilt-protocol.org/draft-01/ctype#',
  // title: 'Domain Linkage Credential',
  // properties: {
  //   id: {
  //     type: 'string'
  //   },
  //   origin: {
  //     type: 'string'
  //   }
  // },
  // type: 'object'
}

export function driversLicenseCType(): Kilt.ICType {
  return Kilt.CType.fromProperties('Drivers License', {
    name: {
      type: 'string'
    },
    age: {
      type: 'integer'
    }
  })
}
