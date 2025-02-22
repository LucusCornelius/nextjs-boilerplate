# Next.js Boilerplate

A modern and lightweight Next.js template with Tailwind CSS, TypeScript, and essential libraries to kickstart your project.

## Features

- **Next.js 15** with React 19 for the latest performance improvements.
- **Turbopack** enabled for faster development builds.
- **TypeScript** support for type safety.
- **Tailwind CSS** with additional utilities via `tailwind-merge` and `tailwindcss-animate`.
- **ESLint & Prettier** for consistent and clean code.
- **Lucide React Icons** for stylish and customizable icons.
- **Axios** for making HTTP requests.
- **Environment Variables** managed with `dotenv`.
- **Class Utilities** using `clsx` and `class-variance-authority`.

## Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/LucusCornelius/nextjs-boilerplate.git
cd nextjs-template
npm install
```

## Usage

### Development
Start the development server:

```sh
npm run dev
```
This runs the Next.js development server on port `4173` with Turbopack enabled.

### Production
Build and start the production server:

```sh
npm run build
npm start
```

### Linting
Run ESLint to check for code issues:

```sh
npm run lint
```

## Folder Structure

```
.
├── LICENSE
├── README.md
├── components
│   └── Nav.tsx
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── src
│   └── app
│       ├── layout.tsx
│       └── page.tsx
├── styles
│   └── globals.css
├── tailwind.config.ts
└── tsconfig.json
```

## Contributing

Feel free to submit issues and pull requests to improve this boilerplate!

## License

This project is licensed under the MIT License.

