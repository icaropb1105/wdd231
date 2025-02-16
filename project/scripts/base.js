document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-links');

    if (!hamburgerMenu || !navMenu) {
        console.error("Erro: Elementos não encontrados!");
        return;
    }

    hamburgerMenu.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });
});


  
  document.addEventListener('DOMContentLoaded', function () {
    fetch('data/products.json')
    .then(response => response.json())
      .then(products => {
        const shuffledProducts = products.sort(() => Math.random() - 0.5);
        
        const selectedProducts = shuffledProducts.slice(0, 3);
        
        const highlightContainer = document.getElementById('highlight-products');

        selectedProducts.forEach(product => {
          const productCard = document.createElement('div');
          productCard.classList.add('product-card');

          productCard.innerHTML = `
    <img src="${product.image}" alt="${product.name}" loading="lazy">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <p class="price">$${product.price.toFixed(2)}</p>
    <a href="products.html?id=${product.id}">View Product</a>
`;

          
          highlightContainer.appendChild(productCard);
        });
      })
      .catch(error => {
        console.error('Error loading products:', error);
      });
  });

document.getElementById('last-modified-date').textContent = new Date(document.lastModified).toLocaleDateString();






// PRODUCTS DISPLAAAAAAAAAAAAAAAAAYYYYYYY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
document.addEventListener('DOMContentLoaded', function () {
  const productsUrl = 'data/products.json'; // Caminho para o arquivo JSON
  const productsContainer = document.getElementById('products-container');
  const modal = document.getElementById('product-modal');
  const closeModal = document.getElementById('close-modal');
  const productDetails = document.getElementById('product-details');

  // Função para carregar os produtos
  function loadProducts() {
    fetch(productsUrl)
      .then(response => response.json()) // Converter resposta em JSON
      .then(products => {
        // Limpar qualquer conteúdo anterior no container de produtos
        productsContainer.innerHTML = '';

        // Iterar sobre os produtos e criar cards para cada um
        products.forEach(product => {
          const productCard = document.createElement('div');
          productCard.classList.add('product-card');

          // Inserir conteúdo dentro de cada card de produto
          productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="view-product-btn" data-product-id="${product.id}">View Product</button>
          `;

          // Adicionar o card ao container de produtos
          productsContainer.appendChild(productCard);
        });

        // Adicionar evento de clique para o botão "View Product"
        const viewButtons = document.querySelectorAll('.view-product-btn');
        viewButtons.forEach(button => {
          button.addEventListener('click', function () {
            const productId = button.getAttribute('data-product-id');
            openProductModal(productId, products);
          });
        });
      })
      .catch(error => console.error('Erro ao carregar os produtos:', error));
  }

  // Função para abrir o modal e exibir apenas os "Features" do produto
  function openProductModal(productId, products) {
    // Encontrar o produto baseado no ID
    const product = products.find(p => p.id == productId);

    if (product) {
      // Preencher o conteúdo do modal com apenas os "Features"
      const featuresList = product.features.map(feature => `<li>${feature}</li>`).join('');
      
      productDetails.innerHTML = `
        <h2>${product.name}</h2>
        <ul><strong>Features:</strong>${featuresList}</ul>
      `;

      // Exibir o modal
      modal.style.display = 'block';
    }
  }

  // Fechar o modal quando o usuário clica no botão "X"
  closeModal.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  // Fechar o modal se o usuário clicar fora dele
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Carregar os produtos quando o conteúdo da página for carregado
  loadProducts();
});
