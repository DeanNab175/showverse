// app/test-dompurify/page.tsx
"use client";

import IllustrationComponent from "@/components/illustrations/illustration-component";

const dangerousSVG = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="red"/>
  <script>alert('If you see this alert, DOMPurify is NOT working!')</script>
  <text x="50" y="50" text-anchor="middle">Safe Content</text>
</svg>`;

const safeSVG = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="green"/>
  <text x="50" y="50" text-anchor="middle" fill="white">✓</text>
</svg>`;

export default function TestDOMPurify() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">DOMPurify Test</h1>

      <div className="mb-8">
        <h2 className="text-xl mb-2">
          Test 1: Dangerous SVG (should remove script)
        </h2>
        <p className="mb-2 text-sm text-gray-600">
          If you see an alert, DOMPurify is NOT working!
        </p>
        <IllustrationComponent svgString={dangerousSVG} className="w-32 h-32" />
      </div>

      <div>
        <h2 className="text-xl mb-2">Test 2: Safe SVG</h2>
        <IllustrationComponent svgString={safeSVG} className="w-32 h-32" />
      </div>
    </div>
  );
}
