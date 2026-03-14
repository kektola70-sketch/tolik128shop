// ВПИШИ СВОЙ ЮЗЕРНЕЙМ В ТЕЛЕГРАМЕ (без @) ВМЕСТО "ТВОЙ_НИК_В_ТГ"
const YOUR_TELEGRAM_USERNAME = "nel_nagi128"; 

let cart = [];
let totalSum = 0;

function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    totalSum += price;
    updateCartUI();
    alert(`Добавлено: ${itemName} за ${price} ₽`);
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('cart-total').innerText = totalSum;
}

// Открытие окна оплаты
function openPaymentModal() {
    if (cart.length === 0) {
        alert("Ваша корзина пуста! Добавьте товар.");
        return;
    }
    // Записываем сумму в окно
    document.getElementById('modal-total-price').innerText = `${totalSum} ₽`;
    // Показываем окно
    document.getElementById('sbp-modal').style.display = 'flex';
}

// Закрытие окна оплаты
function closePaymentModal() {
    document.getElementById('sbp-modal').style.display = 'none';
}

// Когда человек нажал "Я перевел деньги"
function confirmPayment() {
    const playerTag = document.getElementById('player-tag').value;

    if (playerTag.trim() === "") {
        alert("Пожалуйста, введите ваш Тег или Ник в игре!");
        return;
    }

    // Формируем чек для отправки тебе в Телеграм
    let orderDetails = "🟢 НОВАЯ ОПЛАТА СБП! 🟢\n\n";
    orderDetails += `Покупатель нажал 'Я оплатил'.\n`;
    orderDetails += `*Ожидаемая сумма:* ${totalSum} ₽\n\n`;
    
    orderDetails += "🛒 *ЗАКАЗ:*\n";
    cart.forEach((item, index) => {
        orderDetails += `${index + 1}. ${item.name} - ${item.price} ₽\n`;
    });
    
    orderDetails += `\n🎮 *Игровой Тег/Ник:* ${playerTag}\n\n`;
    orderDetails += "Жду скриншот перевода, чтобы проверить оплату и выдать товар!";

    // Создаем безопасную ссылку с текстом для Telegram (encodeURIComponent предотвращает ошибки)
    let tgLink = `https://t.me/${YOUR_TELEGRAM_USERNAME}?text=${encodeURIComponent(orderDetails)}`;
    
    // Закрываем окно, очищаем корзину
    closePaymentModal();
    cart = [];
    totalSum = 0;
    updateCartUI();
    document.getElementById('player-tag').value = "";
    
    // Перекидываем в Телеграм
    window.location.href = tgLink;
}