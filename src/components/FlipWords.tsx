'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

export const FlipWords = ({
  words,
  duration = 3000,
  className,
  wordColors,
}: {
  words: string[];
  duration?: number;
  className?: string;
  wordColors?: string[];
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [currentColor, setCurrentColor] = useState(wordColors?.[0] || 'text-white');

  // thanks for the fix Julian - https://github.com/Julian-AT
  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    if (wordColors) {
      const color = wordColors[wordColors.indexOf(currentColor) + 1] || wordColors[0];
      setCurrentColor(color);
    }
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, currentColor, words, wordColors]);

  useEffect(() => {
    if (!isAnimating)
      setTimeout(() => {
        startAnimation();
      }, duration);
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          ease: 'easeInOut',
          type: 'spring',
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: 'blur(8px)',
          scale: 2,
          position: 'absolute',
        }}
        className={cn('relative z-10 inline-block px-2 text-left text-neutral-900 dark:text-neutral-100', className)}
        key={currentWord}
      >
        {currentWord.split('').map((letter, index) => (
          <motion.span
            key={currentWord + index}
            initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              delay: index * 0.08,
              duration: 0.4,
            }}
            className={cn('inline-block', currentColor)}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
