document.addEventListener('DOMContentLoaded', () => {
    fetch('Booked.php')
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector('#booking-table tbody');
            tbody.innerHTML = '';

            data.forEach(row => {
                const tr = document.createElement('tr');

                tr.innerHTML = `
                    <td>${row.HOTEL_NAME}</td>
                    <td>${row.DATE_IN.date.split(' ')[0]}</td>
                    <td>${row.DATE_OUT.date.split(' ')[0]}</td>
                    <td>${row.PRICE}</td>
                    <td>${row.STATUS}</td>
                    <td>
                        ${row.STATUS === 'UNPAID'
                            ? '<button class="btn btn-warning btn-sm" disabled>Payment Pending</button>'
                            : '<span class="text-success">Paid</span>'}
                    </td>
                `;

                tbody.appendChild(tr);
            });
        })
        .catch(err => console.error(err));
});
