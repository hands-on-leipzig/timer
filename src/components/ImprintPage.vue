<template>
<div class="wrapper">
  <div>
  HANDS on TECHNOLOGY e.V.<br>
  Plautstraße 80<br>
  04179 Leipzig<br>
  Deutschland<br>
  <br>
  Telefon: +49 (0)341-246 1583<br>
  E-Mail: info@hands-on-technology.org<br>
  Website: www.hands-on-technology.org<br>
  <br>
  Registergericht Leipzig: VR 3683<br>
  USt-ID: DE 228402267<br>
  Vorstandsvorsitzende: Armin Gardeia, Irmgard Rothkirch<br>
  Geschäftsführung: Stefanie Sieber, Susanne Voigt<br>
  Melde Fehler & Wünsche auf <a href="https://github.com/hands-on-leipzig/jurytimer/issues/new" target="_blank">GitHub</a>.
  </div>
</div>
<div class="close-icon">
  <font-awesome-icon icon="fa-solid fa-circle-xmark" @click="this.emitter.emit('closeImprint')"/>
</div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
export default {
  name: "ImprintPAge",
  components: {FontAwesomeIcon}
}
</script>

<style scoped>
div.wrapper {
  position: fixed;
  overflow: auto;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-icon {
  position: fixed;
  top: .5em;
  right: .8em;
  font-size: 2em;
  z-index: 2001;
}
</style>