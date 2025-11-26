import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { RotateCcw, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund Policy - GoDigiStore',
  description: 'Refund policy for digital products at GoDigiStore India. Learn about our refund terms, conditions, and processing times.',
  keywords: 'refund policy, digital products refund, GoDigiStore returns, refund process India',
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">Refund Policy</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
              <RotateCcw className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
          <p className="text-gray-600">Last Updated: January 2025</p>
        </div>

        <Card className="p-8 md:p-12 space-y-8">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              At GoDigiStore, we strive to provide high-quality digital products and exceptional customer service. Due to the instant nature of digital product delivery and the fact that digital items cannot be "returned" once downloaded or accessed, we maintain a strict refund policy. Please read this policy carefully before making a purchase.
            </p>
          </section>

          {/* General Policy */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">1. General Refund Policy</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">1.1 Digital Products Are Non-Refundable:</strong> All sales of digital products on GoDigiStore are final and non-refundable once the product has been:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Downloaded to your device</li>
                <li>Accessed through your account dashboard</li>
                <li>Previewed beyond sample/demo versions</li>
                <li>Used in any project or for any purpose</li>
              </ul>
              <p>
                <strong className="text-gray-900">1.2 No Returns:</strong> Unlike physical products, digital products cannot be "returned" in a traditional sense. Once you have access to the files, they cannot be taken back.
              </p>
              <p>
                <strong className="text-gray-900">1.3 Pre-Purchase Review:</strong> We encourage you to carefully review product descriptions, preview images, and sample files (if available) before making a purchase decision.
              </p>
            </div>
          </section>

          {/* When Refund Is Allowed */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">2. Exceptions: When Refunds Are Allowed</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>While our general policy is no refunds, we may consider refund requests in the following exceptional circumstances:</p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-4">
                <h3 className="text-lg font-semibold text-green-900 mb-3">✓ Refund May Be Granted In These Cases:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>Accidental Duplicate Payment:</strong> You accidentally purchased the same product twice within 24 hours
                  </li>
                  <li>
                    <strong>Technical Issues:</strong> Persistent technical problems prevent you from downloading or accessing the purchased product despite multiple attempts and support assistance
                  </li>
                  <li>
                    <strong>Product Defects:</strong> The product files are corrupted, incomplete, or significantly different from the description (must be reported within 48 hours of purchase)
                  </li>
                  <li>
                    <strong>Billing Errors:</strong> You were charged an incorrect amount due to a system error
                  </li>
                  <li>
                    <strong>Unauthorized Purchase:</strong> Your payment method was used without your authorization (requires verification and may involve law enforcement)
                  </li>
                </ul>
              </div>

              <p>
                <strong className="text-gray-900">2.1 Proof Required:</strong> To process any refund request, you must provide:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Order receipt or transaction ID</li>
                <li>Detailed explanation of the issue</li>
                <li>Screenshots or evidence of the problem (if applicable)</li>
                <li>Proof that the product was not downloaded or used</li>
              </ul>

              <p>
                <strong className="text-gray-900">2.2 Time Limit:</strong> Refund requests must be submitted within <strong>7 days</strong> of the original purchase date. Requests submitted after this period will not be considered.
              </p>
            </div>
          </section>

          {/* When Refund Is NOT Allowed */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">3. When Refunds Are NOT Allowed</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-3">✗ Refunds Will NOT Be Granted In These Cases:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Product Already Downloaded:</strong> Once you've downloaded the product files, the sale is final
                </li>
                <li>
                  <strong>Change of Mind:</strong> You decided you no longer want or need the product
                </li>
                <li>
                  <strong>Compatibility Issues:</strong> The product doesn't work with your specific software version or device (compatibility requirements are listed in product descriptions)
                </li>
                <li>
                  <strong>Lack of Skills:</strong> You don't know how to use or customize the product
                </li>
                <li>
                  <strong>Better Price Elsewhere:</strong> You found the product cheaper on another website
                </li>
                <li>
                  <strong>Didn't Read Description:</strong> The product doesn't meet your expectations because you didn't read the full description or specifications
                </li>
                <li>
                  <strong>Personal Financial Issues:</strong> You can't afford the purchase or made a budgeting mistake
                </li>
                <li>
                  <strong>Incomplete Project Use:</strong> You partially used the product in a project but decided not to complete it
                </li>
                <li>
                  <strong>Request After 7 Days:</strong> Refund requests made more than 7 days after purchase
                </li>
                <li>
                  <strong>Bundle Purchases:</strong> Partial refunds on bundle deals or mega packs (bundles are sold as complete packages)
                </li>
                <li>
                  <strong>Promotional/Sale Items:</strong> Products purchased during special promotions or flash sales
                </li>
                <li>
                  <strong>Used Products:</strong> Products that have been used in any completed project or commercial work
                </li>
              </ul>
            </div>
          </section>

          {/* Refund Process */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">4. Refund Request Process</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>If you believe you qualify for a refund under our exceptional circumstances, follow these steps:</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Step-by-Step Refund Request:</h3>
                <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                  <li>
                    <strong>Contact Support Immediately:</strong>
                    <br />Email: <a href="mailto:nis4rg15@gmail.com" className="text-orange-600 hover:text-orange-700 font-medium">nis4rg15@gmail.com</a>
                    <br />Phone: <a href="tel:+919411932684" className="text-orange-600 hover:text-orange-700 font-medium">+91 9411932684</a>
                  </li>
                  <li>
                    <strong>Provide Required Information:</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Your full name and email address used for purchase</li>
                      <li>Order number or transaction ID</li>
                      <li>Product name and purchase date</li>
                      <li>Detailed reason for refund request</li>
                      <li>Supporting evidence (screenshots, error messages, etc.)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Subject Line:</strong> Use "Refund Request - [Order Number]" in your email subject
                  </li>
                  <li>
                    <strong>Wait for Review:</strong> Our team will review your request within 2-3 business days
                  </li>
                  <li>
                    <strong>Provide Additional Info:</strong> We may request additional information or proof during the review process
                  </li>
                  <li>
                    <strong>Receive Decision:</strong> You'll receive an email with our decision (approval or denial)
                  </li>
                  <li>
                    <strong>Refund Processing:</strong> If approved, refund will be processed within 3-5 business days
                  </li>
                </ol>
              </div>

              <p>
                <strong className="text-gray-900">4.1 Communication:</strong> All refund-related communication must be conducted via email or phone. We do not process refunds through social media or live chat.
              </p>
              <p>
                <strong className="text-gray-900">4.2 Final Decision:</strong> GoDigiStore's decision on refund requests is final and not subject to appeal. We reserve the right to deny refunds that don't meet our policy criteria.
              </p>
            </div>
          </section>

          {/* Processing Time */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Refund Processing Time</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">5.1 Processing Duration:</strong> Approved refunds are processed within <strong>3-5 business days</strong> from the date of approval.
              </p>
              <p>
                <strong className="text-gray-900">5.2 Payment Method:</strong> Refunds are issued to the original payment method used for purchase:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Credit/Debit Cards:</strong> 5-10 business days for amount to reflect in your account</li>
                <li><strong>UPI/Net Banking:</strong> 3-7 business days</li>
                <li><strong>Digital Wallets:</strong> 2-5 business days</li>
                <li><strong>Bank Transfers:</strong> 7-14 business days depending on bank</li>
              </ul>
              <p>
                <strong className="text-gray-900">5.3 Bank Processing:</strong> Additional processing time may be required by your bank or payment provider. GoDigiStore is not responsible for delays caused by financial institutions.
              </p>
              <p>
                <strong className="text-gray-900">5.4 Notification:</strong> You will receive an email notification once the refund has been initiated. This email will include the refund amount, transaction ID, and estimated arrival time.
              </p>
              <p>
                <strong className="text-gray-900">5.5 Holidays & Weekends:</strong> Business days exclude Saturdays, Sundays, and public holidays in India.
              </p>
            </div>
          </section>

          {/* Alternative Solutions */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Alternative Solutions</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>Before requesting a refund, we encourage you to explore these alternative solutions:</p>
              
              <p>
                <strong className="text-gray-900">6.1 Product Exchange:</strong> In some cases, we may offer to exchange the product for another item of equal or lesser value instead of issuing a refund.
              </p>
              <p>
                <strong className="text-gray-900">6.2 Store Credit:</strong> We may offer store credit for future purchases as an alternative to a cash refund.
              </p>
              <p>
                <strong className="text-gray-900">6.3 Technical Support:</strong> If you're experiencing technical issues, our support team can help troubleshoot and resolve problems before considering a refund.
              </p>
              <p>
                <strong className="text-gray-900">6.4 Tutorials & Guidance:</strong> If you're struggling to use a product, we can provide links to tutorials, guides, or documentation to help you get started.
              </p>
              <p>
                <strong className="text-gray-900">6.5 Partial Refund:</strong> In rare cases involving defective products, we may offer a partial refund if the issue affects only part of a bundle or package.
              </p>
            </div>
          </section>

          {/* Chargeback Warning */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">7. Chargeback Policy</h2>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">⚠️ Important: Chargeback Consequences</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>7.1 Contact Us First:</strong> Before initiating a chargeback with your bank or credit card company, please contact us directly. Most issues can be resolved quickly through direct communication.
                </p>
                <p>
                  <strong>7.2 Dispute Process:</strong> If you initiate a chargeback without contacting us first, we will dispute the chargeback with evidence of product delivery and terms acceptance.
                </p>
                <p>
                  <strong>7.3 Account Termination:</strong> Initiating an unauthorized chargeback may result in immediate termination of your account and denial of access to all purchased products.
                </p>
                <p>
                  <strong>7.4 Legal Action:</strong> Fraudulent chargebacks may result in legal action and reporting to relevant authorities.
                </p>
                <p>
                  <strong>7.5 Chargeback Fees:</strong> If a chargeback is disputed and found to be invalid, you may be responsible for chargeback fees and administrative costs.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Details */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">8. Contact Information for Refund Requests</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>For all refund-related inquiries, please contact:</p>
              <div className="bg-gray-50 rounded-lg p-6 mt-4">
                <p className="font-semibold text-gray-900 mb-2">GoDigiStore Refunds Department</p>
                <p><strong>Email:</strong> <a href="mailto:nis4rg15@gmail.com" className="text-orange-600 hover:text-orange-700">nis4rg15@gmail.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+919411932684" className="text-orange-600 hover:text-orange-700">+91 9411932684</a></p>
                <p><strong>Location:</strong> India</p>
                <p><strong>Response Time:</strong> Within 24-48 hours (business days)</p>
                <p className="mt-3">
                  <Link href="/contact" className="text-orange-600 hover:text-orange-700 font-medium">
                    Visit our Contact Page →
                  </Link>
                </p>
              </div>
            </div>
          </section>

          {/* Policy Updates */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">9. Policy Updates</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">9.1 Right to Modify:</strong> GoDigiStore reserves the right to modify this Refund Policy at any time without prior notice.
              </p>
              <p>
                <strong className="text-gray-900">9.2 Effective Changes:</strong> Changes will be effective immediately upon posting to this page. The "Last Updated" date at the top reflects the most recent modification.
              </p>
              <p>
                <strong className="text-gray-900">9.3 Continued Use:</strong> Your continued use of our services after changes constitutes acceptance of the updated Refund Policy.
              </p>
              <p>
                <strong className="text-gray-900">9.4 Purchase Agreement:</strong> The refund policy in effect at the time of your purchase applies to that transaction.
              </p>
            </div>
          </section>

          {/* Final Notes */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Important Final Notes</h2>
            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">By completing a purchase on GoDigiStore, you acknowledge that:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You have read and understood this Refund Policy</li>
                <li>You agree to the terms and conditions outlined above</li>
                <li>You understand that digital products are non-refundable after download</li>
                <li>You accept responsibility for reviewing product descriptions before purchase</li>
                <li>You agree to contact us directly for any issues before initiating chargebacks</li>
              </ul>
              <p className="mt-4 font-medium text-gray-900">
                We're committed to your satisfaction and will do our best to address any legitimate concerns. Please don't hesitate to reach out to our support team if you need assistance.
              </p>
            </div>
          </section>
        </Card>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link href="/terms" className="text-orange-600 hover:text-orange-700 font-medium">
            Terms & Conditions →
          </Link>
          <Link href="/privacy" className="text-orange-600 hover:text-orange-700 font-medium">
            Privacy Policy →
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
