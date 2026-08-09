"use client";

import Linkify from "react-linkify";
import { ReactNode } from "react";

export function ClientLinkify({ children }: { children: ReactNode }) {
  return (
    <Linkify
      componentDecorator={(decoratedHref, decoratedText, key) => (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={decoratedHref}
          key={key}
          className="text-olive hover:text-olive-dark underline transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {decoratedText}
        </a>
      )}
    >
      {children}
    </Linkify>
  );
}
