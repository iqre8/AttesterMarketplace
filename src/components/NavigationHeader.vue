<template>
  <div class="py-0 px-4 mx-0 flex align-items-center justify-content-between relative lg:static mb-3">
    <a class="flex align-items-center" href="#"> <img src="@/assets/logo.svg" alt="Attesters Marketplace" height="50" class="mr-0 lg:mr-2" />
      <span class="text-300 font-medium text-2xl line-height-3 mr-8">Attesters Marketplace</span>
    </a>
    <div class="align-items-center flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2" style="top: 120px; border-radius: 6px" :style="navBarStyle">
      <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
        <li>
          <router-link to="/" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
            <span>Home</span>
          </router-link>
        </li>
        <li>
          <router-link to="/features" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
            <span>Features</span>
          </router-link>
        </li>
        <li>
          <router-link to="/highlights" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
            <span>Highlights</span>
          </router-link>
        </li>
        <li>
          <router-link to="/pricing" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
            <span>Pricing</span>
          </router-link>
        </li>
        <li>
          <router-link to="/claimer/getstarted" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
            <span>Claim</span>
          </router-link>
        </li>
      </ul>
      <div class="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
        <router-link to="/login">
          <Button label="Login"    class="p-button-rounded border-none font-light line-height-2 p-button-text bg-blue-500 text-white"></Button>
        </router-link>
        <router-link to="/register">
          <Button label="Register" class="p-button-rounded border-none font-light line-height-2 ml-5 bg-blue-500 text-white "></Button>
        </router-link>

      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
@Options({
  props: {
  },
  components: {
  },
})
export default class NavigationHeader extends Vue {
  get navBarStyle() {
    if(import.meta.env.PROD){
      return "background-color: rgb(33,53,71)"
    }else{
      return "background-color: rgb(255,0,0)"
    }
  }
}
</script>
<style>
  * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
  }
  ul{
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .menu li {
    padding: 5px 14px;
    float: Left;
  }

</style>