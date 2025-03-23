# Weather Dashboard

A modern weather dashboard built with Next.js that allows users to track weather conditions across multiple cities. This project uses json-server to mock weather API responses for development and demonstration purposes.

![Weather Dashboard Screenshot](./public/screenshot.png)

## Features

- 🌡️ Real-time weather data simulation for multiple cities
- 🔄 Temperature unit conversion (Celsius/Fahrenheit)
- 🏙️ Support for major cities: London, Paris, Lagos, Tokyo, and New York
- 📱 Responsive design for all devices
- ⚡ Client-side state management with React hooks
- 💾 Local storage persistence for temperature unit preference
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + Local Storage
- **Mock API**: json-server
- **Icons**: Lucide React
- **Components**: Custom UI components with shadcn/ui

## Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the mock API server:
```bash
npm run server
```

4. In a new terminal, start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## Project Structure

```
weather-dashboard/
├── src/
│   ├── app/                    # Next.js app router files
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   └── weather/           # Weather-specific components
│   ├── lib/
│   │   ├── constants.ts       # Application constants
│   │   ├── types.ts          # TypeScript types
│   │   └── weatherService.ts  # Weather data fetching logic
│   └── hooks/                 # Custom React hooks
├── public/                    # Static assets
├── db.json                    # Mock API data
└── package.json              
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run server` - Starts the json-server mock API
- `npm run build` - Creates a production build
- `npm start` - Runs the production build
- `npm run lint` - Runs ESLint for code quality

## API Endpoints

The mock API runs on `http://localhost:3001` with the following endpoints:

- `GET /weather/:city` - Returns weather data for a specific city

Example response:
```json
{
  "city": "London",
  "temperature": 18,
  "humidity": 70,
  "wind": 12,
  "icon": "partly-cloudy"
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- UI Components inspired by [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide Icons](https://lucide.dev)
- Built with [Next.js](https://nextjs.org)
