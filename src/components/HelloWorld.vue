<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import * as Kilt from '@kiltprotocol/sdk-js'
import axios, {AxiosResponse} from "axios";
@Options({
  props: {
  },
  components: {
  },
})
export default class HelloWorld extends Vue {
  async click(){
    await Kilt.connect(import.meta.env.VITE_WSS_ADDRESS as string)
    const api = Kilt.ConfigService.get('api')
    const encodedJohnDoeDetails = await api.call.did.queryByWeb3Name('1gn0r4nd')
    const uri = Kilt.Did.linkedInfoFromChain(encodedJohnDoeDetails).document.uri
    console.log(`My name is john_doe and this is my DID: "${uri}"`)
    const johnDoeDidDocument = await Kilt.Did.resolve(uri)
    console.log(`John Doe's DID Document:`)
    console.log(JSON.stringify(johnDoeDidDocument, null, 2))
    const endpoints = johnDoeDidDocument?.document?.service
    if (!endpoints) {
      console.log('No endpoints for the DID.')
      return []
    } else {
      console.log('Endpoints:')
      console.log(JSON.stringify(endpoints, null, 2))
    }
    const credential = (await axios.get<Kilt.KiltPublishedCredentialCollectionV1>(
      endpoints[0].serviceEndpoint[0]
    )).data[0].credential
    console.log(credential)

    //throws an error if data integrity etc not good
    await Kilt.Credential.verifyCredential(credential)



    const attestationInfo = await api.query.attestation.attestations(
      credential.rootHash
    )
    const attestation = Kilt.Attestation.fromChain(
      attestationInfo,
      credential.rootHash
    )
    if (attestation.revoked) {
      throw new Error('The credential has been revoked, hence it is not valid.')
    } else{
      console.log(
        "John Doe's credential is valid!",
        JSON.stringify(credential, null, 2)
      )
    }


    const encodedAttestationInfo = await api.query.attestation.attestations(
      credential.rootHash
    )
    const attestationInfo2 = Kilt.Attestation.fromChain(
      encodedAttestationInfo,
      credential.rootHash
    )
    const revokedStatus = !attestationInfo2.revoked
    console.log('Revoked status of the attestation', revokedStatus)
    await Kilt.disconnect()
  }

  test(){
    window.kilt = {}
    Object.defineProperty(window.kilt, 'meta', {
      value: { versions: { credentials: '3.0' } },
      enumerable: false
    })
  }
}
</script>

<template>
  <div class="card">
    <button type="button" @click="test">Click Me</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
