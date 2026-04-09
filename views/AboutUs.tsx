'use client';
import React from 'react';

import Link from 'next/link';

export const AboutUs: React.FC = () => {
    return (
        <div className="w-full px-4 md:px-12 py-8">
            

            <h1 className="text-4xl font-bold mb-6">About Gossip Gazette</h1>

            <div className="prose max-w-none">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mt-6 mb-3">Our Mission</h2>
                    <p className="mb-4">
                        Founded in 2024, Gossip Gazette is an independent digital news publication dedicated to delivering
                        timely, accurate, and engaging coverage of technology, business, politics, entertainment, and sports.
                        Our mission is to provide readers with in-depth analysis and original perspectives on the stories that matter.
                    </p>
                    <p className="mb-4">
                        Unlike aggregator sites that merely repackage existing content, we focus on original reporting,
                        expert commentary, and contextual analysis that helps our readers understand not just what happened,
                        but why it matters and what comes next.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mt-6 mb-3">Our Story</h2>
                    <p className="mb-4">
                        Gossip Gazette was born from a simple observation: in an era of information overload, readers needed
                        a trusted source that could cut through the noise and deliver news that truly matters. Our founders,
                        a team of experienced journalists and technology professionals, recognized the growing gap between
                        traditional media and the digital-first audience.
                    </p>
                    <p className="mb-4">
                        What started as a small blog covering tech news has evolved into a comprehensive news platform serving
                        thousands of readers daily. We've expanded our coverage to include business, politics, entertainment,
                        and sports, while maintaining our commitment to quality journalism and editorial independence.
                    </p>
                    <p className="mb-4">
                        Today, Gossip Gazette stands as a testament to the power of independent journalism in the digital age.
                        We've built a loyal readership that values our commitment to accuracy, depth, and engaging storytelling.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mt-6 mb-3">Our Coverage Areas</h2>
                    <p className="mb-4">
                        Gossip Gazette provides comprehensive coverage across five major categories, each staffed by
                        experienced journalists and industry experts:
                    </p>
                    <div className="space-y-4 mb-4">
                        <div className="border-l-4 border-blue-600 pl-4">
                            <h4 className="font-bold">Technology</h4>
                            <p className="text-sm">From Silicon Valley startups to enterprise software, we cover the innovations
                                shaping our digital future. Our tech coverage includes product launches, industry trends, cybersecurity,
                                artificial intelligence, and the intersection of technology and society.</p>
                        </div>
                        <div className="border-l-4 border-green-600 pl-4">
                            <h4 className="font-bold">Business</h4>
                            <p className="text-sm">We provide insights into market trends, corporate strategy, entrepreneurship,
                                and economic policy. Our business coverage helps readers understand the forces driving the global economy
                                and make informed decisions.</p>
                        </div>
                        <div className="border-l-4 border-purple-600 pl-4">
                            <h4 className="font-bold">Politics</h4>
                            <p className="text-sm">Our political coverage goes beyond the headlines to examine policy implications,
                                electoral dynamics, and the intersection of government and society. We provide balanced analysis that
                                helps readers understand complex political issues.</p>
                        </div>
                        <div className="border-l-4 border-pink-600 pl-4">
                            <h4 className="font-bold">Entertainment</h4>
                            <p className="text-sm">From film and television to music and celebrity culture, we cover the stories
                                that captivate audiences worldwide. Our entertainment coverage combines breaking news with thoughtful
                                analysis of cultural trends.</p>
                        </div>
                        <div className="border-l-4 border-orange-600 pl-4">
                            <h4 className="font-bold">Sports</h4>
                            <p className="text-sm">We deliver comprehensive sports coverage including game analysis, player profiles,
                                team strategies, and the business of sports. Our coverage spans major leagues, international competitions,
                                and emerging sports trends.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mt-6 mb-3">Editorial Standards</h2>
                    <p className="mb-4">
                        We are committed to journalistic integrity and accuracy. Our editorial team follows strict guidelines
                        for fact-checking, source verification, and balanced reporting. We clearly distinguish between news
                        reporting, analysis, and opinion content.
                    </p>
                    <p className="mb-4">
                        When we make mistakes, we correct them promptly and transparently. Our readers' trust is our most
                        valuable asset, and we take that responsibility seriously.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mt-6 mb-3">Editorial Team</h2>
                    <p className="mb-4">Gossip Gazette is managed by Bytecode, a digital media team committed to quality journalism:</p>

                    <div className="space-y-6 mt-6">
                        <div className="border-l-4 border-red-700 pl-4">
                            <h3 className="font-bold text-lg">Bytecode Media Team</h3>
                            <p className="text-sm text-gray-600 mb-2">Publisher & Editorial Management</p>
                            <p className="text-sm">
                                Based in Accra, Ghana, Bytecode manages the editorial operations of Gossip Gazette.
                                Our team combines technology expertise with journalism to deliver quality digital news content.
                                We specialize in technology, business, politics, sports, and entertainment coverage with a focus
                                on original analysis and engaging storytelling.
                            </p>
                        </div>

                        <div className="border-l-4 border-red-700 pl-4">
                            <h3 className="font-bold text-lg">Our Editorial Standards</h3>
                            <p className="text-sm text-gray-600 mb-2">Commitment to Quality</p>
                            <p className="text-sm">
                                We maintain strict editorial guidelines for accuracy, fairness, and balanced reporting.
                                Our content is thoroughly researched and fact-checked before publication. We clearly distinguish
                                between news reporting, analysis, and opinion pieces to maintain transparency with our readers.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mt-6 mb-3">Technology & Innovation</h2>
                    <p className="mb-4">
                        As a digital-first publication, we leverage cutting-edge technology to deliver news efficiently and
                        effectively. Our platform is built on modern web technologies that ensure fast loading times, mobile
                        responsiveness, and an excellent user experience across all devices.
                    </p>
                    <p className="mb-4">
                        We continuously invest in our technology infrastructure to provide readers with the best possible
                        experience. From our content management system to our analytics platform, every aspect of our
                        operation is designed to serve our readers better.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mt-6 mb-3">Awards & Recognition</h2>
                    <p className="mb-4">
                        While we're a relatively young publication, we've already earned recognition for our commitment to
                        quality journalism. Our articles have been cited by industry leaders, shared widely on social media,
                        and praised by readers for their depth and accuracy.
                    </p>
                    <p className="mb-4">
                        We're proud to be a Google AdSense partner, which reflects our commitment to maintaining high-quality
                        content and adhering to strict editorial standards. This partnership allows us to continue providing
                        free, high-quality journalism to our readers.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mt-6 mb-3">Our Future Vision</h2>
                    <p className="mb-4">
                        Looking ahead, we're committed to expanding our coverage, growing our team of talented journalists,
                        and continuing to innovate in how we deliver news. We're exploring new formats including podcasts,
                        video content, and interactive features that will enhance the reader experience.
                    </p>
                    <p className="mb-4">
                        We're also committed to building a sustainable business model that allows us to maintain our editorial
                        independence while continuing to invest in quality journalism. Our goal is to become the go-to source
                        for readers who value depth, accuracy, and engaging storytelling.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mt-6 mb-3">Contact Information</h2>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <p className="mb-2"><strong>Email:</strong> <a href="mailto:bytecode@gmail.com" className="text-blue-500 hover:underline">bytecode@gmail.com</a></p>
                        <p className="mb-2"><strong>General Inquiries:</strong> bytecode@gmail.com</p>
                        <p className="mb-2"><strong>Editorial:</strong> editorial@bytecode.com</p>
                        <p className="mb-2"><strong>Advertising:</strong> ads@bytecode.com</p>
                        <p className="mb-4"><strong>Address:</strong> Accra, Greater Accra, Ghana</p>
                        <p className="text-sm text-gray-600">
                            For specific inquiries, please visit our <Link href="/contact" className="text-blue-500 hover:underline">Contact page</Link>.
                        </p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mt-6 mb-3">Advertising & Partnerships</h2>
                    <p className="mb-4">
                        Gossip Gazette is a Google AdSense partner. We maintain strict editorial independence, and advertising
                        relationships never influence our editorial content. All sponsored content is clearly labeled.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mt-6 mb-3">Stay Connected</h2>
                    <p className="mb-4">
                        Follow us on social media for breaking news updates and behind-the-scenes insights from our newsroom.
                        Visit our <Link href="/" className="text-blue-500 hover:underline">homepage</Link> for the latest stories,
                        or subscribe to our newsletter for daily digests delivered to your inbox.
                    </p>
                </section>
            </div>
        </div>
    );
};