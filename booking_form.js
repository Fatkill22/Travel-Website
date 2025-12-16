function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function calculatePrice() {
    const basePrice = parseFloat(document.getElementById('base-price').value);
    const dateIn = document.getElementById('date-in').value;
    const dateOut = document.getElementById('date-out').value;
    
    const priceDisplay = document.getElementById('total-price');
    const nightsDisplay = document.getElementById('nights-booked');
    const priceInput = document.getElementById('total-price-hidden');
    const nightsInput = document.getElementById('nights-booked-hidden');

    if (!basePrice || !dateIn || !dateOut) {
        nightsDisplay.textContent = '0';
        priceDisplay.textContent = '--.--';
        priceInput.value = '';
        nightsInput.value = '';
        return;
    }

    const d1 = new Date(dateIn);
    const d2 = new Date(dateOut);

    if (d1 >= d2 || isNaN(d1) || isNaN(d2)) {
        nightsDisplay.textContent = 'Invalid Date Range';
        priceDisplay.textContent = 'Please choose valid dates.';
        priceInput.value = '';
        nightsInput.value = '';
        return;
    }

    const timeDiff = d2.getTime() - d1.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const nights = Math.round(timeDiff / oneDay);
    
    const totalPrice = basePrice * nights;
    
    nightsDisplay.textContent = nights;
    priceDisplay.textContent = `$${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    
    priceInput.value = totalPrice.toFixed(2);
    nightsInput.value = nights;
}

function initBookingFormPage() {
    const hotelId = getUrlParam('id');
    const hotelName = getUrlParam('hotel');
    const hotelPrice = getUrlParam('price');
    const hotelImg = getUrlParam('img');

    if (hotelName && hotelPrice) {
        document.getElementById('hotel-id').value = hotelId;
        document.getElementById('hotel-name').value = decodeURIComponent(hotelName);
        document.getElementById('base-price').value = hotelPrice;
        
        if (hotelImg) {
            document.getElementById('hotel-picture').src = decodeURIComponent(hotelImg);
            document.getElementById('hotel-picture').alt = decodeURIComponent(hotelName);
        }
    } else {
        document.getElementById('hotel-name').value = 'Error: Hotel details missing.';
    }

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date-in').setAttribute('min', today);
    document.getElementById('date-out').setAttribute('min', today);
}

document.addEventListener('DOMContentLoaded', initBookingFormPage);