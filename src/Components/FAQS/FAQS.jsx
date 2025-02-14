import React from "react";
import "./FAQs.scss";
import { FaChevronDown } from "react-icons/fa";

const faqsData = [
  {
    question: "What is a Blind Box?",
    answer:
      "A Blind Box is a collectible toy packaging where the specific item inside remains a surprise until opened. Each box features multiple possible figures, with some rare 'secret' or 'chase' editions that have a very low probability of appearing.",
  },
  {
    question: "If I buy two Blind Boxes, will I get duplicates?",
    answer:
      "In a single Blind Box collection, the probability of getting duplicates is very low. However, some brands may have specific packaging rules that allow for the possibility of duplicates.",
  },
  {
    question: "If I buy a full sealed set, will I get all unique figures?",
    answer:
      "A full sealed set usually guarantees all standard figures shown on the packaging. However, in some cases, one of the standard figures might be replaced by a rare 'secret' edition. Some brands may still include duplicates, depending on their packaging rules.",
  },
  {
    question: "What is the difference between a Figure and an Action Figure?",
    answer:
      "Figures are collectible toy models, often limited edition and sometimes handcrafted by the original artist, making them highly valuable. Action Figures, on the other hand, have articulated joints, allowing for movement and interchangeable parts. They are commonly produced in scales like 1:6, 1:8, or 1:12.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "For customers in Ho Chi Minh City, we offer same-day express delivery, as well as standard shipping (1-3 days, starting from $1.20). For customers outside the city, delivery takes 3-5 days (excluding weekends and holidays) with shipping costs starting from $1.60. Orders over $40 receive a $1.20 shipping discount.",
  },
  {
    question: "Can I order international shipping?",
    answer:
      "Currently, we can only ship to a local forwarding service in Vietnam. Direct international shipping is not available at the moment. Please contact us for more details.",
  },
  {
    question: "What if my item arrives damaged?",
    answer:
      "Please inspect your package upon arrival and take photos/videos of the unboxing. If the product has defects, contact us within 3 days, and we will evaluate the issue to provide an appropriate solution.",
  },
];

const FAQs = () => {
  return (
    <div className="faqs-container">
      <h1 className="title">Frequently Asked Questions 🤔</h1>
      <div className="faq-list">
        {faqsData.map((faq, index) => (
          <div key={index} className="faq-item">
            <input type="checkbox" id={`faq-${index}`} className="faq-toggle" />
            <label htmlFor={`faq-${index}`} className="faq-question">
              {faq.question}
              <FaChevronDown className="icon" />
            </label>
            <div className="faq-answer">{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
