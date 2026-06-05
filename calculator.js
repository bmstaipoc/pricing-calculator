// Pricing Configuration
const pricingConfig = {
    ingestion: {
        name: 'Data Ingestion',
        icon: '📥',
        complexity: {
            simple: { name: 'Simple', cost: 5000, description: 'Single source, basic transformation' },
            standard: { name: 'Standard', cost: 15000, description: 'Multiple sources, standard ETL' },
            complex: { name: 'Complex', cost: 30000, description: 'Advanced transformations, real-time' },
            enterprise: { name: 'Enterprise', cost: 50000, description: 'Custom solution, full support' }
        },
        defaultComplexity: 'standard'
    },
    datasets: {
        name: 'Datasets Management',
        icon: '📊',
        complexity: {
            simple: { name: 'Simple', cost: 3000, description: '1-5 datasets, basic schema' },
            standard: { name: 'Standard', cost: 10000, description: '5-20 datasets, standard governance' },
            complex: { name: 'Complex', cost: 25000, description: '20+ datasets, advanced lineage' },
            enterprise: { name: 'Enterprise', cost: 40000, description: 'Custom data catalog, full governance' }
        },
        defaultComplexity: 'standard'
    },
    biReports: {
        name: 'BI Reports',
        icon: '📈',
        complexity: {
            simple: { name: 'Simple', cost: 4000, description: '1-5 reports, basic dashboards' },
            standard: { name: 'Standard', cost: 12000, description: '5-15 reports, interactive dashboards' },
            complex: { name: 'Complex', cost: 28000, description: '15+ reports, advanced analytics' },
            enterprise: { name: 'Enterprise', cost: 45000, description: 'Full BI platform, custom analytics' }
        },
        defaultComplexity: 'standard'
    }
};

const addonsConfig = {
    support: { name: '24/7 Support', cost: 5000 },
    training: { name: 'Team Training', cost: 8000 },
    migration: { name: 'Migration Assistance', cost: 15000 },
    customIntegration: { name: 'Custom Integration', cost: 12000 },
    securityAudit: { name: 'Security Audit', cost: 10000 },
    performanceTuning: { name: 'Performance Tuning', cost: 7000 }
};

// State Management
const state = {
    modules: {
        ingestion: { enabled: true, complexity: 'standard', quantity: 1 },
        datasets: { enabled: true, complexity: 'standard', quantity: 1 },
        biReports: { enabled: true, complexity: 'standard', quantity: 1 }
    },
    addons: {},
    discount: 0
};

// Initialize Calculator
function initCalculator() {
    renderModules();
    setupEventListeners();
    updatePricing();
}

// Render Module Cards
function renderModules() {
    const container = document.getElementById('modules-container');
    container.innerHTML = '';

    ['ingestion', 'datasets', 'biReports'].forEach(moduleKey => {
        if (state.modules[moduleKey].enabled) {
            const module = pricingConfig[moduleKey];
            const moduleState = state.modules[moduleKey];
            const html = `
                <div class="module-card ${moduleKey}">
                    <div class="module-header">
                        <h3 class="module-title">${module.icon} ${module.name}</h3>
                        <div class="module-price" id="price-${moduleKey}">$15,000</div>
                    </div>
                    
                    <div>
                        <label style="font-weight: 500; margin-bottom: 10px; display: block;">Select Complexity:</label>
                        <div class="complexity-grid">
                            ${Object.entries(module.complexity)
                                .map(([key, value]) => `
                                    <button class="complexity-btn ${key === moduleState.complexity ? 'active' : ''}" 
                                            data-module="${moduleKey}" 
                                            data-complexity="${key}"
                                            title="${value.description}">
                                        ${value.name}
                                    </button>
                                `)
                                .join('')}
                        </div>
                    </div>

                    <div class="quantity-control">
                        <label>Quantity:</label>
                        <input type="number" 
                               data-module="${moduleKey}" 
                               class="quantity-input" 
                               value="${moduleState.quantity}" 
                               min="1" 
                               max="10">
                    </div>
                </div>
            `;
            container.innerHTML += html;
        }
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Module toggles
    document.getElementById('ingestion-check').addEventListener('change', (e) => {
        state.modules.ingestion.enabled = e.target.checked;
        renderModules();
        setupEventListeners();
        updatePricing();
    });

    document.getElementById('datasets-check').addEventListener('change', (e) => {
        state.modules.datasets.enabled = e.target.checked;
        renderModules();
        setupEventListeners();
        updatePricing();
    });

    document.getElementById('bi-reports-check').addEventListener('change', (e) => {
        state.modules.biReports.enabled = e.target.checked;
        renderModules();
        setupEventListeners();
        updatePricing();
    });

    // Complexity buttons
    document.querySelectorAll('.complexity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const module = e.target.dataset.module;
            const complexity = e.target.dataset.complexity;
            
            state.modules[module].complexity = complexity;
            renderModules();
            setupEventListeners();
            updatePricing();
        });
    });

    // Quantity inputs
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const module = e.target.dataset.module;
            state.modules[module].quantity = parseInt(e.target.value) || 1;
            updatePricing();
        });
    });

    // Add-ons
    document.querySelectorAll('.addon-check').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const addon = e.target.dataset.addon;
            if (e.target.checked) {
                state.addons[addon] = parseInt(e.target.dataset.cost);
            } else {
                delete state.addons[addon];
            }
            updatePricing();
        });
    });

    // Discount
    document.querySelectorAll('input[name="discount"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            state.discount = parseInt(e.target.value);
            updatePricing();
        });
    });

    // Export button
    document.getElementById('export-btn').addEventListener('click', exportQuote);

    // Reset button
    document.getElementById('reset-btn').addEventListener('click', resetCalculator);
}

