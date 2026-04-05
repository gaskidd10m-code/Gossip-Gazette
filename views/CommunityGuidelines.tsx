'use client';
import React from 'react';

import Link from 'next/link';

export const CommunityGuidelines: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            

            <h1 className="text-4xl font-bold mb-6">Community Guidelines</h1>

            <p className="mb-8 text-gray-600 text-lg">
                Gossip Gazette is committed to fostering a respectful, inclusive, and constructive community. These
                guidelines outline our expectations for all users who interact with our platform.
            </p>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mt-8 mb-4">Our Community Values</h2>
                <p className="mb-4">
                    Our community is built on the following core values:
                </p>
                <div className="grid md:grid-cols-2 gap-6 my-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="font-bold text-lg mb-2 text-blue-900">Respect</h3>
                        <p className="text-sm text-gray-700">
                            We treat all community members with dignity and respect, regardless of their background,
                            beliefs, or opinions. We engage in civil discourse and avoid personal attacks.
                        </p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg">
                        <h3 className="font-bold text-lg mb-2 text-green-900">Integrity</h3>
                        <p className="text-sm text-gray-700">
                            We value honesty and authenticity. We don't spread misinformation, impersonate others,
                            or engage in deceptive practices.
                        </p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg">
                        <h3 className="font-bold text-lg mb-2 text-purple-900">Inclusivity</h3>
                        <p className="text-sm text-gray-700">
                            We welcome diverse perspectives and create an environment where everyone feels safe to
                            participate and share their views.
                        </p>
                    </div>
                    <div className="bg-orange-50 p-6 rounded-lg">
                        <h3 className="font-bold text-lg mb-2 text-orange-900">Constructiveness</h3>
                        <p className="text-sm text-gray-700">
                            We engage in thoughtful, constructive dialogue that adds value to the conversation and
                            helps build understanding.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mt-8 mb-4">Expected Behavior</h2>
                <p className="mb-4">
                    We expect all community members to:
                </p>
                <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-700">
                    <li><strong>Be Respectful:</strong> Treat others with courtesy and respect, even when you disagree
                        with their views. Focus on ideas and arguments, not personal characteristics.</li>
                    <li><strong>Be Honest:</strong> Share accurate information and clearly distinguish between facts
                        and opinions. Correct yourself if you make a mistake.</li>
                    <li><strong>Be Constructive:</strong> Contribute meaningfully to discussions. Ask questions, share
                        insights, and help build understanding.</li>
                    <li><strong>Be Inclusive:</strong> Welcome diverse perspectives and experiences. Avoid language or
                        behavior that excludes or marginalizes others.</li>
                    <li><strong>Stay On Topic:</strong> Keep comments relevant to the article or discussion at hand.
                        Avoid derailing conversations with off-topic content.</li>
                    <li><strong>Respect Privacy:</strong> Don't share others' personal information without their consent.
                        Protect your own privacy by being cautious about what you share.</li>
                    <li><strong>Follow the Law:</strong> Don't use our platform for illegal activities or to promote
                        illegal behavior.</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mt-8 mb-4">Prohibited Content and Conduct</h2>
                <p className="mb-4">
                    The following types of content and behavior are not allowed on Gossip Gazette:
                </p>

                <div className="space-y-6">
                    <div className="border-l-4 border-red-600 pl-6 py-4">
                        <h3 className="font-bold text-lg mb-2">Harassment and Abuse</h3>
                        <p className="text-gray-700 mb-2">
                            We do not tolerate harassment, bullying, threats, or intimidation of any kind. This includes:
                        </p>
                        <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                            <li>Personal attacks or insults</li>
                            <li>Threats of violence or harm</li>
                            <li>Stalking or unwanted contact</li>
                            <li>Doxxing (sharing personal information without consent)</li>
                            <li>Coordinated harassment campaigns</li>
                        </ul>
                    </div>

                    <div className="border-l-4 border-red-600 pl-6 py-4">
                        <h3 className="font-bold text-lg mb-2">Hate Speech and Discrimination</h3>
                        <p className="text-gray-700 mb-2">
                            We prohibit content that promotes hatred or discrimination based on:
                        </p>
                        <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                            <li>Race, ethnicity, or national origin</li>
                            <li>Religion or religious beliefs</li>
                            <li>Gender or gender identity</li>
                            <li>Sexual orientation</li>
                            <li>Disability or medical condition</li>
                            <li>Age or any other protected characteristic</li>
                        </ul>
                    </div>

                    <div className="border-l-4 border-red-600 pl-6 py-4">
                        <h3 className="font-bold text-lg mb-2">Misinformation and Manipulation</h3>
                        <p className="text-gray-700 mb-2">
                            We don't allow content that deliberately spreads false information or attempts to manipulate
                            public discourse:
                        </p>
                        <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                            <li>Deliberately false or misleading information</li>
                            <li>Impersonation of individuals, organizations, or brands</li>
                            <li>Coordinated inauthentic behavior or astroturfing</li>
                            <li>Manipulation of media (deepfakes, misleading edits)</li>
                        </ul>
                    </div>

                    <div className="border-l-4 border-red-600 pl-6 py-4">
                        <h3 className="font-bold text-lg mb-2">Spam and Commercial Abuse</h3>
                        <p className="text-gray-700 mb-2">
                            Don't use our platform for spam or unauthorized commercial activity:
                        </p>
                        <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                            <li>Repetitive or irrelevant content</li>
                            <li>Unsolicited advertising or promotion</li>
                            <li>Phishing or scam attempts</li>
                            <li>Malware or malicious links</li>
                        </ul>
                    </div>

                    <div className="border-l-4 border-red-600 pl-6 py-4">
                        <h3 className="font-bold text-lg mb-2">Illegal Content</h3>
                        <p className="text-gray-700 mb-2">
                            We prohibit content that is illegal or promotes illegal activity:
                        </p>
                        <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                            <li>Child exploitation or abuse</li>
                            <li>Terrorism or violent extremism</li>
                            <li>Human trafficking or exploitation</li>
                            <li>Sale of illegal goods or services</li>
                            <li>Copyright or trademark infringement</li>
                        </ul>
                    </div>

                    <div className="border-l-4 border-red-600 pl-6 py-4">
                        <h3 className="font-bold text-lg mb-2">Graphic or Disturbing Content</h3>
                        <p className="text-gray-700 mb-2">
                            We restrict content that is excessively graphic, violent, or disturbing:
                        </p>
                        <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                            <li>Graphic violence or gore</li>
                            <li>Adult or sexual content</li>
                            <li>Content that glorifies self-harm or suicide</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mt-8 mb-4">Moderation Policy</h2>
                <p className="mb-4">
                    We actively moderate our platform to maintain a safe and respectful community:
                </p>
                <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-700">
                    <li><strong>Proactive Monitoring:</strong> Our team reviews content and user reports to identify
                        violations of these guidelines.</li>
                    <li><strong>User Reports:</strong> Community members can report content that violates our guidelines.
                        We review all reports and take appropriate action.</li>
                    <li><strong>Automated Systems:</strong> We use automated tools to help identify potentially
                        problematic content, but all enforcement decisions are reviewed by human moderators.</li>
                    <li><strong>Context Matters:</strong> We consider context when evaluating potential violations.
                        Educational, documentary, or newsworthy content may be allowed even if it touches on sensitive topics.</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mt-8 mb-4">Reporting Violations</h2>
                <p className="mb-4">
                    If you encounter content or behavior that violates these guidelines, please report it:
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-3">How to Report</h3>
                    <ol className="list-decimal ml-6 space-y-2 text-gray-700">
                        <li>Use the report function if available on the content</li>
                        <li>Contact us through our <Link href="/contact" className="text-blue-600 hover:underline">contact page</Link></li>
                        <li>Email us at bytecode@gmail.com with details about the violation</li>
                    </ol>
                    <p className="mt-4 text-sm text-gray-700">
                        Please provide as much information as possible, including links to the content, screenshots if
                        relevant, and a description of the violation. We review all reports and typically respond within
                        24-48 hours.
                    </p>
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mt-8 mb-4">Consequences for Violations</h2>
                <p className="mb-4">
                    Violations of these guidelines may result in the following actions:
                </p>
                <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-700">
                    <li><strong>Content Removal:</strong> We may remove content that violates our guidelines.</li>
                    <li><strong>Warning:</strong> For first-time or minor violations, we may issue a warning.</li>
                    <li><strong>Temporary Suspension:</strong> Repeated or serious violations may result in temporary
                        suspension of your account or access.</li>
                    <li><strong>Permanent Ban:</strong> Severe or repeated violations may result in permanent removal
                        from our platform.</li>
                    <li><strong>Legal Action:</strong> In cases involving illegal activity, we may report the matter
                        to law enforcement authorities.</li>
                </ul>
                <p className="text-gray-700">
                    The specific action taken depends on the severity and frequency of violations, as well as the user's
                    history on our platform.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mt-8 mb-4">Appeals Process</h2>
                <p className="mb-4">
                    If you believe we've made a mistake in enforcing these guidelines, you can appeal:
                </p>
                <ol className="list-decimal ml-6 mb-4 space-y-2 text-gray-700">
                    <li>Contact us at bytecode@gmail.com with "Appeal" in the subject line</li>
                    <li>Provide details about the enforcement action you're appealing</li>
                    <li>Explain why you believe the action was incorrect</li>
                    <li>Our team will review your appeal and respond within 5-7 business days</li>
                </ol>
                <p className="text-gray-700">
                    We take appeals seriously and will carefully review all cases. However, our decision after the
                    appeal process is final.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to These Guidelines</h2>
                <p className="mb-4 text-gray-700">
                    We may update these Community Guidelines from time to time to address new challenges or clarify
                    our policies. When we make significant changes, we'll notify our community. Your continued use of
                    our platform after changes are posted constitutes acceptance of the updated guidelines.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mt-8 mb-4">Additional Resources</h2>
                <p className="mb-4">
                    For more information about our policies and practices:
                </p>
                <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-700">
                    <li><Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> - How we handle your personal information</li>
                    <li><Link href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</Link> - Legal terms governing use of our platform</li>
                    <li><Link href="/editorial-guidelines" className="text-blue-600 hover:underline">Editorial Guidelines</Link> - Our journalism standards and practices</li>
                    <li><Link href="/contact" className="text-blue-600 hover:underline">Contact Us</Link> - Get in touch with questions or concerns</li>
                </ul>
            </section>

            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg mt-10">
                <h2 className="text-2xl font-semibold mb-4">Building a Better Community Together</h2>
                <p className="mb-4 text-gray-700">
                    These guidelines exist to create a safe, respectful, and productive environment for everyone. By
                    following them, you help make Gossip Gazette a better place for meaningful dialogue and engagement.
                </p>
                <p className="text-gray-700">
                    Thank you for being part of our community and helping us maintain these standards.
                </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mt-8">
                <h3 className="font-bold text-lg mb-3">Questions or Concerns?</h3>
                <p className="text-sm mb-3">
                    If you have questions about these Community Guidelines or need to report a violation:
                </p>
                <p className="text-sm">
                    <strong>Email:</strong> <a href="mailto:bytecode@gmail.com" className="text-blue-600 hover:underline">bytecode@gmail.com</a>
                </p>
            </div>
        </div>
    );
};