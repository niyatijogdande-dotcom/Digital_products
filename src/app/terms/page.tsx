import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { FileText, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions - GoDigiStore',
  description: 'Terms and conditions for purchasing and using digital products from GoDigiStore India.',
  keywords: 'terms and conditions, digital products terms, GoDigiStore terms, legal',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">Terms & Conditions</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-gray-600">Last Updated: January 2025</p>
        </div>

        <Card className="p-8 md:p-12 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to GoDigiStore. These Terms and Conditions govern your use of our website and the purchase of digital products. By accessing our website or making a purchase, you agree to be bound by these terms. If you disagree with any part of these terms, please do not use our website or services.
            </p>
          </section>

          {/* Digital Product Delivery */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">2. Digital Product Delivery</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">2.1 Instant Access:</strong> Upon successful payment, you will receive instant access to download your purchased digital products through your user dashboard or via email.
              </p>
              <p>
                <strong className="text-gray-900">2.2 Download Links:</strong> Download links are valid for a limited time period. Please download your products immediately after purchase. If you experience any issues, contact our support team at nis4rg15@gmail.com.
              </p>
              <p>
                <strong className="text-gray-900">2.3 File Formats:</strong> Digital products are delivered in various formats including ZIP, PDF, PSD, AI, and other industry-standard formats as specified in the product description.
              </p>
            </div>
          </section>

          {/* License Rules */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">3. License Rules</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">3.1 Commercial License:</strong> All products purchased from GoDigiStore come with a commercial license, allowing you to use them in both personal and commercial projects.
              </p>
              <p>
                <strong className="text-gray-900">3.2 Permitted Uses:</strong> You may use the products to create content for clients, social media posts, YouTube videos, websites, marketing materials, and other commercial purposes.
              </p>
              <p>
                <strong className="text-gray-900">3.3 Prohibited Uses:</strong> You may NOT resell, redistribute, share, or sublicense the original digital products in their unmodified form. You cannot claim ownership of the templates or share them on file-sharing platforms.
              </p>
              <p>
                <strong className="text-gray-900">3.4 Attribution:</strong> Attribution to GoDigiStore is appreciated but not required for your final created works.
              </p>
            </div>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">4. User Responsibilities</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">4.1 Account Security:</strong> You are responsible for maintaining the confidentiality of your account information and password.
              </p>
              <p>
                <strong className="text-gray-900">4.2 Accurate Information:</strong> You agree to provide accurate, current, and complete information during the purchase process.
              </p>
              <p>
                <strong className="text-gray-900">4.3 Prohibited Activities:</strong> You agree not to use our website for any unlawful purpose or in any way that could damage, disable, or impair our services.
              </p>
              <p>
                <strong className="text-gray-900">4.4 Backup Responsibility:</strong> It is your responsibility to backup and store downloaded products. GoDigiStore is not liable for lost files after download.
              </p>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Prohibited Activities</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>You are strictly prohibited from:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reselling or redistributing digital products in their original form</li>
                <li>Sharing download links or product files with others</li>
                <li>Uploading products to torrent sites or file-sharing platforms</li>
                <li>Using automated systems to download or scrape our content</li>
                <li>Attempting to reverse-engineer, decompile, or extract source code</li>
                <li>Using products in any way that violates copyright or trademark laws</li>
                <li>Creating derivative works that compete directly with our products</li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Intellectual Property</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">6.1 Ownership:</strong> All digital products, designs, templates, graphics, and content on GoDigiStore are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                <strong className="text-gray-900">6.2 License Grant:</strong> Upon purchase, you are granted a non-exclusive, non-transferable license to use the products according to these terms.
              </p>
              <p>
                <strong className="text-gray-900">6.3 Trademarks:</strong> GoDigiStore name, logo, and related marks are trademarks of our company. You may not use these marks without prior written permission.
              </p>
            </div>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">7. Payment Terms</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">7.1 Pricing:</strong> All prices are listed in Indian Rupees (INR) and are subject to change without notice. The price at the time of purchase is the price you will pay.
              </p>
              <p>
                <strong className="text-gray-900">7.2 Payment Methods:</strong> We accept various payment methods including credit/debit cards, UPI, net banking, and other digital payment options through secure payment gateways.
              </p>
              <p>
                <strong className="text-gray-900">7.3 Transaction Fees:</strong> Payment gateway charges and transaction fees may apply as per your payment method.
              </p>
              <p>
                <strong className="text-gray-900">7.4 Payment Confirmation:</strong> Products are delivered only after successful payment confirmation.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">8. Limitation of Liability</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">8.1 AS-IS Basis:</strong> Digital products are provided on an "as-is" basis. GoDigiStore makes no warranties, expressed or implied, regarding product quality, fitness for a particular purpose, or merchantability.
              </p>
              <p>
                <strong className="text-gray-900">8.2 Damages:</strong> GoDigiStore shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our products or services.
              </p>
              <p>
                <strong className="text-gray-900">8.3 Maximum Liability:</strong> Our total liability shall not exceed the amount you paid for the specific product in question.
              </p>
              <p>
                <strong className="text-gray-900">8.4 Third-Party Content:</strong> We are not responsible for any third-party content, links, or services referenced in our products.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">9. Governing Law (India)</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">9.1 Jurisdiction:</strong> These Terms and Conditions are governed by and construed in accordance with the laws of India.
              </p>
              <p>
                <strong className="text-gray-900">9.2 Dispute Resolution:</strong> Any disputes arising from these terms or your use of GoDigiStore services shall be subject to the exclusive jurisdiction of courts in India.
              </p>
              <p>
                <strong className="text-gray-900">9.3 Compliance:</strong> You agree to comply with all applicable Indian laws and regulations, including but not limited to the Information Technology Act, 2000, and Consumer Protection Act, 2019.
              </p>
            </div>
          </section>

          {/* Refund Policy Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">10. Refund Policy Overview</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">10.1 General Policy:</strong> Due to the nature of digital products, all sales are generally final and non-refundable once the product has been downloaded or accessed.
              </p>
              <p>
                <strong className="text-gray-900">10.2 Exceptions:</strong> Refunds may be considered in exceptional circumstances such as accidental duplicate purchases, technical issues preventing download, or significantly defective products.
              </p>
              <p>
                <strong className="text-gray-900">10.3 Refund Process:</strong> Refund requests must be submitted within 7 days of purchase to nis4rg15@gmail.com with proof of purchase and reason for refund.
              </p>
              <p>
                <strong className="text-gray-900">10.4 Full Details:</strong> For complete refund terms, please review our <Link href="/refund" className="text-orange-600 hover:text-orange-700 font-medium">Refund Policy</Link>.
              </p>
            </div>
          </section>

          {/* Contact Details */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">11. Contact Information</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>If you have any questions about these Terms and Conditions, please contact us:</p>
              <div className="bg-gray-50 rounded-lg p-6 mt-4">
                <p className="font-semibold text-gray-900 mb-2">GoDigiStore Support</p>
                <p><strong>Email:</strong> nis4rg15@gmail.com</p>
                <p><strong>Phone:</strong> +91 9411932684</p>
                <p><strong>Location:</strong> India</p>
                <p className="mt-3">
                  <Link href="/contact" className="text-orange-600 hover:text-orange-700 font-medium">
                    Visit our Contact Page →
                  </Link>
                </p>
              </div>
            </div>
          </section>

          {/* Updates to Terms */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">12. Updates to Terms</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">12.1 Modifications:</strong> GoDigiStore reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to this page.
              </p>
              <p>
                <strong className="text-gray-900">12.2 Notification:</strong> Material changes will be communicated via email or through a prominent notice on our website.
              </p>
              <p>
                <strong className="text-gray-900">12.3 Continued Use:</strong> Your continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </div>
          </section>

          {/* Acceptance */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By using GoDigiStore, making a purchase, or downloading any product, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with these terms, please discontinue use of our website and services immediately.
            </p>
          </section>
        </Card>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link href="/privacy" className="text-orange-600 hover:text-orange-700 font-medium">
            Privacy Policy →
          </Link>
          <Link href="/refund" className="text-orange-600 hover:text-orange-700 font-medium">
            Refund Policy →
          </Link>
          <Link href="/contact" className="text-orange-600 hover:text-orange-700 font-medium">
            Contact Us →
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
