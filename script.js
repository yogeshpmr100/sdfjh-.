function updateTime() {
    const now = new Date();
    const formatted = now.getFullYear() + '-' + 
                    String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                    String(now.getDate()).padStart(2, '0') + ' ' + 
                    String(now.getHours()).padStart(2, '0') + ':' + 
                    String(now.getMinutes()).padStart(2, '0') + ':' + 
                    String(now.getSeconds()).padStart(2, '0');
    document.getElementById('lastUpdate').textContent = formatted;
}

function checkStatus() {
    updateTime();
    // Add status check functionality here
    fetch('/bot-status')
        .then(response => response.json())
        .then(data => {
            document.getElementById('botStatus').textContent = data.status;
            document.querySelector('.status-box').classList.toggle('offline', !data.online);
        })
        .catch(error => console.error('Error:', error));
}

function reconnectBot() {
    updateTime();
    // Add reconnection functionality here
    fetch('/reconnect', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            checkStatus();
        })
        .catch(error => console.error('Error:', error));
}

// Update time every second
setInterval(updateTime, 1000);
updateTime(); // Initial update
