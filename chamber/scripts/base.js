// Função para carregar os membros do arquivo JSON
async function loadMembers() {
    try {
        const response = await fetch('data/members.json');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const members = await response.json();

        displayMembers(members);
    } catch (error) {
        console.error('Houve um erro ao carregar os dados:', error);
    }
}

const hamburgerMenu = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');  // O ID correto

hamburgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');  // Alterna a classe 'active' para mostrar/ocultar
});



function displayMembers(members) {
    const container = document.querySelector('.business-grid'); // O container onde os cards vão ser exibidos

    container.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('business-card');

        // Criando a estrutura do card
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <div class="business-info">
                <h3>${member.name}</h3>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Email:</strong> contact@${member.name.toLowerCase().replace(/\s+/g, '')}.com</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membershipLevel)}</p>
                <p><strong>Other Info:</strong> ${member.otherInfo}</p>
                <button class="contact-btn">Contact</button>
            </div>
        `;

        container.appendChild(card);
    });
}

function getMembershipLevel(level) {
    switch (level) {
        case 1: return 'Member';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Unknown';
    }
}

// layouts Grid and List
function toggleLayout(layout) {
    const container = document.getElementById('businessGrid');

    if (layout === 'grid') {
        container.classList.remove('list-view');
        container.classList.add('grid-view');
    } else if (layout === 'list') {
        container.classList.remove('grid-view');
        container.classList.add('list-view');
    }
}

document.addEventListener('DOMContentLoaded', loadMembers);

document.getElementById('last-modified').textContent = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
});

