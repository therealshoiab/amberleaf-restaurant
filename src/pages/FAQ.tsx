import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = React.memo(() => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open the first item by default

  const faqItems: FAQItem[] = [
    {
      question: 'What are your operational timings?',
      answer: 'Amberleaf is open daily from 09:00 AM to 10:30 PM. We serve breakfast, brunch, lunch, dinner, and late-night dessert bites.',
    },
    {
      question: 'Is your food 100% Halal certified?',
      answer: 'Yes. All our meats are sourced from certified suppliers, and all ingredients used in our dishes are 100% Halal.',
    },
    {
      question: 'Do you offer private dining rooms for groups?',
      answer: 'Absolutely. We have private dining spaces designed for families and corporate groups. You can book them in advance by completing our Table Reservation Form and mentioning your request in the special notes.',
    },
    {
      question: 'Is there parking space available?',
      answer: 'Yes, we offer both a free dedicated parking lot and free street parking close to our entrance at Balgarden.',
    },
    {
      question: 'How does your Table Reservation work?',
      answer: 'When you fill out our reservation form, the details are transmitted directly to our on-site booking desk. A table is immediately allocated, and your digital luxury pass is generated on-screen.',
    },
    {
      question: 'Can I order online for delivery?',
      answer: 'Yes, we are partner-listed on both Swiggy and Zomato for deliveries. If you prefer to pick up your order directly, you can place a takeaway order by calling us 20 minutes prior to arrival and picking it up curbside.',
    },
    {
      question: 'Do you cater to dietary restrictions or allergies?',
      answer: 'Yes, we have clearly labeled vegetarian and non-vegetarian dishes. If you have any specific allergies (such as nuts or dairy), please inform our servers before ordering, or add a note in your table reservation request.',
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollSectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <div className="page-container">
      <SEO
        title="Frequently Asked Questions"
        description="Find answers to common questions about Amberleaf Restaurant, including operations, Halal food certification, parking, private dining rooms, and online orders."
      />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <span
          style={{
            color: 'var(--accent-gold)',
            fontSize: '0.8rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          Got Questions?
        </span>
        <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h2>
        <div
          style={{
            width: '60px',
            height: '2px',
            backgroundColor: 'var(--accent-gold)',
            margin: '1rem auto 0 auto',
          }}
        />
      </motion.div>

      {/* Accordion list */}
      <motion.div
        variants={scrollSectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="glass-panel"
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'border-color 0.3s ease',
                borderColor: isOpen ? 'var(--accent-gold)' : 'var(--border-color)',
              }}
            >
              {/* Accordion Question Header - CRITICAL: QUESTION IS LEFT-ALIGNED */}
              <button
                onClick={() => handleToggle(index)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  textAlign: 'left', // Ensure left alignment
                  gap: '1rem',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left' }}>
                  <HelpCircle size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                  {item.question}
                </span>
                
                <ChevronDown
                  size={18}
                  style={{
                    color: isOpen ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    flexShrink: 0,
                  }}
                />
              </button>

              {/* Accordion Answer Content */}
              <div
                style={{
                  maxHeight: isOpen ? '300px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.4s ease',
                  padding: isOpen ? '0 1.5rem 1.5rem 3rem' : '0 1.5rem 0 3rem',
                }}
              >
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    textAlign: 'left', // Ensure left alignment
                  }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
});
