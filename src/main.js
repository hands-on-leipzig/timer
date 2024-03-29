import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'

/* import the fontawesome core */
import {library} from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
    faAnglesDown,
    faFlagCheckered,
    faCirclePlay,
    faCirclePause,
    faCircleStop,
    faCircleChevronDown,
    faCircleXmark,
    faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
    faAnglesDown,
    faFlagCheckered,
    faCirclePlay,
    faCirclePause,
    faCircleStop,
    faCircleChevronDown,
    faCircleXmark,
    faCircleQuestion,
);

const emitter = mitt();

const app = createApp(App);
app.config.globalProperties.emitter = emitter;

app
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');
