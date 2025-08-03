"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Badge } from "./ui/badge";
// Import all icons normally to avoid HMR issues
import { Suspense } from "react";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Zap,
  Shield,
  Languages,
  Sparkles,
  Clock,
  DollarSign,
  Users,
  FileText,
  Smartphone,
  ShoppingCart,
  Gamepad2,
  GraduationCap,
  Play,
  Upload,
} from "lucide-react";

// Icon fallback component
const IconFallback = () => <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />;

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {

  const useCases = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Translate HTML, CSS, and web content instantly",
      link: "/web-development"
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Localize JSON strings for iOS, Android, React Native",
      link: "/mobile-apps"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description: "Bulk product catalogs and store content",
      link: "#"
    },

    {
      icon: Gamepad2,
      title: "Gaming",
      description: "Game dialogue and UI text translation",
      link: "#"
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Course content and training materials",
      link: "#"
    }
  ];

  const fileFormats = [
    { name: "JSON", description: "App localization, API responses", link: "/json-translation" },
    { name: "CSV", description: "Bulk data, product catalogs", link: "/csv-translation" },
    { name: "HTML", description: "Websites, emails, documentation", link: "#" },
    { name: "PO/POT", description: "Software, WordPress localization", link: "#" },
    { name: "XML", description: "Structured data, configuration", link: "#" },
    { name: "TXT", description: "Plain text, documentation", link: "#" },
    { name: "YAML", description: "CI/CD configs, documentation", link: "#" },
    { name: "MO", description: "Compiled translations", link: "#" }
  ];

  const features = [
    {
      icon: Clock,
      title: "100x Faster",
      description: "Complete translations in minutes, not weeks"
    },
    {
      icon: DollarSign,
      title: "95% Cheaper",
      description: "Fraction of the cost vs professional services"
    },
    {
      icon: Languages,
      title: "Universal Support",
      description: "Every file format, every language"
    },
    {
      icon: Sparkles,
      title: "AI-Powered",
      description: "15+ premium AI models for perfect accuracy"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header onGetStarted={onGetStarted} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full blur-3xl animate-float" style={{background: 'rgba(21, 93, 252, 0.1)'}}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-float" style={{background: 'rgba(79, 70, 229, 0.08)', animationDelay: '2s'}}></div>

        <div className="container mx-auto px-4 py-20 lg:py-32 relative">
          <div className="text-center max-w-5xl mx-auto animate-fade-in">
            <Badge className="mb-8 text-white border-0 px-6 py-2 text-sm font-medium shadow-blue" style={{background: 'linear-gradient(135deg, #155dfc 0%, #4f46e5 100%)'}}>
              ✨ Universal AI Translation Platform
            </Badge>

            <h1 className="heading-display text-5xl lg:text-7xl text-gray-900 mb-8 leading-tight">
              Translate any file format
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #155dfc 0%, #4f46e5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
              }}>in minutes, not weeks</span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Professional AI-powered translation for JSON, CSV, HTML, PO files and more.
              Support for 100+ languages with professional-grade accuracy.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="text-lg font-semibold px-10 py-4 text-white border-0 shadow-blue hover:scale-105 transition-transform"
                style={{background: 'linear-gradient(135deg, #155dfc 0%, #4f46e5 100%)'}}
                aria-label="Start translating files for free - Open translation tool"
              >
                Start translating for free
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg"
                aria-label="Watch product demonstration video"
              >
                <Play className="mr-2 h-5 w-5" aria-hidden="true" />
                Watch demo
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center glass-card py-3 px-4 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                8 file formats
              </div>
              <div className="flex items-center glass-card py-3 px-4 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                15+ AI models
              </div>
              <div className="flex items-center glass-card py-3 px-4 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                100+ languages
              </div>
              <div className="flex items-center glass-card py-3 px-4 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                No credit card required
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="heading-display text-4xl lg:text-5xl text-gray-900 mb-6">
              Why choose Translaton?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Built for speed, accuracy, and scale - everything you need for professional translation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card-modern text-center p-8 group hover:scale-105" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-blue group-hover:animate-glow" style={{background: 'linear-gradient(135deg, #155dfc 0%, #4f46e5 100%)'}}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="heading-display text-4xl lg:text-5xl text-gray-900 mb-6">
              Perfect for every industry
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From individual developers to growing teams, Translaton scales with your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              const CardContent = (
                <>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-soft" style={{background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)'}}>
                    <Icon className="h-7 w-7" style={{color: '#155dfc'}} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
                  <p className="text-gray-600">{useCase.description}</p>
                  {useCase.link && useCase.link !== "#" && (
                    <div className="mt-6">
                      <span className="font-medium hover:opacity-80 transition-opacity" style={{background: 'linear-gradient(135deg, #155dfc 0%, #4f46e5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
                        Learn more →
                      </span>
                    </div>
                  )}
                </>
              );

              return useCase.link && useCase.link !== "#" ? (
                <a key={index} href={useCase.link} className="block group">
                  <div className="card-modern p-8 h-full group-hover:scale-105 group-hover:shadow-glow">
                    {CardContent}
                  </div>
                </a>
              ) : (
                <div
                  key={index}
                  className="card-modern p-8 hover:scale-105 hover:shadow-glow"
                >
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* File Formats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Support for every file format
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No matter what format your content is in, Translaton handles it all
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {fileFormats.map((format, index) => {
              const FormatContent = (
                <>
                  <h3 className="font-medium text-gray-900 mb-1">{format.name}</h3>
                  <p className="text-xs text-gray-500">{format.description}</p>
                </>
              );

              return format.link && format.link !== "#" ? (
                <a key={index} href={format.link} className="block">
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-200">
                    {FormatContent}
                  </div>
                </a>
              ) : (
                <div key={index} className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  {FormatContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to transform your translation workflow?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Join thousands of developers and teams who trust Translaton for their global expansion
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg font-medium"
                aria-label="Start translating files for free - Open translation tool"
              >
                Start translating for free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <p className="text-sm text-blue-200 mt-6">
              No credit card required • 15+ AI models • 100+ languages
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
