<template>
  <RobotGameTimer />
  <!--<BubbleManual/>
  <SlotsWrapper/>-->
</template>

<script>
//import SlotsWrapper from "@/components/SlotsWrapper";
//import BubbleManual from "@/components/BubbleManual";
import RobotGameTimer from "@/components/RobotGameTimer.vue";

export default {
  name: 'App',
  components: {
    RobotGameTimer,
//    BubbleManual,
  //  SlotsWrapper,
  },
  metaInfo: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
}
</script>

<style>
@font-face {
  font-family: 'metropolis';
  src: url("../public/font/Metropolis-Medium.otf") format('opentype');
}

@font-face {
  font-family: 'poppins';
  src: url("../public/font/Poppins-Medium.ttf") format('truetype');
  src: url("../public/font/Poppins-Regular.ttf") format('truetype');
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px 0 auto 0;
  font-family: 'poppins';
}
</style>
