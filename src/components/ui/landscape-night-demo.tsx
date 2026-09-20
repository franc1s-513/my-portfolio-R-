import React from 'react';
import LandscapeScene from '@/components/ui/landscape';

export default function LandscapeNightDemo() {
  return (
    <div className="shader-frame h-[480px] w-full overflow-hidden rounded-lg border border-border bg-background">
      <LandscapeScene variant="night" className="h-full w-full" />
    </div>
  );
}
