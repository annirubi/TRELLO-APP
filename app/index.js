import { Desks } from "./Desks.js";
import { showTime } from "./utils/clock.js";

showTime();
setInterval(showTime, 1000);

new Desks(1).render();
