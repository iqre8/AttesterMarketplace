<template>
  <Button type="button" @click="openBrowser">
        <span class="flex align-items-center px-2 bg-white-700 text-black">
          <FirefoxLogo />
        </span>
    <span className="px-3 py-2 flex align-items-center text-white">Download Firefox</span>
  </Button>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FirefoxLogo from "@/assets/FirefoxLogo.vue";
@Options({
  props: {
  },
  components: {
    FirefoxLogo
  },
})
export default class FirefoxDownloadButton extends Vue {
  openBrowser(){
    window.open('https://www.mozilla.org/en-US/firefox/download/thanks/', '_blank');
  }
}
</script>
<style scoped>
  button {
    background-color: #1a73e8;
  }
</style>