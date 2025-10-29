"use client"
import { useState, useTransition } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type FAQItem = {
  question: string;
  answer: string;
};

const Faqs={
    title:"Frequently Asked Questions",
     description:"Find answers to common questions about our legal services and processes. If you can't find what you're looking for, don't hesitate to contact us.",
    faqs: [
    {"question": "What services do you offer?", 
     "answer": "We provide access to legal consultations, document drafting, contract reviews, and lawyer matching for a wide range of legal matters—including personal, civil, criminal, business, and intellectual property law."
    },
    {"question": "What types of legal issues can I get help with?", 
     "answer": "You can get support for issues related to family law, civil disputes, criminal cases, corporate and startup legal needs, contracts, employment, IP, and more."},
  
    {"question": "Do you offer services for businesses?", 
      "answer": " Yes, we specialize in supporting startups and mid-sized businesses with legal documentation, compliance, and IP-related matters."},

    {"question": "Can I get a lawyer for court representation?", 
     "answer": " While we don’t provide legal representation directly, our platform connects you with qualified lawyers who offer court representation based on your case."},
    
     {"question": "How do I book a lawyer?", 
     "answer": "Simply enter your legal issue, and we'll match you with a qualified lawyer available in your area. You can then schedule a consultation at your convenience."},
     
     {"question": "Can I consult a lawyer online?", 
     "answer": "Yes! You can chat with a lawyer online or book a video consultation. We make it convenient for you to access legal help remotely."},

     {"question": "Is the consultation private and confidential?", 
     "answer": " Absolutely. All communications and documents are encrypted and protected by strict confidentiality protocols."},
  
    {"question": "How long does it take to get a response from a lawyer?", 
     "answer": "Typically, responses are provided within a few hours, depending on the complexity and urgency of your request."},
  
    {"question": "How much does it cost to consult a lawyer?", 
     "answer": " Consultation fees vary based on the lawyer’s expertise and the nature of your case. Transparent pricing is provided before you confirm your booking."},
  
  
    {"question": "How do I make payment for services?", 
     "answer": " Payments can be made securely through our platform via credit/debit cards, UPI, or net banking."},
  
    {"question": "How do I know if I need a lawyer?", 
     "answer": " If you're facing a legal issue, uncertainty, or need to draft/review a legal document, consulting a lawyer can help protect your rights and avoid costly mistakes."},
  
    {"question": "How do I know if the lawyer is qualified?", 
     "answer": "All lawyers on our platform are verified, licensed, and experienced in their respective fields of law."}
  ]
  }


const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  type Faq=
  {
    question:string,
    answer:string
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  return (
    <section id="faq-section" className="bg-white section-spacing">
      <div className="legal-container">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-legal-light text-legal-DEFAULT font-medium text-sm mb-4">
            Got Questions?
          </span>
          <h2 className="heading-lg mb-4">{Faqs.title}</h2>
          <p className="text-legal-muted max-w-2xl mx-auto">{Faqs.description}</p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden">
          {Faqs.faqs.map((faq, index) => (
            <div key={index} className="border-b border-legal-border last:border-0">
              <button
                className="w-full py-4 px-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-legal-accent" size={20} />
                ) : (
                  <ChevronDown className="text-legal-DEFAULT" size={20} />
                )}
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-100"
                )}
              >
                <div className="p-6 pt-0 text-legal-muted">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
