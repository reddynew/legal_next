"use client";
import { useTranslation } from 'react-i18next';
import {
  UserCheck,
  Scale,
  ShieldCheck,
  Users2,
  MessageSquare,
  FileText,
} from "lucide-react";

export default function LegalConsultationPage() {
  const { t } = useTranslation('services');

  const features = [
    {
      icon: <Scale size={32} className="text-black" />,
      title: t("features.smart_match_title"),
      description: t("features.smart_match_desc"),
    },
    {
      icon: <UserCheck size={32} className="text-black" />,
      title: t("features.coverage_title"),
      description: t("features.coverage_desc"),
    },
    {
      icon: <ShieldCheck size={32} className="text-black" />,
      title: t("features.secure_title"),
      description: t("features.secure_desc"),
    },
    {
      icon: <MessageSquare size={32} className="text-black" />,
      title: t("features.communication_title"),
      description: t("features.communication_desc"),
    },
    {
      icon: <Users2 size={32} className="text-black" />,
      title: t("features.individuals_title"),
      description: t("features.individuals_desc"),
    },
    {
      icon: <FileText size={32} className="text-black" />,
      title: t("features.documents_title"),
      description: t("features.documents_desc"),
    },
  ];

  return (
    <div>
    <section className="bg-white container-custom ">
      {/* Hero */}
      <header>
      <div className=" text-black py-10 px-4 text-center rounded-t-3xl mx-auto mb-10">
      <h1 className="text-4xl font-bold tracking-tight text-center mb-4">

          {t("hero_title")}
        </h1>
        <p className="mx-auto text-lg md:text-xl">
          {t("hero_sub")}
        </p>
      </div>
      </header>

    <section>
      {/* Text Sections */}
      <div className="max-w-4xl mx-auto text-gray-900 px-4">
        <h2 className="mb-4 font-bold text-2xl">{t("section1_title")}</h2>
        <p className="text-md md:text-lg mb-5">{t("section1_text")}</p>

        <h2 className="mb-4 font-bold text-2xl">{t("section2_title")}</h2>
        <p className="text-md md:text-lg mb-5">{t("section2_text")}</p>

        <h2 className="mb-4 font-bold text-2xl">{t("section3_title")}</h2>
        <p className="text-md md:text-lg mb-5">{t("section3_text")}</p>
      </div>
      </section>

</section>
<section className='py-16'>
      {/* Features */}
      <div className="container-custom mx-auto px-4">
        <h2 className="text-black font-serif font-bold text-2xl md:text-3xl mb-8 text-center">
          {t("features_title")}
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-300 rounded-2xl shadow hover:shadow-xl transition flex flex-col items-center p-7 min-h-[220px]"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full border border-black mb-4 bg-white">
                {feature.icon}
              </div>
              <h3 className="text-lg text-black font-semibold mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-center text-base ">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Final Section */}
      <div className="max-w-4xl mx-auto mt-12 px-4 text-center">
        <h3 className="text-black font-bold text-xl mb-2 italic">
          {t("final_title")}
        </h3>
        <p className="text-gray-700 text-base  mb-3 italic">
          {t("final_text1")}
        </p>
        <p className="text-gray-700 text-base  italic">
          {t("final_text2")}
        </p>
      </div>
    </section>
    </div>
  );
}
