<template>
  <div class="start-container" id="start">
    <div>
      <img :src="'img/hot-logo.png'"/>
    </div>
    <div>
      <span class="langs" @click="setLang('de')">g</span>
      &nbsp;
      <span class="langs" @click="setLang('en')">u</span>
      &nbsp;
      <font-awesome-icon class="langs" icon="fa-solid fa-circle-question" @click="this.emitter.emit('showManual')"/>
      <div @click="startCountdown()" class="start-button" v-if="!running">
        <span>Jury-Timer</span>
        <font-awesome-icon icon="fa-solid fa-circle-play" style="color: green"/>
      </div>
      <div @click="resetCountdown()" class="start-button" v-else>
        <span>Jury-Timer</span>
        <font-awesome-icon icon="fa-solid fa-circle-stop" style="color: red"/>
      </div>
    </div>
    <div>
      <img :src="'img/challenge-logo.png'"/>
    </div>
  </div>
  <TimeSlot v-for="slot in slots" :key="slot.name" :id="slot.name" :slot-data="slot" :lang="lang"/>
  <div v-if="paused" class="stop-button" @click="startCountdown(activeSlot)">
    <font-awesome-icon icon="fa-solid fa-circle-play" style="color: green;"/>
  </div>
  <div v-if="running && !paused" class="stop-button" @click="pauseCountdown()">
    <font-awesome-icon icon="fa-solid fa-circle-pause" style="color: burlywood;"/>
  </div>
  <span v-if="lang === 'de'" @click="showingImprint = true" class="imprint">Impressum</span>
  <span v-else @click="showingImprint = true" class="imprint">Imprint</span>
  <ImprintPage v-if="showingImprint" />
</template>

<script>
import TimeSlot from "@/components/TimeSlot";
import ImprintPage from "@/components/ImprintPage";

