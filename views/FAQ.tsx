'use client';
import React from 'react';

import Link from 'next/link';

export const FAQ: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            

            <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>

            <p className="mb-8 text-gray-600">
                Find answers to the most common questions about Gossip Gazette. If you don't find what you're looking for,
                please <Link href="/contact" className="text-blue-500 hover:underline">contact us</Link> directly.
            </p>

            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-6 border-b-2 border-gray-200 pb-2">General Questions</h2>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">What is Gossip Gazette?</h3>
                        <p className="text-gray-700">
                            Gossip Gazette is an independent digital news publication founded in 2024. We provide comprehensive
                            coverage of technology, business, politics, entertainment, and sports. Our mission is to deliver
                            timely, accurate, and engaging news with in-depth analysis and original perspectives. Unlike
                            aggregator sites, we focus on original reporting and expert commentary that helps readers understand
                            not just what happened, but why it matters.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">Who owns and operates Gossip Gazette?</h3>
                        <p className="text-gray-700">
                            Gossip Gazette is operated by Bytecode Media, a digital media company based in Accra, Ghana. We are
                            an independent publication committed to editorial independence and journalistic integrity. Our team
                            combines journalism expertise with technology knowledge to deliver quality digital news content.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">Is Gossip Gazette free to read?</h3>
                        <p className="text-gray-700">
                            Yes, Gossip Gazette is completely free to read. We believe in making quality journalism accessible
                            to everyone. Our website is supported by advertising, including Google AdSense, which allows us to
                            provide free content while maintaining our editorial independence. We do not have a paywall or
                            subscription requirement.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">How often is content updated?</h3>
                        <p className="text-gray-700">
                            We publish new articles daily across all our coverage areas. Breaking news is published as soon as
                            it's verified and ready, while feature articles and analysis pieces follow a regular publishing
                            schedule. We recommend checking our <Link href="/" className="text-blue-500 hover:underline">homepage</Link> regularly
                            or subscribing to our newsletter for the latest updates.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">Can I trust the information on Gossip Gazette?</h3>
                        <p className="text-gray-700">
                            Absolutely. We maintain strict editorial standards and follow rigorous fact-checking processes.
                            All our articles are verified by multiple sources before publication. We clearly distinguish between
                            news reporting, analysis, and opinion content. When we make mistakes, we correct them promptly and
                            transparently. Learn more about our standards on our{' '}
                            <Link href="/editorial-guidelines" className="text-blue-500 hover:underline">Editorial Guidelines</Link> page.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-6 border-b-2 border-gray-200 pb-2">Content and Editorial</h2>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">How do I submit a news tip or story idea?</h3>
                        <p className="text-gray-700 mb-2">
                            We welcome news tips and story ideas from our readers! You can submit tips through our{' '}
                            <Link href="/contact" className="text-blue-500 hover:underline">contact page</Link> by selecting
                            "News Tip" as the subject. Please provide as much detail as possible, including:
                        </p>
                        <ul className="list-disc ml-6 text-gray-700 space-y-1">
                            <li>A brief description of the story or tip</li>
                            <li>Any relevant sources, documents, or evidence</li>
                            <li>Your contact information (kept confidential if requested)</li>
                            <li>The best time to reach you for follow-up questions</li>
                        </ul>
                        <p className="text-gray-700 mt-2">
                            All tips are treated confidentially, and we protect our sources' identities when requested.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">How do I request a correction to an article?</h3>
                        <p className="text-gray-700">
                            If you believe an article contains a factual error, please contact us immediately through our{' '}
                            <Link href="/contact" className="text-blue-500 hover:underline">contact page</Link> or email
                            editorial@bytecode.com. Please include the article URL, the specific error you've identified,
                            and any supporting evidence. We take accuracy seriously and will investigate all correction
                            requests promptly. If we confirm an error, we will correct it immediately and publish a
                            correction notice.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">Can I republish or share Gossip Gazette articles?</h3>
                        <p className="text-gray-700">
                            You may share links to our articles on social media and other platforms. For personal use, you
                            may print or download individual articles. However, republishing our content on other websites
                            or publications requires our prior written permission. Please contact us at bytecode@gmail.com
                            for reprint requests. See our <Link href="/terms-of-service" className="text-blue-500 hover:underline">Terms of Service</Link> for
                            more details on content usage.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">How do I subscribe to your newsletter?</h3>
                        <p className="text-gray-700">
                            You can subscribe to our newsletter by entering your email address in the subscription box on
                            our homepage or in the sidebar of most pages. Our newsletter delivers daily news digests and
                            highlights of our best content directly to your inbox. You can unsubscribe at any time by
                            clicking the unsubscribe link in any newsletter email.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-6 border-b-2 border-gray-200 pb-2">Advertising and Business</h2>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">How can I advertise on Gossip Gazette?</h3>
                        <p className="text-gray-700">
                            We offer various advertising opportunities including display ads, sponsored content, and newsletter
                            sponsorships. For detailed information about our advertising options, audience demographics, and
                            pricing, please visit our <Link href="/advertise" className="text-blue-500 hover:underline">Advertise With Us</Link> page
                            or contact our advertising team at ads@bytecode.com. We work with businesses of all sizes to create
                            effective advertising campaigns.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">Does advertising influence your editorial content?</h3>
                        <p className="text-gray-700">
                            No. We maintain strict separation between our editorial and advertising operations. Advertisers
                            have no influence over our editorial decisions, coverage, or content. Our editorial team operates
                            independently and makes decisions based solely on newsworthiness and reader interest. Any sponsored
                            or paid content is clearly labeled as such and meets the same editorial standards as our regular
                            content.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">What is your relationship with Google AdSense?</h3>
                        <p className="text-gray-700">
                            Gossip Gazette is a Google AdSense partner. This means we display Google ads on our website, which
                            helps support our operations and allows us to provide free content to readers. Google AdSense uses
                            cookies to serve personalized ads based on your browsing history. You can learn more about Google's
                            advertising practices and opt out of personalized ads by visiting{' '}
                            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Ads Settings</a>.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">Do you offer partnership or collaboration opportunities?</h3>
                        <p className="text-gray-700">
                            Yes, we're open to partnerships and collaborations that align with our mission and values. This
                            could include content partnerships, event collaborations, or other mutually beneficial arrangements.
                            Please contact us at bytecode@gmail.com with details about your proposed partnership, and we'll
                            review it carefully.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-6 border-b-2 border-gray-200 pb-2">Technical Support</h2>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">The website isn't loading properly. What should I do?</h3>
                        <p className="text-gray-700 mb-2">
                            If you're experiencing technical issues with our website, try these troubleshooting steps:
                        </p>
                        <ul className="list-disc ml-6 text-gray-700 space-y-1">
                            <li>Clear your browser cache and cookies</li>
                            <li>Try a different web browser</li>
                            <li>Disable browser extensions temporarily</li>
                            <li>Check your internet connection</li>
                            <li>Try accessing the site from a different device</li>
                        </ul>
                        <p className="text-gray-700 mt-2">
                            If problems persist, please contact us through our{' '}
                            <Link href="/contact" className="text-blue-500 hover:underline">contact page</Link> with details
                            about the issue, including your browser type, device, and any error messages you're seeing.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">Is Gossip Gazette mobile-friendly?</h3>
                        <p className="text-gray-700">
                            Yes! Our website is fully responsive and optimized for mobile devices, tablets, and desktop computers.
                            You can access all our content and features on any device with a web browser. We continuously work
                            to improve the mobile experience based on user feedback.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">Do you have a mobile app?</h3>
                        <p className="text-gray-700">
                            Currently, we do not have a dedicated mobile app. However, our mobile-optimized website provides
                            an excellent experience on smartphones and tablets. You can add our website to your home screen
                            for quick access. We're exploring the possibility of developing a mobile app in the future based
                            on reader demand.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">How do I disable ads on your website?</h3>
                        <p className="text-gray-700">
                            While we understand that ads can sometimes be intrusive, they are essential to supporting our
                            operations and allowing us to provide free, quality journalism. We strive to maintain a balance
                            between user experience and sustainability. If you're seeing excessive or inappropriate ads,
                            please let us know so we can address the issue. You can also opt out of personalized ads through
                            your browser settings or <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Ads Settings</a>.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-6 border-b-2 border-gray-200 pb-2">Privacy and Data</h2>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">How do you protect my privacy?</h3>
                        <p className="text-gray-700">
                            We take your privacy seriously and implement appropriate security measures to protect your personal
                            information. We only collect information necessary to provide our services and improve your experience.
                            We do not sell your personal information to third parties. For complete details about our data
                            practices, please read our <Link href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</Link>.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">What cookies do you use?</h3>
                        <p className="text-gray-700">
                            We use cookies for essential website functionality, analytics, and advertising. This includes
                            cookies from Google Analytics and Google AdSense. Cookies help us understand how visitors use our
                            site and serve relevant advertisements. You can manage your cookie preferences through your browser
                            settings. Learn more in our <Link href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</Link>.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">How can I request deletion of my personal data?</h3>
                        <p className="text-gray-700">
                            If you would like to request deletion of your personal data, please contact us at bytecode@gmail.com
                            with your request. We will process your request in accordance with applicable data protection laws,
                            including GDPR and CCPA. Please note that we may need to retain certain information for legal or
                            administrative purposes.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-6 border-b-2 border-gray-200 pb-2">Careers and Opportunities</h2>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">Are you hiring?</h3>
                        <p className="text-gray-700">
                            We're always looking for talented journalists, editors, and digital media professionals to join our
                            team. Please visit our <Link href="/careers" className="text-blue-500 hover:underline">Careers page</Link> to
                            see current openings and learn more about working at Gossip Gazette. Even if there are no current
                            openings that match your skills, we welcome you to send your resume and portfolio for future consideration.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">Do you accept freelance contributions?</h3>
                        <p className="text-gray-700">
                            Yes, we work with freelance writers and contributors on a case-by-case basis. If you're interested
                            in contributing to Gossip Gazette, please send a pitch or portfolio to editorial@bytecode.com. Include
                            samples of your previous work, your areas of expertise, and story ideas you'd like to pursue. We
                            review all submissions but can only respond to those we're interested in pursuing.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-2">Do you offer internships?</h3>
                        <p className="text-gray-700">
                            We periodically offer internship opportunities for students and recent graduates interested in
                            journalism and digital media. Internship openings are posted on our{' '}
                            <Link href="/careers" className="text-blue-500 hover:underline">Careers page</Link>. You can also
                            send your resume and a cover letter explaining your interest to bytecode@gmail.com for future
                            consideration.
                        </p>
                    </div>
                </section>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mt-12">
                <h3 className="font-bold text-lg mb-3">Still Have Questions?</h3>
                <p className="text-sm mb-3">
                    If you didn't find the answer you were looking for, we're here to help!
                </p>
                <Link
                    href="/contact"
                    className="inline-block bg-blue-600 text-white font-bold px-6 py-3 rounded hover:bg-blue-700 transition-colors"
                >
                    Contact Us
                </Link>
            </div>
        </div>
    );
};