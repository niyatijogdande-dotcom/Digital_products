"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, ChevronRight, MessageCircle, Clock, HeadphonesIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">Contact Us</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have questions? We're here to help! Reach out to our support team and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Email Card */}
            <Card className="p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm mb-3">Send us an email anytime!</p>
              <a 
                href="mailto:nis4rg15@gmail.com" 
                className="text-orange-600 hover:text-orange-700 font-medium break-all"
              >
                nis4rg15@gmail.com
              </a>
            </Card>

            {/* Phone Card */}
            <Card className="p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm mb-3">Mon-Sat: 10AM - 6PM IST</p>
              <a 
                href="tel:+919411932684" 
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                +91 9411932684
              </a>
            </Card>

            {/* Location Card */}
            <Card className="p-6 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-gray-600 text-sm mb-3">Operating from</p>
              <p className="text-gray-900 font-medium">India</p>
            </Card>

            {/* Response Time */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Quick Response</h3>
                  <p className="text-sm text-green-700">
                    We typically respond within 24 hours on business days.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 md:p-10">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">Send Us a Message</h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium mb-2">
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium mb-2">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12"
                  />
                </div>

                {/* Subject */}
                <div>
                  <Label htmlFor="subject" className="text-gray-700 font-medium mb-2">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="h-12"
                  />
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-gray-700 font-medium mb-2">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  By submitting this form, you agree to our{' '}
                  <Link href="/privacy" className="text-orange-600 hover:text-orange-700">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <Card className="mt-12 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Our Location</h2>
            <p className="text-white/90">Serving customers across India</p>
          </div>
          <div className="relative h-96 bg-gray-200 flex items-center justify-center">
            {/* Map Placeholder */}
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Map location placeholder</p>
              <p className="text-gray-500 text-sm mt-2">Operating throughout India</p>
            </div>
          </div>
        </Card>

        {/* FAQ Section */}
        <div className="mt-12">
          <Card className="p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
              <p className="text-gray-600">Quick answers to common questions</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                    <span className="text-orange-600">Q:</span>
                    How quickly will I receive my digital product?
                  </h3>
                  <p className="text-gray-600 text-sm pl-6">
                    Instantly! After successful payment, you'll receive immediate download access through your dashboard and email.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                    <span className="text-orange-600">Q:</span>
                    What payment methods do you accept?
                  </h3>
                  <p className="text-gray-600 text-sm pl-6">
                    We accept credit/debit cards, UPI, net banking, and various digital wallets through secure payment gateways.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                    <span className="text-orange-600">Q:</span>
                    Can I use products for commercial projects?
                  </h3>
                  <p className="text-gray-600 text-sm pl-6">
                    Yes! All products come with a commercial license for use in client projects, social media, YouTube, and more.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                    <span className="text-orange-600">Q:</span>
                    Do you offer refunds on digital products?
                  </h3>
                  <p className="text-gray-600 text-sm pl-6">
                    Generally no, due to the digital nature. See our{' '}
                    <Link href="/refund" className="text-orange-600 hover:text-orange-700">
                      Refund Policy
                    </Link>{' '}
                    for exceptions.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                    <span className="text-orange-600">Q:</span>
                    What if I have technical issues downloading?
                  </h3>
                  <p className="text-gray-600 text-sm pl-6">
                    Contact our support team immediately at nis4rg15@gmail.com or +91 9411932684. We'll help resolve any download issues.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                    <span className="text-orange-600">Q:</span>
                    Do you provide customer support?
                  </h3>
                  <p className="text-gray-600 text-sm pl-6">
                    Absolutely! We offer email and phone support Monday-Saturday, 10AM-6PM IST, with responses typically within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center">
              <HeadphonesIcon className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Still have questions?</h3>
              <p className="text-gray-600 mb-4">We're here to help! Don't hesitate to reach out.</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button 
                  onClick={() => window.location.href = 'mailto:nis4rg15@gmail.com'}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Us
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = 'tel:+919411932684'}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Support Information */}
        <Card className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help with an Order?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              For order-specific inquiries, please include your order number in your message. 
              This helps us assist you faster and more efficiently.
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <Link href="/terms" className="text-orange-600 hover:text-orange-700 font-medium">
                Terms & Conditions →
              </Link>
              <Link href="/privacy" className="text-orange-600 hover:text-orange-700 font-medium">
                Privacy Policy →
              </Link>
              <Link href="/refund" className="text-orange-600 hover:text-orange-700 font-medium">
                Refund Policy →
              </Link>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
