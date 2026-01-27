import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // For now, just show an alert. In production, this would send to a backend.
        alert(`Thank you for your message, ${formData.name}! We'll get back to you soon.\n\n(This is a demo - no email was actually sent)`);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Helmet>
                <title>Contact Us - Gossip Gazette</title>
                <meta name="description" content="Get in touch with Gossip Gazette. We'd love to hear from you." />
                <link rel="canonical" href="https://gossipgazette.online/contact" />
            </Helmet>

            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-700"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-700"
                            />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject *</label>
                            <select
                                id="subject"
                                name="subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-700"
                            >
                                <option value="">Select a subject</option>
                                <option value="general">General Inquiry</option>
                                <option value="editorial">Editorial Feedback</option>
                                <option value="technical">Technical Issue</option>
                                <option value="advertising">Advertising</option>
                                <option value="tip">News Tip</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-1">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={6}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-700"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-red-700 text-white font-bold px-6 py-3 rounded hover:bg-red-800 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Contact Information */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-bold text-lg mb-2">📧 Email</h3>
                            <p className="text-sm mb-1">
                                <strong>General Inquiries:</strong>{' '}
                                <a href="mailto:gossipgazettegh@gmail.com" className="text-blue-500 hover:underline">
                                    gossipgazettegh@gmail.com
                                </a>
                            </p>
                            <p className="text-sm mb-1">
                                <strong>Editorial:</strong>{' '}
                                <a href="mailto:editorial@gossipgazettegh.com" className="text-blue-500 hover:underline">
                                    editorial@gossipgazettegh.com
                                </a>
                            </p>
                            <p className="text-sm">
                                <strong>Advertising:</strong>{' '}
                                <a href="mailto:ads@gossipgazettegh.com" className="text-blue-500 hover:underline">
                                    ads@gossipgazettegh.com
                                </a>
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-2">📍 Address</h3>
                            <p className="text-sm">
                                Gossip Gazette Media<br />
                                PO Box 12345<br />
                                Accra, Ghana
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-2">⏰ Response Time</h3>
                            <p className="text-sm">
                                We typically respond to inquiries within 24-48 hours during business days.
                                For urgent matters, please indicate "URGENT" in your subject line.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-2">🗣️ News Tips</h3>
                            <p className="text-sm">
                                Have a story tip? We'd love to hear from you. All tips are treated confidentially.
                                Use the contact form with "News Tip" as the subject, or email us directly.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-bold text-lg mb-2">Follow Us</h3>
                            <p className="text-sm mb-3">Stay updated with our latest news and announcements:</p>
                            <div className="flex gap-3">
                                <a href="https://x.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-700 text-white transition-colors flex items-center justify-center font-bold">
                                    X
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-700 text-white transition-colors flex items-center justify-center font-bold">
                                    in
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-700 text-white transition-colors flex items-center justify-center font-bold">
                                    f
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
