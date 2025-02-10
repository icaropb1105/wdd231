const hamburgerMenu = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');  

hamburgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');  
});


// Fetch the data from places.json
fetch('data/places.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('cards-container');

    data.forEach((place, index) => {
        const card = document.createElement('div');
        card.classList.add('discover-item');
        card.id = `item${index + 1}`;

        const paths = [
            `/wdd231/chamber/images/${place.image}`,
            `images/${place.image}`,                 
        ];

        const img = document.createElement("img");
        img.alt = place.name;
        img.loading = "lazy";

        function loadImage(index) {
            if (index >= paths.length) {
                img.src = "/wdd231/chamber/images/placeholder.webp"; 
                return;
            }
            img.src = paths[index];
            img.onerror = () => loadImage(index + 1); 
        }

        loadImage(0); 

        card.innerHTML = `
            <h2>${place.name}</h2>
            <figure></figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <p><strong>Cost:</strong> ${place.cost}</p>
        `;

        card.querySelector("figure").appendChild(img);
        container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar os dados dos locais:', error);
  });

  document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar-message"); // Target the sidebar message area
    const lastVisit = localStorage.getItem("lastVisit");
    const currentVisit = new Date().getTime();

    if (!lastVisit) {
        // First visit
        sidebar.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(parseInt(lastVisit));
        const timeDifference = currentVisit - lastVisitDate.getTime();
        const daysBetween = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert ms to days

        if (daysBetween < 1) {
            sidebar.textContent = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            sidebar.textContent = "You last visited 1 day ago.";
        } else {
            sidebar.textContent = `You last visited ${daysBetween} days ago.`;
        }
    }

    
    // Store current visit time in localStorage
    localStorage.setItem("lastVisit", currentVisit);
});

document.addEventListener("DOMContentLoaded", () => {
    const lastModifiedElement = document.getElementById("last-modified");
    if (lastModifiedElement) {
        const lastModified = new Date(document.lastModified);
        const formattedDate = lastModified.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

        lastModifiedElement.textContent = `Last Updated: ${formattedDate}`;
    }
});




