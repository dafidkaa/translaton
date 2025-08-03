"use client";

import { useState } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { ContactForm } from "./ContactForm";

export function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <img src="/logo.png" alt="Translaton" className="w-8 h-8" />
                <h3 className="text-xl font-semibold">Translaton</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Universal AI translation platform for any file format. 
                Translate faster, scale globally.
              </p>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/json-translation" className="hover:text-white">JSON Translation</Link></li>
                <li><Link href="/csv-translation" className="hover:text-white">CSV Translation</Link></li>
                <li><Link href="#" className="hover:text-white">HTML Translation</Link></li>
                <li><Link href="#" className="hover:text-white">PO/POT Translation</Link></li>
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h4 className="font-semibold mb-4">Industries</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/web-development" className="hover:text-white">Web Development</Link></li>
                <li><Link href="/mobile-apps" className="hover:text-white">Mobile Apps</Link></li>

                <li><Link href="#" className="hover:text-white">E-commerce</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button 
                    onClick={() => setShowPrivacy(true)}
                    className="hover:text-white text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setShowTerms(true)}
                    className="hover:text-white text-left"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowCookies(true)}
                    className="hover:text-white text-left"
                  >
                    Cookie Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowContact(true)}
                    className="hover:text-white text-left"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Translaton. All rights reserved. Built with ❤️ for global communication.</p>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Privacy Policy</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p><strong>Last updated:</strong> December 2024</p>
            
            <h3 className="text-lg font-semibold">Data We Don't Collect</h3>
            <p>
              Translaton is designed with privacy in mind. We do <strong>not</strong> store, save, or retain any of your translation content on our servers. 
              All file processing happens in real-time and your data is immediately discarded after translation.
            </p>

            <h3 className="text-lg font-semibold">How Translation Works</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>You upload a file or paste content directly in your browser</li>
              <li>Content is sent to AI translation services for processing</li>
              <li>Translated content is returned to your browser</li>
              <li>No content is stored on Translaton servers</li>
              <li>You download the translated file directly</li>
            </ul>

            <h3 className="text-lg font-semibold">Third-Party Services</h3>
            <p>
              We use OpenRouter API to access various AI translation models. Your content may be processed by these AI services 
              according to their respective privacy policies. We recommend reviewing the privacy policies of the AI models you choose to use.
            </p>

            <h3 className="text-lg font-semibold">Analytics</h3>
            <p>
              We may collect anonymous usage analytics to improve our service, such as:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Number of translations performed</li>
              <li>File types processed (without content)</li>
              <li>General usage patterns</li>
              <li>Error rates and performance metrics</li>
            </ul>

            <h3 className="text-lg font-semibold">Your Rights</h3>
            <p>
              Since we don't store your personal data or translation content, there's nothing for us to delete or modify. 
              Your privacy is protected by design.
            </p>

            <h3 className="text-lg font-semibold">Contact</h3>
            <p>
              If you have questions about this privacy policy, please contact us through our website.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Modal */}
      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Terms of Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p><strong>Last updated:</strong> December 2024</p>
            
            <h3 className="text-lg font-semibold">Service Description</h3>
            <p>
              Translaton provides AI-powered translation services for various file formats including JSON, CSV, HTML, PO/POT, and others. 
              Our service processes your content through third-party AI translation APIs and returns translated results.
            </p>

            <h3 className="text-lg font-semibold">Acceptable Use</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use the service only for legitimate translation purposes</li>
              <li>Do not upload illegal, harmful, or copyrighted content without permission</li>
              <li>Do not attempt to reverse engineer or abuse our service</li>
              <li>Respect rate limits and fair usage policies</li>
            </ul>

            <h3 className="text-lg font-semibold">Content Responsibility</h3>
            <p>
              You are solely responsible for the content you submit for translation. We do not review, monitor, or take responsibility 
              for user-generated content. Ensure you have the right to translate any content you submit.
            </p>

            <h3 className="text-lg font-semibold">Service Availability</h3>
            <p>
              We strive to provide reliable service but cannot guarantee 100% uptime. The service may be temporarily unavailable 
              for maintenance, updates, or due to factors beyond our control.
            </p>

            <h3 className="text-lg font-semibold">Translation Accuracy</h3>
            <p>
              While we use advanced AI models, translation accuracy may vary. We recommend reviewing all translations before use, 
              especially for critical or professional content. We are not liable for translation errors or their consequences.
            </p>

            <h3 className="text-lg font-semibold">Limitation of Liability</h3>
            <p>
              Translaton is provided "as is" without warranties. We are not liable for any damages arising from use of our service, 
              including but not limited to data loss, business interruption, or translation inaccuracies.
            </p>

            <h3 className="text-lg font-semibold">Changes to Terms</h3>
            <p>
              We may update these terms occasionally. Continued use of the service constitutes acceptance of updated terms.
            </p>

            <h3 className="text-lg font-semibold">Contact</h3>
            <p>
              For questions about these terms, please contact us through our website.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cookie Policy Modal */}
      <Dialog open={showCookies} onOpenChange={setShowCookies}>
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
              We use analytics cookies to understand how visitors interact with our website. This helps us improve our service.
            </p>

            <h3 className="text-lg font-semibold">What We Don't Store</h3>
            <p>
              We want to be clear about what we <strong>don't</strong> store in cookies:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your translation content or files</li>
              <li>Personal identification information</li>
              <li>Passwords or sensitive data</li>
              <li>Financial information</li>
            </ul>

            <h3 className="text-lg font-semibold">Managing Cookies</h3>
            <p>
              You can control cookies through your browser settings or our cookie banner when you first visit our site.
            </p>

            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p>
              If you have questions about our cookie policy, please contact us through our website contact form.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Form */}
      <ContactForm isOpen={showContact} onClose={() => setShowContact(false)} />
    </>
  );
}
