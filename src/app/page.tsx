"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { LandingPage } from "@/components/LandingPage";

// Dynamically import TranslatorApp to reduce initial bundle size
const TranslatorApp = dynamic(() => import("@/components/TranslatorApp").then(mod => ({ default: mod.TranslatorApp })), {
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{borderColor: '#155dfc'}}></div>
        <p className="text-gray-600 font-medium">Loading Translation Tool...</p>
      </div>
    </div>
  ),
  ssr: false // Translation tool doesn't need SSR
});

export default function Home() {
  const [showTranslator, setShowTranslator] = useState(false);

  if (showTranslator) {
    return <TranslatorApp onBack={() => setShowTranslator(false)} />;
  }

  return <LandingPage onGetStarted={() => setShowTranslator(true)} />;
}
