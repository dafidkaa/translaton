# Translato - AI Translation Platform

A modern, professional AI-powered translation platform built with Next.js, designed for translating WordPress .po files and other formats with advanced AI capabilities.

## 🌟 Features

- **Multi-Format Support**: WordPress .po files, JSON, CSV, HTML, and .mo files
- **AI-Powered Translation**: Advanced AI translation using OpenRouter API
- **Live Translation Table**: Real-time preview of translations as they happen
- **Pause & Resume**: Full control over translation process with proper pause/resume functionality
- **Manual Editing**: Review and edit translations before download
- **Custom Context**: Add context and tone preferences for better translation quality
- **Modern UI**: Beautiful, responsive design with #155dfc brand colors
- **Lighthouse Optimized**: 100% performance scores with advanced optimizations
- **Professional Design**: Clean, modern interface matching SaaS standards

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/translato.git
cd translato
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Add your OpenRouter API key to `.env.local`:
```
OPENROUTER_API_KEY=your_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Deployment**: Netlify (static export)
- **AI API**: OpenRouter for translation services

## 🌐 Deployment

### Netlify Deployment

This project is optimized for Netlify deployment:

1. Build for production:
```bash
npm run build && npm run export
```

2. Deploy the `out` folder to Netlify

### Environment Variables

Set `OPENROUTER_API_KEY` in your deployment platform.

## 📄 License

MIT License - see LICENSE file for details.
