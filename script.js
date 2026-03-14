let cart = [];
let totalSum = 0;

// ТВОЙ НИК В TELEGRAM (без @)
const YOUR_TELEGRAM_USERNAME = "ТВОЙ_НИК_В_ТГ"; 

function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    totalSum += price;
    updateCartUI();
    
    // Показываем уведомление
    alert(`Добавлено: ${itemName} за ${price} ₽`);
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('cart-total').innerText = totalSum;
}

function checkout() {
    if (cart.length === 0) {
        alert("Ваша корзина пуста!");
        return;
    }

    let orderDetails = "Привет! Хочу сделать заказ в tolik128shop:%0A%0A";
    
    cart.forEach((item, index) => {
        orderDetails += `${index + 1}. ${item.name} - ${item.price} ₽%0A`;
    });
    
    orderDetails += `%0A*Итого к оплате:* ${totalSum} ₽`;
    orderDetails += "%0A%0AМой игровой тег/ник: [напиши сюда]";

    // Создаем ссылку на Telegram
    let tgLink = `https://t.me/${YOUR_TELEGRAM_USERNAME}?text=${orderDetails}`;
    
    // Перенаправляем пользователя в телеграм
    window.location.href = tgLink;
}