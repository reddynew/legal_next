// "use client"
// import { useState, useTransition } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { useTranslation } from 'react-i18next';


// type FAQItem = {
//   question: string;
//   answer: string;
// };

// const FAQSection = () => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);
//   type Faq=
//   {
//     question:string,
//     answer:string
//   }
//   const { t }=useTranslation('Faq')
//   const faqs = t('Faq.Faqs', { returnObjects: true }) as Faq[];

//   const toggleFAQ = (index: number) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <section id="faq-section" className="bg-white section-spacing px-4">
//       <div className="legal-container">
//         <div className="text-center mb-12">
//           <span className="inline-block px-4 py-1 rounded-full bg-legal-light text-legal-DEFAULT font-medium text-sm mb-4">
//             Got Questions?
//           </span>
//           <h2 className="heading-lg mb-4">{t('Faq.title')}</h2>
//           <p className="text-legal-muted max-w-2xl mx-auto">{t('Faq.description')}</p>
//         </div>
        
//         <div className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden">
//           {faqs.map((faq, index) => (
//             <div key={index} className="border-b border-legal-border last:border-0">
//               <button
//                 className="w-full py-4 px-6 text-left flex justify-between items-center focus:outline-none"
//                 onClick={() => toggleFAQ(index)}
//               >
//                 <span className="font-medium">{faq.question}</span>
//                 {openIndex === index ? (
//                   <ChevronUp className="text-legal-accent" size={20} />
//                 ) : (
//                   <ChevronDown className="text-legal-DEFAULT" size={20} />
//                 )}
//               </button>
//               <div
//                 className={cn(
//                   "overflow-hidden transition-all duration-300 ease-in-out",
//                   openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-100"
//                 )}
//               >
//                 <div className="p-6 pt-0 text-legal-muted">
//                   {faq.answer}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FAQSection;

"use client"
import { useState, useTransition } from 'react';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

type FAQItem = {
  question: string;
  answer: string;
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  
  const { t } = useTranslation('Faq')
  const faqs = t('Faq.Faqs', { returnObjects: true }) as FAQItem[];

  const VISIBLE_FAQS = 7;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
    if (!showAll) {
      setOpenIndex(null); // Close any open FAQ when expanding
    }
  };

  const visibleFaqs = showAll ? faqs : faqs.slice(0, VISIBLE_FAQS);

  return (
    <section id="faq-section" className="bg-white section-spacing px-4">
      <div className="legal-container">
        <div className="text-center mb-12 mt-12">
          <span className="inline-block px-4 py-1 rounded-full bg-legal-light text-legal-DEFAULT font-medium text-sm mb-4">
            Got Questions?
          </span>
          <h2 className="heading-lg mb-4">{t('Faq.title')}</h2>
          <p className="text-legal-muted max-w-2xl mx-auto">{t('Faq.description')}</p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden">
          {visibleFaqs.map((faq, index) => (
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
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="p-6 pt-0 text-legal-muted">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
          
          {faqs.length > VISIBLE_FAQS && (
            <div className="border-t border-legal-border">
              <button
                className="w-full py-4 px-6 flex justify-end items-center text-legal-accent hover:bg-legal-light focus:outline-none transition-colors"
                onClick={toggleShowAll}
              >
                <span className="font-medium text-blue-500">
                  {showAll ? 'Show Less FAQs' : `Show All FAQs`}
                </span>
                {/* <ChevronRight className={cn("transition-transform duration-200", showAll && "rotate-90")} size={20} /> */}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
