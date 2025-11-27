document.addEventListener("DOMContentLoaded", () => {
    // portfolio.js lives in /portfolio, so this hits /portfolio/portfolio.json
    fetch("portfolio.json")
      .then((response) => response.json())
      .then((data) => {
        const projects = data.projects;
  
        const listContainer = document.getElementById("projects");
        const detailContainer = document.getElementById("project");
  
        // Main portfolio page
        if (listContainer) {
          buildIndexPage(projects, listContainer);
          setupFilterButtons();
        }
  
        // Individual project detail pages
        if (detailContainer) {
          buildDetailPage(projects, detailContainer);
        }
      })
      .catch((err) => console.log(`Error: ${err}`));
  });
  
  // ---------- MAIN INDEX PAGE (home screen) ----------
  
  function buildIndexPage(projects, container) {
    projects.forEach((project) => {
      // This <a> is the whole card row
      const link = document.createElement("a");
      link.href = `${project.subdomain}.html`;
      link.className = "row project";
      link.id = project.subdomain;
      link.dataset.category = (project.category || []).join(",");
  
      // Image column
      const imgDiv = document.createElement("div");
      imgDiv.className = "projimg";
  
      const img = document.createElement("img");
      // portfolio.html is in /portfolio, so this points to /portfolio/img/...
      const imgPath = `img/${project.folder}/${project.images[0]}.png`;
      console.log("Card image for", project.name, "->", imgPath);
  
      img.src = imgPath;
      img.alt =
        project.alt_text && project.alt_text[0]
          ? project.alt_text[0]
          : project.name;
  
      imgDiv.appendChild(img);
  
      // Text column
      const descDiv = document.createElement("div");
      descDiv.className = "description";
  
      const title = document.createElement("h2");
      title.textContent = project.name;
  
      const abstract = document.createElement("p");
      abstract.textContent = project.abstract;
  
      descDiv.appendChild(title);
      descDiv.appendChild(abstract);
  
      // Assemble card
      link.appendChild(imgDiv);
      link.appendChild(descDiv);
      container.appendChild(link);
    });
  }
  
  // Category filter buttons (PhysicalArt / DigitalDesign / WebDesign / clear)
  function setupFilterButtons() {
    const buttons = document.querySelectorAll("#buttons button");
    const cards = document.querySelectorAll(".row.project");
  
    if (!buttons.length || !cards.length) return;
  
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const value = btn.value;
  
        cards.forEach((card) => {
          const categories = (card.dataset.category || "").split(",");
          if (value === "clear" || value === "" || categories.includes(value)) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }
  
  // ---------- DETAIL PAGE ----------
  
  function buildDetailPage(projects, container) {
    const subdomain = window.location.href.slice(
      window.location.href.lastIndexOf("/") + 1,
      window.location.href.lastIndexOf(".")
    );
    console.log("Detail subdomain:", subdomain);
  
    const project = projects.find((p) => p.subdomain === subdomain);
    if (!project) {
      console.error("No project found for subdomain:", subdomain);
      return;
    }
  
    // Title inside the peach card section
    const titleEl = document.createElement("h1");
    titleEl.id = "project-title";
    titleEl.textContent = project.name;
    container.insertBefore(titleEl, container.firstChild);
  
    // Carousel (uses pre-existing .displayed-img + .thumb-bar)
    buildCarousel(project.images, project.alt_text, project.folder);
  
    // Description (peach card text)
    const descriptionEl = document.createElement("h2");
    descriptionEl.id = "description";
    descriptionEl.textContent = project.description;
    container.appendChild(descriptionEl);
  }
  
  // ---------- CAROUSEL ----------
  
  function buildCarousel(images, altTexts, folderPath) {
    const displayedImage = document.querySelector(".displayed-img");
    const thumbBar = document.querySelector(".thumb-bar");
  
    if (!displayedImage || !thumbBar) {
      console.error(
        'Carousel elements not found. Need <img class="displayed-img"> and <div class="thumb-bar"> in the HTML.'
      );
      return;
    }
  
    if (!images || images.length === 0) {
      console.log("No images available for this project.");
      return;
    }
  
    // Detail pages are also in /portfolio/
    const basePath = `img/${folderPath}`;
  
    // Initial main image
    displayedImage.src = `${basePath}/${images[0]}.png`;
    displayedImage.alt = altTexts && altTexts[0] ? altTexts[0] : "";
  
    // Thumbnails
    images.forEach((image, index) => {
      const newImage = document.createElement("img");
      const imgPath = `${basePath}/${image}.png`;
  
      newImage.src = imgPath;
      newImage.alt = altTexts && altTexts[index] ? altTexts[index] : "";
  
      newImage.addEventListener("click", (e) => {
        displayedImage.src = e.target.src;
        displayedImage.alt = e.target.alt;
      });
  
      thumbBar.appendChild(newImage);
    });
  }
  