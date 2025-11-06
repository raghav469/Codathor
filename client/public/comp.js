  // Competition details data
        const competitionDetails = {
            'ai-hackathon': {
                title: '🤖 AI Hackathon 2024',
                description: 'Build revolutionary machine learning models to solve climate change challenges',
                //prize: '₹10,000',
                fee: 'Free',
                status: 'live',
                timeRemaining: '3 days',
                
                requirements: [
                    'Python programming knowledge',
                    'Machine Learning basics',
                    'GitHub account for submission',
                    'Working development environment'
                ],
                timeline: [
                    { phase: 'Registration', time: 'Now - Day 1', status: 'active' },
                    { phase: 'Development', time: 'Day 1 - Day 3', status: 'upcoming' },
                    { phase: 'Submission', time: 'Day 3 23:59', status: 'upcoming' },
                    { phase: 'Judging', time: 'Day 4 - Day 5', status: 'upcoming' },
                    { phase: 'Results', time: 'Day 6', status: 'upcoming' }
                ]
            },
            'blockchain-challenge': {
                title: '⛓️ Blockchain Challenge',
                description: 'Develop innovative DeFi solutions on Ethereum network',
               // prize: '₹7,500',
               // fee: '₹79',
                status: 'upcoming',
                timeRemaining: 'Starts June 15',
              
                requirements: [
                    'Solidity programming knowledge',
                    'Understanding of DeFi protocols',
                    'MetaMask wallet setup',
                    'Basic Web3 development experience'
                ],
                timeline: [
                    { phase: 'Pre-registration', time: 'Now - June 14', status: 'active' },
                    { phase: 'Kickoff', time: 'June 15 9:00 AM', status: 'upcoming' },
                    { phase: 'Development', time: '48 hours', status: 'upcoming' },
                    { phase: 'Demo Day', time: 'June 17', status: 'upcoming' }
                ]
            },
            'frontend-challenge': {
                title: '🎨 Web Development',
                description: 'Create the most responsive and accessible frontend',
                //prize: '₹5,000',
                //fee: '₹29',
                status: 'live',
                timeRemaining: '5 days',
               
                requirements: [
                    'HTML, CSS, JavaScript proficiency',
                    'React.js knowledge preferred',
                    'Understanding of responsive design',
                    'Basic accessibility knowledge'
                ],
                timeline: [
                    { phase: 'Active Development', time: 'Now - 5 days', status: 'active' },
                    { phase: 'Final Submission', time: 'Day 5 11:59 PM', status: 'upcoming' },
                    { phase: 'Judging Period', time: 'Day 6 - Day 7', status: 'upcoming' },
                    { phase: 'Winner Announcement', time: 'Day 8', status: 'upcoming' }
                ]
            },
            'ctf-challenge': {
                title: '🛡️ Capture The Flag',
                description: '24-hour cybersecurity competition',
               // prize: '₹6,000',
               // fee: '₹59',
                status: 'upcoming',
                timeRemaining: 'Starts July 1',
                
                requirements: [
                    'Basic cybersecurity knowledge',
                    'Linux command line skills',
                    'Familiarity with security tools',
                    'Problem-solving mindset'
                ],
                timeline: [
                    { phase: 'Registration', time: 'Now - June 30', status: 'active' },
                    { phase: 'CTF Event', time: 'July 1 - July 2', status: 'upcoming' },
                    { phase: 'Scoring', time: 'July 2 - July 3', status: 'upcoming' },
                    { phase: 'Awards', time: 'July 4', status: 'upcoming' }
                ]
            },
            'data-viz': {
                title: '📊 Data Visualization Derby',
                description: 'Transform complex climate data into compelling visual stories',
              //  prize: '₹4,500',
               // fee: '₹39',
                status: 'live',
                timeRemaining: '2 days',
              
                requirements: [
                    'Data analysis skills',
                    'Visualization tools knowledge',
                    'Python or JavaScript preferred',
                    'Understanding of data storytelling'
                ],
                timeline: [
                    { phase: 'Final Sprint', time: 'Now - 2 days', status: 'active' },
                    { phase: 'Submission Deadline', time: 'Day 2 11:59 PM', status: 'upcoming' },
                    { phase: 'Judging', time: 'Day 3 - Day 4', status: 'upcoming' },
                    { phase: 'Results', time: 'Day 5', status: 'upcoming' }
                ]
            },
            'flutter-challenge': {
                title: '📱 Flutter Mobile Challenge',
                description: 'Cross-platform mobile app solving local community problems',
              //  prize: '₹3,000',
              //  fee: '₹25',
                status: 'past',
                timeRemaining: 'Ended May 5',
               
                requirements: [
                    'Flutter/Dart knowledge',
                    'Mobile development experience',
                    'Understanding of UI/UX principles',
                    'Problem-solving skills'
                ],
                timeline: [
                    { phase: 'Registration', time: 'Apr 1 - Apr 15', status: 'completed' },
                    { phase: 'Development', time: 'Apr 15 - May 1', status: 'completed' },
                    { phase: 'Judging', time: 'May 2 - May 4', status: 'completed' },
                    { phase: 'Results', time: 'May 5', status: 'completed' }
                ]
            }
        };

        // DOM Elements
        const filterButtons = document.querySelectorAll('.filter-btn');
        const competitionCards = document.querySelectorAll('.competition-card');
        const searchInput = document.getElementById('search-input');
        const noResults = document.querySelector('.no-results');
        const modal = document.getElementById('competitionModal');
        const modalBody = document.getElementById('modal-body');
        const closeModal = document.querySelector('.close');

        // User enrollment status (simulated)
        let enrolledCompetitions = JSON.parse(localStorage.getItem('enrolledCompetitions') || '[]');

        // Filter competitions
        function filterCompetitions(filter) {
            let hasResults = false;
            
            competitionCards.forEach(card => {
                if (card.classList.contains('no-results')) return;
                
                const matchesFilter = filter === 'all' || card.classList.contains(filter);
                const searchTerm = searchInput.value.toLowerCase();
                const matchesSearch = card.dataset.tags.includes(searchTerm) || 
                                      card.textContent.toLowerCase().includes(searchTerm);
                
                if (matchesFilter && matchesSearch) {
                    card.style.display = 'block';
                    hasResults = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            noResults.style.display = hasResults ? 'none' : 'block';
        }

        // Show competition details modal
        function showCompetitionDetails(competitionId) {
            const competition = competitionDetails[competitionId];
            if (!competition) return;

            const isEnrolled = enrolledCompetitions.includes(competitionId);
            
            modalBody.innerHTML = `
                <h2>${competition.title}</h2>
                <p class="description" style="font-size: 1.1rem; margin: 20px 0; color: #6b7280;">
                    ${competition.description}
                </p>
                
                <div style="display: flex; gap: 20px; margin: 20px 0; flex-wrap: wrap;">
                    <div class="prize" style="margin: 0;">${competition.prize} Prize Pool</div>
                    <div class="enrollment-fee" style="margin: 0;">Enrollment Fee: ${competition.fee}</div>
                    <div class="badge ${competition.status}" style="margin: 0;">${competition.status}</div>
                </div>

                ${isEnrolled ? `
                    <div class="enrollment-section">
                        <h3>✅ You're Enrolled! Here's what to do:</h3>
                        <div class="task-list">
                            ${competition.tasks.map((task, index) => `
                                <div class="task-item">
                                    <div class="step-number">${index + 1}</div>
                                    <div style="margin-left: 15px;">
                                        <strong>Step ${index + 1}:</strong> ${task}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div style="margin: 30px 0;">
                        <h3>📋 Requirements:</h3>
                        <ul style="margin: 15px 0; padding-left: 20px; color: #6b7280;">
                            ${competition.requirements.map(req => `<li style="margin: 8px 0;">${req}</li>`).join('')}
                        </ul>
                    </div>

                    <div style="margin: 30px 0;">
                        <h3>⏰ Timeline:</h3>
                        <div class="progress-steps">
                            ${competition.timeline.map(phase => `
                                <div class="step ${phase.status === 'active' ? 'active' : ''}">
                                    <div class="step-number">${phase.status === 'completed' ? '✓' : phase.status === 'active' ? '▶' : '⏳'}</div>
                                    <h4>${phase.phase}</h4>
                                    <p>${phase.time}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <h4 style="color: #1e40af; margin-bottom: 10px;">🎯 Success Tips:</h4>
                        <ul style="color: #1e40af; margin-left: 20px;">
                            <li>Join the community chat for real-time support</li>
                            <li>Start early and break down tasks into smaller chunks</li>
                            <li>Test your solution thoroughly before submission</li>
                            <li>Don't hesitate to ask questions from mentors</li>
                        </ul>
                    </div>
                ` : `
                    <div class="enrollment-section">
                        <h3>🚀 Ready to Join the Competition?</h3>
                        <p style="margin: 15px 0; color: #6b7280;">
                            Enroll now for just ${competition.fee} and start your coding journey!
                        </p>
                        <button onclick="enrollInCompetition('${competitionId}')" class="cta-button" style="max-width: 300px; margin: 20px auto;">
                            💳 Enroll Now (${competition.fee})
                        </button>
                    </div>

                    <div style="margin: 30px 0;">
                        <h3>🎯 What You'll Do:</h3>
                        <div class="task-list">
                            ${competition.tasks.map((task, index) => `
                                <div class="task-item">
                                    <div class="step-number">${index + 1}</div>
                                    <div style="margin-left: 15px;">${task}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div style="margin: 30px 0;">
                        <h3>📚 Prerequisites:</h3>
                        <ul style="margin: 15px 0; padding-left: 20px; color: #6b7280;">
                            ${competition.requirements.map(req => `<li style="margin: 8px 0;">${req}</li>`).join('')}
                        </ul>
                    </div>
                `}
            `;

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        // Enroll in competition
        function enrollInCompetition(competitionId) {
            // Simulate payment process
            if (confirm('Proceed with payment of ' + competitionDetails[competitionId].fee + '?')) {
                enrolledCompetitions.push(competitionId);
                localStorage.setItem('enrolledCompetitions', JSON.stringify(enrolledCompetitions));
                
                // Show success message
                alert('🎉 Enrollment successful! You can now participate in the competition.');
                
                // Refresh modal content
                showCompetitionDetails(competitionId);
                
                // Update button text on card
                const card = document.querySelector(`[data-id="${competitionId}"]`);
                const button = card.querySelector('.cta-button');
                if (button) {
                    button.textContent = '✅ Enrolled - View Details';
                    button.style.background = 'linear-gradient(45deg, #10b981, #059669)';
                }
            }
        }

        // Close modal
        function closeCompetitionModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Event listeners
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                filterCompetitions(button.dataset.filter);
            });
        });

        searchInput.addEventListener('input', () => {
            const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
            filterCompetitions(activeFilter);
        });

        // Competition card click events
        competitionCards.forEach(card => {
            if (card.classList.contains('no-results')) return;
            
            const competitionId = card.dataset.id;
            const isEnrolled = enrolledCompetitions.includes(competitionId);
            
            // Update button text if enrolled
            if (isEnrolled) {
                const button = card.querySelector('.cta-button');
                if (button) {
                    button.textContent = '✅ Enrolled - View Details';
                    button.style.background = 'linear-gradient(45deg, #10b981, #059669)';
                }
            }
            
            card.addEventListener('click', () => {
                showCompetitionDetails(competitionId);
            });
        });

        closeModal.addEventListener('click', closeCompetitionModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCompetitionModal();
            }
        });

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            filterCompetitions('all');
            
            // Animate cards on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            competitionCards.forEach((card, index) => {
                if (card.classList.contains('no-results')) return;
                
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = `all 0.6s ease ${index * 0.1}s`;
                
                observer.observe(card);
            });
        });

        // Make enrollInCompetition global
        window.enrollInCompetition = enrollInCompetition;
        
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add some interactive effects
        document.querySelectorAll('.competition-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add loading animation for buttons
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', function(e) {
                if (this.textContent.includes('Enroll') || this.textContent.includes('Join') || this.textContent.includes('Enter')) {
                    e.stopPropagation();
                    
                    const originalText = this.textContent;
                    this.textContent = '⏳ Processing...';
                    this.style.opacity = '0.7';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.opacity = '1';
                    }, 1000);
                }
            });
        });
    