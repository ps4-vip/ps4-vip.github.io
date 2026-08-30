
const UAElement = document.getElementById("UA");



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
      "Loading Offline Cache... [" + percent + "%]";
  }

  document.title =
    "Loading Offline Cache... [" + percent + "%]";
}
 
let zeekoAutoJbStarted = false;

function startAutoJbAfterCache() {
  if (zeekoAutoJbStarted) return;
  zeekoAutoJbStarted = true;

  setTimeout(function () {
      const traceStatus = document.getElementById("status");
      if (!navigator.onLine) doJb();
  }, 2000);
}

function displayCacheProgress() {
  const status = document.getElementById("status");

  if (status && !navigator.onLine) {
    status.textContent = "Loading GoldHEN v2.4b18.10... Please Wait";
  }

  setTimeout(function () {
    if (status) {
      startAutoJbAfterCache();
      status.classList.remove("loading");
      status.classList.add("success");
    }

   document.title = "✓";
  }, 1000);

  setTimeout(function () {
    document.title = "MUKALLA CITY HOST";
  }, 3000);
}

// ========================================================
// Startup
// ========================================================

document.addEventListener("DOMContentLoaded", function () {

  if (window.zeekoShowLoading) {
    window.zeekoShowLoading();
  }

  // AppCache

    if (window.applicationCache) {
      const appCache = window.applicationCache;

        const traceStatus = document.getElementById("status");

        let lastAppCacheStatus = appCache.status;

        const appCacheStatusTimer = setInterval(function () {
          if (appCache.status !== lastAppCacheStatus) {
            lastAppCacheStatus = appCache.status;


            if (
              appCache.status === appCache.IDLE ||
              appCache.status === appCache.UPDATEREADY
            ) {
              displayCacheProgress();
            }
          }
        }, 1000);
      appCache.addEventListener("progress", cacheProgress, false);

      appCache.oncached = displayCacheProgress;
      appCache.onupdateready = displayCacheProgress;

      // If AppCache is already ready, trigger completion flow.
      if (
        appCache.status === appCache.IDLE ||
        appCache.status === appCache.UPDATEREADY
      ) {
        displayCacheProgress();
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
