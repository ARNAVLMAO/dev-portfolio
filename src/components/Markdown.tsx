"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';

export function Markdown({ children }: { children: string }) {
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
              <Link href={href} className="text-olive hover:text-olive-dark underline decoration-sage-dark hover:decoration-olive-dark transition-colors duration-200">
                {props.children}
              </Link>
            );
          }
          
          return (
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-olive hover:text-olive-dark underline decoration-sage-dark hover:decoration-olive-dark transition-colors duration-200"
              {...props}
            />
          );
        }
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
