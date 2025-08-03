import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, FileText, Zap, Shield, Globe, Code, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'JSON File Translation - AI-Powered JSON Localization Tool',
  description: 'Translate JSON files instantly with AI. Perfect for React i18n, Vue i18n, Angular i18n, and API localization. Preserve structure, handle nested objects, 100+ languages.',
  keywords: [
    'JSON translation',
    'JSON file translator',
    'JSON localization',
    'i18n JSON',
    'React i18n translation',
    'Vue i18n translation',
    'Angular i18n translation',
    'API translation',
    'JSON internationalization',
    'nested JSON translation',
    'bulk JSON translation',
    'AI JSON translator'
  ],
  openGraph: {
    title: 'JSON File Translation - AI-Powered JSON Localization Tool',
    description: 'Translate JSON files instantly with AI. Perfect for React i18n, Vue i18n, Angular i18n, and API localization.',
    url: 'https://translaton.com/json-translation',
  },
}

export default function JsonTranslationPage() {
  const features = [
    {
      icon: Shield,
      title: 'Structure Preservation',
      description: 'Maintains exact JSON structure, keys, and nested object hierarchy'
    },
    {
      icon: Code,
      title: 'Variable Safety',
      description: 'Protects variables, placeholders, and interpolation syntax'
    },
    {
      icon: Zap,
      title: 'Bulk Processing',
      description: 'Translate thousands of keys in minutes, not hours'
    },
    {
      icon: Globe,
      title: '100+ Languages',
      description: 'Support for all major languages with cultural context'
    },
    {
      icon: FileText,
      title: 'Format Options',
      description: 'Export as JSON, CSV, or other formats for your workflow'
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'Built-in validation and manual editing capabilities'
    }
  ]

  const useCases = [
    {
      title: 'React/Next.js i18n',
      description: 'Translate react-i18next, next-i18next locale files',
      example: '{"welcome": "Welcome", "button.submit": "Submit"}'
    },
    {
      title: 'Vue i18n Files',
      description: 'Handle Vue i18n JSON locale files with nested structures',
      example: '{"nav": {"home": "Home", "about": "About"}}'
    },
    {
      title: 'Angular i18n',
      description: 'Translate Angular i18n JSON files and locale data',
      example: '{"HELLO_WORLD": "Hello World", "USER_PROFILE": "Profile"}'
    },
    {
      title: 'API Responses',
      description: 'Localize API response messages and error strings',
      example: '{"errors": {"required": "Field is required"}}'
    },
    {
      title: 'Configuration Files',
      description: 'Translate app configs, settings, and metadata',
      example: '{"app": {"name": "My App", "description": "App description"}}'
    },
    {
      title: 'Content Management',
      description: 'Localize CMS content, blog posts, and dynamic data',
      example: '{"posts": [{"title": "Post Title", "content": "Content"}]}'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-green-600">JSON File Translation</span> Made Simple
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Translate JSON files instantly while preserving structure, variables, and formatting. 
            Perfect for React i18n, Vue i18n, Angular i18n, and API localization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Translate JSON Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              See Example
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Smart JSON Translation Features
            </h2>
            <p className="text-lg text-gray-600">
              Advanced AI that understands JSON structure and context
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="p-6 border border-gray-200">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perfect for Every JSON Use Case
            </h2>
            <p className="text-lg text-gray-600">
              From simple key-value pairs to complex nested structures
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="p-6 bg-white border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{useCase.description}</p>
                <div className="bg-gray-100 p-3 rounded text-xs font-mono text-gray-700">
                  {useCase.example}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How JSON Translation Works
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload JSON</h3>
              <p className="text-gray-600 text-sm">Drop your JSON file or paste content directly</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Translation</h3>
              <p className="text-gray-600 text-sm">Our AI preserves structure while translating values</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Download Result</h3>
              <p className="text-gray-600 text-sm">Get your translated JSON ready for production</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Translating JSON Files Today
          </h2>
          <p className="text-lg text-green-100 mb-8">
            Free to start, no credit card required. Translate your first JSON file in under 2 minutes.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-50">
              Try JSON Translation Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
