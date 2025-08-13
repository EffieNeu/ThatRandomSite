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

   


  });