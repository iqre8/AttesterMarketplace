<template>
  <div>
    <Button @click="onGenerateWallet" :loading="this.loading['generateAttestersWallet']">Create Wallet</Button>
    <h1>Set the following in .env.development</h1>
    <span>
      VITE_ATTESTER_ACCOUNT_MNEMONIC={{this.mnemonic}}<br />
      VITE_ATTESTER_ACCOUNT_ADDRESS={{this.address}}
    </span><br />
    <a href="https://faucet.peregrine.kilt.io/" target="_blank">Add funds to wallet</a><br />
    <Button @click="onRequestDID" :loading="this.loading['generateDID']">Request DID</Button>
    <h1>Set the following in .env.development</h1>
    <span>
      VITE_ATTESTER_ACCOUNT_MNEMONIC={{this.mnemonic}}<br />
      VITE_ATTESTER_ACCOUNT_ADDRESS={{this.address}}<br />
      VITE_ATTESTER_DID_MNEMONIC={{this.did_mnemonic}}<br />
    </span>
    <Button @click="onDomainLinkageCType">Check Domain Linkage CType</Button>

    <div><a href="https://spiritnet.subscan.io/event?address=&module=ctype&event=ctypecreated&startDate=&endDate=&startBlock=&endBlock=&timeType=date&version=10620" target="_blank">CTypes</a> </div>

    <hr />
    <h1>Claimer</h1>
    <Button @click="onGenerateClaimerWalletandDid" :loading="this.loading['generateClaimerWallet']">Create Wallet</Button><br />
    <span>
      VITE_ATTESTER_ACCOUNT_MNEMONIC={{this.mnemonic}}<br />
      VITE_ATTESTER_ACCOUNT_ADDRESS={{this.address}}<br />
      VITE_ATTESTER_DID_MNEMONIC={{this.did_mnemonic}}<br />
      VITE_CLAIMER_DID_MNEMONIC={{this.claimer_did_mnemonic}}<br />
    </span>

    <Button @click="onClaim" :loading="this.loading['generateClaim']">Claim</Button><br />
    <Button @click="onAttest" :loading="this.loading['generateAttestation']">Attest</Button><br />
    <Button @click="verify" :loading="this.loading['verify']">Verify</Button><br />

  </div>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import {useToast} from "primevue/usetoast";
  import * as Kilt from '@kiltprotocol/sdk-js'
  import { mnemonicGenerate } from '@polkadot/util-crypto'
  import { generateAccount } from "@/utils/generateAccount";
  import {createFullDid, generateLightDid} from "@/utils/generateDid";
  import {domainLinkageCType, ensureStoredCtype} from "@/utils/CType";
  import {generateKeypairs} from "@/utils/generateKeypairs";
  import {generateCredential} from "../../utils/generateCredential";
  import {driversLicenseCType} from "../../utils/CType";
  import {attestCredential} from "../../utils/attestCredential";
  import {getChallenge, verifyPresentation} from "@/utils/verify";
  import {createPresentation} from "../../utils/createPresentation";

  @Options({
    props: {
    },
    components: {
    },
  })
  export default class Setup extends Vue {
    mnemonic = ''
    address = ''
    did_mnemonic = ''
    claimer_did_mnemonic = ''
    loading = {
      generateAttestersWallet: false,
      generateDID: false,
      generateCType: false,
      generateClaimerWallet: false,
      generateClaim: false,
      verify: false
    }
    toast = useToast();
    onGenerateWallet(e) {
      this.loading['generateAttestersWallet'] = true;
      const { account, mnemonic } = generateAccount();
      this.mnemonic = mnemonic
      this.address = account.address;
      this.toast.add({severity:'info', summary: 'Got Document', detail:`Mnemonic: ${mnemonic}, Address: ${account.address}`, life: 3000});
      this.loading['generateAttestersWallet'] = false;
    }
    async onRequestDID(e) {
      this.loading['generateDID'] = true;
      await Kilt.connect(import.meta.env.VITE_WSS_ADDRESS as string)
      // Load attester account
      const attestersAccountMnemonic = import.meta.env.VITE_ATTESTER_ACCOUNT_MNEMONIC as string
      //IF WE DID NOT set the .env
      //const { account2, mnemonic2 } = generateAccount(accountMnemonic)
      const { account, mnemonic } = generateAccount(attestersAccountMnemonic);
      this.mnemonic = mnemonic
      this.address = account.address
      try{
        const didMnemonic = await createFullDid(account)
        this.did_mnemonic = JSON.stringify(didMnemonic.mnemonic)
        this.toast.add({severity:'info', summary: 'Got Document', detail:`${JSON.stringify(didMnemonic.fullDid)}`, life: 3000});
      } catch (e) {
        this.toast.add({severity:'error', summary: 'Failed', detail:'Error while creating attester DID', life: 3000});
        console.log('Error while creating attester DID')
        throw e
      } finally {
        this.loading['generateDID'] = false;
      }
    }


    //
    mounted() {
      //console.log(process.env.WSS_ADDRESS)
      // console.log(import.meta.env.MODE)
      // console.log()
    }

    async onDomainLinkageCType() {
      this.loading['generateCType'] = true;
      await Kilt.connect(import.meta.env.VITE_WSS_ADDRESS as string)
      const accountMnemonic = import.meta.env.VITE_ATTESTER_ACCOUNT_MNEMONIC as string
      const didMnemonic = import.meta.env.VITE_ATTESTER_DID_MNEMONIC as string
      const { account, mnemonic } = generateAccount(accountMnemonic)
      const { authentication, assertionMethod } = generateKeypairs(didMnemonic)
      const attesterDidUri = Kilt.Did.getFullDidUriFromKey(authentication[0])
      try{
        await ensureStoredCtype(account, attesterDidUri, async ({ data }) => ({
            signature: assertionMethod.sign(data),
            keyType: assertionMethod.type
          }),
          domainLinkageCType()
        )
      } catch (e) {
        console.log('Error while checking on chain ctype')
        throw e
      } finally {
        this.loading['generateCType'] = false;
      }
    }

    async onGenerateClaimerWalletandDid(){
      this.loading['generateClaimerWallet'] = true;
      await Kilt.connect(import.meta.env.VITE_WSS_ADDRESS as string)
      // Load attester account
      const accountMnemonic = import.meta.env.VITE_CLAIMER_DID_MNEMONIC as string
      //claimer
      const { account, mnemonic } = generateAccount(accountMnemonic);
      console.log(`ClaimerWallet mnemonic ${mnemonic}`)
      console.log(`ClaimerWallet account.address ${account.address}`);
      try{
        const didMnemonic = await generateLightDid(mnemonic)
        console.log(JSON.stringify(didMnemonic))
        this.claimer_did_mnemonic = mnemonic
        this.toast.add({severity:'info', summary: 'Got Document', detail:`${JSON.stringify(didMnemonic)}`, life: 3000});
      } catch (e) {
        this.toast.add({severity:'error', summary: 'Failed', detail:'Error while creating claimer DID', life: 3000});
        console.log('Error while creating claimer DID')
        throw e
      } finally {
        this.loading['generateClaimerWallet'] = false;
      }
    }

    async onClaim(){
      this.loading['generateClaim'] = true;
      await Kilt.init()
      const claimerDidMnemonic = import.meta.env.VITE_CLAIMER_DID_MNEMONIC as string
      const claimerDid = generateLightDid(claimerDidMnemonic)

      //lets claim something
      const request = generateCredential(claimerDid.uri, {
        age: 28,
        name: 'Max Mustermann'
      }, driversLicenseCType())
      console.log(JSON.stringify(request, null, 2))
      //save as _credential.json
      this.loading['generateClaim'] = false;
    }

    async onAttest() {
      this.loading['generateAttestation'] = true;
      const attesterAccountMnemonic = import.meta.env.VITE_ATTESTER_ACCOUNT_MNEMONIC as string
      console.log(`attesterAccountMnemonic ${attesterAccountMnemonic}`)
      const { account: attesterAccount } = generateAccount(
        attesterAccountMnemonic
      )
      const attesterDidMnemonic = import.meta.env.VITE_ATTESTER_DID_MNEMONIC as string
      console.log(`attesterDidMnemonic ${attesterDidMnemonic}`)
      const { authentication, assertionMethod } = generateKeypairs(attesterDidMnemonic)
      const attesterDidUri = Kilt.Did.getFullDidUriFromKey(authentication[0])
      console.log(`attesterDidUri ${attesterDidUri}`)

      const claimerDidMnemonic = import.meta.env.VITE_CLAIMER_DID_MNEMONIC as string
      console.log(`claimerDidMnemonic ${claimerDidMnemonic}`)
      const claimerDid = generateLightDid(claimerDidMnemonic)

      const credential = generateCredential(claimerDid.uri, {
        age: 27,
        name: 'Mia Musterfrau'
      }, driversLicenseCType())

      console.log(credential)
      try{
        await Kilt.connect(import.meta.env.VITE_WSS_ADDRESS as string)
        await Kilt.init()
        await attestCredential(
          attesterAccount,
          attesterDidUri,
          credential,
          async ({ data }) => ({
            signature: assertionMethod[0].sign(data),
            keyType: assertionMethod[0].type
          }))

        console.log('The claimer build their credential and now has to store it.')
        console.log('Add the following to your .env file. ')
        console.log(`CLAIMER_CREDENTIAL='${JSON.stringify(credential)}'`)
      } catch(e) {
        console.log('Error while going throw attesting workflow')
        throw e
      }
      finally {
        this.loading['generateAttestation'] = false;
      }


    }

    async verify() {
      this.loading['verify'] = true;
      const claimerDidMnemonic = import.meta.env.VITE_CLAIMER_DID_MNEMONIC as string
      const { authentication } = generateKeypairs(claimerDidMnemonic)
      const claimerDid = generateLightDid(claimerDidMnemonic)
      const attesterDidMnemonic = import.meta.env.VITE_ATTESTER_DID_MNEMONIC as string
      const attesterDidUri = Kilt.Did.getFullDidUriFromKey(generateKeypairs(attesterDidMnemonic).authentication[0])
      const credential = JSON.parse(import.meta.env.VITE_CLAIMER_CREDENTIAL as string)
      // const attesterDidUri = import.meta.env.VITE_ATTESTER_DID_URI as Kilt.DidUri

      await Kilt.connect(import.meta.env.VITE_WSS_ADDRESS as string)
      const api = Kilt.ConfigService.get('api')
      const challenge = getChallenge()
      console.log(attesterDidUri)
      try{
        const presentation = await createPresentation(
          credential,
          async ({ data }) => ({
            signature: authentication[0].sign(data),
            keyType: authentication[0].type,
            keyUri: `${claimerDid.uri}${claimerDid.authentication[0].id}`
          }),
          challenge
        )
        // The verifier checks the presentation.
        const isValid = await verifyPresentation(
          api,
          presentation,
          challenge,
          attesterDidUri
        )
        if (isValid) {
          console.log('Verification successful! You are allowed to enter the club 🎉')
        } else {
          console.log('Verification failed! 🚫')
        }
      }catch(e){
        console.log(e)
      }
      this.loading['verify'] = false;

    }

  }


</script>
<style>

</style>