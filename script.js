const quotes = [
      "The best revenge is massive success.",
      "Creativity is intelligence having fun. – Einstein (probably)",
      "404: Quote not found. Try again tomorrow.",
      "Those who think they can and those who think they can't are both usually right",
      "You do not fall to the value of your goals, you fall to the value of your system.",
      "Obsessed is just a word the lazy use to describe dedication",
      "Common sense is like deodrant, the people who need it most never use it",
      "Don’t watch the clock; do what it does. Keep going.",
      "Normality is a paved road: It’s comfortable to walk, but no flowers grow there.",
      "Some people want it to happen, some wish it would happen, others make it happen.",
      "If you want to fly, give up everything that weighs you down.",
      "Winners are not people who never fail, but people who never quit.",
      "It always seems impossible until it’s done.",
      "If you judge a fish by its ability to climb a tree it will live its whole life beliving hes an idiot"
    ];

    function getQuoteOfTheDay() {
      const today = new Date();
      const index = today.getFullYear() + today.getMonth() + today.getDate();
      return quotes[index % quotes.length];
    }

    document.getElementById('quote').textContent = getQuoteOfTheDay();

const form = document.getElementById('contact-form');

  form.addEventListener('submit', function (e) {
    const captchaResponse = grecaptcha.getResponse();

    if (captchaResponse.length === 0) {
      e.preventDefault();
      alert("Please complete the CAPTCHA.");
    }

    // Create tick marks
const ticksContainer = document.getElementById("ticks");
for (let i = 0; i <= 10; i++) {
  let tick = document.createElement("div");
  tick.style.transform = `rotate(${(-90 + i * 18)}deg) translateY(-65px)`;
  ticksContainer.appendChild(tick);
}

// Simple speed test function
function testSpeed() {
  const imageAddr = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg"; // ~5MB test file
  const startTime = (new Date()).getTime();
  const download = new Image();

  download.onload = function () {
    const endTime = (new Date()).getTime();
    const duration = (endTime - startTime) / 1000;
    const bitsLoaded = 5 * 1024 * 1024 * 8; // ~5MB in bits
    const speedMbps = (bitsLoaded / duration / 1024 / 1024).toFixed(2);
    updateSpeedometer(speedMbps);
  };

  download.onerror = function () {
    document.getElementById("speedText").innerText = "Error testing speed";
  };

  download.src = imageAddr + "?nnn=" + Math.random();
}

function updateSpeedometer(speed) {
  const needle = document.getElementById("needle");
  const speedText = document.getElementById("speedText");
  const maxSpeed = 100; // dial max
  const rotation = -90 + (speed / maxSpeed) * 180;
  needle.style.transform = `rotate(${rotation}deg)`;
  speedText.innerText = `${speed} Mbps`;
}

// Run on page load
window.onload = testSpeed;


  });