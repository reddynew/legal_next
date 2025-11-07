"use client"
import React from 'react';
import {
  Monitor,
  ShieldX,
  UserCheck,
  CheckCircle,
  FileText,
  Star,
  Lock,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Mail,
  ArrowLeft,
  Scale
} from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const Disclaimers = () => {
  const disclaimerSections = [
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Technology Platform Only",
      content: "JP Law Suvidha operates solely as an intermediary service to connect individuals in need of legal services with licensed advocates across India. The platform does not provide legal advice, does not represent clients, and does not participate in legal proceedings in any capacity."
    },
    {
      icon: <ShieldX className="w-6 h-6" />,
      title: "No Legal Liability or Influence",
      content: "JP Law Suvidha holds no accountability or liability for any legal advice, representation, or outcome that arises from interactions between clients and advocates. The platform does not interfere with legal proceedings, does not influence the delivery of justice, and does not bear responsibility for decisions made by advocates or clients."
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Advocate Credibility & Independence",
      content: "All advocates listed on the platform are independent professionals. JP Law Suvidha does not certify, validate, or guarantee the quality, credibility, or expertise of any legal professional. All engagements are conducted directly between clients and advocates, and any due diligence is the responsibility of the client."
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "No Endorsement",
      content: "Listing an advocate on the platform does not constitute endorsement. The platform remains neutral and does not favor or promote any particular advocate or firm."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Content Accuracy & Intent",
      content: "All content, articles, descriptions, and legal explanations published on JP Law Suvidha are meant for general informational purposes and are written in simplified terms for wider accessibility. While care has been taken to comply with applicable legal standards and accuracy, inadvertent errors may occur. Any misalignment with legal standards is purely unintentional, and the platform welcomes feedback to correct and review such instances."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "User Feedback & Advocate Ratings",
      content: "Client feedback is used to build advocate profiles with transparent ratings (e.g., 5-star system). JP Law Suvidha does not alter, influence, or filter genuine feedback provided by clients. Users are encouraged to leave honest and unbiased reviews after using the service."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Confidentiality",
      content: "JP Law Suvidha does not access, store, or monitor the content of legal communications between clients and advocates. Any case-related or sensitive information exchanged is protected by client-attorney confidentiality, and such responsibility lies with the engaged advocate."
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "No Guarantee of Outcome",
      content: "The platform does not offer any assurance or guarantee regarding the outcome of legal matters. Success in any legal process depends on facts, applicable laws, judicial interpretations, and the strategy adopted by the advocate."
    },
    {
      icon: <ExternalLink className="w-6 h-6" />,
      title: "Third-Party Tools and Services",
      content: "JP Law Suvidha may integrate or link to third-party tools or services. These are governed by their respective privacy policies and terms, and JP Law Suvidha is not responsible for any issues, losses, or disputes arising from such external services."
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Platform Policy and Updates",
      content: "JP Law Suvidha reserves the right to update or modify this disclaimer, platform policies, and content at any time without prior notice. Users are advised to review these terms periodically for the most recent version."
    }
  ];

  return (
    <div>
      <Navbar/>
      <section id="disclaimers" className="py-20 bg-background">


        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium mb-6 text-foreground">
              Disclaimer & General Terms
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-4xl mx-auto">
              JP Law Suvidha is a technology-driven platform that facilitates the connection between clients and independent legal professionals. The following disclaimer outlines the scope, limitations, and policies of the platform.
            </p>
          </div>

          {/* Disclaimer Grid */}
          <div className="grid gap-8 md:gap-6">
            {disclaimerSections.map((section, index) => (
              <div
                key={index}
                className="group bg-card border border-border rounded-lg p-8 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex gap-6">
                  {/* Icon and Number */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <div className="text-primary">
                        {section.icon}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground text-center">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-foreground mb-4">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="mt-16 bg-muted/30 border border-border rounded-lg p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-primary mr-3" />
              <h3 className="text-lg font-medium text-foreground">
                Need Clarification?
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              If any user notices misleading or incorrect information, or has suggestions for correction, they are encouraged to contact our Support Team.
            </p>
            <p className="text-sm text-muted-foreground">
              The platform is committed to compliance, fairness, and continuous improvement.
            </p>
          </div>

          {/* Bottom accent */}
          <div className="flex items-center justify-center mt-16">
            <div className="w-full max-w-md h-px bg-border"></div>
            <div className="w-2 h-2 bg-primary rounded-full mx-6"></div>
            <div className="w-full max-w-md h-px bg-border"></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Disclaimers;