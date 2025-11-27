// Run after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    fetch("../portfolio/portfolio.json")
      .then((response) => response.json())
      .then((data) => {
        const projects = data.projects;
  
        const listContainer = document.getElementById("projects");
        const detailContainer = document.getElementById("project");
  
        // If we're on the main portfolio page
        if (listContainer) {
          buildIndexPage(projects, listContainer);
        }
  
        // If we're on a project detail page
        if (detailContainer) {
          buildDetailPage(projects, detailContainer);
        }
      })
      .catch((err) => console.log(`Error: ${err}`));
  });
  
  // ---------- MAIN INDEX PAGE ----------
  
  function buildIndexPage(projects, container) {
    projects.forEach((project) => {
      const card = document.createElement("article");
      card.className = "project-card";
  
      const link = document.createElement("a");
      link.className = "project-link";
      link.href = `${project.subdomain}.html`;
  
      // Cover image
      const img = document.createElement("img");
      img.className = "project-cover";
      img.src = `../portfolio/img/${project.folder}/${project.images[0]}.png`;
      img.alt = project.alt_text && project.alt_text[0] ? project.alt_text[0] : project.name;
  
      // Text block
      const textDiv = document.createElement("div");
      textDiv.className = "project-text";
  
      const title = document.createElement("h2");
      title.textContent = project.name;
  
      const abstract = document.createElement("p");
      abstract.textContent = project.abstract;
  
      textDiv.appendChild(title);
      textDiv.appendChild(abstract);
  
      link.appendChild(img);
      link.appendChild(textDiv);
      card.appendChild(link);
  
      container.appendChild(card);
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
  
    // Title
    const titleEl = document.createElement("h1");
    titleEl.id = "title";
    titleEl.textContent = project.name;
    container.insertBefore(titleEl, container.firstChild);
  
    // Carousel
    const folderPath = project.folder;
    buildCarousel(project.images, project.alt_text, folderPath);
  
    // Description (goes after the carousel)
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
  
    const basePath = `../portfolio/img/${folderPath}`;
  
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
  