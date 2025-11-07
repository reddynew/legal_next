"use client"
import React, { useState } from 'react';
import {
    Shield,
    User,
    Settings,
    ExternalLink,
    BarChart3,
    Copyright,
    UserX,
    Heart,
    CheckSquare,
    Square,
    ArrowLeft,
    Scale
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Navbar from '@/components/Navbar';

const UserDisclaimers = () => {
    const [isAgreed, setIsAgreed] = useState(false);
    const navigate = useRouter()
    const handleAgree = async () => {
        setIsAgreed(!isAgreed)
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate.push('/')
    }

    const disclaimerSections = [
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Data Collection & Privacy",
            items: [
                "I consent to providing my personal information (name, email, contact number) with full awareness.",
                "I understand my data will be stored securely on encrypted servers following data protection laws.",
                "I acknowledge my data will only be used for service improvement, analytics, and platform enhancements.",
                "I consent to data usage for tailoring services and responding to legal queries while maintaining privacy."
            ]
        },
        {
            icon: <User className="w-6 h-6" />,
            title: "User Responsibilities",
            items: [
                "I agree not to misuse platform services, including unlawful access or data tampering.",
                "I am responsible for the accuracy of information I submit and understand false details may result in service suspension."
            ]
        },
        {
            icon: <Settings className="w-6 h-6" />,
            title: "Platform Features",
            items: [
                "I accept the platform may use cookies to enhance browsing experience and gather usage statistics.",
                "I understand I may receive communications and updates based on my information, with opt-out options available."
            ]
        },
        {
            icon: <ExternalLink className="w-6 h-6" />,
            title: "Third-Party Services",
            items: [
                "I acknowledge the website may redirect to third-party services and agree to review their terms separately."
            ]
        },
        {
            icon: <BarChart3 className="w-6 h-6" />,
            title: "Data Usage & Research",
            items: [
                "I agree that anonymized data may be used for trends analysis and platform improvements while maintaining privacy."
            ]
        },
        {
            icon: <Copyright className="w-6 h-6" />,
            title: "Intellectual Property",
            items: [
                "I understand all platform content remains the exclusive property of JP Law Suvidha and shall not be duplicated without authorization."
            ]
        },
        {
            icon: <UserX className="w-6 h-6" />,
            title: "User Rights",
            items: [
                "I reserve the right to withdraw consent by discontinuing usage or requesting data deletion, subject to legal limitations."
            ]
        },
        {
            icon: <Heart className="w-6 h-6" />,
            title: "Platform Commitment",
            items: [
                "I commit to using this platform ethically and lawfully, with mutual expectations of respect, safety, and transparency."
            ]
        }
    ];

    return (
        <div>
            <Navbar/>
            <section id="user-disclaimers" className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-medium mb-6 text-foreground">
                            User Terms & Consent
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                            Your privacy and understanding are important to us. Please review the following terms regarding your use of our platform.
                        </p>
                    </div>

                    {/* Disclaimer Sections */}
                    <div className="space-y-8 mb-16">
                        {disclaimerSections.map((section, index) => (
                            <div
                                key={index}
                                className="bg-card border border-border rounded-lg p-8 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                            >
                                <div className="flex items-start gap-6">
                                    {/* Icon */}
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <div className="text-primary">
                                                {section.icon}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-foreground mb-4">
                                            {section.title}
                                        </h3>
                                        <ul className="space-y-3">
                                            {section.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="flex items-start gap-3">
                                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                                    <span className="text-muted-foreground leading-relaxed">
                                                        {item}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Declaration Section */}
                    <div className="bg-card border-2 border-primary/20 rounded-lg p-8">
                        <h3 className="text-xl font-medium text-foreground mb-6 text-center">
                            Declaration
                        </h3>

                        <div className="bg-muted/30 rounded-lg p-6 mb-6">
                            <p className="text-muted-foreground leading-relaxed text-center">
                                By clicking "I Agree" or continuing to use this platform, I affirm that I have read, understood,
                                and voluntarily accept the terms outlined above, and I grant my consent for the ethical handling
                                of my information in alignment with the platform's goals.
                            </p>
                        </div>

                        {/* Checkbox */}
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={handleAgree}
                                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors duration-200"
                            >
                                {isAgreed ? (
                                    <CheckSquare className="w-6 h-6 text-primary" />
                                ) : (
                                    <Square className="w-6 h-6 text-muted-foreground" />
                                )}
                                <span className={`font-medium ${isAgreed ? 'text-primary' : 'text-muted-foreground'}`}>
                                    I Agree to the Terms & Conditions
                                </span>
                            </button>
                        </div>

                        {/* Status Message */}
                        {isAgreed && (
                            <div className="mt-6 text-center">
                                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg">
                                    <CheckSquare className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        Thank you for accepting our terms
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom accent */}
                    <div className="flex items-center justify-center mt-16">
                        <div className="w-full max-w-md h-px bg-border"></div>
                        <div className="w-2 h-2 bg-primary rounded-full mx-6"></div>
                        <div className="w-full max-w-md h-px bg-border"></div>
                    </div>
                </div>
            </section>
        </div>

    );
};

export default UserDisclaimers;