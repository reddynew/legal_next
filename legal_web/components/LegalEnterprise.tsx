"use client";
import { useTranslation } from "react-i18next";
import {
  Briefcase,
  Building,
  FileText,
  UserCheck,
  FileSignature,
  ShieldCheck,
  Layers3,
  Lock,
  KeyRound,
} from "lucide-react";

export default function EnterpriseLegalSection() {
  const {t} = useTranslation("Legal_enterprise");

  const features = [
    {
      icon: <Building size={32} className="text-black" />,
      title: t("features.business_formation_title"),
      description: t("features.business_formation_desc"),
    },
    {
      icon: <FileText size={32} className="text-black" />,
      title: t("features.document_drafting_title"),
      description: t("features.document_drafting_desc"),
    },
    {
      icon: <ShieldCheck size={32} className="text-black" />,
      title: t("features.risk_mitigation_title"),
      description: t("features.risk_mitigation_desc"),
    },
    {
      icon: <Layers3 size={32} className="text-black" />,
      title: t("features.digital_workflows_title"),
      description: t("features.digital_workflows_desc"),
    },
    {
      icon: <KeyRound size={32} className="text-black" />,
      title: t("features.ip_protection_title"),
      description: t("features.ip_protection_desc"),
    },
    {
      icon: <FileSignature size={32} className="text-black" />,
      title: t("features.custom_compliance_title"),
      description: t("features.custom_compliance_desc"),
    },
    {
      icon: <Lock size={32} className="text-black" />,
      title: t("features.security_title"),
      description: t("features.security_desc"),
    },
    {
      icon: <UserCheck size={32} className="text-black" />,
      title: t("features.legal_expertise_title"),
      description: t("features.legal_expertise_desc"),
    },
    {
      icon: <Briefcase size={32} className="text-black" />,
      title: t("features.scalable_operations_title"),
      description: t("features.scalable_operations_desc"),
    },
  ];

  return (
    <div>
    <section className="bg-white w-full container-custom">
      
      {/* Header Section */}
      <header className="">
      <div className="text-black py-10 px-4 text-center mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {t("hero_title")}
        </h1>
        <p className="mx-auto text-lg md:text-xl  max-w-xl">
          {t("hero_sub")}
        </p>
      </div>
      </header>
      </section>
      <section>

      {/* Info Sections */}
      <div className="max-w-4xl mx-auto text-gray-900 px-4 mb-8">
        
        <h2 className="mb-4 font-bold text-2xl">{t("section1_title")}</h2>
        <p className="text-md md:text-lg mb-5 ">
          {t("section1_text")}
        </p>

        <h2 className="mb-4 font-bold text-2xl">{t("section2_title")}</h2>
        <p className="text-md md:text-lg mb-5 ">
          {t("section2_text")}
        </p>

        <h2 className="mb-4 font-bold text-2xl">{t("section3_title")}</h2>
        <p className="text-md md:text-lg mb-5 ">
          {t("section3_text")}
        </p>

        <h2 className="mb-4 font-bold text-2xl">{t("section4_title")}</h2>
        <p className="text-md md:text-lg mb-5 ">
          {t("section4_text")}
        </p>
      </div>
      </section>
      <section>

      {/* Feature Grid */}
      <div className="max-w-5xl mx-auto px-4">
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
