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





//home page!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// scripts/weather.js
const apiKey = "06283247b6e50b4abeb8ca5137117442";
const city = "Guarulhos,BR";
const units = "metric";
const currentWeatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
const forecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

// Display current weather
fetch(currentWeatherEndpoint)
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    })
    .then(data => {
        const weatherDiv = document.getElementById("current-weather");
        
        // Limpa o conteúdo atual da div
        weatherDiv.innerHTML = "";

        // Adiciona o título "Current Weather"
        weatherDiv.innerHTML += `<h2>Current Weather</h2>`;

        const icon = data.weather[0].icon; // Código do ícone
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`; // URL do ícone

        // Arredonda a temperatura para o inteiro mais próximo
        const temperature = Math.round(data.main.temp);

        weatherDiv.innerHTML += `
            <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">
            <p>Temperature: ${temperature}°C</p>
            <p>${data.weather[0].description}</p>
            <p>Wind: ${data.wind.speed} m/s</p>
        `;
    })
    .catch(error => console.error("Error fetching current weather:", error));

// Display weather forecast
fetch(forecastEndpoint)
    .then(response => response.json())
    .then(data => {
        const forecastDiv = document.getElementById("forecast");
        
        // Adiciona o título de previsão do tempo
        forecastDiv.innerHTML = `<h2>Weather Forecast</h2>`;

        // Agrupar as previsões por dia
        const forecastByDay = {};
        
        // Itera sobre a lista de previsões
        data.list.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const day = date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
            
            // Agrupa a previsão por dia (apenas a primeira previsão do dia)
            if (!forecastByDay[day]) {
                forecastByDay[day] = forecast;
            }
        });

        // Obter os 5 primeiros dias
        const forecastDays = Object.keys(forecastByDay).slice(0, 5);
        
        // Criar a exibição da previsão para os 5 primeiros dias
        const forecasts = forecastDays.map(day => {
            const forecast = forecastByDay[day];
            const temperature = Math.round(forecast.main.temp); // Arredondar a temperatura
            return `
                <div class="forecast-item">
                    <p>${day}</p>
                    <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].description}" class="weather-icon">
                    <p>${temperature}°C</p>  <!-- Temperatura arredondada -->
                    <p>${forecast.weather[0].description}</p>
                </div>
            `;
        });

        // Atualiza a interface com a previsão dos 5 primeiros dias
        forecastDiv.innerHTML += forecasts.join("");  // Adiciona as previsões abaixo do título
    })
    .catch(error => console.error("Error fetching weather forecast:", error));

fetch('data/members.json')  // Caminho do arquivo JSON
    .then(response => response.json())
    .then(data => {
        // Filtrar membros Gold e Silver
        const spotlightMembers = data.filter(member => member.membershipLevel === 1 || member.membershipLevel === 2);
        
        // Randomizar a seleção de membros
        const randomMembers = [];
        while (randomMembers.length < 3 && spotlightMembers.length > 0) {
            const randomIndex = Math.floor(Math.random() * spotlightMembers.length);
            randomMembers.push(spotlightMembers[randomIndex]);
            spotlightMembers.splice(randomIndex, 1); // Remove o membro selecionado
        }

        // Gerar os cartões de destaque
        const spotlightContainer = document.getElementById('spotlight-cards');
        spotlightContainer.innerHTML = randomMembers.map(member => {
            return `
                <div class="spotlight-card">
                    <img src="data/${member.image}" alt="${member.name}" />
                    <h3>${member.name}</h3>
                    <p>${member.otherInfo}</p>
                    <div class="contact-info">
                        <p><strong>Address:</strong> ${member.address}</p>
                        <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
                        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                        <p><strong>Membership Level:</strong> ${member.membershipLevel === 1 ? "Gold" : "Silver"}</p>
                    </div>
                </div>
            `;
        }).join('');
    })
    .catch(error => console.error("Error loading data:", error));
