    
        let currentUser = null;
    // TODO: Fetch products from backend API. Use env for API endpoint/config.
    let products = [
            {
                id: 1,
                name: 'Fresh Tomatoes',
                category: 'vegetables',
                price: 25.00,
                quantity: 50,
                farmer: 'Maria Nghidinwa',
                location: 'Rundu West',
                description: 'Fresh, organic tomatoes grown without pesticides.',
                icon: '🍅'
            },
            {
                id: 2,
                name: 'Sweet Oranges',
                category: 'fruits',
                price: 18.00,
                quantity: 30,
                farmer: 'Johannes Mukuve',
                location: 'Rundu East',
                description: 'Juicy, sweet oranges perfect for eating or juice.',
                icon: '🍊'
            },
            {
                id: 3,
                name: 'White Maize',
                category: 'grains',
                price: 12.00,
                quantity: 100,
                farmer: 'Grace Kapere',
                location: 'Rundu Central',
                description: 'High-quality white maize, freshly harvested.',
                icon: '🌽'
            },
            {
                id: 4,
                name: 'Green Peppers',
                category: 'vegetables',
                price: 35.00,
                quantity: 25,
                farmer: 'David Shihepo',
                location: 'Rundu South',
                description: 'Crisp green peppers, great for cooking.',
                icon: '🫑'
            },
            {
                id: 5,
                name: 'Fresh Spinach',
                category: 'vegetables',
                price: 22.00,
                quantity: 15,
                farmer: 'Anna Nambahu',
                location: 'Rundu North',
                description: 'Organic spinach leaves, rich in nutrients.',
                icon: '🥬'
            },
            {
                id: 6,
                name: 'Bananas',
                category: 'fruits',
                price: 20.00,
                quantity: 40,
                farmer: 'Peter Simwanza',
                location: 'Rundu West',
                description: 'Sweet, ripe bananas perfect for snacking.',
                icon: '🍌'
            }
        ];
        // TODO: Fetch orders from backend API. Use env for API endpoint/config.
        let orders = [
                // Example order
                {
                    id: 1,
                    productId: 1,
                    buyer: 'John Buyer',
                    farmer: 'Maria Nghidinwa',
                    quantity: 10,
                    price: 25.00,
                    status: 'Pending', // Pending, Accepted, Fulfilled
                }
            ];

    // TODO: Use backend authentication and env for secrets/config.
    function showSection(sectionId) {
            document.querySelectorAll('.section-page').forEach(section => {
                section.classList.add('hidden');
            });
            
            document.getElementById(sectionId).classList.remove('hidden');
            
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`[href="#${sectionId}"]`).classList.add('active');
            
            if (sectionId === 'marketplace') {
                loadProducts();
            }
        }

            // Render orders in the Marketplace section
        // TODO: Render orders from backend. Use env for payment/config.
        function renderOrders() {
                const ordersList = document.getElementById('ordersList');
                if (!ordersList) return;
                ordersList.innerHTML = '';
                if (orders.length === 0) {
                    ordersList.innerHTML = '<p>No orders yet.</p>';
                    return;
                }
                orders.forEach(order => {
                    const product = products.find(p => p.id === order.productId);
                    const orderDiv = document.createElement('div');
                    orderDiv.className = 'order-card';
                        orderDiv.innerHTML = `
                            <strong>Product:</strong> ${product ? product.name : 'Unknown'}<br>
                            <strong>Buyer:</strong> ${order.buyer}<br>
                            <strong>Farmer:</strong> ${order.farmer}<br>
                            <strong>Quantity:</strong> ${order.quantity} kg<br>
                            <strong>Total Price:</strong> N$${(order.price * order.quantity).toFixed(2)}<br>
                            <strong>Status:</strong> ${order.status}<br>
                            <button onclick="updateOrderStatus(${order.id}, 'Accepted')">Accept</button>
                            <button onclick="updateOrderStatus(${order.id}, 'Fulfilled')">Fulfill</button>
                            <button onclick="openMessaging(${order.id})">Message</button>
                        `;
                    ordersList.appendChild(orderDiv);
                });
            }

        // TODO: Update order status in backend. Use env for config.
        function updateOrderStatus(orderId, status) {
                const order = orders.find(o => o.id === orderId);
                if (order) {
                    order.status = status;
                    renderOrders();
                }
            }
                // Messaging logic
            // TODO: Integrate messaging backend. Use env for messaging config.
            function openMessaging(orderId) {
                    // Open messaging modal and set context for the order
                    openModal('messagingModal');
                    // You can add logic to filter contacts/messages by orderId
                }

            // Call renderOrders when Marketplace section is shown
            document.addEventListener('DOMContentLoaded', () => {
                renderOrders();
                renderAnalytics();
            });

        // TODO: Fetch analytics from backend. Use env for analytics config.
        function renderAnalytics() {
                const analyticsSection = document.getElementById('analytics');
                if (!analyticsSection) return;
                // Example analytics: total sales, number of orders
                let totalSales = 0;
                let totalOrders = orders.length;
                orders.forEach(order => {
                    totalSales += order.price * order.quantity;
                });
                const analyticsContent = analyticsSection.querySelector('.section');
                if (analyticsContent) {
                    analyticsContent.innerHTML = `
                        <h2>Farmer Analytics</h2>
                        <p><strong>Total Sales:</strong> N$${totalSales.toFixed(2)}</p>
                        <p><strong>Number of Orders:</strong> ${totalOrders}</p>
                        <p><strong>Inquiries:</strong> (Feature in progress)</p>
                    `;
                }
            }

        function openModal(modalId) {
            document.getElementById(modalId).style.display = 'block';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        document.querySelectorAll('.user-type-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.user-type-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const farmDetails = document.getElementById('farmDetails');
                if (this.dataset.type === 'farmer') {
                    farmDetails.style.display = 'block';
                    document.getElementById('farmLocation').required = true;
                } else {
                    farmDetails.style.display = 'none';
                    document.getElementById('farmLocation').required = false;
                }
            });
        });

        function loadProducts(category = '') {
            const grid = document.getElementById('productsGrid');
            const filteredProducts = category ? products.filter(p => p.category === category) : products;
            
            grid.innerHTML = filteredProducts.map(product => `
                <div class="product-card">
                    <div class="product-image">${product.icon}</div>
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">N$${product.price.toFixed(2)}/kg</div>
                        <div class="product-farmer">By ${product.farmer} • ${product.location}</div>
                        <p>${product.description}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                            <span style="color: #666;">Available: ${product.quantity}kg</span>
                            <button class="btn btn-primary" onclick="contactFarmer(${product.id})">Contact Farmer</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function contactFarmer(productId) {
            const product = products.find(p => p.id === productId);
            showNotification(`Contact request sent to ${product.farmer}! They will reach out to you soon.`);
        }

        document.getElementById('categoryFilter').addEventListener('change', function() {
            loadProducts(this.value);
        });

        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            // Simulate login
            currentUser = { email, type: 'farmer' };
            closeModal('loginModal');
            showNotification('Login successful! Welcome back.');
            updateAuthButtons();
        });

        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match!', 'error');
                return;
            }
            
            const userType = document.querySelector('.user-type-btn.active').dataset.type;
            currentUser = { 
                email: document.getElementById('registerEmail').value,
                name: document.getElementById('registerName').value,
                type: userType 
            };
            closeModal('registerModal');
            showNotification('Registration successful! Welcome to Rundu Farmers Marketplace.');
            updateAuthButtons();
        });

        document.getElementById('addProductForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!currentUser || currentUser.type !== 'farmer') {
                showNotification('Please login as a farmer to list products.', 'error');
                return;
            }
            
            const newProduct = {
                id: products.length + 1,
                name: document.getElementById('productName').value,
                category: document.getElementById('productCategory').value,
                price: parseFloat(document.getElementById('productPrice').value),
                quantity: parseInt(document.getElementById('productQuantity').value),
                farmer: currentUser.name || 'Current User',
                location: 'Rundu',
                description: document.getElementById('productDescription').value,
                icon: getCategoryIcon(document.getElementById('productCategory').value)
            };
            
            products.push(newProduct);
            closeModal('addProductModal');
            showNotification('Product listed successfully!');
            loadProducts();
            
            document.getElementById('addProductForm').reset();
        });

        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Message sent successfully! We\'ll get back to you soon.');
            e.target.reset();
        });

        function getCategoryIcon(category) {
            const icons = {
                vegetables: '🥬',
                fruits: '🍎',
                grains: '🌾',
                herbs: '🌿'
            };
            return icons[category] || '🌱';
        }

        function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.style.background = type === 'error' ? '#f44336' : '#4caf50';
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 4000);
        }

        function updateAuthButtons() {
            const authButtons = document.querySelector('.auth-buttons');
            if (currentUser) {
                authButtons.innerHTML = `
                    <span style="color: #2c5530; font-weight: 500;">Welcome, ${currentUser.name || currentUser.email}</span>
                    <button class="btn btn-outline" onclick="logout()">Logout</button>
                `;
            } else {
                authButtons.innerHTML = `
                    <button class="btn btn-outline" onclick="openModal('loginModal')">Login</button>
                    <button class="btn btn-primary" onclick="openModal('registerModal')">Register</button>
                `;
            }
        }

        function logout() {
            currentUser = null;
            updateAuthButtons();
            showNotification('Logged out successfully.');
        }

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const sectionId = this.getAttribute('href').substring(1);
                showSection(sectionId);
            });
        });

        window.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        document.addEventListener('DOMContentLoaded', function() {
            loadProducts();
            
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            document.querySelectorAll('.feature-card, .product-card, .stat-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        });

        function addSearchFeature() {
            const searchContainer = document.createElement('div');
            searchContainer.innerHTML = `
                <div style="margin-bottom: 2rem; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                    <input type="text" id="searchProducts" placeholder="Search products..." 
                           style="flex: 1; padding: 0.8rem; border: 2px solid #ddd; border-radius: 25px; min-width: 250px;">
                    <button class="btn btn-primary" onclick="searchProducts()">Search</button>
                </div>
            `;
            
            const marketplaceSection = document.querySelector('#marketplace .section');
            const firstChild = marketplaceSection.children[1];
            marketplaceSection.insertBefore(searchContainer, firstChild);
            
            document.getElementById('searchProducts').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchProducts();
                }
            });
        }

        function searchProducts() {
            const searchTerm = document.getElementById('searchProducts').value.toLowerCase();
            const category = document.getElementById('categoryFilter').value;
            
            let filteredProducts = products;
            
            if (category) {
                filteredProducts = filteredProducts.filter(p => p.category === category);
            }
            
            if (searchTerm) {
                filteredProducts = filteredProducts.filter(p => 
                    p.name.toLowerCase().includes(searchTerm) ||
                    p.farmer.toLowerCase().includes(searchTerm) ||
                    p.description.toLowerCase().includes(searchTerm)
                );
            }
            
            const grid = document.getElementById('productsGrid');
            
            if (filteredProducts.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                        <h3>No products found</h3>
                        <p>Try adjusting your search terms or browse all categories.</p>
                    </div>
                `;
                return;
            }
            
            grid.innerHTML = filteredProducts.map(product => `
                <div class="product-card">
                    <div class="product-image">${product.icon}</div>
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">N${product.price.toFixed(2)}/kg</div>
                        <div class="product-farmer">By ${product.farmer} • ${product.location}</div>
                        <p>${product.description}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                            <span style="color: #666;">Available: ${product.quantity}kg</span>
                            <button class="btn btn-primary" onclick="contactFarmer(${product.id})">Contact Farmer</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        let searchInitialized = false;
        const originalLoadProducts = loadProducts;
        loadProducts = function(category = '') {
            originalLoadProducts(category);
            if (!searchInitialized) {
                addSearchFeature();
                searchInitialized = true;
            }
        };

        document.documentElement.style.scrollBehavior = 'smooth';

        function showLoading(element) {
            element.innerHTML = '<div style="text-align: center; padding: 2rem;"><div style="font-size: 2rem;">⏳</div><p>Loading...</p></div>';
        }

        function contactFarmer(productId) {
            const product = products.find(p => p.id === productId);
            if (!currentUser) {
                showNotification('Please login to contact farmers.', 'error');
                openModal('loginModal');
                return;
            }
            
            const contactModal = document.createElement('div');
            contactModal.className = 'modal';
            contactModal.style.display = 'block';
            contactModal.innerHTML = `
                <div class="modal-content">
                    <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                    <h2>Contact ${product.farmer}</h2>
                    <div style="margin-bottom: 2rem;">
                        <h3>${product.name}</h3>
                        <p><strong>Price:</strong> N${product.price.toFixed(2)}/kg</p>
                        <p><strong>Available:</strong> ${product.quantity}kg</p>
                        <p><strong>Location:</strong> ${product.location}</p>
                    </div>
                    <form onsubmit="sendContactMessage(event, ${productId})">
                        <div class="form-group">
                            <label>Quantity needed (kg)</label>
                            <input type="number" id="quantityNeeded" max="${product.quantity}" min="1" required>
                        </div>
                        <div class="form-group">
                            <label>Message</label>
                            <textarea id="contactMessage" rows="4" placeholder="Hi, I'm interested in purchasing your ${product.name}..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Send Message</button>
                    </form>
                </div>
            `;
            
            document.body.appendChild(contactModal);
        }

        function sendContactMessage(event, productId) {
            event.preventDefault();
            const product = products.find(p => p.id === productId);
            const quantity = document.getElementById('quantityNeeded').value;
            
            event.target.closest('.modal').remove();
            
            showNotification(`Message sent to ${product.farmer}! They will contact you about ${quantity}kg of ${product.name}.`);
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal').forEach(modal => {
                    if (modal.style.display === 'block') {
                        modal.style.display = 'none';
                    }
                });
            }
        });
let messages = {};
let activeChatUser = null;

// Show Messages button when logged in
function updateAuthButtons() {
    const authButtons = document.querySelector('.auth-buttons');
    if (currentUser) {
        authButtons.innerHTML = `
            <span style="color: #2c5530; font-weight: 500;">Welcome, ${currentUser.name || currentUser.email}</span>
            <button class="btn btn-outline" onclick="openModal('messagingModal')">Messages</button>
            <button class="btn btn-outline" onclick="logout()">Logout</button>
        `;
        loadContacts();
    } else {
        authButtons.innerHTML = `
            <button class="btn btn-outline" onclick="openModal('loginModal')">Login</button>
            <button class="btn btn-primary" onclick="openModal('registerModal')">Register</button>
        `;
    }
}

// Load dummy contacts (in real app fetch from server)
function loadContacts() {
    const contacts = products.map(p => p.farmer).filter((v, i, a) => a.indexOf(v) === i);
    const contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = contacts.map(c => `
        <div class="contact-item" onclick="openChat('${c}')">${c}</div>
    `).join('');
}

function openChat(contactName) {
    activeChatUser = contactName;
    const chatArea = document.getElementById('chatArea');
    chatArea.innerHTML = '';
    if (messages[contactName]) {
        messages[contactName].forEach(msg => {
            displayMessage(msg.text, msg.type);
        });
    }
}

function displayMessage(text, type) {
    const msgEl = document.createElement('div');
    msgEl.className = `chat-message ${type}`;
    msgEl.textContent = text;
    document.getElementById('chatArea').appendChild(msgEl);
    document.getElementById('chatArea').scrollTop = document.getElementById('chatArea').scrollHeight;
}

document.getElementById('chatForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text || !activeChatUser) return;

    if (!messages[activeChatUser]) messages[activeChatUser] = [];
    messages[activeChatUser].push({ text, type: 'sent' });
    displayMessage(text, 'sent');

    // Simulate reply
    setTimeout(() => {
        const reply = `Thanks for your message about ${activeChatUser}'s products!`;
        messages[activeChatUser].push({ text: reply, type: 'received' });
        displayMessage(reply, 'received');
    }, 1000);

    input.value = '';
});
