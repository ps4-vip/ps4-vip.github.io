
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
 
function displayCacheProgress() {
  const status = document.getElementById("status");

  if (status) {
  }

  setTimeout(function () {
    if (status) {
      status.textContent = "GoldHEN v2.4b18.10 Loaded Successfully ✓";
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
    window.applicationCache.addEventListener("progress", cacheProgress, false);

    window.applicationCache.oncached = function () {
      displayCacheProgress();

    };

    window.applicationCache.onupdateready = function () {
      displayCacheProgress();

    };
  }

  // Selected exploit

  if (exploitChain === "netctrl") {
    netctrlRadio.checked = true;
  } else {
    lapseRadio.checked = true;
  }

  // ZEEKO FX - Automatic Offline Jailbreak
  // Start only after AppCache is ready, with no countdown text.
  let autoJbStarted = false;

  function startOfflineAutoJb() {
    if (autoJbStarted) return;
    autoJbStarted = true;

    setTimeout(function () {
      doJb();
    }, 5000);
  }

  if (window.applicationCache) {
    const appCache = window.applicationCache;

    if (
      appCache.status === appCache.IDLE ||
      appCache.status === appCache.UPDATEREADY
    ) {
      startOfflineAutoJb();
    } else {
      appCache.addEventListener("cached", startOfflineAutoJb, false);
      appCache.addEventListener("updateready", startOfflineAutoJb, false);
    }
  } else {
    setTimeout(function () {
      doJb();
    }, 5000);
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
