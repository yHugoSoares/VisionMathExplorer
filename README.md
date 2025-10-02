# Vision Science Applications

This web application provides interactive calculators and tools for vision science, including visual acuity calculations and lensmaker formulas. It is built with React, TypeScript, Vite, and TailwindCSS.

## Features

- **Visual Acuity Calculator:**  
  Calculate subtended angle, decimal acuity, Snellen equivalent, and LogMAR from object size and observation distance.

- **Lensmaker Formula Calculator:**  
  Compensate for vertex distance and compute effective lens power.

- **Tabbed Interface:**  
  Easily switch between different calculators and tools.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd VisionScienceApplications
   ```

2. Install dependencies:
   ```sh
   pnpm install
   ```

### Running the App

Start the development server:
```sh
pnpm dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
pnpm build
```

### Preview Production Build

```sh
pnpm preview
```

## Usage

- Enter the required values in the calculators.
- Click **Calcular** to compute results.
- Use **Limpar** to reset inputs.
- Switch tabs for different tools.

## Technologies

- React
- TypeScript
- Vite
- TailwindCSS
- Radix UI
- Sonner (for toast notifications)

## License

MIT

---

Made by Hugo Soares