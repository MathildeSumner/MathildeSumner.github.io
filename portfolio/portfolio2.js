let subdomain = window.location.href.slice(window.location.href.lastIndexOf("/") + 1, window.location.href.lastIndexOf("."));
console.log(subdomain);

fetch('../portfolio/portfolio.json')
    .then(response => response.json())
    .then(projects => {
        findProjectInJSON(projects);
    })
    .catch(err => console.log(`Error: ${err}`));

function findProjectInJSON(projects) {
    for (let i = 0; i < projects.projects.length; i++) {
        if (projects.projects[i].subdomain === subdomain) {
            buildPage(projects.projects[i]);
            break;
        }
    }
}

//build the page//
function buildPage(project) {
    console.log(project);

    
    document.getElementById("project").innerHTML += `<h1 id="title">${project.name}</h1>`;

    // figure out which img folder//
    let folderPath = getFolderPath(project);

    // Build the carousel//
    buildCarousel(project.images, project.alt_text, folderPath);

    document.getElementById("project").innerHTML += `<h2 id="description">${project.description}</h2>`;

}

function getFolderPath(project) {
    const name = project.name.toLowerCase();

    if (name.includes("landscape")) {
        return "landscapes";
    } else if (name.includes("ceramic")) {
        return "ceramics";
    } else if (name.includes("website")) {
        return "website";
    } else if (name.includes("mario")) {
        return "mario";
    } else {
        return "records";
    }

}

function buildCarousel(images, altTexts, folderPath) {
    const displayedImage = document.querySelector('.displayed-img');
    const thumbBar = document.querySelector('.thumb-bar');

    // Check if there are images in the array
    if (!images || images.length === 0) {
        console.log("No images available.");
        return; 
    }

    // Set the initial displayed image
    if (images[0]) {
        displayedImage.src = `../portfolio/img/${folderPath}/${images[0]}.png`;
        displayedImage.alt = altTexts ? altTexts[0] : '';
    }

    // add thumbnails to the thumb-bar
    images.forEach((image, index) => {
        const newImage = document.createElement('img');
        const imgPath = `../portfolio/img/${folderPath}/${image}.png`;  

        newImage.src = imgPath;
        newImage.alt = altTexts ? altTexts[index] : '';
        
        // click on the thumbnail to make it the displayed image
        newImage.addEventListener('click', (e) => {
            displayedImage.src = e.target.src;
            displayedImage.alt = e.target.alt;
        });

        thumbBar.appendChild(newImage);
    });
}
