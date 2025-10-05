document.addEventListener('DOMContentLoaded', function() {
    const productSelect = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');
    const quantityError = document.getElementById('quantityError');
    const priceInfo = document.getElementById('priceInfo');
    
    productSelect.addEventListener('change', function() {
        updatePriceInfo();
    });
    
    function updatePriceInfo() {
        const selectedOption = productSelect.options[productSelect.selectedIndex];
        if (selectedOption.value) {
            const price = parseInt(selectedOption.value);
            const productName = selectedOption.text.split(' - ')[0];
            priceInfo.textContent = `${productName} - ${formatPrice(price)} руб. за единицу`;
        } else {
            priceInfo.textContent = '';
        }
    }
    
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    
    function validateQuantity(input) {
        const quantityRegex = /^\d+$/;
        return quantityRegex.test(input);
    }
    
    calculateBtn.addEventListener('click', function() {
        resultDiv.style.display = 'none';
        quantityError.style.display = 'none';
        
        const productPrice = parseInt(productSelect.value);
        const quantityValue = quantityInput.value.trim();
        
        if (!productPrice) {
            alert('Пожалуйста, выберите товар');
            return;
        }
        
        if (!validateQuantity(quantityValue)) {
            quantityError.style.display = 'block';
            quantityInput.classList.add('invalid');
            quantityInput.classList.remove('valid');
            return;
        }
        
        const quantity = parseInt(quantityValue);
        
        if (quantity <= 0) {
            quantityError.textContent = 'Количество должно быть больше 0';
            quantityError.style.display = 'block';
            quantityInput.classList.add('invalid');
            quantityInput.classList.remove('valid');
            return;
        }
        
        quantityInput.classList.remove('invalid');
        quantityInput.classList.add('valid');
        
        const totalCost = productPrice * quantity;
        
        const selectedProduct = productSelect.options[productSelect.selectedIndex].text.split(' - ')[0];
        resultDiv.innerHTML = `
            Стоимость заказа: <span style="color: #2e7d32;">${formatPrice(totalCost)} руб.</span><br>
            <small>${selectedProduct} × ${quantity} шт.</small>
        `;
        resultDiv.style.display = 'block';
    });
    
    quantityInput.addEventListener('input', function() {
        const value = quantityInput.value.trim();
        
        if (value === '') {
            quantityError.style.display = 'none';
            quantityInput.classList.remove('invalid', 'valid');
            return;
        }
        
        if (!validateQuantity(value)) {
            quantityError.style.display = 'block';
            quantityInput.classList.add('invalid');
            quantityInput.classList.remove('valid');
        } else {
            quantityError.style.display = 'none';
            quantityInput.classList.remove('invalid');
            quantityInput.classList.add('valid');
        }
    });
    
    updatePriceInfo();
});