import { createRouter, createHashHistory } from "@tanstack/react-router";

const history = createHashHistory();

const router = createRouter({
  history,
  defaultPreload: "intent",
});

export { router };
