import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const AboutUs: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Helmet>
                <title>About Us - Gossip Gazette</title>
                <meta name="description" content="Learn about Gossip Gazette's mission, editorial team, and commitment to quality journalism." />
                <link rel="canonical" href="https://gossipgazette.online/about" />
            </Helmet>

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
                    <p className="mb-4">Our newsroom is led by experienced journalists with expertise across multiple domains:</p>

                    <div className="space-y-6 mt-6">
                        <div className="border-l-4 border-red-700 pl-4">
                            <h3 className="font-bold text-lg">Sarah Mitchell</h3>
                            <p className="text-sm text-gray-600 mb-2">Editor-in-Chief</p>
                            <p className="text-sm">
                                Sarah brings over 10 years of digital journalism experience, previously serving as Senior Editor
                                at TechDaily and Contributing Writer for Global Business Review. She holds a Master's degree in
                                Journalism from Columbia University.
                            </p>
                        </div>

                        <div className="border-l-4 border-red-700 pl-4">
                            <h3 className="font-bold text-lg">Marcus Chen</h3>
                            <p className="text-sm text-gray-600 mb-2">Technology Editor</p>
                            <p className="text-sm">
                                With a background in computer science and 8 years covering the tech industry, Marcus specializes
                                in emerging technologies, AI, and cybersecurity. He previously worked as a Technology Correspondent
                                for The Digital Times.
                            </p>
                        </div>

                        <div className="border-l-4 border-red-700 pl-4">
                            <h3 className="font-bold text-lg">Elena Rodriguez</h3>
                            <p className="text-sm text-gray-600 mb-2">Business & Politics Reporter</p>
                            <p className="text-sm">
                                Elena covers business trends, market analysis, and political developments. She has 7 years of
                                experience in financial journalism and holds an MBA from Harvard Business School. Her work has
                                appeared in Financial Chronicle and Business Insider.
                            </p>
                        </div>

                        <div className="border-l-4 border-red-700 pl-4">
                            <h3 className="font-bold text-lg">James Brooks</h3>
                            <p className="text-sm text-gray-600 mb-2">Sports & Entertainment Writer</p>
                            <p className="text-sm">
                                James brings passion and analytical insight to sports and entertainment coverage. With 6 years
                                in sports journalism, he's covered everything from local leagues to international championships.
                                BA in Sports Journalism from Northwestern University.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mt-6 mb-3">Contact Information</h2>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <p className="mb-2"><strong>Email:</strong> <a href="mailto:gossipgazettegh@gmail.com" className="text-blue-500 hover:underline">gossipgazettegh@gmail.com</a></p>
                        <p className="mb-2"><strong>General Inquiries:</strong> gossipgazettegh@gmail.com</p>
                        <p className="mb-2"><strong>Editorial:</strong> editorial@gossipgazettegh.com</p>
                        <p className="mb-2"><strong>Advertising:</strong> ads@gossipgazettegh.com</p>
                        <p className="mb-4"><strong>Address:</strong> PO Box 12345, Accra, Ghana</p>
                        <p className="text-sm text-gray-600">
                            For specific inquiries, please visit our <Link to="/contact" className="text-blue-500 hover:underline">Contact page</Link>.
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
                        Visit our <Link to="/" className="text-blue-500 hover:underline">homepage</Link> for the latest stories,
                        or subscribe to our newsletter for daily digests delivered to your inbox.
                    </p>
                </section>
            </div>
        </div>
    );
};
