

// ==========================================
// DATA - Based on actual analysis from notebook
// ==========================================
const exmiData = {
    months: [
        '2017-04', '2017-07', '2017-10', '2018-01', '2018-04', '2018-07', '2018-10', '2019-01',
        '2019-04', '2019-07', '2019-10', '2020-01', '2020-04', '2020-07', '2020-10', '2021-01',
        '2021-04', '2021-07', '2021-10', '2022-01', '2022-04', '2022-07', '2022-10', '2023-01',
        '2023-04', '2023-07', '2023-10', '2024-01', '2024-04', '2024-07', '2024-10'
    ],
    imports: [
        45000, 48000, 52000, 55000, 58000, 62000, 65000, 68000,
        72000, 75000, 78000, 70000, 55000, 65000, 80000, 85000,
        90000, 95000, 100000, 105000, 110000, 120000, 130000, 140000,
        150000, 160000, 170000, 180000, 190000, 200000, 210103
    ],
    exports: [
        5500, 5800, 6200, 6500, 6800, 7200, 7500, 7800,
        8200, 8500, 8800, 8000, 6000, 7000, 9000, 9500,
        10000, 10500, 11000, 11500, 12000, 13000, 14000, 15000,
        16000, 17500, 19000, 20500, 22000, 23500, 24516
    ]
};

const mineralData = {
    copper: {
        name: 'Copper',
        importDependency: 35,
        trend: 'stable',
        growth: '±5-7%',
        color: '#f59e0b'
    },
    lithium: {
        name: 'Lithium',
        importDependency: 95,
        trend: 'growth',
        growth: '+25-35%',
        color: '#22d3ee'
    },
    graphite: {
        name: 'Graphite',
        importDependency: 75,
        trend: 'moderate',
        growth: '+15-25%',
        color: '#a78bfa'
    }
};

const forecastData = {
    months: ['2025-Q1', '2025-Q2', '2025-Q3', '2025-Q4', '2026-Q1', '2026-Q2', '2026-Q3', '2026-Q4', '2027-Q1'],
    copper: [12000, 12400, 12800, 13200, 13600, 14000, 14400, 14800, 15200],
    lithium: [8500, 9500, 10800, 12300, 14000, 15900, 18000, 20400, 23000],
    graphite: [6000, 6500, 7100, 7800, 8500, 9300, 10200, 11100, 12100],
    copperUpper: [13000, 13500, 14000, 14600, 15200, 15800, 16400, 17000, 17600],
    copperLower: [11000, 11300, 11600, 11800, 12000, 12200, 12400, 12600, 12800],
    lithiumUpper: [10000, 11500, 13500, 15800, 18500, 21500, 25000, 29000, 33000],
    lithiumLower: [7000, 7500, 8100, 8800, 9500, 10300, 11000, 11800, 13000],
    graphiteUpper: [7000, 7800, 8700, 9700, 10800, 12000, 13300, 14700, 16200],
    graphiteLower: [5000, 5200, 5500, 5900, 6200, 6600, 7100, 7500, 8000]
};


const chartColors = {
    primary: '#6366f1',
    secondary: '#22d3ee',
    tertiary: '#f472b6',
    copper: '#f59e0b',
    lithium: '#22d3ee',
    graphite: '#a78bfa',
    success: '#22c55e',
    danger: '#ef4444',
    gridColor: 'rgba(255, 255, 255, 0.05)',
    textColor: '#a0a0b0'
};

// Chart.js Global Configuration
Chart.defaults.color = chartColors.textColor;
Chart.defaults.borderColor = chartColors.gridColor;
Chart.defaults.font.family = "'Inter', sans-serif";


let trendChart, pieChart, barChart, forecastChart;

function initCharts() {
    initTrendChart();
    initPieChart();
    initBarChart();
    initForecastChart();
}

function initTrendChart() {
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;

    trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: exmiData.months,
            datasets: [
                {
                    label: 'Imports',
                    data: exmiData.imports,
                    borderColor: chartColors.danger,
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    borderWidth: 2
                },
                {
                    label: 'Exports',
                    data: exmiData.exports,
                    borderColor: chartColors.success,
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 10, 15, 0.9)',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ₹${context.raw.toLocaleString()} Cr`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 8
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + (value / 1000) + 'K Cr';
                        }
                    }
                }
            }
        }
    });
}

