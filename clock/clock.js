// Preset configurations
const presets = {
    default: [
        'America/New_York',
        'Europe/London',
        'Asia/Tokyo',
        'Australia/Sydney'
    ],
    americas: [
        'America/Los_Angeles',
        'America/Denver',
        'America/Chicago',
        'America/New_York',
        'America/Toronto',
        'America/Sao_Paulo',
        'America/Buenos_Aires'
    ],
    'europe-africa': [
        'Europe/London',
        'Europe/Paris',
        'Europe/Berlin',
        'Europe/Moscow',
        'Africa/Cairo',
        'Africa/Johannesburg',
        'Asia/Dubai'
    ],
    'asia-pacific': [
        'Asia/Kolkata',
        'Asia/Bangkok',
        'Asia/Shanghai',
        'Asia/Tokyo',
        'Asia/Seoul',
        'Asia/Singapore',
        'Australia/Sydney',
        'Pacific/Auckland'
    ]
};

// State management
const state = {
    timezones: ['America/New_York', 'Europe/London', 'Asia/Tokyo'],
    updateInterval: null
};

// Initialize the clock app
function initClock() {
    renderClocks();
    setupEventListeners();
    startClockUpdate();
}

// Setup event listeners
function setupEventListeners() {
    // Add button
    document.getElementById('add-btn').addEventListener('click', addTimezone);

    // Timezone select
    document.getElementById('timezone-select').addEventListener('change', (e) => {
        if (e.target.value) {
            state.timezones.push(e.target.value);
            e.target.value = '';
            renderClocks();
        }
    });

    // Preset buttons
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const preset = e.target.dataset.preset;
            state.timezones = [...presets[preset]];
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderClocks();
        });
    });
}

// Add a new timezone
function addTimezone() {
    const select = document.getElementById('timezone-select');
    if (select.value && !state.timezones.includes(select.value)) {
        state.timezones.push(select.value);
        select.value = '';
        renderClocks();
    }
}

// Remove a timezone
function removeTimezone(timezone) {
    state.timezones = state.timezones.filter(tz => tz !== timezone);
    renderClocks();
}

// Render all clock cards
function renderClocks() {
    const container = document.getElementById('clocks-container');

    if (state.timezones.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">🕐</div>
                <div class="empty-state-text">No time zones selected</div>
                <div class="empty-state-subtext">Select a timezone from the dropdown or use a preset to get started</div>
            </div>
        `;
        return;
    }

    container.innerHTML = state.timezones.map(timezone => createClockCard(timezone)).join('');

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const timezone = e.currentTarget.dataset.timezone;
            removeTimezone(timezone);
        });
    });

    // Update clock displays
    updateClocks();
}

// Create a single clock card
function createClockCard(timezone) {
    const timeObj = getTimeInTimezone(timezone);
    const tzName = getTimezoneName(timezone);
    const abbr = getTimezoneAbbr(timezone);
    const offset = getUTCOffset(timezone);

    return `
        <div class="clock-card">
            <div class="clock-header">
                <div>
                    <div class="timezone-name">${tzName}</div>
                    <div class="timezone-abbr">${abbr}</div>
                </div>
                <button class="remove-btn" data-timezone="${timezone}" title="Remove">×</button>
            </div>

            <div class="digital-clock">
                <div class="time" id="time-${timezone}">
                    ${formatTime(timeObj)}
                </div>
            </div>

            <div class="clock-info">
                <div class="info-item">
                    <div class="info-label">Date</div>
                    <div class="info-value" id="date-${timezone}">${formatDate(timeObj)}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Day</div>
                    <div class="info-value" id="day-${timezone}">${getDayName(timeObj)}</div>
                </div>
            </div>

            <div class="utc-offset" id="offset-${timezone}">UTC${offset}</div>
        </div>
    `;
}

// Get time in a specific timezone
function getTimeInTimezone(timezone) {
    return new Date(new Date().toLocaleString('en-US', { timeZone: timezone }));
}

// Format time as HH:MM:SS
function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Format date as MMM DD, YYYY
function formatDate(date) {
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Get day name
function getDayName(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

// Get timezone name from timezone string
function getTimezoneName(timezone) {
    const parts = timezone.split('/');
    return parts.pop().replace(/_/g, ' ');
}

// Get timezone abbreviation
function getTimezoneAbbr(timezone) {
    const date = getTimeInTimezone(timezone);
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        timeZoneName: 'short'
    });
    const parts = formatter.formatToParts(date);
    const tzNamePart = parts.find(p => p.type === 'timeZoneName');
    return tzNamePart ? tzNamePart.value : 'UTC';
}

// Get UTC offset
function getUTCOffset(timezone) {
    const date = new Date();
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    const offset = (tzDate - utcDate) / (1000 * 60 * 60);
    const sign = offset >= 0 ? '+' : '-';
    const hours = String(Math.abs(Math.floor(offset))).padStart(2, '0');
    const minutes = String(Math.abs(Math.round((offset % 1) * 60))).padStart(2, '0');
    return `${sign}${hours}:${minutes}`;
}

// Update all clock displays
function updateClocks() {
    state.timezones.forEach(timezone => {
        const timeObj = getTimeInTimezone(timezone);
        const timeEl = document.getElementById(`time-${timezone}`);
        const dateEl = document.getElementById(`date-${timezone}`);
        const dayEl = document.getElementById(`day-${timezone}`);

        if (timeEl) timeEl.textContent = formatTime(timeObj);
        if (dateEl) dateEl.textContent = formatDate(timeObj);
        if (dayEl) dayEl.textContent = getDayName(timeObj);
    });
}

// Start continuous clock update
function startClockUpdate() {
    if (state.updateInterval) clearInterval(state.updateInterval);
    state.updateInterval = setInterval(updateClocks, 1000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initClock();
    // Set default preset as active
    document.querySelector('[data-preset="default"]').classList.add('active');
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (state.updateInterval) clearInterval(state.updateInterval);
});