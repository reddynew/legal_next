"use client";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
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
  const { t } = useTranslation("Legalenterprise");

  const features = [
    {
      key: "business_formation",
      icon: <Building size={32} className="text-black" />,
      title: t("features.business_formation_title"),
      description: "business_formation_desc",
    },
    {
      key: "document_drafting",
      icon: <FileText size={32} className="text-black" />,
      title: t("features.document_drafting_title"),
      description: "document_drafting_desc",
    },
    {
      key: "risk_mitigation",
      icon: <ShieldCheck size={32} className="text-black" />,
      title: t("features.risk_mitigation_title"),
      description: "risk_mitigation_desc",
    },
    {
      key: "digital_workflows",
      icon: <Layers3 size={32} className="text-black" />,
      title: t("features.digital_workflows_title"),
      description: "digital_workflows_desc",
    },
    {
      key: "ip_protection",
      icon: <KeyRound size={32} className="text-black" />,
      title: t("features.ip_protection_title"),
      description: "ip_protection_desc",
    },
    {
      key: "custom_compliance",
      icon: <FileSignature size={32} className="text-black" />,
      title: t("features.custom_compliance_title"),
      description: "custom_compliance_desc",
    },
    {
      key: "security",
      icon: <Lock size={32} className="text-black" />,
      title: t("features.security_title"),
      description: "security_desc",
    },
    {
      key: "legal_expertise",
      icon: <UserCheck size={32} className="text-black" />,
      title: t("features.legal_expertise_title"),
      description: "legal_expertise_desc",
    },
    {
      key: "scalable_operations",
      icon: <Briefcase size={32} className="text-black" />,
      title: t("features.scalable_operations_title"),
      description: "scalable_operations_desc",
    },
  ];

  return (
    <div className="container-custom">
      <section className="bg-white container-custom">
        {/* Header Section */}
        <header>
          <div className="text-black py-10 px-4 text-center mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight leading-[1.2]">
              <Trans i18nKey="hero_title" ns="Legalenterprise" />
            </h1>
            <p className="text-base sm:text-lg leading-relaxed">
              <Trans i18nKey="hero_sub" components={[<strong/>,<em />,<mark/>]} ns="Legalenterprise"/>
            </p>
          </div>
        </header>
      </section>

      <section>
        {/* Info Sections */}
        <div className="max-w-4xl mx-auto text-gray-900 px-4 mb-8">
          <h2 className="text-3xl sm:text-4xl font-semibold leading-snug">
            <Trans i18nKey="section1_title" ns="Legalenterprise" />
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-justify">
            <Trans
              i18nKey="section1_text"
              components={[
                <strong />, 
                <em />,     
                <mark />,  
              ]}
              ns="Legalenterprise"
            />
          </p>

          <h2 className="text-3xl sm:text-4xl font-semibold leading-snug mt-4">
            <Trans i18nKey="section2_title" ns="Legalenterprise" />
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-justify">
            <Trans
              i18nKey="section2_text"
              components={[
                <strong/>,
                <em/>,
                <mark/>
    
              ]}
              ns="Legalenterprise"
            />
          </p>

          <h2 className="text-3xl sm:text-4xl font-semibold leading-snug mt-4">
            <Trans i18nKey="section3_title" ns="Legalenterprise" />
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-justify">
            <Trans
              i18nKey="section3_text"
              components={[
              <strong/>,
                <em/>,
                <mark/>
              ]}
              ns="Legalenterprise"
            />
          </p>

          <h2 className="text-3xl sm:text-4xl font-semibold leading-snug mt-4">
            <Trans i18nKey="section4_title" ns="Legalenterprise" />
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-justify">
            <Trans
              i18nKey="section4_text"
              components={[
                <strong/>,
                <em/>,
                <mark/>
              ]}
              ns="Legalenterprise"
            />
          </p>
        </div>
      </section>

      <section className="py-16">
        {/* Feature Grid */}
        <div className="container-custom mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-semibold leading-snug text-center">
            <Trans i18nKey="features_title"  components={[<strong/>,<em/>,<mark/>]} ns="Legalenterprise"/>
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
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-center text-base">
                  {feature.key === "business_formation" && (
                    <Trans
                      i18nKey={`features.${feature.description}`}
                      components={[
                       <strong/>,
                <em/>,
                <mark/>
                      ]}
                      ns="Legalenterprise"
                    />
                  )}
                  {feature.key === "document_drafting" && (
                    <Trans
                      i18nKey={`features.${feature.description}`}
                      components={[
                      <strong/>,
                <em/>,
                <mark/>
                      ]}
                      ns="Legalenterprise"
                    />
                  )}
                  {feature.key === "risk_mitigation" && (
                    <Trans
                      i18nKey={`features.${feature.description}`}
                      components={[
                       <strong/>,
                <em/>,
                <mark/>
                      ]}
                      ns="Legalenterprise"
                    />
                  )}
                  {feature.key === "digital_workflows" && (
                    <Trans
                      i18nKey={`features.${feature.description}`}
                      components={[
                      <strong/>,
                <em/>,
                <mark/>
                      ]}
                      ns="Legalenterprise"
                    />
                  )}
                  {feature.key === "ip_protection" && (
                    <Trans
                      i18nKey={`features.${feature.description}`}
                      components={[<mark />]} 
                      ns="Legalenterprise"
                    />
                  )}
                  
                  {feature.key === "custom_compliance" && (
                    <Trans
                      i18nKey={`features.${feature.description}`}
                      components={[
                     <strong/>,
                <em/>,
                <mark/>
                      ]}
                       ns="Legalenterprise"
                    />
                  )}
                  {feature.key === "security" && (
                    <Trans
                      i18nKey={`features.${feature.description}`}
                      components={[
                     <strong/>,
                <em/>,
                <mark/>
                      ]}
                      ns="Legalenterprise"
                    />
                  )}
                  {feature.key === "legal_expertise" && (
                    <Trans
                      i18nKey={`features.${feature.description}`}
                      components={[
                       <strong/>,
                <em/>,
                <mark/>
                      ]}
                      ns="Legalenterprise"
                    />
                  )}
                  {feature.key === "scalable_operations" && (
                    <Trans
                      i18nKey={`features.${feature.description}`}
                      components={[
                      <strong/>,
                <em/>,
                <mark/>
                      ]}
                      ns="Legalenterprise"
                    />
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Section */}
        <div className="max-w-4xl mx-auto mt-12 px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold leading-normal italic">
            <Trans i18nKey="final_title" ns="Legalenterprise" />
          </h3>
          <p className="text-base sm:text-lg leading-relaxed italic">
            <Trans
              i18nKey="final_text1"
              components={[
               <strong/>,
                <em/>,
                <mark/>
              ]}
              ns="Legalenterprise"
            />
            {" "}
            <Trans
              i18nKey="final_text2"
              components={[
            <strong/>,
                <em/>,
                <mark/>
              ]}
              ns="Legalenterprise"
            />
          </p>
        </div>
      </section>
    </div>
  );
}
