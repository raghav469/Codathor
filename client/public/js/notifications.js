// Connect to Socket.io
const socket = io('http://localhost:5000');

// Join user room if logged in
const token = localStorage.getItem('token');
if (token) {
    const user = JSON.parse(localStorage.getItem('user'));
    socket.emit('join', user._id);
}

// Handle new notifications
socket.on('new-notification', (notification) => {
    showNotification(notification.message);
    updateNotificationBadge();
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.innerHTML = `
        <div class="notification-content">${message}</div>
        <button class="close-notification">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

async function updateNotificationBadge() {
    const response = await fetch('/api/notifications/unread-count', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    
    if (response.ok) {
        const data = await response.json();
        const badge = document.getElementById('notification-badge');
        if (badge) {
            badge.textContent = data.count > 0 ? data.count : '';
            badge.style.display = data.count > 0 ? 'flex' : 'none';
        }
    }
}

// Load notifications on page load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('token')) {
        updateNotificationBadge();
    }
});