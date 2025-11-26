import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Shield, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - GoDigiStore',
  description: 'Privacy policy and data protection information for GoDigiStore India. Learn how we collect, use, and protect your personal information.',
  keywords: 'privacy policy, data protection, GoDigiStore privacy, Indian data laws, GDPR',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">Privacy Policy</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last Updated: January 2025</p>
        </div>

        <Card className="p-8 md:p-12 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              At GoDigiStore, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website or make a purchase. Please read this privacy policy carefully. By using our website, you consent to the data practices described in this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-900">2.1 Personal Information</h3>
            <div className="space-y-3 text-gray-600 leading-relaxed mb-6">
              <p>We may collect the following personal information when you use our website or make a purchase:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Name:</strong> Full name for account creation and order processing</li>
                <li><strong>Email Address:</strong> Primary email for account access, order confirmations, and communication</li>
                <li><strong>Phone Number:</strong> Contact number for order support and customer service</li>
                <li><strong>Payment Information:</strong> Credit/debit card details, UPI IDs, or other payment method information (processed securely through payment gateways)</li>
                <li><strong>Billing Address:</strong> Address information for billing and tax purposes</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-900">2.2 Device Information</h3>
            <div className="space-y-3 text-gray-600 leading-relaxed mb-6">
              <p>We automatically collect certain information about your device when you access our website:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>IP Address:</strong> Your device's Internet Protocol address</li>
                <li><strong>Browser Type:</strong> Information about your web browser (Chrome, Firefox, Safari, etc.)</li>
                <li><strong>Device Type:</strong> Whether you're using a desktop, mobile, or tablet</li>
                <li><strong>Operating System:</strong> Your device's OS (Windows, Mac, Android, iOS)</li>
                <li><strong>Screen Resolution:</strong> Display settings for optimal website rendering</li>
                <li><strong>Referring URLs:</strong> Pages you visited before arriving at our site</li>
                <li><strong>Geographic Location:</strong> Approximate location based on IP address</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-900">2.3 Usage Data</h3>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>We collect information about how you interact with our website:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pages visited and time spent on each page</li>
                <li>Products viewed and added to cart</li>
                <li>Search queries and filters used</li>
                <li>Download history and access patterns</li>
                <li>Click behavior and navigation paths</li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">3. Cookies and Tracking Technologies</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">3.1 What Are Cookies:</strong> Cookies are small text files stored on your device that help us recognize you and remember your preferences.
              </p>
              <p>
                <strong className="text-gray-900">3.2 Types of Cookies We Use:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Essential Cookies:</strong> Required for basic website functionality (login, cart management, checkout)</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                <li><strong>Marketing Cookies:</strong> Track your visits across websites to deliver relevant advertisements</li>
              </ul>
              <p>
                <strong className="text-gray-900">3.3 Cookie Control:</strong> You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our website.
              </p>
              <p>
                <strong className="text-gray-900">3.4 Third-Party Cookies:</strong> We may use third-party services (like Google Analytics) that set their own cookies to help us improve our services.
              </p>
            </div>
          </section>

          {/* Analytics */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">4. Analytics and Performance Monitoring</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">4.1 Google Analytics:</strong> We use Google Analytics to analyze website traffic and user behavior. This helps us understand which products are popular, how users navigate our site, and where improvements can be made.
              </p>
              <p>
                <strong className="text-gray-900">4.2 Performance Tracking:</strong> We monitor website performance metrics such as page load times, error rates, and server response times to ensure optimal user experience.
              </p>
              <p>
                <strong className="text-gray-900">4.3 Conversion Tracking:</strong> We track conversion events (product views, add to cart, purchases) to measure the effectiveness of our marketing campaigns and improve our offerings.
              </p>
              <p>
                <strong className="text-gray-900">4.4 Opt-Out:</strong> You can opt-out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.
              </p>
            </div>
          </section>

          {/* How We Use Your Data */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">5. How We Use Your Data</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Order Processing:</strong> To process your purchases, deliver digital products, and provide download access</li>
                <li><strong>Account Management:</strong> To create and maintain your user account</li>
                <li><strong>Customer Support:</strong> To respond to your inquiries, provide technical support, and resolve issues</li>
                <li><strong>Communication:</strong> To send order confirmations, receipts, updates, and promotional offers (with your consent)</li>
                <li><strong>Website Improvement:</strong> To analyze usage patterns and improve our website functionality and user experience</li>
                <li><strong>Security:</strong> To protect against fraud, unauthorized transactions, and other malicious activities</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
                <li><strong>Marketing:</strong> To send you promotional content about new products, special offers, and updates (you can opt-out anytime)</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Third-Party Services</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">6.1 Payment Gateways:</strong> We use secure third-party payment processors (Razorpay, Stripe, PayPal, etc.) to handle transactions. Your payment information is transmitted directly to these processors and is not stored on our servers.
              </p>
              <p>
                <strong className="text-gray-900">6.2 Email Services:</strong> We use email service providers to send transactional and marketing emails. These providers have access to your email address and name.
              </p>
              <p>
                <strong className="text-gray-900">6.3 Analytics Providers:</strong> Services like Google Analytics receive anonymized usage data to help us understand website performance.
              </p>
              <p>
                <strong className="text-gray-900">6.4 Cloud Storage:</strong> Digital products may be hosted on third-party cloud storage services (Amazon S3, Google Cloud, etc.).
              </p>
              <p>
                <strong className="text-gray-900">6.5 Third-Party Privacy Policies:</strong> We recommend reviewing the privacy policies of these third-party services as we are not responsible for their practices.
              </p>
            </div>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">7. Data Protection and Security</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">7.1 Security Measures:</strong> We implement industry-standard security measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure password hashing and storage</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Firewall protection and intrusion detection systems</li>
              </ul>
              <p>
                <strong className="text-gray-900">7.2 Data Retention:</strong> We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law.
              </p>
              <p>
                <strong className="text-gray-900">7.3 Data Breach Notification:</strong> In the event of a data breach, we will notify affected users and relevant authorities as required by applicable laws.
              </p>
              <p>
                <strong className="text-gray-900">7.4 No Absolute Security:</strong> While we strive to protect your data, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>
          </section>

          {/* User Control */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">8. Your Rights and Control Over Data</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>You have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal requirements)</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails using the link in our emails</li>
                <li><strong>Cookie Control:</strong> Manage cookie preferences through your browser settings</li>
                <li><strong>Account Deletion:</strong> Request complete account deletion by contacting support</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at <a href="mailto:nis4rg15@gmail.com" className="text-orange-600 hover:text-orange-700 font-medium">nis4rg15@gmail.com</a>. We will respond to your request within 30 days.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">9. Children's Privacy</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">9.1 Age Restriction:</strong> Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18.
              </p>
              <p>
                <strong className="text-gray-900">9.2 Parental Consent:</strong> If we become aware that we have collected personal information from a child under 18 without parental consent, we will take steps to delete that information.
              </p>
              <p>
                <strong className="text-gray-900">9.3 Parent/Guardian Rights:</strong> If you believe your child has provided us with personal information, please contact us immediately at nis4rg15@gmail.com.
              </p>
            </div>
          </section>

          {/* Indian Compliance */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">10. Compliance with Indian Data Protection Laws</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">10.1 IT Act, 2000:</strong> We comply with the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
              </p>
              <p>
                <strong className="text-gray-900">10.2 Data Localization:</strong> Sensitive personal data is stored on servers located in India or in jurisdictions that provide adequate data protection.
              </p>
              <p>
                <strong className="text-gray-900">10.3 Consent:</strong> We obtain explicit consent before collecting, using, or disclosing your sensitive personal information.
              </p>
              <p>
                <strong className="text-gray-900">10.4 Digital Personal Data Protection Act:</strong> We are committed to complying with the Digital Personal Data Protection Act, 2023, and will update our practices accordingly as the law comes into effect.
              </p>
              <p>
                <strong className="text-gray-900">10.5 Grievance Officer:</strong> For any privacy-related grievances, you can contact our Grievance Officer at nis4rg15@gmail.com.
              </p>
            </div>
          </section>

          {/* International Users */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">11. International Data Transfers</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">11.1 Data Transfer:</strong> While our primary operations are in India, some data may be processed or stored in other countries where our service providers operate.
              </p>
              <p>
                <strong className="text-gray-900">11.2 Adequate Protection:</strong> We ensure that adequate safeguards are in place when transferring data internationally, including data processing agreements and compliance with applicable data protection laws.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">12. Contact Information</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
              <div className="bg-gray-50 rounded-lg p-6 mt-4">
                <p className="font-semibold text-gray-900 mb-2">GoDigiStore Privacy Team</p>
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

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">13. Changes to Privacy Policy</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">13.1 Policy Updates:</strong> We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
              </p>
              <p>
                <strong className="text-gray-900">13.2 Notification:</strong> We will notify you of material changes by email or through a prominent notice on our website.
              </p>
              <p>
                <strong className="text-gray-900">13.3 Effective Date:</strong> The updated policy will be effective as of the "Last Updated" date shown at the top of this page.
              </p>
              <p>
                <strong className="text-gray-900">13.4 Continued Use:</strong> Your continued use of our website after changes constitutes acceptance of the updated Privacy Policy.
              </p>
            </div>
          </section>

          {/* Consent */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Consent</h2>
            <p className="text-gray-600 leading-relaxed">
              By using our website and services, you consent to the collection, use, and sharing of your information as described in this Privacy Policy. If you do not agree with this policy, please do not use our website or services.
            </p>
          </section>
        </Card>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link href="/terms" className="text-orange-600 hover:text-orange-700 font-medium">
            Terms & Conditions →
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