export default {
  name: "SlotsWrapper",
  components: {
    ImprintPage,
    TimeSlot,
  },
  data: function () {
    return {
      running: false,
      paused: false,
      activeSlot: '',
      showingImprint: false,
      lang: 'de',
      slots: {
        intro: {
          de: {
            heading: 'Aufbau',
            text: 'Begrüßt das Team kurz und lasst es dann in Ruhe das mitgebrachte Material aufbauen und die Technik anschließen und prüfen.',
          },
          en: {
            heading: 'Setup',
            text: 'Welcome the team briefly and then give them time to set up the materials they brought with them, connect to the projector and test it.',
          },
          time: '5:00',
          name: 'intro',
          next: 'welcome',
        },
        welcome: {
          de: {
            heading: 'Willkommen',
            text: 'Stellt euch vor und erklärt dem Team den Ablauf. Bittet danach das Team, sich vorzustellen, um mit ihm ins Gespräch zu kommen.',
          },
          en: {
            heading: 'Welcome',
            text: 'Introduce yourself and explain the procedure to the team. Then ask the team to introduce themselves to get into a conversation with them',
          },
          time: '2:00',
          name: 'welcome',
          next: 'research',
        },
        research: {
          de: {
            heading: 'Forschung: Teampräsentation',
            text: 'Das Team hat 5 Minuten Zeit, um sein Forschungsthema und seine innovative Lösung zu präsentieren. Achtet auf die Zeit und unterbrecht gegebenfalls.',
          },
          en: {
            heading: 'Research: Team presentation',
            text: 'The team has 5 minutes to present their research topic and the innovative solution they have worked on. Keep an eye on the time and stop the team if necessary',
          },
          time: '5:00',
          name: 'research',
          next: 'researchQ',
        },
        researchQ: {
          de: {
            heading: 'Forschung: Fragerunde',
            text: 'Kommt mit dem Team über seine Forschung ins Gespräch. Stellt z.B. Fragen zur Lösung und ihrer Anwendbarkeit oder zu den ExpertInnen, die befragt wurden.',
          },
          en: {
            heading: 'Research: Questions and answers',
            text: 'Establish a conversation with the team about their research. For example you can ask about the viability of their solution or about the experts that they have talked to.',
          },
          time: '5:00',
          name: 'researchQ',
          next: 'design',
        },
        design: {
          de: {
            heading: 'Roboterdesign: Teambericht',
            text: 'Das Team zeigt seinen Roboter, beschreibt Funktionen, Konstruktion und Programmierung.',
          },
          en: {
            heading: 'Robot Design: Team explanation',
            text: 'The team shows the robot they built and describes the robot‘s functionalities, construction and programming.',
          },
          time: '5:00',
          name: 'design',
          next: 'designQ',
        },
        designQ: {
          de: {
            heading: 'Roboterdesign: Fragerunde',
            text: 'Stellt Fragen zum Roboter, z.B. zur Software, zur Hardware, zur Lösung einzelner Aufgaben auf dem Spielfeld oder zum Entwicklungsprozess.',
          },
          en: {
            heading: 'Robot Design: Questions and answers',
            text: 'Ask questions about the robot, e.g. about the software and hardware, about how they solved different missions on the field or the development process.',
          },
          time: '5:00',
          name: 'designQ',
          next: 'corevalues',
        },
        corevalues: {
          de: {
            heading: 'Grundwerte',
            text: 'Nachdem ihr das Team während der Präsentationen beobachtet habt, könnt ihr nun weitere Fragen, z.B. zur Rollenverteilung oder zu den Grundwerten, stellen.',
          },
          en: {
            heading: 'Core Values',
            text: 'After you have observed the team during its presentations, you can now ask more follow-up questions, e.g. about distribution of roles or the Core Values.',
          },
          time: '3:00',
          name: 'corevalues',
          next: 'feedback',
        },
        feedback: {
          de: {
            heading: 'Feedback',
            text: 'Bedankt euch beim Team für seine tolle Arbeit und gebt konstruktives Feedback. Verabschiedet das Team.',
          },
          en: {
            heading: 'Feedback',
            text: 'Thank the team for their great work and give constructive feedback. Then say good by to the team.',
          },
          time: '5:00',
          name: 'feedback',
          next: 'start',
        }
      },
    }
  },
  methods: {
    setLang(lang) {
      this.lang = lang;
      this.emitter.emit('setLang', lang);
    },
    startCountdown(next = 'intro') {
      this.running = true;
      this.paused = false;
      this.emitter.emit('next', next);
    },
    pauseCountdown() {
      this.paused = true;
      this.emitter.emit('stop');
    },
    resetCountdown() {
      this.emitter.emit('stop');
      this.emitter.emit('reset');
      document.getElementById('start').scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
      this.running = false;
    },
  },
  mounted() {
    this.resetCountdown();
    if (localStorage.getItem('hideManualFuture') === 'false') this.emitter.emit('showManual');
    this.emitter.on('next', nextSlot => {
      this.running = true;
      this.activeSlot = nextSlot;
      document.getElementById(nextSlot).scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
      if (nextSlot === 'start') {
        this.emitter.emit('stop');
        this.emitter.emit('reset');
        this.running = false;
      } else {
        this.emitter.emit('start', nextSlot);
      }
    });
    this.emitter.on('closeImprint', () => {
      this.showingImprint = false;
    })
  },
}

</script>

<style scoped>
div.start-container {
  height: 60vh;
  margin: .5em;
  padding: .5em;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}

div.start-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 4em;
  border-radius: 50px;
}

div.start-button span {
  margin-bottom: .5em;
  font-size: .8em;
}

div.stop-button {
  position: fixed;
  left: .2em;
  bottom: 0;
  font-size: 4em;
}

img {
  max-width: 100%;
}

@font-face {
  font-family: 'flags';
  src: url("../../public/font/FlagsColor-AL4Gx.ttf") format('truetype');
}

.langs {
  font-family: flags;
  font-size: 2em;
}

span.imprint {
  text-decoration: underline;
  color: blue;
}
</style>