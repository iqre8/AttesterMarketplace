<template>
  <div>
    <NavigationHeader />
    <LandingHero />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavigationHeader from "../components/NavigationHeader.vue";
import LandingHero from "../components/LandingHero.vue";
@Options({
  props: {
  },
  components: {
    NavigationHeader,
    LandingHero
  },
})
export default class Landing extends Vue {

}
</script>

<style scoped>
  * {
    width: 100%;
  }
</style>
