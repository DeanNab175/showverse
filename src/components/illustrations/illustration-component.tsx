"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface IllustrationComponentProps {
  svgString: string;
  className?: string;
}

let DOMPurifyInstance: any = null;

export default function IllustrationComponent({
  svgString,
  className,
}: IllustrationComponentProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!DOMPurifyInstance) {
      import("dompurify").then((module) => {
        DOMPurifyInstance = module.default;
        setIsReady(true);
      });
    } else {
      setIsReady(true);
    }
  }, []);

  // Sanitize and modify the SVG
  const sanitizedSvg = useMemo(() => {
    if (!svgString || !isReady || !DOMPurifyInstance) return "";

    // Sanitize the SVG string
    const cleanSvg = DOMPurifyInstance.sanitize(svgString, {
      USE_PROFILES: { svg: true, svgFilters: true },
    });

    // Parse and add className if provided
    if (className) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(cleanSvg, "image/svg+xml");
      const svgElement = doc.querySelector("svg");

      if (svgElement) {
        const existingClass = svgElement.getAttribute("class") || "";
        svgElement.setAttribute("class", cn(existingClass, className));
      }

      return new XMLSerializer().serializeToString(doc);
    }

    return cleanSvg;
  }, [svgString, className, isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <div
      className="illustration-wrapper"
      dangerouslySetInnerHTML={{ __html: sanitizedSvg }}
    />
  );
}
