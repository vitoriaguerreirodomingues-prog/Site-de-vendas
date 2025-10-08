document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os botões de 'Adicionar ao Carrinho'
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    // Seleciona o elemento que exibe a contagem do carrinho
    const cartCountElement = document.getElementById('cart-count');
    
    let cartItemCount = 0; // Variável para armazenar a contagem de itens

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Encontra o card do produto pai do botão
            const productCard = event.target.closest('.product-card');
            
            // Pega os dados do produto usando os atributos data-
            const productName = productCard.getAttribute('data-name');
            const productPrice = productCard.getAttribute('data-price');

            // 1. Simulação da Lógica do Carrinho
            cartItemCount++; // Incrementa a contagem de itens
            cartCountElement.textContent = cartItemCount; // Atualiza o contador na interface

            // 2. Feedback para o Usuário
            alert(`"${productName}" (R$ ${productPrice}) foi adicionado ao seu carrinho! Contagem atual: ${cartItemCount}`);
            
            // Em um site real, você enviaria esses dados para um servidor
            // ou armazenaria no LocalStorage/SessionStorage.
        });
    });
});document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total'); // NOVO ELEMENTO
    
    // Armazenamento simulado do carrinho
    let cart = [];
    let cartItemCount = 0;
    let cartTotalPrice = 0.00;

    // Função para atualizar a interface
    function updateCartUI() {
        cartCountElement.textContent = cartItemCount;
        // Formata o total com duas casas decimais
        cartTotalElement.textContent = cartTotalPrice.toFixed(2).replace('.', ','); 
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            
            // Pega os dados do produto e converte o preço para número
            const productName = productCard.getAttribute('data-name');
            const productPrice = parseFloat(productCard.getAttribute('data-price'));

            // 1. Lógica do Carrinho
            cart.push({ name: productName, price: productPrice, quantity: 1 });
            cartItemCount++; 
            cartTotalPrice += productPrice;

            // 2. Atualiza a interface
            updateCartUI();

            // 3. Feedback para o Usuário
            // Log no console para ver o carrinho
            console.log("Carrinho Atual:", cart); 
            
            // Alerta mais informativo
            alert(`✅ ${productName} adicionado! Total da Compra: R$ ${cartTotalPrice.toFixed(2).replace('.', ',')}`);
        });
    });
});// ... dentro do addEventListener
        
    // 2. Atualiza a interface (updateCartUI());
    updateCartUI();

    // 3. Efeito Visual de Destaque (NOVO)
    productCard.classList.add('added');
    
    // Remove o destaque após 1 segundo (1000 milissegundos)
    setTimeout(() => {
        productCard.classList.remove('added');
    }, 1000);

    // 4. Feedback para o Usuário
    alert(`✅ ${productName} adicionado! Total da Compra: R$ ${cartTotalPrice.toFixed(2).replace('.', ',')}`);
// ...document.addEventListener('DOMContentLoaded', () => {
    // ... (Mantenha todo o código anterior do Carrinho) ...
    
    // NOVO: Lógica de Filtro
    const filterSelect = document.getElementById('filter-price');
    const productCards = document.querySelectorAll('.product-card');

    filterSelect.addEventListener('change', (event) => {
        const selectedValue = event.target.value;

        productCards.forEach(card => {
            const price = parseFloat(card.getAttribute('data-price'));
            
            if (selectedValue === 'all') {
                // Se for "Mostrar Todos", exibe o card
                card.style.display = 'block'; 
            } else if (selectedValue === 'promo') {
                // Se for "Em Promoção" (preço < 150)
                if (price < 150.00) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none'; // Oculta o card
                }
            }
        });
    });
});