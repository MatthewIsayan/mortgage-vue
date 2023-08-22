import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";

import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import Card from "primevue/card";
import DynamicDialog from "primevue/dynamicdialog";
import DialogService from "primevue/dialogservice";
import InputText from "primevue/inputtext";

import "primevue/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import "@/assets/font.css";

import BaseLabelVue from "@/components/BaseLabel.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(DialogService);

app.component("Button", Button);
app.component("InputNumber", InputNumber);
app.component("Dropdown", Dropdown);
app.component("Card", Card);
app.component("DynamicDialog", DynamicDialog);
app.component("InputText", InputText);

app.component("BaseLabel", BaseLabelVue);

app.mount("#app");
