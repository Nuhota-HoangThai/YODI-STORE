import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/images/logo.svg";
import "@/assets/styles/tailwind.css";
import "@/assets/styles/main.css";

import { registerGlobalComponent } from "./utils/import";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faUserSecret,
  faUserPlus,
  faPhoneVolume,
  faUser,
  faPhone,
  faMobile,
  faCartShopping,
  faHouse,
  faShop,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faUserSecret,
  faUserPlus,
  faPhoneVolume,
  faUser,
  faPhone,
  faMobile,
  faCartShopping,
  faHouse,
  faShop,
  faPlus
);

const app = createApp(App);

registerGlobalComponent(app);
app.use(router);
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
