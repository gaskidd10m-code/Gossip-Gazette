'use client';
import React from 'react';

import Link from 'next/link';

export const EditorialGuidelines: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            

            <h1 className="text-4xl font-bold mb-6">Editorial Guidelines</h1>

            <p className="mb-6 text-gray-600">
                At Gossip Gazette, we are committed to the highest standards of journalism. These editorial guidelines
                outline our principles, processes, and practices that ensure we deliver accurate, fair, and trustworthy
                news to our readers.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Editorial Philosophy</h2>
            <p className="mb-4">
                Our editorial philosophy is built on three core principles: accuracy, independence, and transparency.
                We believe that quality journalism serves the public interest by providing reliable information that
                helps people make informed decisions about their lives and communities.
            </p>
            <p className="mb-4">
                We are committed to reporting the truth, even when it's uncomfortable or unpopular. We do not allow
                commercial interests, political pressures, or personal biases to influence our editorial decisions.
                Our loyalty is to our readers and to the facts.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Accuracy and Fact-Checking</h2>
            <p className="mb-4">
                Accuracy is the foundation of credible journalism. Before publishing any article, we follow a rigorous
                fact-checking process:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Multiple Source Verification:</strong> We require at least two independent sources to confirm
                    significant facts, especially for breaking news or controversial claims.</li>
                <li><strong>Primary Source Review:</strong> Whenever possible, we consult original documents, data, and
                    primary sources rather than relying solely on secondary reporting.</li>
                <li><strong>Expert Consultation:</strong> For technical or specialized topics, we consult subject matter
                    experts to ensure accuracy and context.</li>
                <li><strong>Quote Verification:</strong> All quotes are verified with the source or from reliable recordings
                    or transcripts. We never fabricate or alter quotes.</li>
                <li><strong>Data Validation:</strong> Statistics and data are cross-checked against authoritative sources
                    and properly attributed.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Source Verification and Attribution</h2>
            <p className="mb-4">
                We maintain strict standards for source verification and attribution:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Named Sources:</strong> We prefer on-the-record, named sources whenever possible. This allows
                    readers to evaluate the credibility of information for themselves.</li>
                <li><strong>Anonymous Sources:</strong> We use anonymous sources only when the information is newsworthy,
                    cannot be obtained any other way, and the source faces genuine risk. Anonymous sources must be approved
                    by senior editors.</li>
                <li><strong>Source Diversity:</strong> We seek diverse perspectives and voices in our reporting, including
                    those who may disagree with our conclusions.</li>
                <li><strong>Conflicts of Interest:</strong> We disclose any potential conflicts of interest that sources
                    may have, allowing readers to assess credibility.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Corrections and Updates Policy</h2>
            <p className="mb-4">
                When we make mistakes, we correct them promptly and transparently:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Immediate Corrections:</strong> Factual errors are corrected as soon as they are identified,
                    regardless of how minor they may seem.</li>
                <li><strong>Clear Labeling:</strong> All corrections are clearly labeled and dated, explaining what was
                    wrong and what has been corrected.</li>
                <li><strong>Significant Errors:</strong> For significant errors that materially affect the story's meaning,
                    we publish a separate correction notice and update the article with a prominent note.</li>
                <li><strong>Reader Feedback:</strong> We welcome and investigate reader reports of potential errors through
                    our <Link href="/contact" className="text-blue-500 hover:underline">contact page</Link>.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Editorial Independence</h2>
            <p className="mb-4">
                Our editorial decisions are made independently of commercial, political, or personal interests:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Advertising Separation:</strong> Our editorial content is completely separate from our
                    advertising operations. Advertisers have no influence over our coverage.</li>
                <li><strong>Sponsored Content:</strong> Any sponsored or paid content is clearly labeled as such and
                    meets the same editorial standards as our regular content.</li>
                <li><strong>Political Independence:</strong> We do not endorse political candidates or parties. Our
                    coverage aims to inform readers, not to advocate for particular political outcomes.</li>
                <li><strong>Financial Disclosure:</strong> We disclose any financial relationships that could create
                    conflicts of interest in our reporting.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Fairness and Balance</h2>
            <p className="mb-4">
                We strive for fairness and balance in all our reporting:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Multiple Perspectives:</strong> We seek out and present multiple perspectives on controversial
                    issues, giving readers the information they need to form their own opinions.</li>
                <li><strong>Right of Reply:</strong> When reporting on allegations or criticism of individuals or
                    organizations, we make reasonable efforts to contact them for comment before publication.</li>
                <li><strong>Context and Nuance:</strong> We provide sufficient context to help readers understand complex
                    issues, avoiding oversimplification or false equivalence.</li>
                <li><strong>Avoiding Bias:</strong> While complete objectivity is impossible, we work to identify and
                    minimize our biases and present information fairly.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Distinguishing News from Opinion</h2>
            <p className="mb-4">
                We clearly distinguish between news reporting, analysis, and opinion:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>News Articles:</strong> Our news articles present facts and multiple perspectives without
                    advocating for particular conclusions.</li>
                <li><strong>Analysis Pieces:</strong> Analysis articles provide expert interpretation of events and trends,
                    clearly labeled as analysis.</li>
                <li><strong>Opinion Content:</strong> Opinion pieces express the views of individual authors and are
                    clearly labeled as opinion or commentary.</li>
                <li><strong>Editorial Voice:</strong> We maintain a consistent, professional editorial voice across all
                    content types.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Diversity and Inclusion</h2>
            <p className="mb-4">
                We are committed to diversity and inclusion in our newsroom and our coverage:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Diverse Voices:</strong> We actively seek out diverse sources and perspectives, including
                    those from underrepresented communities.</li>
                <li><strong>Inclusive Language:</strong> We use inclusive, respectful language that avoids stereotypes
                    and treats all people with dignity.</li>
                <li><strong>Cultural Sensitivity:</strong> We approach stories about different cultures and communities
                    with sensitivity and respect, consulting with community members when appropriate.</li>
                <li><strong>Accessibility:</strong> We strive to make our content accessible to all readers, including
                    those with disabilities.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Plagiarism and Attribution</h2>
            <p className="mb-4">
                We have zero tolerance for plagiarism and maintain strict attribution standards:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Original Reporting:</strong> Our articles are based on original reporting and research. We
                    do not copy content from other sources without proper attribution.</li>
                <li><strong>Proper Attribution:</strong> When we reference or build upon the work of others, we provide
                    clear attribution and links to the original source.</li>
                <li><strong>Quotation Standards:</strong> Direct quotes are clearly marked and attributed. We do not
                    present others' words as our own.</li>
                <li><strong>Consequences:</strong> Plagiarism results in immediate disciplinary action, including potential
                    termination and public correction.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Photo and Video Ethics</h2>
            <p className="mb-4">
                Our visual content adheres to the same ethical standards as our written content:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Authenticity:</strong> We do not manipulate photos or videos in ways that mislead readers
                    about what actually happened.</li>
                <li><strong>Proper Attribution:</strong> All photos and videos are properly credited to their creators
                    or sources.</li>
                <li><strong>Licensing:</strong> We only use images and videos that we have the legal right to use, either
                    through original creation, licensing, or fair use.</li>
                <li><strong>Sensitive Content:</strong> We exercise judgment when publishing graphic or disturbing images,
                    balancing newsworthiness with respect for subjects and readers.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Social Media Guidelines</h2>
            <p className="mb-4">
                Our journalists follow professional standards on social media:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Professional Conduct:</strong> Our staff members maintain professional conduct on social media,
                    avoiding behavior that could compromise their credibility or our reputation.</li>
                <li><strong>Verification:</strong> Information found on social media is verified before being used in our
                    reporting, just like any other source.</li>
                <li><strong>Transparency:</strong> Staff members identify themselves as journalists when engaging with
                    sources or gathering information on social media.</li>
                <li><strong>Personal vs. Professional:</strong> While staff members may express personal views on social
                    media, they avoid taking public positions on issues they cover professionally.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Reader Engagement</h2>
            <p className="mb-4">
                We value our readers and encourage constructive engagement:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Feedback Welcome:</strong> We welcome reader feedback, questions, and story suggestions through
                    our <Link href="/contact" className="text-blue-500 hover:underline">contact page</Link>.</li>
                <li><strong>Transparency:</strong> We are transparent about our editorial processes and decision-making
                    when readers have questions.</li>
                <li><strong>Community Standards:</strong> We maintain community guidelines for reader comments and
                    interactions, fostering respectful dialogue.</li>
                <li><strong>Accountability:</strong> We hold ourselves accountable to our readers and the public we serve.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Continuous Improvement</h2>
            <p className="mb-4">
                These guidelines are living documents that evolve with the changing media landscape:
            </p>
            <ul className="list-disc ml-6 mb-4 space-y-2">
                <li><strong>Regular Review:</strong> We regularly review and update our editorial guidelines to address
                    new challenges and best practices.</li>
                <li><strong>Training:</strong> All editorial staff receive ongoing training in journalism ethics and best
                    practices.</li>
                <li><strong>Industry Standards:</strong> We stay informed about industry standards and best practices,
                    learning from other reputable news organizations.</li>
                <li><strong>Reader Input:</strong> We consider reader feedback when updating our guidelines and practices.</li>
            </ul>

            <div className="bg-gray-50 p-6 rounded-lg mt-8">
                <h3 className="font-bold text-lg mb-3">Questions or Concerns?</h3>
                <p className="text-sm mb-3">
                    If you have questions about our editorial guidelines or concerns about our coverage, please contact us:
                </p>
                <p className="text-sm mb-2">
                    <strong>Editorial Team:</strong> <a href="mailto:editorial@bytecode.com" className="text-blue-500 hover:underline">editorial@bytecode.com</a>
                </p>
                <p className="text-sm">
                    <strong>General Inquiries:</strong> <a href="mailto:bytecode@gmail.com" className="text-blue-500 hover:underline">bytecode@gmail.com</a>
                </p>
            </div>
        </div>
    );
};