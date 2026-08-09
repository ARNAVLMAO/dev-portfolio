"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';

/**
 * Pre-process raw text to ensure bare URLs get turned into clickable links.
 * remark-gfm only autolinks URLs starting with http:// or https://.
 * This function catches:
 *   - www.example.com  → https://www.example.com
 *   - Bare URLs without protocol that remark-gfm might miss
 */
function preprocessLinks(text: string): string {
  // Turn "www.something" into "https://www.something" (only when not already preceded by ://)
  let processed = text.replace(
    /(?<![\/\/:a-zA-Z])(www\.[a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z]{2,}(?:\/[^\s)]*)?)/g,
    'https://$1'
  );
  return processed;
}

export function Markdown({ children }: { children: string }) {
  const processed = preprocessLinks(children);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        a: ({ node, ...props }) => {
          const href = props.href || '';
          const isInternal = href.startsWith('/') || href.startsWith('#');

          if (isInternal) {
            return (
              <Link href={href} className="text-olive hover:text-olive-dark underline decoration-olive/40 hover:decoration-olive-dark transition-colors duration-200">
                {props.children}
              </Link>
            );
          }

          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-olive hover:text-olive-dark underline decoration-olive/40 hover:decoration-olive-dark transition-colors duration-200"
            >
              {props.children}
            </a>
          );
        }
      }}
    >
      {processed}
    </ReactMarkdown>
  );
}
