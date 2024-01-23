<template>
  <div class="slot" :key="componentKey">
    <div>
      <div></div>
      <h3 v-text="slotData[lang].heading"></h3>
      <div class="text">
        <p v-text="slotData[lang].text"></p>
      </div>
      <div class="time" :id="timeID">
        <span :id="minID" v-text="initMin" class="minutes"></span>
        :
        <span :id="secID" v-text="initSec" class="seconds"></span>
      </div>
      <div v-if="slotData.next !== 'start'" class="next-arrow" @click="nextSlot()">
        <font-awesome-icon icon="fa-solid fa-circle-chevron-down"/>
      </div>
      <div v-else class="next-arrow" @click="nextSlot()">
        <font-awesome-icon icon="fa-solid fa-flag-checkered"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeSlot",
  props: {
    slotData: Object,
    lang: String,
  },
  data: function () {
    return {
      timeout: 0,
      minID: 'min-' + this.slotData.name,
      secID: 'sec-' + this.slotData.name,
      timeID: 'time-' + this.slotData.name,
      initMin: this.slotData.time.split(':')[0],
      initSec: this.slotData.time.split(':')[1],
      componentKey: 0
    }
  },
  mounted() {
    this.emitter.on('start', slot => {
      if (slot === this.slotData.name) this.countdown(document.getElementById(this.minID).innerHTML * 60 + document.getElementById(this.secID).innerHTML * 1);
      else this.emitter.emit('stop', slot);
    });
    this.emitter.on('stop', slot => {
      if (slot !== null && slot !== this.slotData.name) window.clearTimeout(this.timeout);
    });
    this.emitter.on('reset', () => {
      this.componentKey++;
    });
  },
  methods: {
    nextSlot() {
      window.clearTimeout(this.timeout);
      this.emitter.emit('next', this.slotData.next);
    },
    countdown(input) {
      document.getElementById(this.minID).innerHTML = Math.floor(input / 60);
      let seconds = Math.floor(input % 60);
      document.getElementById(this.secID).innerHTML = seconds < 10 ? "0" + seconds : seconds;

      if (input <= 10) {
        document.getElementById(this.timeID).style.color = "#d9232a";
      }

      if (input > 0) {
        input--;
        this.timeout = window.setTimeout(() => {
          this.countdown(input)
        }, 1000);
      } else {
        this.nextSlot();
      }
    }
  }
}
</script>

<style scoped>
div.slot {
  margin: .5em;
  padding: .5em;
  position: relative;
}

div.slot > div {
  background: #abd2e5;
  border-radius: 50px;
  display: grid;
  text-align: left;
  grid-template-columns: 1fr 4fr 3fr;
  grid-template-rows: 1fr 4fr;
  height: 70vh;
}

div.slot div.text {
  grid-column: 2/3;
}

div.slot div.time {
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 6em;
  font-weight: bold;
  grid-column: 3/4;
  grid-row: 1/3;
}

div.slot h3 {
  color: #d9232a;
  font-size: 2em;
  margin-block-end: 0;
  white-space: nowrap;
  grid-column: 2/4;
  grid-row: 1/2;
}

div.slot p {
  font-size: 1.2em;
}

div.slot div.next-arrow {
  position: absolute;
  right: 8vw;
  bottom: -.7em;
  z-index: 1000;
  font-size: 3.5em;
  padding: 0 .1em 0 .1em;
  border-radius: 25px;
}
</style>