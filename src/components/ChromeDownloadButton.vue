<template>
  <Button type="button" @click="openBrowser">
        <span class="flex align-items-center px-2 bg-white-700 text-black">
          <ChromeLogo />
        </span>
    <span className="px-3 py-2 flex align-items-center text-white">Download Chrome</span>
  </Button>
</template>
<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import ChromeLogo from "../assets/ChromeLogo.vue";
  @Options({
    props: {
    },
    components: {
      ChromeLogo
    },
  })
export default class ChromeDownloadButton extends Vue {
    openBrowser(){
      window.open('https://www.google.com/chrome/', '_blank');
    }
}
</script>
<style scoped>
  button {
    background-color: #1a73e8;
  }
</style>