// Generic UI helpers
document.addEventListener("DOMContentLoaded", function () {
  // Set years in footer
  const y = new Date().getFullYear();
  const yEls = [document.getElementById("year"), document.getElementById("year-2"), document.getElementById("year-3")];
  yEls.forEach(el => { if (el) el.textContent = y; });

  // Budget calculator
  const foodEl = document.getElementById("food");
  const travelEl = document.getElementById("travel");
  const stayEl = document.getElementById("stay");
  const totalEl = document.getElementById("total-amount");
  const clearBudget = document.getElementById("clear-budget");

  function calcBudget() {
    const f = Number(foodEl?.value || 0);
    const t = Number(travelEl?.value || 0);
    const s = Number(stayEl?.value || 0);
    const total = Math.max(0, f + t + s);
    if (totalEl) totalEl.textContent = total.toFixed(0);
  }

  [foodEl, travelEl, stayEl].forEach(inp => {
    if (!inp) return;
    inp.addEventListener("input", calcBudget);
  });
  if (clearBudget) clearBudget.addEventListener("click", function () {
    if (foodEl) foodEl.value = 0;
    if (travelEl) travelEl.value = 0;
    if (stayEl) stayEl.value = 0;
    calcBudget();
  });
  calcBudget();

  // Photo preview + simple UI-only reviews
  const photoInput = document.getElementById("photo-input");
  const photoPreview = document.getElementById("photo-preview");
  const addReviewBtn = document.getElementById("add-review");
  const photoCaption = document.getElementById("photo-caption");
  const reviewsList = document.getElementById("reviews");

  if (photoInput) {
    photoInput.addEventListener("change", function (e) {
      const f = e.target.files && e.target.files[0];
      if (!f) {
        if (photoPreview) photoPreview.textContent = "No image selected";
        return;
      }
      const reader = new FileReader();
      reader.onload = function (ev) {
        if (photoPreview) {
          photoPreview.innerHTML = `<img src="${ev.target.result}" alt="preview" style="max-width:100%; max-height:160px; border-radius:8px;">`;
        }
      };
      reader.readAsDataURL(f);
    });
  }

  if (addReviewBtn) {
    addReviewBtn.addEventListener("click", function () {
      const caption = (photoCaption && photoCaption.value.trim()) || "";
      const imageExists = photoPreview && photoPreview.querySelector("img");
      const node = document.createElement("div");
      node.className = "review-item";
      node.innerHTML = `<div style="display:flex; gap:.6rem; align-items:flex-start;">
          <div style="width:64px; height:64px; border-radius:6px; overflow:hidden; flex-shrink:0; background:#fff; display:flex;align-items:center;justify-content:center;">
            ${imageExists ? photoPreview.innerHTML : '<div style="color:#97a6b6; font-size:.8rem;">No image</div>'}
          </div>
          <div>
            <div style="font-weight:600">Photo Review</div>
            <div style="color:#5f6d7a; margin-top:.3rem;">${caption || "<span style='color:#adb7c4'>No caption</span>"}</div>
          </div>
        </div>`;
      if (reviewsList) reviewsList.prepend(node);

      // clear UI fields
      if (photoInput) photoInput.value = "";
      if (photoPreview) photoPreview.textContent = "No image selected";
      if (photoCaption) photoCaption.value = "";
    });
  }

  // Contact form validation (UI only)
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("c-name").value.trim();
      const email = document.getElementById("c-email").value.trim();
      const message = document.getElementById("c-message").value.trim();
      const feedback = document.getElementById("contact-feedback");

      function showFeedback(msg, ok = true) {
        if (!feedback) return;
        feedback.textContent = msg;
        feedback.style.color = ok ? "green" : "#d9534f";
      }

      if (!name || !email || !message) {
        showFeedback("Please fill all fields.", false);
        return;
      }
      // simple email pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showFeedback("Please enter a valid email address.", false);
        return;
      }

      // For prototype: show success message (no backend send)
      showFeedback("Thank you — your message has been received (UI only).");
      contactForm.reset();
    });
  }




  // Live Location sharing
const btnLocation = document.getElementById("share-location");
if (btnLocation) {
  btnLocation.onclick = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        document.getElementById("location-output").textContent =
          `Lat: ${pos.coords.latitude}, Long: ${pos.coords.longitude}`;
      },
      () => alert("Location permission denied")
    );
  };
}

// Weather placeholder (static)

async function getWeather() {
    const cityInput = document.getElementById("city"); // ✅ Correct variable
    const city = cityInput.value.trim();               // ✅ Getting value safely

    const apiKey = "977c5415a8470f6d852df5cba4989d97";  // Paste new API key here

    if (!city) {
        document.getElementById("weatherOutput").innerHTML = "<p style='color:red;'>Enter a city name!</p>";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod !== 200) {
            document.getElementById("weatherOutput").innerHTML = "<p style='color:red;'>City not found!</p>";
            return;
        }

        document.getElementById("weatherOutput").innerHTML = `
        <div style="background:#fff; padding:12px; border-radius:8px; margin-top:10px;">
            <h3 style="font-size:20px;">${data.name}</h3>
            <p>🌡 Temp: ${data.main.temp} °C</p>
            <p>☁ ${data.weather[0].description}</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
            <p>🌬 Wind: ${data.wind.speed} m/s</p>
        </div>`;
    } catch (err) {
        document.getElementById("weatherOutput").innerHTML = "<p style='color:red;'>Error fetching data.</p>";
    }
}






});
