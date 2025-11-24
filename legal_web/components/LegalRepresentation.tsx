"use client";
import {
  UserSearch,
  Search,
  Scale,
  Filter,
  ShieldCheck,
  CalendarCheck2,
  FileText,
  Sparkle,
  Building2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

// You can use these keywords for metatags if your SEO approach supports dynamic fields.
const seoKeywords = [
  "legal representation online",
  "expert lawyers",
  "find attorney India",
  "lawyer matching platform",
  "secure legal support",
  "family law attorney",
  "corporate law expert",
  "criminal defense lawyer",
  "civil litigation specialist",
  "contract law advocate",
  "property law consultation",
  "intellectual property rights lawyer",
  "affordable legal help",
  "book lawyer online",
  "secure legal document management",
];

export default function LegalRepresentationPage() {
  const { t } = useTranslation("Legalrep");

  const features = [
    {
      icon: <UserSearch size={32} className="text-black" />,
      title: t("features.lawyerDiscovery.title"),
      description: t("features.lawyerDiscovery.description"),
    },
    {
      icon: <Search size={32} className="text-black" />,
      title: t("features.intelligentMatching.title"),
      description: t("features.intelligentMatching.description"),
    },
    {
      icon: <Filter size={32} className="text-black" />,
      title: t("features.filters.title"),
      description: t("features.filters.description"),
    },
    {
      icon: <Scale size={32} className="text-black" />,
      title: t("features.coverage.title"),
      description: t("features.coverage.description"),
    },
    {
      icon: <ShieldCheck size={32} className="text-black" />,
      title: t("features.secureCommunication.title"),
      description: t("features.secureCommunication.description"),
    },
    {
      icon: <CalendarCheck2 size={32} className="text-black" />,
      title: t("features.scheduling.title"),
      description: t("features.scheduling.description"),
    },
    {
      icon: <FileText size={32} className="text-black" />,
      title: t("features.documents.title"),
      description: t("features.documents.description"),
    },
    {
      icon: <Sparkle size={32} className="text-black" />,
      title: t("features.experience.title"),
      description: t("features.experience.description"),
    },
    {
      icon: <Building2 size={32} className="text-black" />,
      title: t("features.accessible.title"),
      description: t("features.accessible.description"),
    },
  ];

  return (
    <div>
    <section className="bg-white w-fullcontainer-custom">
      {/* Header */}
      <header>
      <div className="text-black py-10 px-4 text-center mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {t("header.title")}
        </h1>
        <p className="mx-auto text-lg md:text-xl  max-w-xl">
          {t("header.description")}
        </p>
      </div>
      </header>
     </section>
     <section>

      {/* Informational sections */}
      <div className="max-w-4xl mx-auto text-gray-900 px-4">
        <section className="mb-8">
          <h2 className="mb-4 font-bold text-2xl">{t("expert.title")}</h2>
          <p className="text-md md:text-lg mb-5 ">
            {t("expert.description")}
          </p>

          <h2 className="mb-4 font-bold text-2xl">{t("matching.title")}</h2>
          <p className="text-md md:text-lg mb-5 ">
            {t("matching.description")}
          </p>

          <h2 className="mb-4 font-bold text-2xl">{t("support.title")}</h2>
          <p className="text-md md:text-lg mb-5 ">
            {t("support.description")}
          </p>
        </section>
      </div>
</section>
<section>
      {/* Feature grid */}
      <div className="container-custom mx-auto px-4">
        <h2 className="text-black font-serif font-bold text-2xl md:text-3xl mb-8 text-center">
          {t("features.title")}
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

      {/* Footer info */}
      <div className="max-w-4xl mx-auto mt-12 px-4 text-center">
        <h3 className="text-black font-bold text-xl mb-2 italic">
          {t("footer.title")}
        </h3>
        <p className="text-gray-700 text-base  mb-3 italic">
          {t("footer.description1")}
        </p>
        <p className="text-gray-700 text-base  italic">
          {t("footer.description2")}
        </p>
      </div>

      {/* SEO Keywords for administrative or dynamic SEO output */}
      {/* You could use this array in your meta tags, or display it as needed: */}
      {/* <div style={{ display: 'none' }}>{seoKeywords.join(', ')}</div> */}
    </section>
    </div>
  );
}
