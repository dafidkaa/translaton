import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, Table, Zap, Shield, Globe, Database, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'CSV File Translation - Bulk Translate CSV Data with AI',
  description: 'Translate CSV files instantly with AI. Perfect for product catalogs, user data, content databases, and bulk localization. Preserve formatting, handle large datasets, 100+ languages.',
  keywords: [
    'CSV translation',
    'CSV file translator',
    'bulk CSV translation',
    'product catalog translation',
    'database translation',
    'CSV localization',
    'spreadsheet translation',
    'data translation',
    'bulk data translation',
    'AI CSV translator',
    'multilingual CSV',
    'CSV internationalization'
  ],
  openGraph: {
    title: 'CSV File Translation - Bulk Translate CSV Data with AI',
    description: 'Translate CSV files instantly with AI. Perfect for product catalogs, user data, and bulk localization.',
    url: 'https://translaton.com/csv-translation',
  },
}

export default function CsvTranslationPage() {
  const features = [
    {
      icon: Table,
      title: 'Column Mapping',
      description: 'Smart detection of translatable columns vs data columns'
    },
    {
      icon: Database,
      title: 'Large File Support',
      description: 'Handle CSV files with thousands of rows efficiently'
    },
    {
      icon: Shield,
      title: 'Data Integrity',
      description: 'Preserves formatting, numbers, dates, and special characters'
    },
    {
      icon: Globe,
      title: 'Bulk Processing',
      description: 'Translate entire datasets in one operation'
    },
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Optimized for speed with parallel translation processing'
    },
    {
      icon: CheckCircle,
      title: 'Quality Control',
      description: 'Review and edit translations before export'
    }
  ]

  const useCases = [
    {
      title: 'Product Catalogs',
      description: 'E-commerce product names, descriptions, and specifications',
      columns: ['Product Name', 'Description', 'Category', 'Features']
    },
    {
      title: 'Content Databases',
      description: 'Blog posts, articles, and content management systems',
      columns: ['Title', 'Content', 'Tags', 'Meta Description']
    },
    {
      title: 'User Data',
      description: 'User profiles, reviews, comments, and feedback',
      columns: ['Name', 'Bio', 'Comments', 'Reviews']
    },
    {
      title: 'Marketing Data',
      description: 'Campaign content, ad copy, and promotional materials',
      columns: ['Campaign Name', 'Ad Copy', 'Description', 'CTA']
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-purple-600">CSV File Translation</span> at Scale
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Translate CSV files with thousands of rows instantly. Perfect for product catalogs, 
            user data, content databases, and bulk localization projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Translate CSV Now
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
              Smart CSV Translation Features
            </h2>
            <p className="text-lg text-gray-600">
              Advanced AI that understands data structure and context
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="p-6 border border-gray-200">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-purple-600" />
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
              Perfect for Every Data Type
            </h2>
            <p className="text-lg text-gray-600">
              From product catalogs to user content - we handle it all
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="p-6 bg-white border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Common columns:</p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.columns.map((column) => (
                      <span 
                        key={column}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded"
                      >
                        {column}
                      </span>
                    ))}
                  </div>
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
              How CSV Translation Works
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload CSV</h3>
              <p className="text-gray-600 text-sm">Drop your CSV file or select from computer</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Columns</h3>
              <p className="text-gray-600 text-sm">Choose which columns to translate</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Processing</h3>
              <p className="text-gray-600 text-sm">Our AI translates while preserving data</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Download</h3>
              <p className="text-gray-600 text-sm">Get your translated CSV ready to use</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Scale Your Data Translation Today
          </h2>
          <p className="text-lg text-purple-100 mb-8">
            Process thousands of rows in minutes. Free to start, no setup required.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-50">
              Try CSV Translation Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
