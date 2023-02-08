<template>
  <div
      id="hero"
      style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
  >
    <div>
      <h1>Improve your service without all the heavy lifting</h1>
      <p>Give the user the privacy they deserve</p>
      <router-link to="/register">
        <Button label="Get Started" class="p-button-rounded text-xl border-none mt-5 bg-blue-500 font-normal text-white line-height-3 px-3"></Button>
      </router-link>
    </div>
    <div class="flex justify-content-center md:justify-content-end">
      <img src="/demo/images/landing/screen-1.png" alt="Hero Image" class="w-9 md:w-auto" />
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
  export default class LandingHero extends Vue {

  }
</script>
<style>
  #hero {
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #eeefaf 0%, #c3e3fa 100%);
    height: 700px;
    overflow: hidden;
  }

  @media screen and (min-width: 768px) {
    #hero {
      -webkit-clip-path: ellipse(150% 87% at 93% 13%);
      clip-path: ellipse(150% 87% at 93% 13%);
      height: 530px;
    }
  }

  @media screen and (min-width: 1300px) {
    #hero > img {
      position: absolute;
    }

    #hero > div > p {
      max-width: 450px;
    }
  }

  @media screen and (max-width: 1300px) {
    #hero {
      height: 600px;
    }

    #hero > img {
      position: static;
      transform: scale(1);
      margin-left: auto;
    }

    #hero > div {
      width: 100%;
    }

    #hero > div > p {
      width: 100%;
      max-width: 100%;
    }
  }
</style>