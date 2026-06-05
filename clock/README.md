# Multi-Timezone Digital Clock

A beautiful, real-time digital clock that displays the current time across multiple time zones simultaneously.

## Features

✅ **Real-time Updates** - Updates every second  
✅ **Multiple Time Zones** - Display and track any number of time zones  
✅ **Quick Presets** - Pre-configured sets for common regions  
✅ **Detailed Info** - Shows date, day of week, and UTC offset  
✅ **Easy Management** - Add/remove time zones with one click  
✅ **Beautiful Design** - Modern gradient UI with smooth animations  
✅ **Responsive** - Works perfectly on desktop, tablet, and mobile  
✅ **No Dependencies** - Pure vanilla JavaScript  

## Quick Start

### Open in Browser
1. Open `index.html` in your web browser
2. The default set of 4 time zones will display immediately
3. Start exploring!

### Run Locally
```bash
cd clock
python3 -m http.server 8000
# Visit http://localhost:8000
```

## How to Use

### Add a Time Zone
1. Select a timezone from the dropdown
2. Click the "+ Add" button
3. The clock card appears instantly

### Use Presets
Click any of the preset buttons to load a region:
- **🌍 Default Set** - Popular global cities
- **🌎 Americas** - North & South American time zones
- **🌍 Europe/Africa** - European and African regions
- **🌏 Asia/Pacific** - Asian and Pacific time zones

### Remove a Time Zone
- Click the **×** button in the top-right corner of any clock card

## Supported Time Zones

The clock supports all major time zones including:

**North America**: Los Angeles, Denver, Chicago, New York, Toronto, Mexico City  
**South America**: São Paulo, Buenos Aires, Lima  
**Europe**: London, Paris, Berlin, Madrid, Amsterdam, Rome, Moscow  
**Middle East & Africa**: Cairo, Johannesburg, Dubai, Jerusalem  
**Asia**: India, Bangkok, Shanghai, Hong Kong, Tokyo, Seoul, Singapore  
**Oceania**: Sydney, Melbourne, Auckland, Fiji  

## Display Information

Each clock card shows:
- **Timezone Name** - Full readable name
- **Time Zone Abbreviation** - Short code (EST, PST, IST, etc.)
- **Digital Clock** - HH:MM:SS format with glow effect
- **Date** - Current date in MMM DD, YYYY format
- **Day** - Day of the week
- **UTC Offset** - Offset from UTC (±HH:MM)

## Keyboard Shortcuts

- **Escape** - Clear the timezone dropdown (can be added)
- **Enter** - Add selected timezone (can be added)

## Technical Details

### Technology Stack
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - No frameworks or libraries
- **Intl API** - Native timezone handling

### How It Works
1. Uses JavaScript's `Intl` API for accurate timezone conversion
2. Updates every second using `setInterval`
3. Stores selected timezones in application state
4. Dynamically renders/removes clock cards
5. All calculations done client-side for instant response

### File Structure
```
clock/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── clock.js        # Clock logic and interactivity
└── README.md       # This file
```

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Examples

### Display a Global Team's Time
If your team is spread across New York, London, Tokyo, and Sydney:
1. Click "Default Set" preset
2. Instantly see all team members' current time

### Track Multiple Regions
1. Click "Americas" to see all North/South American time zones
2. Perfect for international business hours tracking

### Compare Time Zones
1. Add any two time zones
2. Instantly see the time difference
3. Helpful for scheduling meetings

## Customization

### Add More Presets
Edit the `presets` object in `clock.js`:
```javascript
const presets = {
    'my-custom': [
        'America/New_York',
        'Europe/London',
        // ... add more timezones
    ]
};
```

### Change Colors
Modify CSS variables in `styles.css`:
```css
:root {
    --primary-color: #0969da;      /* Main color */
    --secondary-color: #6e40aa;    /* Accent color */
    /* ... other variables */
}
```

### Adjust Update Frequency
In `clock.js`, change the interval in `startClockUpdate()`:
```javascript
state.updateInterval = setInterval(updateClocks, 500); // Every 500ms
```

## Tips & Tricks

💡 **Meeting Scheduler** - Add time zones for all meeting participants  
💡 **Travel Planning** - Track destinations' local times before traveling  
💡 **International Teams** - Monitor working hours across offices  
💡 **Live Events** - Keep track of event times in different regions  
💡 **Study Sessions** - Coordinate with friends in different timezones  

## Performance

- **Lightweight** - ~15KB total (HTML + CSS + JS)
- **Efficient** - Uses native browser timezone APIs
- **Smooth** - 60 FPS animations on modern devices
- **Fast Loading** - No external dependencies

## Known Limitations

- Daylight Saving Time changes are handled by the browser's OS
- Custom time zones cannot be created (uses standard IANA database)
- Historical timezone data relies on OS (generally up-to-date)

## Future Enhancements

🚀 Save favorites to localStorage  
🚀 Edit timezone labels  
🚀 12/24 hour format toggle  
🚀 Display world map with highlighted zones  
🚀 Dark mode  
🚀 Add notification/alarm feature  
🚀 Export as image  

## License

MIT

## Support

For issues or suggestions, please create a GitHub issue.
