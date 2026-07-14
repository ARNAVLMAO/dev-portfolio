"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import Link from "next/link";

const MotionLinkWrapper = motion.create(Link);

export function MotionPostCard({ 
  children, 
  href,
  className = ""
}: { 
  children: ReactNode; 
  href: string;
  className?: string;
}) {
  return (
    <MotionLinkWrapper
      href={href}
      className={`block ${className}`}
      whileHover={{ y: -2, backgroundColor: "var(--color-sage)" }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </MotionLinkWrapper>
  );
}

export function MotionArticleCard({ 
  children,
  className = ""
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <motion.article
      className={className}
      whileHover={{ y: -2, backgroundColor: "var(--color-sage)" }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.article>
  );
}
