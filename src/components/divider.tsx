import React from 'react';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';

export function CollapsibleDivider({ label, children }: any) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Divider>{label}</Divider>
      </CollapsibleTrigger>
      <CollapsibleContent className="text-sm">{children}</CollapsibleContent>
    </Collapsible>
  );
}

export function Divider({ content, children, onClick }: any) {
  return (
    <Button variant="none" className="relative w-full" onClick={onClick}>
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">{content ?? children}</span>
      </div>
    </Button>
  );
}
