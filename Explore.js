

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png"
});

const PARIS_RECT = "2.2241,48.8155,2.4699,48.9021";

const map = L.map("my-map").setView([48.8566, 2.3522], 13);

L.tileLayer(
  `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${myAPIKey}`,
  { maxZoom: 20 }
).addTo(map);

const markersLayer = L.layerGroup().addTo(map);

function searchPlaces() {
  const category = document.getElementById("category").value;

  const url =
    `https://api.geoapify.com/v2/places` +
    `?categories=${category}` +
    `&filter=rect:${PARIS_RECT}` +
    `&bias=rect:${PARIS_RECT}` +
    `&limit=20` +
    `&apiKey=${myAPIKey}`;

  markersLayer.clearLayers();

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.features || data.features.length === 0) {
        alert("No places found inside Paris.");
        return;
      }

      data.features.forEach(feature => {
        const [lon, lat] = feature.geometry.coordinates;

        if (
          lon < 2.2241 || lon > 2.4699 ||
          lat < 48.8155 || lat > 48.9021
        ) return;

        const name = feature.properties.name || "Unnamed place";
        const address = feature.properties.formatted || "";

        const popupContent = `
          <div style="max-width: 200px; text-align: center;">
            <b>${name}</b>
            <br>${address}
          </div>
        `;

        L.marker([lat, lon])
          .bindPopup(popupContent)
          .addTo(markersLayer);
      });
    })
    .catch(err => console.error("Geoapify error:", err));
}

function formatNewsDate(isoDate) {
  if (!isoDate) return "N/A";
  try {
    const date = new Date(isoDate);

    const timeString = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "UTC"
    });

    const dateString = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC"
    });

    return `${dateString} ${timeString}`;
  } catch (e) {
    return "Invalid Date";
  }
}

function fetchAndRenderNewsTable() {
  const tableBody = document.getElementById("newsTableBody");

  if (!myNewsAPIKey) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="alert alert-danger text-center">
          Error: News API Key is missing.
        </td>
      </tr>
    `;
    return;
  }

  const newsUrl = `https://newsdata.io/api/1/latest?apikey=${myNewsAPIKey}&q=paris&language=en&country=fr`;

  tableBody.innerHTML = `
    <tr>
      <td colspan="6" class="text-center p-3 text-secondary">
        Loading news...
      </td>
    </tr>
  `;

  fetch(newsUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      tableBody.innerHTML = "";

      if (data.results && data.results.length > 0) {
        data.results.slice(0, 6).forEach(article => {
          const row = document.createElement("tr");

          const newsCell = document.createElement("td");
          newsCell.classList.add("d-flex", "align-items-center", "py-3");

          const img = document.createElement("img");
          img.setAttribute(
            "src",
            article.image_url || "https://via.placeholder.com/80x60?text=No+Img"
          );
          img.setAttribute("alt", article.title);
          img.setAttribute("width", "80");
          img.setAttribute("height", "60");
          img.style.objectFit = "cover";
          img.style.marginRight = "10px";
          img.style.borderRadius = "5px";

          const titleLink = document.createElement("a");
          titleLink.setAttribute("href", article.link);
          titleLink.setAttribute("target", "_blank");
          titleLink.style.textDecoration = "none";
          titleLink.style.color = "black";
          titleLink.style.fontWeight = "bold";
          titleLink.textContent = article.title;

          newsCell.appendChild(img);
          newsCell.appendChild(titleLink);
          row.appendChild(newsCell);

          const dateCell = document.createElement("td");
          dateCell.textContent = formatNewsDate(article.pubDate);
          row.appendChild(dateCell);

          const countryCell = document.createElement("td");
          countryCell.textContent =
            article.country && article.country.length > 0
              ? article.country[0].toUpperCase()
              : "Global";
          row.appendChild(countryCell);

          const categoryCell = document.createElement("td");
          categoryCell.textContent =
            article.category && article.category.length > 0
              ? article.category[0]
              : "General";
          row.appendChild(categoryCell);

          const publisherCell = document.createElement("td");
          publisherCell.textContent = article.source_id || "Unknown";
          row.appendChild(publisherCell);

          const sentimentCell = document.createElement("td");
          sentimentCell.textContent = "Neutral";
          row.appendChild(sentimentCell);

          tableBody.appendChild(row);
        });
      } else {
        tableBody.innerHTML = `
          <tr>
            <td colspan="6" class="alert alert-info text-center">
              No recent news articles found for Paris in France.
            </td>
          </tr>
        `;
      }
    })
    .catch(error => {
      console.error("News API Error:", error);
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="alert alert-danger text-center">
            Failed to load news. Please check your console for details.
          </td>
        </tr>
      `;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAndRenderNewsTable();
});
