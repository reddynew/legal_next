import * as LucideIcons from "lucide-react";

const expertise = {
  section_title: "Areas of Expertise",
  section_desc:
    "Explore a wide range of legal services delivered through our secure, tech-enabled platform—connecting you with trusted legal professionals based on your needs.",
  legalServices: [
    {
      category: "Criminal Law",
      icon: "gavel",
      services: [
        {
          title: "Bail & Anticipatory Bail",
          description:
            "Assistance with securing bail in ongoing or potential criminal cases.",
          icon: "handcuffs",
        },
        {
          title: "FIR & Complaints",
          description: "Legal guidance on filing or responding to police complaints.",
          icon: "file-alert",
        },
        {
          title: "Trial Representation",
          description: "Connect with experts for defense in criminal trials.",
          icon: "scale",
        },
        {
          title: "Cybercrime Cases",
          description:
            "Specialized support for internet fraud and cyber offense matters.",
          icon: "shield-alert",
        },
        {
          title: "White-Collar Crime",
          description:
            "Legal defense for financial and corporate crime allegations.",
          icon: "briefcase-dollar",
        },
      ],
    },
    {
      category: "Corporate Law",
      icon: "building",
      services: [
        {
          title: "Company Formation",
          description:
            "End-to-end assistance with business incorporation and legal setup.",
          icon: "apartment",
        },
        {
          title: "Shareholder & ESOP Agreements",
          description: "Drafting and reviewing equity-sharing documents.",
          icon: "users-cog",
        },
        {
          title: "ROC Compliance",
          description:
            "Filing and maintaining company records with the Registrar of Companies.",
          icon: "clipboard-check",
        },
        {
          title: "Mergers & Acquisitions",
          description:
            "Legal support for structuring and documenting M&A deals.",
          icon: "exchange-alt",
        },
        {
          title: "Corporate Governance",
          description:
            "Policy drafting for board practices and regulatory compliance.",
          icon: "balance-scale",
        },
      ],
    },
    {
      category: "Family Law",
      icon: "family",
      services: [
        {
          title: "Divorce & Separation",
          description: "Legal help with filing and settling divorce matters.",
          icon: "user-slash",
        },
        {
          title: "Child Custody",
          description: "Assistance in securing custody and visitation rights.",
          icon: "child",
        },
        {
          title: "Alimony & Maintenance",
          description:
            "Drafting and enforcement of financial support agreements.",
          icon: "wallet",
        },
        {
          title: "Domestic Violence Cases",
          description: "Legal remedies and protection under domestic abuse laws.",
          icon: "shield-exclamation",
        },
        {
          title: "Property & Inheritance",
          description:
            "Legal support for asset division and succession rights.",
          icon: "home",
        },
      ],
    },
    {
      category: "Civil Law",
      icon: "scale-balanced",
      services: [
        {
          title: "Property Disputes",
          description: "Resolution of ownership, lease, and title-related issues.",
          icon: "house-crack",
        },
        {
          title: "Contractual Disputes",
          description:
            "Enforcement or defense in civil breach of contract cases.",
          icon: "file-signature",
        },
        {
          title: "Consumer Complaints",
          description: "Filing and representing cases in consumer courts.",
          icon: "users",
        },
        {
          title: "Money Recovery",
          description: "Legal action for unpaid dues and recovery suits.",
          icon: "money-bill-wave",
        },
        {
          title: "Injunctions & Notices",
          description:
            "Filing interim reliefs or legal notices in civil matters.",
          icon: "bell-exclamation",
        },
      ],
    },
    {
      category: "Business Law",
      icon: "briefcase",
      services: [
        {
          title: "Contract Drafting & Review",
          description: "Legally sound agreements tailored to your business.",
          icon: "file-contract",
        },
        {
          title: "Employment Law Compliance",
          description: "HR policies and contracts aligned with labor laws.",
          icon: "user-tie",
        },
        {
          title: "Intellectual Property",
          description:
            "Support for trademarks, copyrights, and licensing.",
          icon: "lightbulb",
        },
        {
          title: "Privacy & Website Policies",
          description:
            "Drafting GDPR/DPDP-compliant terms and policies.",
          icon: "shield",
        },
        {
          title: "Legal Risk Audit",
          description:
            "Evaluating legal exposure and compliance for your business.",
          icon: "file-search",
        },
      ],
    },
  ],
};

const Expertise = () => {
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            {expertise.section_title}
          </h2>
          <p className="text-gray-600 text-lg">{expertise.section_desc}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {expertise.legalServices.map((area, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-shadow duration-300 border"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                {area.icon && renderIcon(area.icon, "w-7 h-7 text-primary")}
                <h3 className="text-xl font-semibold text-gray-800">
                  {area.category}
                </h3>
              </div>

              <ul className="space-y-4">
                {area.services.map((service, sIdx) => (
                  <li
                    key={sIdx}
                    className="border border-gray-200 rounded-2xl px-4 py-4 bg-gray-50 hover:bg-white transition"
                  >
                    <div className="flex items-start gap-2">
                      {service.icon &&
                        renderIcon(service.icon, "w-5 h-5 text-primary mt-1")}
                      <div>
                        <h4 className="text-base font-semibold text-primary mb-1">
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
