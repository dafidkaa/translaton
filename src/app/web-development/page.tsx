import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, Code, Globe, Zap, Shield, Clock, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Translation for Web Development - Translate React, Vue, Angular Files',
  description: 'Automate translation for web development projects. Translate JSON, HTML, JavaScript, TypeScript files instantly with AI. Perfect for React, Vue, Angular, and Next.js internationalization.',
  keywords: [
    'web development translation',
    'React translation',
    'Vue translation', 
    'Angular translation',
    'Next.js translation',
    'JavaScript translation',
    'TypeScript translation',
    'JSON translation',
    'HTML translation',
    'i18n automation',
    'internationalization',
    'localization',
    'frontend translation'
  ],
  openGraph: {
    title: 'AI Translation for Web Development - Translate React, Vue, Angular Files',
    description: 'Automate translation for web development projects. Translate JSON, HTML, JavaScript files instantly with AI.',
    url: 'https://translaton.com/web-development',
  },
}

export default function WebDevelopmentPage() {
  const features = [
    {
      icon: Code,
      title: 'Framework Support',
      description: 'Works with React, Vue, Angular, Next.js, Nuxt, and all modern frameworks'
    },
    {
      icon: Zap,
      title: 'Instant Translation',
      description: 'Translate entire projects in minutes, not weeks of manual work'
    },
    {
      icon: Shield,
      title: 'Code-Safe',
      description: 'Preserves code structure, variables, and formatting perfectly'
    },
    {
      icon: Globe,
      title: '100+ Languages',
      description: 'Support for all major languages with native speaker quality'
    },
    {
      icon: Clock,
      title: 'Real-time Preview',
      description: 'See translations as they happen with live editing capabilities'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share projects and collaborate on translations with your team'
    }
  ]

  const useCases = [
    {
      title: 'React/Next.js Projects',
      description: 'Translate JSON locale files, component strings, and static content',
      formats: ['JSON', 'JSX', 'TSX', 'HTML']
    },
    {
      title: 'Vue/Nuxt Applications',
      description: 'Handle Vue i18n files, template strings, and component translations',
      formats: ['JSON', 'Vue', 'HTML', 'YAML']
    },
    {
      title: 'Angular Projects',
      description: 'Translate Angular i18n files, templates, and component content',
      formats: ['JSON', 'XML', 'HTML', 'TS']
    },
    {
      title: 'Static Sites',
      description: 'Translate HTML, markdown, and configuration files for static generators',
      formats: ['HTML', 'MD', 'YAML', 'JSON']
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            AI Translation for <span className="text-blue-600">Web Development</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Automate translation for React, Vue, Angular, and all web frameworks. 
            Translate JSON, HTML, and component files instantly with AI precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Translating Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for Modern Web Development
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to internationalize your web applications
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="p-6 border border-gray-200">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-blue-600" />
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
              Perfect for Every Framework
            </h2>
            <p className="text-lg text-gray-600">
              No matter what you're building, we've got you covered
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="p-6 bg-white border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {useCase.formats.map((format) => (
                    <span 
                      key={format}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded"
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Accelerate Your Web Development?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of developers who trust Translaton for their internationalization needs
          </p>
          <Link href="/">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
              Start Your Free Translation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
