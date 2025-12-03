"use client";
import { Trans, useTranslation } from "react-i18next";
import {
  UserCheck,
  Scale,
  ShieldCheck,
  Users2,
  MessageSquare,
  FileText,
} from "lucide-react";

export default function LegalConsultationPage() {
    const { t } = useTranslation("services");
  
  const features = [
  {
    key: "smartMatch",
    icon: <Scale size={32} className="text-black" />,
    titleKey: "features.smartMatch.title",
    descriptionKey: "features.smartMatch.description",
  },
  {
    key: "coverage",
    icon: <UserCheck size={32} className="text-black" />,
    titleKey: "features.coverage.title",
    descriptionKey: "features.coverage.description",
  },
  {
    key: "secure",
    icon: <ShieldCheck size={32} className="text-black" />,
    titleKey: "features.secure.title",
    descriptionKey: "features.secure.description",
  },
  {
    key: "communication",
    icon: <MessageSquare size={32} className="text-black" />,
    titleKey: "features.communication.title",
    descriptionKey: "features.communication.description",
  },
  {
    key: "individuals",
    icon: <Users2 size={32} className="text-black" />,
    titleKey: "features.individuals.title",
    descriptionKey: "features.individuals.description",
  },
  {
    key: "documents",
    icon: <FileText size={32} className="text-black" />,
    titleKey: "features.documents.title",
    descriptionKey: "features.documents.description",
  },
];


  return (
    <div className="container-custom">
      <section className="bg-white container-custom ">
        {/* Hero */}
        <header>
          <div className="text-black py-10 px-4 text-center rounded-t-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight sm:leading-[1.2] text-center">
              <Trans ns="services" i18nKey="hero_title" components={[<strong />, <em />, <mark />]} />
            </h1>
            <p className="text-base sm:text-lg leading-relaxed">
              <Trans ns="services" i18nKey="hero_sub" components={[<strong />, <em />, <mark />]} />
            </p>
          </div>
        </header>

        <section>
          {/* Text Sections */}
          <div className="max-w-4xl mx-auto text-gray-900 px-4">
            <h2 className="text-3xl sm:text-4xl font-semibold leading-snug">
              <Trans ns="services" i18nKey="section1_title" components={[<strong />, <em />, <mark />]} />
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-justify">
              <Trans
                ns="services"
                i18nKey="section1_text"
                components={[<strong />, <em />, <mark />]}
              />
            </p>

            <h2 className="text-3xl sm:text-4xl font-semibold leading-snug mt-4">
              <Trans ns="services" i18nKey="section2_title" components={[<strong />, <em />, <mark />]} />
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-justify">
              <Trans
                ns="services"
                i18nKey="section2_text"
                components={[<strong />, <em />, <mark />]}
              />
            </p>

            <h2 className="text-3xl sm:text-4xl font-semibold leading-snug mt-4">
              <Trans ns="services" i18nKey="section3_title" components={[<strong />, <em />, <mark />]} />
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-justify">
              <Trans
                ns="services"
                i18nKey="section3_text"
                components={[<strong />, <em />, <mark />]}
              />
            </p>
          </div>
        </section>
      </section>

      <section className="py-16">
        {/* Features */}
        <div className="container-custom mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-semibold leading-snug text-center">
            <Trans
              ns="services"
              i18nKey="features_title"
              components={[<strong />, <em />, <mark />]}
            />
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-300 rounded-2xl shadow hover:shadow-xl transition flex flex-col items-center p-7 min-h-[220px]"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full border border-black mb-4 bg-white">
                  {feature.icon}
                </div>
                <h3 className="text-lg text-black font-semibold mb-2 text-center">
                  <Trans
                    ns="services"
                    i18nKey={feature.titleKey}
                    components={[<strong />, <em />, <mark />]}
                  />
                </h3>
                <p className="text-gray-700 text-center text-base">
                  <Trans
                    ns="services"
                    i18nKey={feature.descriptionKey}
                    components={[<strong />, <em />, <mark />]}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Section */}
        <div className="max-w-4xl mx-auto mt-12 px-4 text-center">
          <h3 className="text-2xl sm:text-3xl leading-normal font-semibold italic">
            <Trans
              ns="services"
              i18nKey="final_title"
              components={[<strong />, <em />, <mark />]}
            />
          </h3>
          <p className="text-base sm:text-lg leading-relaxed italic">
            <Trans
              ns="services"
              i18nKey="final_text1"
              components={[<strong />, <em />, <mark />]}
            />{" "}
            <Trans
              ns="services"
              i18nKey="final_text2"
              components={[<strong />, <em />, <mark />]}
            />
          </p>
        </div>
      </section>
    </div>
  );
}
