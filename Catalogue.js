const catalogueData = [
    { id: 1, name: "Le Bristol Paris", rating: "★★★★★", price: 1200, img: "Images/Bristol.jpg" },
    { id: 2, name: "Hotel Plaza Athénée", rating: "★★★★★", price: 1100, img: "Images/Athenee.jpg" },
    { id: 3, name: "The Ritz Paris", rating: "★★★★★", price: 1500, img: "Images/Ritz.jpg" },
    { id: 4, name: "Four Seasons George V", rating: "★★★★★", price: 1350, img: "Images/Seasons.jpg" },
    { id: 5, name: "Hôtel de Crillon", rating: "★★★★★", price: 950, img: "Images/Crillon.jpg" },
    { id: 6, name: "Mandarin Oriental, Paris", rating: "★★★★★", price: 1050, img: "Images/Mandarin.jpg" },
    { id: 7, name: "Saint James Paris", rating: "★★★★", price: 780, img: "Images/James.jpg" },
    { id: 8, name: "Pullman Paris Eiffel Tower", rating: "★★★★", price: 450, img: "Images/Pullman.jpg" },
    { id: 9, name: "Hotel Barrière Le Fouquet's", rating: "★★★★★", price: 1000, img: "Images/Barriere.jpg" },
    { id: 10, name: "Hotel Lutetia", rating: "★★★★★", price: 850, img: "Images/Lutetia.jpg" }
];


function populateHotelTable() {
    const tableBody = document.querySelector("#hotel-table tbody");
    
    tableBody.innerHTML = ''; 

    catalogueData.forEach(hotel => {
        const row = document.createElement("tr");
        
        const encodedName = encodeURIComponent(hotel.name);
        const encodedPrice = hotel.price;
        const encodedImg = encodeURIComponent(hotel.img);
        const hotelId = hotel.id;

        row.innerHTML = `
            <td>${hotel.id}</td>
            <td><img src="${hotel.img}" alt="${hotel.name}" style="width:150px; height:100px; object-fit: cover;"></td>
            <td>${hotel.name}</td>
            <td>${hotel.rating}</td>
            <td>$${hotel.price.toLocaleString()}</td>
            <td>
                <a href="booking_form.html?id=${hotelId}&hotel=${encodedName}&price=${encodedPrice}&img=${encodedImg}" class="book-btn">Book</a>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', populateHotelTable);