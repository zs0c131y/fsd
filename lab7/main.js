const API_BASE = "http://localhost:4000";
const resultsEl = document.getElementById("results");
const serviceInput = document.getElementById("serviceInput");
const categorySelect = document.getElementById("categorySelect");
const minRatingInput = document.getElementById("minRating");
const filterBtn = document.getElementById("filterBtn");
const clearBtn = document.getElementById("clearBtn");

async function fetchServices(params = {}) {
  const url = new URL("/api", API_BASE);
  Object.keys(params).forEach((k) => {
    if (params[k] !== undefined && params[k] !== "")
      url.searchParams.set(k, params[k]);
  });

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

function render(services) {
  resultsEl.innerHTML = "";
  if (!services || services.length === 0) {
    resultsEl.innerHTML =
      '<p class="col-span-full text-center text-gray-500">No services found</p>';
    return;
  }

  services.forEach((svc) => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow hover:shadow-md transition";
    card.innerHTML = `
      <h3 class="text-lg font-semibold text-blue-700">${svc.title}</h3>
      <p class="text-sm text-gray-600">Category: ${svc.category}</p>
      <p class="mt-2 text-gray-700">${svc.description}</p>
      <p class="mt-2 font-bold text-yellow-600">Rating: ${svc.rating} ⭐</p>
    `;
    resultsEl.appendChild(card);
  });
}

async function doFilter() {
  try {
    const params = {};
    const q = serviceInput.value.trim();
    if (q) params.service = q;
    const category = categorySelect.value;
    if (category) params.category = category;
    const minRating = minRatingInput.value;
    if (minRating) params.minRating = minRating;

    const data = await fetchServices(params);
    render(data.data);
  } catch (e) {
    resultsEl.innerHTML = `<p class="col-span-full text-red-500">Error: ${e.message}</p>`;
  }
}

filterBtn.addEventListener("click", doFilter);
clearBtn.addEventListener("click", () => {
  serviceInput.value = "";
  categorySelect.value = "";
  minRatingInput.value = "";
  doFilter();
});

// initial load
doFilter();
