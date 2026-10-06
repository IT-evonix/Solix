"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  faqs: FAQItem[];
}

export default function Faq({
  title = "Frequently Asked Questions",
  faqs,
}: FAQProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFaq = (index: number) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="faq-list">
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;

        return (
          <div
            key={index}
            className={`faq-item ${isOpen ? "active" : ""}`}
          >
            <button
              className="faq-question"
              onClick={() => toggleFaq(index)}
            >
              <span className="subheading">{faq.question}</span>

              {isOpen ? (
                <ChevronUp size={22} />
              ) : (
                <ChevronDown size={22} />
              )}
            </button>

            <div className={`faq-answer ${isOpen ? "show" : ""}`}>
              {faq.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}