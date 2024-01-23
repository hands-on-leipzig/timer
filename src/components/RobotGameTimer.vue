<script>
export default {
  name: "RobotGameTimer",
  data: function () {
    return {
      seconds: 150
    }
  },
  mounted() {
    //setTimeout(function () {step(150)}, interval);
    stepDown(150)
  }
}

/*function countdown(seconds) {
  if (true != false) {

  }
}*/

let interval = 1000; // ms
let expected = Date.now();

function stepDown(sec) {
  let dt = Date.now() - expected;
  sec -= 1
  this.seconds = sec
  console.log(this.seconds)
  expected += interval
  if (sec > 0) {
    setTimeout(() => {stepDown(sec)}, Math.max(0, interval - dt))
  }
}

/*function step(seconds) {
  let dt = Date.now() - expected;
  if (dt < interval) {
    console.log("problem")
  }

  seconds += interval/1000;
  setTimeout(function () {step(seconds)}, Math.max(0, interval - dt))
}*/


</script>

<template>
  <div>
   <span v-text="(seconds / 60)" id="minutes"></span>:<span v-text="(seconds % 60)" id="seconds"></span>
  </div>
</template>

<style scoped>

</style>