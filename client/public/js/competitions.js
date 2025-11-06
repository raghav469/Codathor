// Competitions logic
document.addEventListener('DOMContentLoaded', () => {
    // Load competitions when page loads
    loadCompetitions();
    
    // Filter competitions
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadCompetitions(this.getAttribute('data-filter'));
        });
    });
});
// Updated enrollCompetition function for Razorpay
async function enrollCompetition(competition) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        alert('Please login to enroll in competitions');
        document.getElementById('authModal').style.display = 'block';
        document.getElementById('competitionModal').style.display = 'none';
        return;
    }
    
    try {
        if (competition.type === 'paid') {
            // Create payment order
            const response = await fetch('http://localhost:5000/api/enrollments/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    competitionId: competition._id,
                    amount: competition.price
                })
            });
            
            const order = await response.json();
            
            // Razorpay options
            const options = {
                key: process.env.RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Codathor",
                description: `Enrollment for ${competition.title}`,
                image: "/assets/logo.png",
                order_id: order.id,
                handler: async function(response) {
                    // Verify payment
                    const verifyResponse = await fetch('http://localhost:5000/api/enrollments/verify', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            competitionId: competition._id
                        })
                    });
                    
                    const result = await verifyResponse.json();
                    
                    if (verifyResponse.ok) {
                        alert(`Successfully enrolled in ${competition.title}!`);
                        loadCompetitions();
                    } else {
                        alert('Payment verification failed');
                    }
                },
                prefill: {
                    name: localStorage.getItem('userName'),
                    email: localStorage.getItem('userEmail')
                },
                theme: {
                    color: "#00d4ff"
                }
            };
            
            const rzp = new Razorpay(options);
            rzp.open();
            
        } else {
            // Free competition enrollment
            const response = await fetch('http://localhost:5000/api/enrollments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    competitionId: competition._id
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert(`Successfully enrolled in ${competition.title}!`);
                document.getElementById('competitionModal').style.display = 'none';
                loadCompetitions();
            } else {
                alert(data.message || 'Enrollment failed');
            }
        }
    } catch (err) {
        console.error('Enrollment error:', err);
        alert('An error occurred during enrollment');
    }
}
// Load competitions from API
async function loadCompetitions(filter = 'all') {
    try {
        const response = await fetch(`http://localhost:5000/api/competitions?type=${filter}`);
        const competitions = await response.json();
        
        const grid = document.querySelector('.competitions-grid');
        grid.innerHTML = '';
        
        competitions.forEach(comp => {
            const card = document.createElement('div');
            card.className = 'competition-card';
            card.innerHTML = `
                <div class="competition-image" style="background-image: url('${comp.image}')"></div>
                <div class="competition-content">
                    <span class="competition-tag ${comp.type === 'free' ? 'tag-free' : 'tag-paid'}">
                        ${comp.type === 'free' ? 'FREE' : 'PREMIUM'}
                    </span>
                    <h3>${comp.title}</h3>
                    <p>${comp.description}</p>
                    <div class="competition-meta">
                        <span><i class="far fa-calendar-alt"></i> ${new Date(comp.startDate).toLocaleDateString()}</span>
                        <span><i class="fas fa-users"></i> ${comp.participants}+</span>
                    </div>
                    <button class="enroll-btn ${comp.type === 'free' ? 'enroll-free' : 'enroll-paid'}" 
                            data-id="${comp._id}">
                        ${comp.type === 'free' ? 'Enroll Now' : `Enroll - $${comp.price}`}
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });
        
        // Add event listeners to buttons
        document.querySelectorAll('.enroll-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                openCompetitionModal(id);
            });
        });
    } catch (err) {
        console.error('Error loading competitions:', err);
    }
}

// Open competition modal
async function openCompetitionModal(id) {
    try {
        const response = await fetch(`http://localhost:5000/api/competitions/${id}`);
        const competition = await response.json();
        
        const modal = document.getElementById('competitionModal');
        const modalBody = document.querySelector('.modal-body');
        
        modalBody.innerHTML = `
            <div class="modal-image" style="background-image: url('${competition.image}')"></div>
            <span class="modal-tag ${competition.type === 'free' ? 'tag-free' : 'tag-paid'}">
                ${competition.type === 'free' ? 'FREE ENTRY' : 'PREMIUM COMPETITION'}
            </span>
            <h2>${competition.title}</h2>
            <p>${competition.details}</p>
            
            <div class="modal-details">
                <div class="modal-detail">
                    <h4>Start Date</h4>
                    <p>${new Date(competition.startDate).toLocaleDateString()}</p>
                </div>
                <div class="modal-detail">
                    <h4>End Date</h4>
                    <p>${new Date(competition.endDate).toLocaleDateString()}</p>
                </div>
                <div class="modal-detail">
                    <h4>Prize Pool</h4>
                    <p>${competition.prize}</p>
                </div>
                <div class="modal-detail">
                    <h4>Participants</h4>
                    <p>${competition.participants}+</p>
                </div>
            </div>
            
            <h4>Requirements:</h4>
            <p>${competition.requirements}</p>
            
            <div class="modal-actions">
                <button class="modal-btn modal-btn-primary" id="confirmEnroll" data-id="${competition._id}">
                    ${competition.type === 'free' ? 'Enroll Now' : `Pay $${competition.price} to Enroll`}
                </button>
                <button class="modal-btn modal-btn-secondary close-modal-btn">Close</button>
            </div>
        `;
        
        modal.style.display = 'block';
        
        // Add event listeners
        document.getElementById('confirmEnroll').addEventListener('click', function() {
            enrollCompetition(competition);
        });
        
        document.querySelector('.close-modal-btn').addEventListener('click', () => {
            modal.style.display = 'none';
        });
    } catch (err) {
        console.error('Error opening competition modal:', err);
    }
}

// Enroll in competition
async function enrollCompetition(competition) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        alert('Please login to enroll in competitions');
        document.getElementById('authModal').style.display = 'block';
        document.getElementById('competitionModal').style.display = 'none';
        return;
    }
    
    try {
        if (competition.type === 'paid') {
            // Show payment modal
            document.getElementById('competitionModal').style.display = 'none';
            document.getElementById('paymentModal').style.display = 'block';
            
            // Set payment amount
            document.getElementById('payment-amount').textContent = competition.price;
            
            // Handle payment submission
            document.getElementById('submit-payment').addEventListener('click', async () => {
                try {
                    // In a real app, you would integrate with Stripe or other payment processor
                    // For demo purposes, we'll just simulate a successful payment
                    
                    const response = await fetch('http://localhost:5000/api/enrollments', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            competitionId: competition._id,
                            paymentMethod: 'card',
                            amount: competition.price
                        })
                    });
                    
                    const data = await response.json();
                    
                    if (response.ok) {
                        alert(`Successfully enrolled in ${competition.title}!`);
                        document.getElementById('paymentModal').style.display = 'none';
                        loadCompetitions(); // Refresh competitions list
                    } else {
                        alert(data.message || 'Enrollment failed');
                    }
                } catch (err) {
                    console.error('Payment error:', err);
                    alert('An error occurred during payment');
                }
            });
            
            // Close payment modal
            document.querySelector('#paymentModal .close-modal').addEventListener('click', () => {
                document.getElementById('paymentModal').style.display = 'none';
            });
        } else {
            // Free competition - no payment needed
            const response = await fetch('http://localhost:5000/api/enrollments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    competitionId: competition._id
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert(`Successfully enrolled in ${competition.title}!`);
                document.getElementById('competitionModal').style.display = 'none';
                loadCompetitions(); // Refresh competitions list
            } else {
                alert(data.message || 'Enrollment failed');
            }
        }
    } catch (err) {
        console.error('Enrollment error:', err);
        alert('An error occurred during enrollment');
    }
}