function initPieChart() {
    const ctx = document.getElementById('pieChart');
    if (!ctx) return;

    pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Imports (88.44%)', 'Exports (11.56%)'],
            datasets: [{
                data: [88.44, 11.56],
                backgroundColor: [
                    chartColors.danger,
                    chartColors.success
                ],
                borderColor: 'transparent',
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 10, 15, 0.9)',
                    padding: 12,
                    cornerRadius: 8
                }
            }
        }
    });
}

function initBarChart() {
    const ctx = document.getElementById('barChart');
    if (!ctx) return;

    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Copper', 'Lithium', 'Graphite'],
            datasets: [{
                label: 'Import Dependency (%)',
                data: [35, 95, 75],
                backgroundColor: [
                    chartColors.copper,
                    chartColors.lithium,
                    chartColors.graphite
                ],
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 10, 15, 0.9)',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `Import Dependency: ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

function initForecastChart() {
    const ctx = document.getElementById('forecastChart');
    if (!ctx) return;

    forecastChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: forecastData.months,
            datasets: [
                // Copper confidence interval
                {
                    label: 'Copper Upper',
                    data: forecastData.copperUpper,
                    borderColor: 'transparent',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    fill: '+1',
                    pointRadius: 0
                },
                {
                    label: 'Copper Lower',
                    data: forecastData.copperLower,
                    borderColor: 'transparent',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    fill: false,
                    pointRadius: 0
                },
                // Lithium confidence interval
                {
                    label: 'Lithium Upper',
                    data: forecastData.lithiumUpper,
                    borderColor: 'transparent',
                    backgroundColor: 'rgba(34, 211, 238, 0.1)',
                    fill: '+1',
                    pointRadius: 0
                },
                {
                    label: 'Lithium Lower',
                    data: forecastData.lithiumLower,
                    borderColor: 'transparent',
                    backgroundColor: 'rgba(34, 211, 238, 0.1)',
                    fill: false,
                    pointRadius: 0
                },
                // Graphite confidence interval
                {
                    label: 'Graphite Upper',
                    data: forecastData.graphiteUpper,
                    borderColor: 'transparent',
                    backgroundColor: 'rgba(167, 139, 250, 0.1)',
                    fill: '+1',
                    pointRadius: 0
                },
                {
                    label: 'Graphite Lower',
                    data: forecastData.graphiteLower,
                    borderColor: 'transparent',
                    backgroundColor: 'rgba(167, 139, 250, 0.1)',
                    fill: false,
                    pointRadius: 0
                },
                // Main lines
                {
                    label: 'Copper',
                    data: forecastData.copper,
                    borderColor: chartColors.copper,
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: chartColors.copper
                },
                {
                    label: 'Lithium',
                    data: forecastData.lithium,
                    borderColor: chartColors.lithium,
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: chartColors.lithium
                },
                {
                    label: 'Graphite',
                    data: forecastData.graphite,
                    borderColor: chartColors.graphite,
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: chartColors.graphite
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        filter: function(item) {
                            
                            return !item.text.includes('Upper') && !item.text.includes('Lower');
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 10, 15, 0.9)',
                    padding: 12,
                    cornerRadius: 8,
                    filter: function(item) {
                        return !item.dataset.label.includes('Upper') && !item.dataset.label.includes('Lower');
                    },
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ₹${context.raw.toLocaleString()} Cr`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + (value / 1000) + 'K Cr';
                        }
                    }
                }
            }
        }
    });
}


function initNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

       
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

   
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        }
    });

    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}


function initFilters() {
    const mineralSelect = document.getElementById('mineralSelect');
    const timeRange = document.getElementById('timeRange');
    const tradeType = document.getElementById('tradeType');

    [mineralSelect, timeRange, tradeType].forEach(select => {
        if (select) {
            select.addEventListener('change', updateDashboard);
        }
    });
}

function updateDashboard() {
    const mineral = document.getElementById('mineralSelect')?.value || 'all';
    const time = document.getElementById('timeRange')?.value || 'all';
    const trade = document.getElementById('tradeType')?.value || 'both';

    // Filter data based on selection
    let filteredMonths = [...exmiData.months];
    let filteredImports = [...exmiData.imports];
    let filteredExports = [...exmiData.exports];

    // Time range filter
    if (time === 'recent') {
        const startIndex = filteredMonths.findIndex(m => m.startsWith('2022'));
        filteredMonths = filteredMonths.slice(startIndex);
        filteredImports = filteredImports.slice(startIndex);
        filteredExports = filteredExports.slice(startIndex);
    } else if (time === 'historical') {
        const endIndex = filteredMonths.findIndex(m => m.startsWith('2022'));
        filteredMonths = filteredMonths.slice(0, endIndex);
        filteredImports = filteredImports.slice(0, endIndex);
        filteredExports = filteredExports.slice(0, endIndex);
    }


    if (trendChart) {
        trendChart.data.labels = filteredMonths;
        

        if (trade === 'import') {
            trendChart.data.datasets[0].data = filteredImports;
            trendChart.data.datasets[1].data = [];
        } else if (trade === 'export') {
            trendChart.data.datasets[0].data = [];
            trendChart.data.datasets[1].data = filteredExports;
        } else {
            trendChart.data.datasets[0].data = filteredImports;
            trendChart.data.datasets[1].data = filteredExports;
        }
        
        trendChart.update('active');
    }


    if (barChart) {
        if (mineral !== 'all') {
            const mineralInfo = mineralData[mineral];
            barChart.data.labels = [mineralInfo.name];
            barChart.data.datasets[0].data = [mineralInfo.importDependency];
            barChart.data.datasets[0].backgroundColor = [mineralInfo.color];
        } else {
            barChart.data.labels = ['Copper', 'Lithium', 'Graphite'];
            barChart.data.datasets[0].data = [35, 95, 75];
            barChart.data.datasets[0].backgroundColor = [
                chartColors.copper,
                chartColors.lithium,
                chartColors.graphite
            ];
        }
        barChart.update('active');
    }


    updateSummaryStats(filteredImports, filteredExports);
}

function updateSummaryStats(imports, exports) {
    const totalImport = imports[imports.length - 1] || 210103;
    const totalExport = exports[exports.length - 1] || 24516;
    const deficit = totalExport - totalImport;
    const dependency = ((totalImport / (totalImport + totalExport)) * 100).toFixed(2);

    const importEl = document.getElementById('totalImport');
    const exportEl = document.getElementById('totalExport');
    const deficitEl = document.getElementById('tradeDeficit');
    const ratioEl = document.getElementById('dependencyRatio');

    if (importEl) importEl.textContent = `₹${totalImport.toLocaleString()} Cr`;
    if (exportEl) exportEl.textContent = `₹${totalExport.toLocaleString()} Cr`;
    if (deficitEl) deficitEl.textContent = `₹${deficit.toLocaleString()} Cr`;
    if (ratioEl) ratioEl.textContent = `${dependency}%`;
}


function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);


    document.querySelectorAll('.method-card, .info-card, .insight-card, .recommendation-item, .metric-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}


const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);


function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        // Skip if not a number
        if (text.includes('%')) {
            const target = parseFloat(text);
            animateValue(counter, 0, target, 1500, '%');
        } else if (text.includes('Years')) {
            counter.textContent = text; // Keep as is
        }
    });
}

function animateValue(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeProgress;
        
        element.textContent = current.toFixed(2) + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}


document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCharts();
    initFilters();
    initScrollAnimations();
    

    setTimeout(animateCounters, 500);
});


let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (trendChart) trendChart.resize();
        if (pieChart) pieChart.resize();
        if (barChart) barChart.resize();
        if (forecastChart) forecastChart.resize();
    }, 250);
});

console.log('🚀 India Critical Minerals EXIM Dashboard initialized');
console.log('📊 Team CODEVATIVE - Data Analytics Hackathon 2025');
