const MAX_ATTENDEES = 50;
const checkInForm = document.getElementById("checkInForm");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const progressPercent = document.getElementById("progressPercent");
const waterCountEl = document.getElementById("waterCount");
const zeroCountEl = document.getElementById("zeroCount");
const powerCountEl = document.getElementById("powerCount");
const greeting = document.getElementById("greeting");
const celebration = document.getElementById("celebration");
const attendeeName = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

let totalAttendees = 0;
let waterCount = 0;
let zeroCount = 0;
let powerCount = 0;
let celebrationTimer = null;

function updateAttendanceDisplay() {
  attendeeCount.textContent = totalAttendees;
  const percentage = Math.min(100, (totalAttendees / MAX_ATTENDEES) * 100);
  progressBar.style.width = `${percentage}%`;
  progressPercent.textContent = `${Math.round(percentage)}%`;
  waterCountEl.textContent = waterCount;
  zeroCountEl.textContent = zeroCount;
  powerCountEl.textContent = powerCount;
}

function triggerCelebration() {
  if (!celebration.classList.contains("hidden")) {
    return;
  }

  celebration.classList.remove("hidden");

  if (celebrationTimer) {
    clearTimeout(celebrationTimer);
  }

  celebrationTimer = setTimeout(function () {
    celebration.classList.add("hidden");
  }, 4200);
}

function showGreeting(name, teamLabel) {
  greeting.textContent = `Welcome, ${name}! Checked in with ${teamLabel}.`;
  greeting.className = "success-message";
  greeting.style.display = "block";
}

checkInForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = attendeeName.value.trim();
  const team = teamSelect.value;

  if (!name || !team) {
    greeting.textContent = "Please enter a name and select a team to check in.";
    greeting.className = "";
    greeting.style.display = "block";
    return;
  }

  let teamLabel = "";
  if (team === "water") {
    waterCount += 1;
    teamLabel = "Team Water Wise";
  } else if (team === "zero") {
    zeroCount += 1;
    teamLabel = "Team Net Zero";
  } else if (team === "power") {
    powerCount += 1;
    teamLabel = "Team Renewables";
  }

  totalAttendees += 1;
  updateAttendanceDisplay();
  showGreeting(name, teamLabel);

  if (totalAttendees >= MAX_ATTENDEES) {
    triggerCelebration();
  }

  attendeeName.value = "";
  teamSelect.selectedIndex = 0;
});
