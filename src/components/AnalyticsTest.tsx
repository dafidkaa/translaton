"use client";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { trackEngagement, trackNavigation, trackTranslation } from "@/lib/analytics";
import { submitMainPages, submitSinglePage } from "@/lib/indexnow";

export function AnalyticsTest() {
  const testAnalytics = () => {
    // Test various analytics events
    trackEngagement.fileUploaded('json', 1024);
    trackEngagement.modelChanged('claude-3-sonnet');
    trackEngagement.languageChanged('spanish');
    
    trackNavigation.pageVisited('analytics-test');
    trackNavigation.ctaClicked('test-button', 'analytics-test-page');
    
    trackTranslation.started('json', 'es', 1024);
    
    console.log('✅ Analytics events fired! Check Google Analytics Real-Time reports.');
  };

  const testIndexNow = async () => {
    try {
      const success = await submitMainPages();
      console.log('IndexNow submission result:', success);
      
      // Also test single page submission
      await submitSinglePage('/analytics-test');
      
      alert(success ? '✅ IndexNow submission successful!' : '❌ IndexNow submission failed');
    } catch (error) {
      console.error('IndexNow test error:', error);
      alert('❌ IndexNow test failed');
    }
  };

  const checkAnalyticsLoaded = () => {
    const gaLoaded = typeof window !== 'undefined' && window.gtag;
    const clarityLoaded = typeof window !== 'undefined' && window.clarity;
    
    console.log('Google Analytics loaded:', gaLoaded);
    console.log('Microsoft Clarity loaded:', clarityLoaded);
    console.log('DataLayer:', window.dataLayer);
    
    alert(`
Analytics Status:
• Google Analytics: ${gaLoaded ? '✅ Loaded' : '❌ Not loaded'}
• Microsoft Clarity: ${clarityLoaded ? '✅ Loaded' : '❌ Not loaded'}
• DataLayer entries: ${window.dataLayer?.length || 0}
    `);
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Analytics & SEO Testing</h2>
      <p className="text-gray-600 mb-6">
        Test analytics tracking and SEO integrations. Check browser console and analytics dashboards.
      </p>
      
      <div className="space-y-4">
        <Button onClick={testAnalytics} className="w-full">
          🔥 Fire Test Analytics Events
        </Button>
        
        <Button onClick={testIndexNow} variant="outline" className="w-full">
          🚀 Test IndexNow Submission
        </Button>
        
        <Button onClick={checkAnalyticsLoaded} variant="outline" className="w-full">
          🔍 Check Analytics Status
        </Button>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Integration Status:</h3>
        <ul className="text-sm space-y-1">
          <li>✅ Google Analytics (G-3PC4TDWLLE)</li>
          <li>✅ Microsoft Clarity (sorrxfxyua)</li>
          <li>✅ Bing Webmaster Tools (meta tag)</li>
          <li>✅ IndexNow (key file + API)</li>
        </ul>
      </div>
    </Card>
  );
}
