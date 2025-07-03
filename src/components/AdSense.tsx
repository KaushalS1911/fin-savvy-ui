import React, { useEffect, useRef, useState } from "react";

interface AdSenseProps {
  adClient: string;
  adSlot: string;
  adFormat?: string;
  style?: React.CSSProperties;
  responsive?: boolean;
  timeoutMs?: number; // How long to wait for an ad (default: 3000ms)
}

const AdSense: React.FC<AdSenseProps> = ({
  adClient,
  adSlot,
  adFormat = "auto",
  style = { display: "block" },
  responsive = true,
  timeoutMs = 3000,
}) => {
  const insRef = useRef<HTMLDivElement>(null);
  const [showAd, setShowAd] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (window) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }

    // MutationObserver to detect ad content
    const observer = new MutationObserver(() => {
      if (insRef.current && insRef.current.querySelector("iframe")) {
        if (timeout) clearTimeout(timeout);
        observer.disconnect();
      }
    });

    if (insRef.current) {
      observer.observe(insRef.current, { childList: true, subtree: true });
    }

    // If no ad after timeout, hide the slot
    timeout = setTimeout(() => {
      if (insRef.current && !insRef.current.querySelector("iframe")) {
        setShowAd(false);
        observer.disconnect();
      }
    }, timeoutMs);

    return () => {
      if (timeout) clearTimeout(timeout);
      observer.disconnect();
    };
  }, [timeoutMs]);

  if (!showAd) return null;

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive ? "true" : "false"}
        ref={insRef as any}
      />
    </div>
  );
};

export default AdSense; 