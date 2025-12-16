document.addEventListener('DOMContentLoaded', fetchAmadeusHotels);

async function fetchAmadeusHotels() {
    const tableBody = document.getElementById('hotel-table-body');
    const statusDiv = document.getElementById('status');
    tableBody.innerHTML = '';
    statusDiv.textContent = 'Loading hotel offers for Paris (Dec 20-21, 2025)...';
    
    const checkInDate = '2025-12-20';
    const checkOutDate = '2025-12-21';
    
    const apiUrl = `/api/hotels?checkIn=${checkInDate}&checkOut=${checkOutDate}`;
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || `HTTP error! status: ${response.status}`);
        }
        
        const hotels = await response.json();
        statusDiv.textContent = '';
        
        if (hotels.length === 0) {
            statusDiv.textContent = 'No hotel offers found for the specified dates.';
            return;
        }

        hotels.forEach((hotelOffer, index) => {
            const row = tableBody.insertRow();
            
            const hotelName = hotelOffer.hotel?.name || 'N/A';
            const price = hotelOffer.offers[0]?.price?.total || 'N/A';
            const currency = hotelOffer.offers[0]?.price?.currency || 'EUR';
            const hotelId = hotelOffer.hotel?.hotelId || 'N/A';
            const checkIn = hotelOffer.offers[0]?.checkInDate || 'N/A';

            row.insertCell(0).textContent = index + 1;
            row.insertCell(1).textContent = hotelName;
            row.insertCell(2).textContent = hotelId;
            row.insertCell(3).textContent = checkIn;
            row.insertCell(4).textContent = `${price} ${currency}`;
        });

    } catch (e) {
        statusDiv.textContent = `Error: ${e.message}. Ensure your Node.js server is running and API keys are set.`;
        tableBody.innerHTML = '';
    }
}