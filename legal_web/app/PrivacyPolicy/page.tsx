import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Shield, Scale, FileText } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Professional Header */}
      <Navbar/>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-accent rounded-full">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl legal-heading mb-4 legal-serif">Privacy Policy</h1>
            <p className="text-lg legal-body max-w-2xl mx-auto">
              Protecting your privacy with the highest standards of professional confidentiality and legal compliance.
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm legal-small">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4" />
                <span>Legal Compliance</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Professional Standards</span>
              </div>
            </div>
          </div>

          {/* Privacy Policy Content */}
          <Card className="legal-card border-2">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-10">
                {/* Introduction */}
                <section className="legal-section">
                  <h2 className="text-2xl legal-subheading mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    Introduction
                  </h2>
                  <div className="ml-11 space-y-4">
                    <p className="legal-body">
                      JP Law Suvidha ("we," "our," or "us") operates the website
                      jplawsuvidha.com and provides legal technology services. We are
                      committed to protecting your privacy and ensuring the security of
                      your personal information with the highest standards of professional
                      confidentiality expected in the legal industry.
                    </p>
                    <div className="bg-accent/50 p-4 rounded-lg border-l-4 border-primary">
                      <p className="legal-small font-medium">
                        This Privacy Policy explains how we collect, use, store, and protect
                        your information when you use our platform, in compliance with applicable
                        laws and professional legal standards.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Information We Collect */}
                <section className="legal-section">
                  <h2 className="text-2xl legal-subheading mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    Information We Collect
                  </h2>
                  <div className="ml-11 space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">2.1 Personal Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="bg-card border rounded-lg p-4">
                            <h4 className="font-medium text-foreground mb-2">Contact Information</h4>
                            <ul className="legal-small space-y-1">
                              <li>• Name, email address, phone number</li>
                              <li>• Postal address</li>
                            </ul>
                          </div>
                          <div className="bg-card border rounded-lg p-4">
                            <h4 className="font-medium text-foreground mb-2">Professional Information</h4>
                            <ul className="legal-small space-y-1">
                              <li>• Legal practice details</li>
                              <li>• Bar registration number</li>
                              <li>• Firm information</li>
                            </ul>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-card border rounded-lg p-4">
                            <h4 className="font-medium text-foreground mb-2">Account Information</h4>
                            <ul className="legal-small space-y-1">
                              <li>• Username, password</li>
                              <li>• Profile information</li>
                            </ul>
                          </div>
                          <div className="bg-card border rounded-lg p-4">
                            <h4 className="font-medium text-foreground mb-2">Identity Verification</h4>
                            <ul className="legal-small space-y-1">
                              <li>• Government-issued ID details</li>
                              <li>• Professional certifications</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">2.2 Technical Information</h3>
                      <div className="bg-muted/50 p-6 rounded-lg">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-foreground mb-3">Device & Usage Data</h4>
                            <ul className="legal-small space-y-1">
                              <li>• IP address, browser type, operating system</li>
                              <li>• Device identifiers</li>
                              <li>• Pages visited, time spent on platform</li>
                              <li>• Click patterns, feature usage</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-3">System Data</h4>
                            <ul className="legal-small space-y-1">
                              <li>• Log data, access times</li>
                              <li>• Error logs, system activity</li>
                              <li>• Cookies and session data</li>
                              <li>• Analytics information</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">2.3 Legal Document Information</h3>
                      <div className="bg-accent/30 p-6 rounded-lg border border-primary/20">
                        <div className="flex items-start gap-3 mb-4">
                          <Shield className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Confidential Legal Data</h4>
                            <p className="legal-small mb-3">Protected under attorney-client privilege and professional confidentiality standards.</p>
                          </div>
                        </div>
                        <ul className="legal-small space-y-1 ml-8">
                          <li>• Case details and legal matter information</li>
                          <li>• Case documents and client information</li>
                          <li>• Document metadata (file names, dates, modification history)</li>
                          <li>• Legal research, briefs, correspondence, notes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* How We Use Information */}
                <section className="legal-section">
                  <h2 className="text-2xl legal-subheading mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    How We Use Your Information
                  </h2>
                  <div className="ml-11">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium text-foreground">Service Provision</h4>
                        <ul className="legal-small space-y-1">
                          <li>• Provide access to legal technology tools</li>
                          <li>• Process and manage legal documents</li>
                          <li>• Facilitate professional communication</li>
                          <li>• Maintain platform functionality</li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium text-foreground">Account Management</h4>
                        <ul className="legal-small space-y-1">
                          <li>• Create and maintain user accounts</li>
                          <li>• Verify professional credentials</li>
                          <li>• Manage subscriptions and billing</li>
                          <li>• Provide customer support</li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium text-foreground">Legal Compliance</h4>
                        <ul className="legal-small space-y-1">
                          <li>• Comply with applicable laws</li>
                          <li>• Respond to legal requests</li>
                          <li>• Protect rights and prevent fraud</li>
                          <li>• Monitor security and performance</li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium text-foreground">Platform Improvement</h4>
                        <ul className="legal-small space-y-1">
                          <li>• Analyze usage patterns</li>
                          <li>• Develop new features</li>
                          <li>• Conduct research and analytics</li>
                          <li>• Enhance user experience</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Information Sharing */}
                <section className="legal-section">
                  <h2 className="text-2xl legal-subheading mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    Information Sharing and Disclosure
                  </h2>
                  <div className="ml-11 space-y-4">
                    <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                      <p className="legal-body font-medium">
                        We do not sell, rent, or trade your personal information to third
                        parties for commercial purposes.
                      </p>
                    </div>
                    <p className="legal-body">We may share your information only in the following circumstances:</p>
                    <div className="grid gap-3">
                      {[
                        "With Your Explicit Consent",
                        "With Trusted Service Providers (cloud hosting, payments, analytics)",
                        "For Legal Compliance and Court Orders",
                        "During Business Transfers (merger, acquisition, asset sale)",
                        "For Safety and Security Purposes"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <span className="legal-small">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Remaining sections with similar enhanced styling */}
                {[
                  {
                    number: 5,
                    title: "Data Security and Protection",
                    content: [
                      "We implement industry-standard security measures including encryption, access controls, firewalls, monitoring, and employee training. We maintain professional standards such as attorney-client privilege, confidentiality, and bar association compliance."
                    ]
                  },
                  {
                    number: 6,
                    title: "Data Retention",
                    content: ["Account Information: Retained during subscription + 7 years",
                      "Legal Documents: Retained 7–10 years",
                      "Communication Data: 3 years.",
                      "Technical Logs: 1 year. Upon account termination, personal information is securely deleted within 30 days unless legal obligations require retention."
                    ]
                  },
                  {
                    number: 7,
                    title: "Your Rights and Choices",
                    content: ["Access, correction, deletion, portability, restriction",
                      "Opt-out of marketing, update preferences, manage cookies",
                      "Update profile info, change password, download documents, close account"
                    ]
                  }
                ].map((section) => (
                  <section key={section.number} className="legal-section">
                    <h2 className="text-2xl legal-subheading mb-4 flex items-center gap-3">
                      <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {section.number}
                      </span>
                      {section.title}
                    </h2>
                    {section.content.map((item, index) => (
                      <div key={index} className="ml-11 space-y-4">
                        {/* <div key={index} className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
                          <div >
                            
                          </div>
                          <span className="legal-small">{item}</span>
                        </div> */}
                        <ul className="list-disc pl-4 legal-small space-y-1">
                          <li>{item}</li>
                        </ul>
                      </div>
                    ))}

                  </section>
                ))}
                {/* Cookies and Tracking */}
                <section className="legal-section">
                  <h2 className="text-2xl legal-subheading mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">8</span>
                    Cookies and Tracking Technologies
                  </h2>
                  <div className="ml-11 space-y-4">
                    <p className="legal-body">
                      We use cookies and similar technologies to enhance your experience, analyze usage, and secure our platform.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-card border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Types of Cookies</h4>
                        <ul className="legal-small list-disc pl-4 space-y-1">
                          <li>Essential Cookies: Required for platform functionality</li>
                          <li>Analytics Cookies: Help improve user experience</li>
                          <li>Preference Cookies: Remember your settings</li>
                          <li>Security Cookies: Protect against fraud</li>
                        </ul>
                      </div>
                      <div className="bg-card border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Cookie Management</h4>
                        <ul className="legal-small list-disc pl-4 space-y-1">
                          <li>Browser settings and preferences</li>
                          <li>Platform cookie management tools</li>
                          <li>Third-party opt-out mechanisms</li>
                          <li>Privacy-focused browser extensions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
                {/* International Data Transfers */}
                <section className="legal-section">
                  <h2 className="text-2xl legal-subheading mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">9</span>
                    International Data Transfers
                  </h2>
                  <div className="ml-11 space-y-4">
                    <p className="legal-body">
                      If you access our platform from outside India, your information may be transferred to and processed in India or other countries where our service providers operate.
                    </p>
                    <ul className="legal-small list-disc pl-4 space-y-1">
                      <li>Standard contractual clauses</li>
                      <li>Adequacy decisions by relevant authorities</li>
                      <li>Certification schemes and codes of conduct</li>
                    </ul>
                  </div>
                </section>
                {/* Children's Privacy */}
                <section className="legal-section">
                  <h2 className="text-2xl legal-subheading mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">10</span>
                    Children's Privacy
                  </h2>
                  <div className="ml-11 space-y-4">
                    <p className="legal-body">
                      Our platform is not intended for individuals under 18 years of age. We do not knowingly collect personal information from minors. If we become aware of such collection, we will take immediate steps to delete the information.
                    </p>
                  </div>
                </section>
                <section className="legal-section">
                  <h2 className="text-2xl legal-subheading mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">11</span>
                    Changes to Privacy Policy
                  </h2>
                  <div className="ml-11 space-y-4">
                    <p className="legal-body">
                      We may update this Privacy Policy periodically to reflect changes in our practices, legal requirements, or user feedback.
                    </p>
                    <ul className="legal-small list-disc pl-4 space-y-1">
                      <li>Email notifications to registered users</li>
                      <li>Prominent notices on our platform</li>
                      <li>Updated effective date on this policy</li>
                    </ul>
                  </div>
                </section>
                {/* Legal Basis for Processing */}
                <section className="legal-section">
                  <h2 className="text-2xl legal-subheading mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">12</span>
                    Legal Basis for Processing
                  </h2>
                  <div className="ml-11">
                    <ul className="legal-small list-disc pl-4 space-y-1">
                      <li>Contract Performance: To provide services</li>
                      <li>Legitimate Interests: To improve and secure our platform</li>
                      <li>Legal Compliance: To meet regulatory obligations</li>
                      <li>Consent: When you explicitly agree</li>
                    </ul>
                  </div>
                </section>
                {/* Professional Obligations */}
                <section className="legal-section">
                  <h2 className="text-2xl legal-subheading mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">13</span>
                    Professional Obligations
                  </h2>
                  <div className="ml-11">
                    <div className="bg-accent/50 p-6 rounded-lg border-l-4 border-primary">
                      <div className="flex items-start gap-3">
                        <Scale className="w-6 h-6 text-primary mt-1" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">Legal Professional Standards</h3>
                          <p className="legal-body">
                            As a legal technology platform, we are bound by attorney-client privilege,
                            confidentiality standards, bar association rules, and legal industry
                            regulations. We maintain the highest standards of professional conduct
                            and data protection expected in the legal profession.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Dispute Resolution */}
                <section className="legal-section">
                  <h2 className="text-2xl legal-subheading mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">14</span>
                    Dispute Resolution
                  </h2>
                  <div className="ml-11 space-y-4">
                    <p className="legal-body">Any disputes regarding this Privacy Policy will be resolved through:</p>
                    <ul className="legal-small list-disc pl-4 space-y-1">
                      <li>Direct communication and negotiation</li>
                      <li>Mediation through recognized legal bodies</li>
                      <li>Arbitration under the Indian Arbitration and Conciliation Act</li>
                      <li>Courts having jurisdiction in Hyderabad, India</li>
                    </ul>
                  </div>
                </section>


                {/* Contact Section */}
                <section className="legal-section">
                  <h2 className="text-2xl legal-subheading mb-4 flex items-center gap-3">
                    Contact Information
                  </h2>
                  <div className="ml-11">
                    <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-foreground mb-3">JP Law Suvidha</h3>
                          <div className="space-y-2 legal-small">
                            <p><strong>Website:</strong> jplawsuvidha.com</p>
                            <p><strong>Email:</strong> support@jplawsuvidha.com</p>
                            <p><strong>Phone:</strong> +918639930413</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-3">Business Address</h3>
                          <div className="legal-small">
                            <span>Vanasthalipuram, Hyderabad</span>
                            <br />
                            <span>Telangana</span>
                            <br />
                            <span>India - 500070</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

              </div>

              {/* Footer */}
              <footer className="border-t border-border pt-12 mt-16 text-center flex flex-col items-center">
                {/* Icon Badge */}
                <div className="flex items-center justify-center mb-6">
                  <div className="p-3 bg-primary/10 rounded-full shadow-sm">
                    <Shield className="w-7 h-7 text-primary" />
                  </div>
                </div>

                {/* Policy Text */}
                <div className="max-w-3xl mx-auto space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    By using <span className="font-medium text-foreground">JP Law Suvidha</span>,
                    you acknowledge that you have read, understood, and agree to be bound by this
                    Privacy Policy. This policy reflects our commitment to maintaining the highest
                    standards of privacy and confidentiality expected in the legal profession.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This Privacy Policy is governed by Indian law and complies with applicable data
                    protection regulations including the Information Technology Act, 2000 and
                    relevant rules thereunder.
                  </p>
                </div>

                {/* Divider */}
                <div className="mt-10 flex items-center justify-center w-full max-w-2xl">
                  <div className="flex-1 h-px bg-border"></div>
                  <div className="mx-4 w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1 h-px bg-border"></div>
                </div>

                {/* Metadata */}
                <div className="mt-6">
                  <p className="text-xs text-muted-foreground">
                    Last updated: {new Date().toLocaleDateString()} • Effective immediately
                  </p>
                </div>
              </footer>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}