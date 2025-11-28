"use client"
import * as LucideIcons from "lucide-react";
import { useTranslation } from 'react-i18next';
import '../app/index.css'
const Expertise = () => {
    const { t } = useTranslation('expertise');
    type Service = {
    title: string;
    description: string;
    icon?: string;
  };

  type ExpertiseArea = {
    category: string;
    icon?: string;
    services: Service[];
  };

  const rawData = t('expertise.legalServices', { returnObjects: true });

  const expertiseAreas: ExpertiseArea[] = Array.isArray(rawData)
    ? rawData.filter(
        (item): item is ExpertiseArea =>
          item &&
          typeof item.category === 'string' &&
          Array.isArray(item.services) &&
          item.services.every(
            (s) =>
              typeof s.title === 'string' && typeof s.description === 'string'
          )
      )
    : [];
  
  // dynamically render lucide icons by name
  const renderIcon = (iconName: string, className = "w-6 h-6 text-primary") => {
    const pascalCase = iconName
      .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
      .replace(/^(.)/, (_, c) => c.toUpperCase());
    const IconComponent = (LucideIcons as any)[pascalCase];
    return IconComponent ? (
      <IconComponent className={className} aria-hidden="true" />
    ) : null;
  };

  return (
    <section id="expertise" className="py-16 bg-gray-50">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-lg font-bold tracking-tight sm:text-4xl mb-4 text-black">
            {t(`expertise.section_title`)}
          </h2>
          <p className="paragraph text-gray-600">{t(`expertise.section_desc`)}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {expertiseAreas.map((area, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-shadow duration-300 border"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                {/* {area.icon && renderIcon(area.icon, "w-7 h-7 text-primary")} */}
                <h3 className="heading-sm text-text-secondary">
                  {area.category}
                </h3>
              </div>

              <ul className="space-y-4">
                {area.services.map((service, sIdx) => (
                  <li
                    key={sIdx}
                    className="border border-gray-200 rounded-2xl px-4 py-4 bg-white shadow-lg"
                  >
                    <div className="flex items-start gap-2">
                      <div>
                        <h4 className="text-base font-semibold text-primary mb-2">
                          {service.title}
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
