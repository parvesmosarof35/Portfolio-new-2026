"use client";
import React, { useState, useEffect } from "react";

export const Typewriter = ({ texts, speed = 80, delayBetween = 2500 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    let timer;
    const fullText = texts[currentTextIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      }, speed / 2);
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }, speed);
    }

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), delayBetween);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex, texts, speed, delayBetween]);

  return (
    <span className="relative">
      <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-550 dark:from-purple-400 dark:via-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent font-extrabold">
        {currentText}
      </span>
      <span className="inline-block w-[3px] h-[0.9em] bg-purple-500 dark:bg-purple-400 ml-1.5 translate-y-[1px] animate-[pulse_1s_infinite]"></span>
    </span>
  );
};

const parseStatValue = (value) => {
  const stringValue = String(value || "").trim();
  const match = stringValue.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { target: stringValue, suffix: "" };
  }

  return {
    target: Number(match[1]),
    suffix: match[2] || "",
  };
};

export const CountUp = ({ value }) => {
  const { target, suffix } = parseStatValue(value);
  const [displayValue, setDisplayValue] = useState(
    typeof target === "number" ? 0 : value
  );

  useEffect(() => {
    if (typeof target !== "number" || Number.isNaN(target)) {
      setDisplayValue(String(value));
      return;
    }

    let frame = 0;
    const duration = 1200;
    const interval = 30;
    const steps = Math.max(1, Math.ceil(duration / interval));
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      frame += 1;
      current += increment;

      if (frame >= steps) {
        setDisplayValue(target);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, value]);

  return (
    <span>
      {displayValue}
      {typeof target === "number" ? suffix : ""}
    </span>
  );
};
