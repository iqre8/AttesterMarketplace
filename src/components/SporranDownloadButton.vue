<template>
  <Button type="button" @click="openBrowser">
        <span class="flex align-items-center px-2 bg-white-700 text-black">
          <SporranLogo />
        </span>
    <span className="px-3 py-2 flex align-items-center text-white">Download Sporran</span>
  </Button>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import SporranLogo from "../assets/SporranLogo.vue";
  @Options({
    props: {
    },
    components: {
      SporranLogo
    },
  })
export default class SporranDownloadButton extends Vue {
    openBrowser(){
      window.open(this.url, '_blank');
    }

    get url(){
      const userAgent = navigator.userAgent;
      if(userAgent.match(/chrome|chromium|crios/i)){
        return 'https://chrome.google.com/webstore/detail/djdnajgjcbjhhbdblkegbcgodlkkfhcl';
      }else if(userAgent.match(/firefox|fxios/i)) {
        return 'https://addons.mozilla.org/firefox/addon/sporran/';
      }else{
        return 'https://www.sporran.org/';
      }
    }
}
</script>
<style scoped>
  button {
    background-color: #1a73e8;
  }
</style>