// Calculate Pricing
function updatePricing() {
    let subtotal = 0;
    const breakdown = [];

    // Module costs
    ['ingestion', 'datasets', 'biReports'].forEach(moduleKey => {
        if (state.modules[moduleKey].enabled) {
            const module = pricingConfig[moduleKey];
            const { complexity, quantity } = state.modules[moduleKey];
            const baseCost = module.complexity[complexity].cost;
            const totalCost = baseCost * quantity;
            subtotal += totalCost;

            breakdown.push({
                name: `${module.name} (${module.complexity[complexity].name})`,
                cost: totalCost,
                quantity: quantity > 1 ? ` × ${quantity}` : ''
            });
        }
    });

    // Add-ons
    let addonsTotal = 0;
    const addonsList = [];
    Object.entries(state.addons).forEach(([key, cost]) => {
        addonsTotal += cost;
        const addonName = Object.values(addonsConfig).find(a => a.cost === cost)?.name || key;
        addonsList.push({ name: addonName, cost: cost });
    });

    // Calculate discount
    const discountAmount = Math.round(subtotal * (state.discount / 100));
    const total = subtotal + addonsTotal - discountAmount;

    // Render breakdown
    const breakdownHTML = breakdown.map(item => `
        <div class="breakdown-item">
            <span>${item.name}${item.quantity}</span>
            <span>$${item.cost.toLocaleString()}</span>
        </div>
    `).join('');

    document.getElementById('pricing-breakdown').innerHTML = breakdownHTML;
    document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString()}`;
    document.getElementById('addons-total').textContent = `$${addonsTotal.toLocaleString()}`;
    document.getElementById('discount-amount').textContent = `-$${discountAmount.toLocaleString()}`;
    document.getElementById('grand-total').textContent = `$${total.toLocaleString()}`;

    // Update module prices in cards
    ['ingestion', 'datasets', 'biReports'].forEach(moduleKey => {
        if (state.modules[moduleKey].enabled) {
            const module = pricingConfig[moduleKey];
            const { complexity, quantity } = state.modules[moduleKey];
            const cost = module.complexity[complexity].cost * quantity;
            const priceEl = document.getElementById(`price-${moduleKey}`);
            if (priceEl) {
                priceEl.textContent = `$${cost.toLocaleString()}`;
            }
        }
    });
}

// Export Quote
function exportQuote() {
    const subtotal = parseInt(document.getElementById('subtotal').textContent.replace(/\D/g, ''));
    const addonsTotal = parseInt(document.getElementById('addons-total').textContent.replace(/\D/g, ''));
    const discountAmount = parseInt(document.getElementById('discount-amount').textContent.replace(/\D/g, ''));
    const grandTotal = parseInt(document.getElementById('grand-total').textContent.replace(/\D/g, ''));

    const quote = `
DATA PLATFORM PRICING QUOTE
===========================
Generated: ${new Date().toLocaleDateString()}

MODULES SELECTED:
${['ingestion', 'datasets', 'biReports']
    .filter(m => state.modules[m].enabled)
    .map(m => {
        const module = pricingConfig[m];
        const complexity = state.modules[m].complexity;
        const qty = state.modules[m].quantity;
        const cost = module.complexity[complexity].cost * qty;
        return `- ${module.name} (${module.complexity[complexity].name})${qty > 1 ? ` x${qty}` : ''}: $${cost.toLocaleString()}`;
    })
    .join('\n')}

ADD-ONS:
${Object.keys(state.addons).length > 0 
    ? Object.entries(state.addons)
        .map(([key, cost]) => `- ${Object.values(addonsConfig).find(a => a.cost === cost)?.name}: $${cost.toLocaleString()}`)
        .join('\n')
    : '(None)'}

PRICING SUMMARY:
Subtotal:        $${subtotal.toLocaleString()}
Add-ons:         $${addonsTotal.toLocaleString()}
Discount (${state.discount}%):    -$${discountAmount.toLocaleString()}
─────────────────────────
TOTAL:           $${grandTotal.toLocaleString()}

Notes:
- Pricing is valid for 30 days
- Implementation timeline: 8-12 weeks
- Support included for first 90 days
- For change requests and tech migrations
    `;

    const blob = new Blob([quote], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pricing-quote-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Reset Calculator
function resetCalculator() {
    if (confirm('Are you sure you want to reset all values?')) {
        state.modules = {
            ingestion: { enabled: true, complexity: 'standard', quantity: 1 },
            datasets: { enabled: true, complexity: 'standard', quantity: 1 },
            biReports: { enabled: true, complexity: 'standard', quantity: 1 }
        };
        state.addons = {};
        state.discount = 0;

        document.querySelectorAll('.addon-check').forEach(cb => cb.checked = false);
        document.querySelectorAll('input[name="discount"]').forEach(r => r.checked = r.value === '0');
        
        renderModules();
        setupEventListeners();
        updatePricing();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initCalculator);