<template>
  <div>
    <div v-if="is_supported_browser">
      <div v-if="has_sporran">
        <ul>
          <li>
            <a href="https://kilt-protocol.org/get-did/index.html" target="_blank">I don't yet have a DID</a>
          </li>
          <li>
            Pay
          </li>
        </ul>
      </div>
      <div v-else>
        <p>
          To create your Identity for using SocialKYC credentials, you will need
          to install the Sporran wallet which is a browser extension. Download
          Sporran here:
        </p>
        <SporranDownloadButton />
      </div>
    </div>
    <div v-else>
      <ChromeDownloadButton />
      <FirefoxDownloadButton />
      You need to use chrome/firefox
      https://www.sporran.org/
    </div>
  </div>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import ChromeDownloadButton from "@/components/ChromeDownloadButton.vue";
  import FirefoxDownloadButton from "@/components/FirefoxDownloadButton.vue";
  import SporranDownloadButton from "@/components/SporranDownloadButton.vue";
  @Options({
    props: {
    },
    components: {
      ChromeDownloadButton,
      FirefoxDownloadButton,
      SporranDownloadButton
    },
  })
  export default class ClaimerGetStarted extends Vue {
    get is_supported_browser(){
      const userAgent = navigator.userAgent;
      if(userAgent.match(/chrome|chromium|crios/i)){
        return true;
      }else if(userAgent.match(/firefox|fxios/i)) {
        return true;
      }else{
        return false;
      }
    }

    get has_sporran() {
      //Object.values(window.kilt); Go through array and check if there is one with name sporran
      return window.kilt.hasOwnProperty('sporran')
    }

  }
</script>
<style>

</style>