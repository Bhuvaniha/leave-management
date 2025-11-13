// Sample leave balances
const leaveBalances = {
    casual: 12,
    medical: 10,
    vacation: 20
};

// Function to display leave balances
function displayLeaveBalances() {
    const balanceContainer = document.getElementById('balance-container');
    balanceContainer.innerHTML = '';

    for (const [type, days] of Object.entries(leaveBalances)) {
        const balanceCard = document.createElement('div');
        balanceCard.className = 'balance-card';
        balanceCard.innerHTML = `
            <h3>${type.charAt(0).toUpperCase() + type.slice(1)} Leave</h3>
            <p>${days}</p>
        `;
        balanceContainer.appendChild(balanceCard);
    }
}

// Function to handle leave application form submission
function setupFormListener() {
    const leaveForm = document.getElementById('leave-form');
    leaveForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const leaveType = document.getElementById('leave-type').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        const reason = document.getElementById('reason').value;

        // Basic validation
        if (!leaveType || !startDate || !endDate || !reason) {
            alert('Please fill in all fields.');
            return;
        }

        // Calculate days
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        // Check if enough balance
        if (leaveBalances[leaveType] < diffDays) {
            alert(`Not enough ${leaveType} leave days. You have ${leaveBalances[leaveType]} days left.`);
            return;
        }

        // Deduct the days (in a real app, this would be done on the server)
        leaveBalances[leaveType] -= diffDays;

        // Update the display
        displayLeaveBalances();

        // Reset form
        leaveForm.reset();

        alert(`Leave application submitted successfully for ${diffDays} days.`);
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    displayLeaveBalances();
    setupFormListener();
});
