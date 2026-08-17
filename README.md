# Weather Dashboard

A modern, responsive weather dashboard that fetches real-time weather data from the OpenWeatherMap API.

## Features

 **Current Weather Display**
- Real-time weather conditions for any location
- Temperature, humidity, wind speed, pressure, and cloudiness
- Sunrise and sunset times
- Visibility and dew point calculations
- Min/Max temperature

 **5-Day Forecast**
- Daily weather predictions
- Temperature trends
- Weather descriptions and icons
- Humidity and wind speed for each day

 **Smart Search**
- Search weather for any city worldwide
- Auto-suggestions for popular cities
- Error handling for invalid cities

 **Beautiful UI**
- Modern glass-morphism design
- Responsive layout (mobile, tablet, desktop)
- Smooth animations and transitions
- Real-time weather icons from OpenWeatherMap
- Font Awesome icons for enhanced visuals

 **Tech Stack**
- React 18
- Vite
- Tailwind CSS
- Axios
- date-fns
- OpenWeatherMap API

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Free OpenWeatherMap API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PaulKagombe/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get OpenWeatherMap API Key**
   - Visit https://openweathermap.org/api
   - Sign up for a free account
   - Generate an API key
   - Copy the `.env.example` to `.env`
   - Add your API key:
     ```bash
     cp .env.example .env
     # Edit .env and add your API key
     VITE_OPENWEATHER_API_KEY=your_api_key_here
     ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx        # Search input with suggestions
│   ├── CurrentWeather.jsx   # Current weather display
│   ├── WeatherDetails.jsx   # Detailed weather metrics
│   └── Forecast.jsx         # 5-day forecast
├── services/
│   └── weatherAPI.js        # API integration and utilities
├── App.jsx                  # Main app component
├── main.jsx                 # Entry point
└── index.css                # Global styles with Tailwind
```

## API Endpoints Used

### Current Weather
```
GET https://api.openweathermap.org/data/2.5/weather
Params: q (city), appid (API key), units (metric)
```

### 5-Day Forecast
```
GET https://api.openweathermap.org/data/2.5/forecast
Params: q (city), appid (API key), units (metric)
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_OPENWEATHER_API_KEY=your_free_api_key_from_openweathermap
```

## Features Explained

### Current Weather Card
- Displays the current temperature, weather condition, and "feels like" temperature
- Shows humidity, wind speed, pressure, and cloud coverage
- Responsive grid layout with color-coded metrics

### Weather Details Section
- Six key metrics: Sunrise, Sunset, Visibility, Dew Point, Max/Min Temperature
- Color-coded cards for easy identification
- Font Awesome icons for visual appeal

### 5-Day Forecast
- Displays the next 5 days of weather predictions
- Each card shows the date, weather icon, temperature, description
- Includes humidity and wind speed for each day
- Hover effects for interactivity

### Search Functionality
- Auto-complete suggestions for popular cities
- Real-time search input filtering
- Error handling for invalid city names
- Loading states during API calls

## Error Handling

- **City Not Found**: User-friendly message when city doesn't exist
- **Invalid API Key**: Clear error if API key is missing or incorrect
- **Network Errors**: Graceful fallback for network issues
- **Loading States**: Visual feedback during data fetching

## Customization

### Change Default City
Edit `src/App.jsx` and modify the `useState('London')` line:
```jsx
const [city, setCity] = useState('Your City Name')
```

### Modify Colors
Edit `tailwind.config.js` or override in `src/index.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add More Weather Details
Extend the `WeatherDetails.jsx` component with additional metrics from the API response.

## Performance Tips

- The app uses Vite for fast development and production builds
- Tailwind CSS is optimized for production
- Images are lazy-loaded from OpenWeatherMap CDN
- Forecast data is filtered to show daily summaries instead of 3-hour intervals

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Feel free to:
- Fork the repository
- Create a new branch for your feature
- Submit a pull request

## Future Enhancements

- [ ] Weather alerts and warnings
- [ ] UV index and air quality data
- [ ] Historical weather data
- [ ] Multiple city comparisons
- [ ] Weather maps integration
- [ ] Dark/Light theme toggle
- [ ] Geolocation auto-detection
- [ ] Local storage for favorites
- [ ] PWA support for offline access
- [ ] Push notifications for severe weather

## Troubleshooting

### API Key not working
- Verify you copied the key correctly
- Ensure the API is activated in your OpenWeatherMap account
- Wait a few minutes after creating the key (sometimes there's a delay)

### City not found error
- Check the spelling of the city name
- Try searching for a major city or city with country code (e.g., "London, UK")

### Port 3000 already in use
- Change the port in `vite.config.js`:
  ```js
  server: {
    port: 3001, // or any available port
  }
  ```

## Resources

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [date-fns Documentation](https://date-fns.org)

## Support

For issues or questions, please open an issue on GitHub.

---

**Made  by PaulKagombe**
