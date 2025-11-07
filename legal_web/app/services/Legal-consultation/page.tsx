import React from 'react'

function page() {
  const description = [
    "JP LAW SUVIDHA revolutionizes the consultation experience by combining expert human insight with cutting-edge technology.",
    "Whether you're facing a legal dispute, need a document review, or questions about your rights, our platform intelligently matches you with a qualified legal professional based on your specific needs.",
    "Using AI-driven algorithms, we analyze your legal concerns and instantly connect you with verified lawyers who specialize in relevant areas of law.",
    "Our secure video conferencing, real-time messaging, and digital document exchange ensure that your consultation is efficient, confidential, and convenient—anytime, anywhere.",
    "All interactions within the platform are encrypted and securely logged, giving you peace of mind and easy access to your consultation history and follow-up actions.",
    "Whether you're an individual or a business, our platform ensures faster responses, better alignment, and more informed legal outcomes."
  ];

  return (
    <section className="bg-black text-white py-12 px-6 md:px-12 rounded-xl shadow-xl max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white border-b border-white/10 pb-4 text-center">
        Why JP LAW SUVIDHA?
      </h2>
      <ul className="space-y-6 text-lg leading-relaxed">
        {description.map((desc, idx) => (
          <li
            key={idx}
            className="relative pl-6"
          >
            <span className="absolute left-0 top-0 text-white opacity-80 font-bold text-xl">
              ●
            </span>
            {desc}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default page