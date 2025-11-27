// Get the subdomain from the URL (e.g., Cheeseburger_Mario_Kart from Cheeseburger_Mario_Kart.html)
let subdomain = window.location.href.slice(
    window.location.href.lastIndexOf("/") + 1,
    window.location.href.lastIndexOf(".")
  );
  console.log("Subdomain:", subdomain);
  
  // Load portfolio data
  fetch("../portfolio/portfolio.json")
    .then((response) => response.json())
    .then((projects) => {
      findProjectInJSON(projects);
    })
    .catch((err) => console.log(`Error: ${err}`));
  
  // Find the matching project by subdomain
  function findProjectInJSON(projects) {
    for (let i = 0; i < projects.projects.length; i++) {
      if (projects.projects[i].subdomain === subdomain) {
        buildPage(projects.projects[i]);
        break;
      }
    }
  }
  
  // Build the project page
  function buildPage(project) {
    console.log("Project:", project);
  
    const projectSection = document.getElementById("project");
    if (!projectSection) {
      console.error('No element with id="project" found in the HTML.');
      return;
    }
  
    projectSection.innerHTML += `<h1 id="title">${project.name}</h1>`;
  
    // figure out which img folder to use from JSON
    let folderPath = getFolderPath(project);
  
    // Build the carousel
    buildCarousel(project.images, project.alt_text, folderPath);
  
    projectSection.innerHTML += `<h2 id="description">${project.description}</h2>`;
  }
  
  // Get folder path from the project object
  function getFolderPath(project) {
    return project.folder;
  }
  
  // Build image carousel
  function buildCarousel(images, altTexts, folderPath) {
    const displayedImage = document.querySelector(".displayed-img");
    const thumbBar = document.querySelector(".thumb-bar");
  
    if (!displayedImage || !thumbBar) {
      console.error(
        'Carousel elements not found. Make sure you have an <img class="displayed-img"> and a <div class="thumb-bar"> in your HTML.'
      );
      return;
    }
  
    // Check if there are images in the array
    if (!images || images.length === 0) {
      console.log("No images available.");
      return;
    }
  
    const basePath = `../portfolio/img/${folderPath}`;
  
    // Set the initial displayed image
    displayedImage.src = `${basePath}/${images[0]}.png`;
    displayedImage.alt = altTexts && altTexts[0] ? altTexts[0] : "";
  
    // Add thumbnails to the thumb-bar
    images.forEach((image, index) => {
      const newImage = document.createElement("img");
      const imgPath = `${basePath}/${image}.png`;
  
      newImage.src = imgPath;
      newImage.alt = altTexts && altTexts[index] ? altTexts[index] : "";
  
      // click on the thumbnail to make it the displayed image
      newImage.addEventListener("click", (e) => {
        displayedImage.src = e.target.src;
        displayedImage.alt = e.target.alt;
      });
  
      thumbBar.appendChild(newImage);
    });
  }
  