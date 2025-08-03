"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { X, Cookie } from "lucide-react";
import { trackEngagement } from "@/lib/analytics";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookie-consent');
    if (!hasConsented) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    trackEngagement.cookiesAccepted();
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    trackEngagement.cookiesRejected();
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50">
        <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">We use cookies</h3>
              <p className="text-sm text-gray-300">
                We use essential cookies to make our site work and analytics cookies to understand how you interact with our site. 
                We don't store any personal data or translation content.{" "}
                <button 
                  onClick={() => setShowPolicy(true)}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Learn more
                </button>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              onClick={rejectCookies}
              variant="outline"
              size="sm"
              className="bg-transparent border-gray-600 text-white hover:bg-gray-800"
            >
              Reject
            </Button>
            <Button
              onClick={acceptCookies}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Accept
            </Button>
            <button
              onClick={() => setShowBanner(false)}
              className="text-gray-400 hover:text-white p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cookie Policy Modal */}
      <Dialog open={showPolicy} onOpenChange={setShowPolicy}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cookie Policy</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p><strong>Last updated:</strong> December 2024</p>
            
            <h3 className="text-lg font-semibold">What Are Cookies</h3>
            <p>
              Cookies are small text files that are stored on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences and analyzing how you use our site.
            </p>

            <h3 className="text-lg font-semibold">Types of Cookies We Use</h3>
            
            <h4 className="font-semibold">Essential Cookies</h4>
            <p>
              These cookies are necessary for the website to function properly. They enable core functionality such as:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Remembering your cookie consent preferences</li>
              <li>Maintaining your session during translation</li>
              <li>Storing temporary translation settings</li>
              <li>Ensuring website security</li>
            </ul>

            <h4 className="font-semibold">Analytics Cookies</h4>
            <p>
              We use analytics cookies to understand how visitors interact with our website. This helps us improve our service. These cookies collect information such as:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Number of visitors and page views</li>
              <li>How long you spend on our site</li>
              <li>Which pages you visit</li>
              <li>General location (country/region)</li>
              <li>Device and browser information</li>
            </ul>

            <h4 className="font-semibold">Performance Cookies</h4>
            <p>
              These cookies help us monitor and improve website performance:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Page load times</li>
              <li>Error tracking</li>
              <li>Feature usage statistics</li>
              <li>Translation success rates</li>
            </ul>

            <h3 className="text-lg font-semibold">What We Don't Store</h3>
            <p>
              We want to be clear about what we <strong>don't</strong> store in cookies:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your translation content or files</li>
              <li>Personal identification information</li>
              <li>Passwords or sensitive data</li>
              <li>Financial information</li>
              <li>Email addresses or contact details</li>
            </ul>

            <h3 className="text-lg font-semibold">Managing Cookies</h3>
            <p>
              You can control cookies through:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies</li>
              <li><strong>Our Cookie Banner:</strong> Accept or reject non-essential cookies</li>
              <li><strong>Opt-out Tools:</strong> Use browser extensions or privacy tools</li>
            </ul>

            <h3 className="text-lg font-semibold">Third-Party Cookies</h3>
            <p>
              We may use third-party services that set their own cookies:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Google Analytics:</strong> For website analytics (if enabled)</li>
              <li><strong>CDN Services:</strong> For faster content delivery</li>
              <li><strong>Security Services:</strong> For protection against attacks</li>
            </ul>

            <h3 className="text-lg font-semibold">Cookie Retention</h3>
            <p>
              Different cookies have different lifespans:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Stored for up to 2 years</li>
              <li><strong>Analytics Cookies:</strong> Typically stored for 2 years</li>
              <li><strong>Consent Cookies:</strong> Stored for 1 year</li>
            </ul>

            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p>
              If you have questions about our cookie policy, please contact us through our website contact form.
            </p>

            <div className="flex gap-3 pt-4">
              <Button onClick={acceptCookies} className="bg-blue-600 hover:bg-blue-700">
                Accept Cookies
              </Button>
              <Button onClick={rejectCookies} variant="outline">
                Reject Non-Essential
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
