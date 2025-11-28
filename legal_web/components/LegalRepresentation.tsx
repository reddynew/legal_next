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
import { useTranslation, Trans } from "react-i18next";

export default function LegalRepresentationPage() {
  const { t } = useTranslation("Legalrep");

  const features = [
    {
      icon: <UserSearch size={32} className="text-black" />,
      title: t("features.lawyerDiscovery.title"),
      descriptionKey: "features.lawyerDiscovery.description",
    },
    {
      icon: <Search size={32} className="text-black" />,
      title: t("features.intelligentMatching.title"),
      descriptionKey: "features.intelligentMatching.description",
    },
    {
      icon: <Filter size={32} className="text-black" />,
      title: t("features.filters.title"),
      descriptionKey: "features.filters.description",
    },
    {
      icon: <Scale size={32} className="text-black" />,
      title: t("features.coverage.title"),
      descriptionKey: "features.coverage.description",
    },
    {
      icon: <ShieldCheck size={32} className="text-black" />,
      title: t("features.secureCommunication.title"),
      descriptionKey: "features.secureCommunication.description",
    },
    {
      icon: <CalendarCheck2 size={32} className="text-black" />,
      title: t("features.scheduling.title"),
      descriptionKey: "features.scheduling.description",
    },
    {
      icon: <FileText size={32} className="text-black" />,
      title: t("features.documents.title"),
      descriptionKey: "features.documents.description",
    },
    {
      icon: <Sparkle size={32} className="text-black" />,
      title: t("features.experience.title"),
      descriptionKey: "features.experience.description",
    },
    {
      icon: <Building2 size={32} className="text-black" />,
      title: t("features.accessible.title"),
      descriptionKey: "features.accessible.description",
    },
  ];

  return (
    <div className="container-custom">
      <section className="bg-white container-custom">
        {/* Header */}
        <header>
          <div className="text-black py-10 px-4 text-center mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight leading-[1.2]">
              <Trans
                ns="Legalrep"
                i18nKey="header.title"
                components={[<strong />, <em />, <mark />]}
              />
            </h1>
            <p className="text-base sm:text-lg leading-relaxed">
              <Trans
                ns="Legalrep"
                i18nKey="header.description"
                components={[<strong />, <em />, <mark />]}
              />
            </p>
          </div>
        </header>
      </section>

      <section>
        {/* Informational sections */}
        <div className="max-w-4xl mx-auto text-gray-900 px-4">
          <section>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-snug">
              <Trans
                ns="Legalrep"
                i18nKey="expert.title"
                components={[<strong />, <em />, <mark />]}
              />
            </h2>
            <p className="text-base sm:text-lg leading-relaxed">
              <Trans
                ns="Legalrep"
                i18nKey="expert.description"
                components={[<strong />, <em />, <mark />]}
              />
            </p>

            <h2 className="text-3xl sm:text-4xl font-semibold leading-snug mt-4">
              <Trans
                ns="Legalrep"
                i18nKey="matching.title"
                components={[<strong />, <em />, <mark />]}
              />
            </h2>
            <p className="text-base sm:text-lg leading-relaxed">
              <Trans
                ns="Legalrep"
                i18nKey="matching.description"
                components={[<strong />, <em />, <mark />]}
              />
            </p>

            <h2 className="text-3xl sm:text-4xl font-semibold leading-snug mt-4">
              <Trans
                ns="Legalrep"
                i18nKey="support.title"
                components={[<strong />, <em />, <mark />]}
              />
            </h2>
            <p className="text-base sm:text-lg leading-relaxed ">
              <Trans
                ns="Legalrep"
                i18nKey="support.description"
                components={[<strong />, <em />, <mark />]}
              />
            </p>
          </section>
        </div>
      </section>

      <section className="py-16">
        {/* Feature grid */}
        <div className="container-custom mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-semibold leading-snug text-center">
            <Trans
              ns="Legalrep"
              i18nKey="features.title"
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
                <h3 className="text-2xl text-black font-semibold mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-center text-base ">
                  <Trans
                    ns="Legalrep"
                    i18nKey={feature.descriptionKey}
                    components={[<strong />, <em />, <mark />]}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="max-w-4xl mx-auto mt-12 px-4 text-center">
          <h3 className="text-2xl sm:text-3xl leading-normal font-semibold italic">
            <Trans
              ns="Legalrep"
              i18nKey="footer.title"
              components={[<strong />, <em />, <mark />]}
            />
          </h3>
          <p className="text-base sm:text-lg leading-relaxed italic mb-4">
            <Trans
              ns="Legalrep"
              i18nKey="footer.description1"
              components={[<strong />, <em />, <mark />]}
            />{" "}
            <Trans
              ns="Legalrep"
              i18nKey="footer.description2"
              components={[<strong />, <em />, <mark />]}
            />
          </p>
        </div>

        {/* SEO keywords are unchanged */}
      </section>
    </div>
  );
}
