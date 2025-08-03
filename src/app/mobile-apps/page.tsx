import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, Smartphone, Globe, Zap, Shield, Users, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mobile App Translation - iOS & Android Localization with AI',
  description: 'Translate mobile apps instantly with AI. Support for iOS strings, Android XML, React Native, Flutter, and Xamarin. 100+ languages, app store optimization, cultural adaptation.',
  keywords: [
    'mobile app translation',
    'iOS app translation',
    'Android app translation',
    'React Native translation',
    'Flutter translation',
    'Xamarin translation',
    'app localization',
    'mobile localization',
    'iOS strings translation',
    'Android XML translation',
    'app store optimization',
    'mobile i18n',
    'app internationalization'
  ],
  openGraph: {
    title: 'Mobile App Translation - iOS & Android Localization with AI',
    description: 'Translate mobile apps instantly with AI. Support for iOS, Android, React Native, Flutter, and Xamarin.',
    url: 'https://translaton.com/mobile-apps',
  },
}

export default function MobileAppsPage() {
  const features = [
    {
      icon: Smartphone,
      title: 'Platform Support',
      description: 'iOS, Android, React Native, Flutter, Xamarin, and hybrid apps'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: '100+ languages with cultural context and local preferences'
    },
    {
      icon: Zap,
      title: 'Fast Deployment',
      description: 'From translation to app store in hours, not weeks'
    },
    {
      icon: Shield,
      title: 'Format Preservation',
      description: 'Maintains iOS strings, Android XML, and JSON structures'
    },
    {
      icon: Users,
      title: 'User Experience',
      description: 'Culturally adapted content for better user engagement'
    },
    {
      icon: Star,
      title: 'App Store Ready',
      description: 'Optimized descriptions and metadata for better rankings'
    }
  ]

  const platforms = [
    {
      title: 'iOS Apps',
      description: 'Translate Localizable.strings, Storyboard strings, and Info.plist',
      formats: ['strings', 'stringsdict', 'plist', 'xib'],
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Android Apps',
      description: 'Handle strings.xml, plurals, arrays, and resource files',
      formats: ['XML', 'strings.xml', 'arrays.xml', 'plurals.xml'],
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'React Native',
      description: 'Translate i18n JSON files and component strings',
      formats: ['JSON', 'JS', 'TS', 'JSX'],
      color: 'bg-cyan-100 text-cyan-600'
    },
    {
      title: 'Flutter',
      description: 'Handle ARB files, Dart strings, and intl messages',
      formats: ['ARB', 'JSON', 'Dart', 'YAML'],
      color: 'bg-indigo-100 text-indigo-600'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-indigo-600">Mobile App Translation</span> Made Simple
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Translate iOS, Android, React Native, and Flutter apps instantly. 
            Reach global audiences with culturally adapted content and app store optimization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                Translate Your App
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              See Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for Mobile Localization
            </h2>
            <p className="text-lg text-gray-600">
              From technical translation to cultural adaptation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="p-6 border border-gray-200">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Platform Support */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Support for Every Mobile Platform
            </h2>
            <p className="text-lg text-gray-600">
              Native and cross-platform frameworks covered
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {platforms.map((platform, index) => (
              <Card key={index} className="p-6 bg-white border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{platform.title}</h3>
                <p className="text-gray-600 mb-4">{platform.description}</p>
                <div className="flex flex-wrap gap-2">
                  {platform.formats.map((format) => (
                    <span 
                      key={format}
                      className={`px-2 py-1 text-xs font-medium rounded ${platform.color}`}
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

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Mobile Apps Need Professional Translation
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">📱 Increased Downloads</h3>
                <p className="text-gray-600">Apps with localized content see 128% more downloads in international markets</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">⭐ Better Ratings</h3>
                <p className="text-gray-600">Users rate localized apps 23% higher than English-only versions</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">💰 Higher Revenue</h3>
                <p className="text-gray-600">Localized apps generate 26% more revenue per user on average</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🌍 Global Reach</h3>
                <p className="text-gray-600">Access to 4.8 billion mobile users worldwide speaking 100+ languages</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🚀 Faster Launch</h3>
                <p className="text-gray-600">Launch in multiple markets simultaneously instead of sequential rollouts</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🎯 Better UX</h3>
                <p className="text-gray-600">Culturally adapted content improves user engagement and retention</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Go Global with Your Mobile App?
          </h2>
          <p className="text-lg text-indigo-100 mb-8">
            Join thousands of app developers who trust Translaton for their localization needs
          </p>
          <Link href="/">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-50">
              Start App Translation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
