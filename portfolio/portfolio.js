let proj;

fetch('../portfolio/portfolio.json')
    .then(response => {
        return response.json();
    })
    .then(projects => {
        console.log(projects);
        proj = projects;
        parseData(projects);
    })
    .catch(err => {
        console.log(`error ${err}`);
    });

function parseData(data) {
    const projectsContainer = document.getElementById("projects");
    projectsContainer.innerHTML = ""; // clear just in case

    for (let i = 0; i < data.projects.length; i++) {
        const p = data.projects[i];

        // build the path from JSON instead of covers/cover (i).png
        const imgPath = `../portfolio/img/${p.folder}/${p.images[0]}.png`;
        const altText = p.alt_text && p.alt_text[0] ? p.alt_text[0] : p.name;

        projectsContainer.innerHTML += `
            <a href="../portfolio/${p.subdomain}.html">
                <div class="row project" id="${p.subdomain}">
                    <div class="projimg">
                        <img src="${imgPath}" alt="${altText}">
                    </div>
                    <div class="description">
                        <h2>${p.name}</h2>
                        <p>${p.abstract}</p>
                    </div>
                </div>
            </a>`;
    }
}

for (const b of document.querySelectorAll("#buttons button")) {
    b.addEventListener("click", e => {
        console.log(e.target.value);
        sortProjects(e.target.value);
    });
}

function sortProjects(button) {
    if (button === "clear") {
        for (let i = 0; i < proj.projects.length; i++) {
            document.getElementById(proj.projects[i].subdomain).style.display = "flex";
        }
    } else if (button !== undefined) {
        for (let i = 0; i < proj.projects.length; i++) {
            if (proj.projects[i].category.includes(button) === true) {
                document.getElementById(proj.projects[i].subdomain).style.display = "flex";
            } else {
                document.getElementById(proj.projects[i].subdomain).style.display = "none";
            }
        }
    } else {
        console.log("error, button value is undefined");
    }
}
