let timerId = null;

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

jeilbrekBtn.addEventListener("click", function () {
  stopInterval();

  jeilbrekBtn.disabled = true;

  if (window.zeekoShowLoading) {
    window.zeekoShowLoading();
  }

if (!navigator.onLine) {
  doJb();
}

});

// ========================================================
// Auto Jailbreak
// ========================================================

checkbox.addEventListener("change", function () {
  localStorage.setItem("autoJb", checkbox.checked);

  if (checkbox.checked && !jeilbrekBtn.disabled) {
    jailbreakCountdown();
  } else {
    stopInterval();
  }
});

function stopInterval() {
  if (timerId !== null) {
    clearInterval(timerId);

    timerId = null;
  }

  countdownText.classList.add("hidden");
}

function jailbreakCountdown() {
  stopInterval();

  let countdown = 5;

  countdownText.classList.remove("hidden");

  countdownText.textContent = "Auto JB in " + countdown + "...";

  timerId = setInterval(function () {
    countdown--;

    if (countdown >= 0) {
      countdownText.textContent = "Auto JB in " + countdown + "...";
    }

    if (countdown < 0) {
      clearInterval(timerId);

      timerId = null;

      countdownText.textContent = "Executing...";

      jeilbrekBtn.disabled = true;

      if (window.zeekoShowLoading) {
        window.zeekoShowLoading();
      }

      doJb();
    }
  }, 1000);
}

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
  // AppCache

  if (window.applicationCache) {
    window.applicationCache.addEventListener("progress", cacheProgress, false);

    window.applicationCache.oncached = displayCacheProgress;

    window.applicationCache.onupdateready = displayCacheProgress;
  }

  // Selected exploit

  if (exploitChain === "netctrl") {
    netctrlRadio.checked = true;
  } else {
    lapseRadio.checked = true;
  }

  // ZEEKO FX - Automatic Jailbreak

  checkbox.checked = true;

  if (window.zeekoShowLoading) {
    window.zeekoShowLoading();
  }

  jeilbrekBtn.disabled = true;

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
