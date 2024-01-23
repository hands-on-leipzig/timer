<template>
  <div class="bubble" v-if="showingManual">
    <h3 v-text="texts[lang].heading"></h3>
    <ul>
      <li v-text="texts[lang].one"></li>
      <li v-text="texts[lang].two"></li>
      <li v-text="texts[lang].three"></li>
      <li v-text="texts[lang].four"></li>
      <li v-text="texts[lang].five"></li>
    </ul>
    <span><input type="checkbox" id="hide" v-model="hideManualFuture"> <label for="hide" v-text="texts[lang].checkbox"></label></span>
    <span class="close-link" @click="closeManual()" v-text="texts[lang].close"></span>
  </div>
</template>

<script>
export default {
  name: "BubbleManual",
  methods: {
    closeManual() {
      this.showingManual = false;
      localStorage.setItem('hideManualFuture', this.hideManualFuture);
    }
  },
  data: function() {
    return {
      showingManual: false,
      hideManualFuture: false,
      lang: 'de',
      texts: {
        de: {
          heading: 'Jury-Timer - Anleitung',
          one: 'Grünen Play-Button antippen. Erster Timer läuft an.',
          two: 'Wenn die Zeit für einen Abschnitt vorbei ist, springt der Timer automatisch zum nächsten.',
          three: 'Wenn die Jury mit einem Abschnitt früher fertig ist, durch Tippen auf den Pfeil runter den nächsten Abschnitt starten.',
          four: 'Am Ende durch Klick auf die karierte Fahne alles auf Anfang zurücksetzen.',
          five: 'Im Notfall kann der Timer links unten pausiert und wieder gestartet werden.',
          checkbox: 'Anleitung künftig nicht mehr anzeigen',
          close: '>> Anleitung verbergen <<',
        },
        en: {
          heading: 'Jury-Timer - Manual',
          one: 'Tap on green play button. Timer will start.',
          two: 'When time of one section is up, the timer will jump to the next section automatically.',
          three: 'If the jury is finished with a section early just tap the arrow down button to start the next section.',
          four: 'In the reset the timer by tapping the checkered flag.',
          five: 'If needed you can pause and then continue the timer in the bottom left corner.',
          checkbox: 'Do not show this in the future',
          close: 'Close manual',
        }
      }
    }
  },
  mounted() {
    this.hideManualFuture = localStorage.getItem('hideManualFuture') === 'true' ? localStorage.getItem('hideManualFuture') : 'false';
    this.emitter.on('showManual', () => {
      this.showingManual = true;
    });
    this.emitter.on('setLang', lang => {
      this.lang = lang;
    });
  }
}
</script>

<style scoped>
div.bubble {
  margin: .5em;
  padding: 1em;
  background: rgba(0, 0, 0, .8);
  color: white;
  border-radius: 50px;
  position: fixed;
  z-index: 3000;
  top: 2.5em;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

ul {
  text-align: left;
}

h3 {
  margin-block-end: 0;
}

.close-link {
  color: lightblue;
}

</style>