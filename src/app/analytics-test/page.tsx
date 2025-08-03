import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnalyticsTest } from '@/components/AnalyticsTest';

export const metadata: Metadata = {
  title: 'Analytics Test - Translaton',
  description: 'Test page for analytics and SEO integrations',
  robots: 'noindex, nofollow', // Don't index this test page
};

export default function AnalyticsTestPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <AnalyticsTest />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
