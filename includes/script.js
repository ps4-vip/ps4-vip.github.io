let timerId = null;
let cacheReady = false;

const jeilbrekBtn = document.getElementById("jeilbrek");
const UAElement = document.getElementById("UA");

const countdownText = document.getElementById("countdown");
const checkbox = document.getElementById("autoJbInput");

// Auto JB (default OFF)
const storedAutoJb = localStorage.getItem("autoJb");
const autoJbValue = storedAutoJb !== null ? storedAutoJb === "true" : false;

// Kernel exploit
let exploitChain = localStorage.getItem("exploitChain") || "lapse";

const netctrlRadio = document.getElementById("netctrl-exploit");
const lapseRadio = document.getElementById("lapse-exploit");
const kexForm = document.getElementById("kernel-options");

// User Agent
UAElement.textContent += " " + navigator.userAgent;

// ========================================================
// Kernel Selection
// ========================================================

kexForm.addEventListener("change", function (event) {
  exploitChain = event.target.value;

  localStorage.setItem("exploitChain", exploitChain);
});

// ========================================================
// Jailbreak Button
// ========================================================


// ========================================================
// Auto Jailbreak
// ========================================================

// ========================================================// AppCache
// ========================================================

function cacheProgress(e) {
  const status = document.getElementById("status");

  if (!window.cacheDisplayPercent) {
    window.cacheDisplayPercent = 1;
  }

  if (window.cacheDisplayPercent < 100) {
    window.cacheDisplayPercent++;
  }

  const percent = window.cacheDisplayPercent;

  if (status) {
    status.textContent =
      "Installing offline cache: " + percent + "%";
  }

  document.title =
    "Installing offline cache: " + percent + "%";
}
 
function displayCacheProgress() {
  const status = document.getElementById("status");

  if (status) {
    status.textContent = "Loading GoldHEN v2.4b18.10... Please Wait";
  }

  cacheReady = true;


  setTimeout(function () {
    document.title = "MUKALLA CITY HOST";
  }, 3000);
}

// ========================================================
// Startup
// ========================================================

document.addEventListener("DOMContentLoaded", function () {
    // AppCache

  if (window.applicationCache) {
    window.applicationCache.addEventListener("progress", cacheProgress, false);

    window.applicationCache.oncached = displayCacheProgress;

    window.applicationCache.onupdateready = displayCacheProgress;
  }

  // Offline Auto Jailbreak

if (!navigator.onLine && window.applicationCache) {

  if (
    window.applicationCache.status === window.applicationCache.CACHED ||
    window.applicationCache.status === window.applicationCache.UPDATEREADY
  ) {

    if (window.zeekoShowLoading) {
      window.zeekoShowLoading();
    }

    doJb();
  }

}

// Selected exploit

  if (exploitChain === "netctrl") {
    netctrlRadio.checked = true;
  } else {
    lapseRadio.checked = true;
  }

});

// ========================================================
// Background Console Auto Scroll
// ========================================================

const consoleElement = document.getElementById("console");

if (consoleElement) {
  const observer = new MutationObserver(function () {
    consoleElement.scrollTop = consoleElement.scrollHeight;
  });

  observer.observe(consoleElement, {
    childList: true,

    characterData: true,

    subtree: true,
  });
}

// ========================================================
// ZEEKO FX Loading UI
// ========================================================

(function () {
  const status = document.getElementById("status");

  if (!status) return;

  function showLoading() {
    status.textContent =
      "Loading GoldHEN v2.4b18.10... Please Wait";
    status.classList.add("loading");
  }

  function showSuccess() {
    status.textContent = "GoldHEN v2.4b18.10 Loaded Successfully ✓";
    status.classList.remove("loading");
    status.classList.add("success");
  }

  document.addEventListener("jb-success", showSuccess);

  document.addEventListener("jb-failed", function () {
    status.textContent = "Jailbreak Failed";
    status.classList.remove("loading");
  });

  window.zeekoShowLoading = showLoading;
})();
