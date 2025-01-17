// @ts-check

import { WormholeCanvas } from "./canvas.mjs";

export const VERSION = "1.2.0";

createServiceWorker();
setVersion(document.querySelectorAll(".version"));
document.getElementById("generate-form").addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmit();
})

async function createServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("/serviceWorker.js");
      console.log("Service worker has registered successfully! 🎉");
    } catch (e) {
      console.error("Error creating the service worker.");
      console.error(e);
    }
  } else {
    console.warn(
      "Unable to create the service worker: No serviceWorker in navigator."
    );
  }
}

/**
 * Set the current version to every specified nodes.
 * @param {NodeListOf<HTMLElement>} elements
 */
function setVersion(elements) {
  elements.forEach((node) => {
    node.innerText = `v ${VERSION}`;
  });
}

const qwCanvas = new WormholeCanvas();
const nameInput = /** @type {HTMLInputElement} */ (
  document.getElementById("nameInput")
);
const birthInput = /** @type {HTMLInputElement} */ (
  document.getElementById("birthdayInput")
);

/**
 * The method that will be triggered when "generate" clicked.
 */
function onSubmit() {
  // We have checked it in the form stage; thus,
  // we don't need to check it again.
  const valueToHash = `${nameInput.value}${birthInput.valueAsNumber}`;
  const seed = getHash(valueToHash);

  qwCanvas.seed = seed;
  qwCanvas.paint();

  for (const condRedirect of bundle) {
    if (condRedirect.condition(nameInput.value))
      qwCanvas.ClickHref = condRedirect.redirectURL;
  }
}

/** @typedef {{ condition: (input: string) => boolean, redirectURL: string }} ConditionalRedirect */
/** @typedef { ConditionalRedirect[] } ConditionalRedirectBundle */

/** @type { ConditionalRedirectBundle } */
const bundle = [
  // Thanks to GitHub Copliot! <3
  {
    condition: (input) =>
      input.toLowerCase() === "ybb" || input.includes("海子"),
    redirectURL: "https://www.bilibili.com/video/BV1wo4y1X7Tk",
  },
  {
    condition: (input) => input.includes("罕见"),
    redirectURL: "https://www.bilibili.com/video/BV1p64y1X7j2",
  },
  {
    condition: (input) => input.includes("嘉心糖") || input.includes("嘉然"),
    redirectURL: "https://www.bilibili.com/video/BV1FX4y1g7u8",
  },
  {
    condition: (input) => input.includes("何同学"),
    redirectURL: "https://www.bilibili.com/video/BV1244y1p7kt",
  },
  {
    condition: (input) =>
      input.toLowerCase().includes("ceylan") || input.includes("锡兰"),
    redirectURL: "https://www.bilibili.com/video/BV1RW411D7wE",
  },
  {
    condition: (input) => input.toLowerCase() === "原版",
    redirectURL: "https://youtu.be/pKKlGQtc_ss",
  },
  {
    condition: (input) => ["弹幕付", "弹幕附"].includes(input),
    redirectURL: "https://youtu.be/jfTK-Om5wiY",
  },
  {
    condition: (input) => input.toLowerCase() === "中之人",
    redirectURL: "https://space.bilibili.com/663362",
  },
  {
    condition: (input) => 
      input.includes("李天香") || input.includes("李大鸟"),
    redirectURL: "https://space.bilibili.com/10706866",
  },
];

/**
 * Get hash value of a string
 * @param {string} input
 * @returns {number}
 */
function getHash(input) {
  let hash = 0,
    i,
    chr;
  if (input.length === 0) return hash;
  for (i = 0; i < input.length; i++) {
    chr = input.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
