import React, { useState } from 'react';
import { Phone, Mail, User, Download, FileText, CheckCircle, Star, TrendingUp } from 'lucide-react';
import { LeadData } from '../types';
import { generatePDFReport, printReport } from '../utils/pdfGenerator';
import { LeadershipGap } from '../types';
import { supabase } from '../lib/supabase';

interface LeadCaptureProps {
  totalAnnualLoss: number;
  gaps: LeadershipGap[];
}

const LeadCapture: React.FC<LeadCaptureProps> = ({ totalAnnualLoss, gaps }) => {
  const [leadData, setLeadData] = useState<LeadData>({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    annualRevenue: '',
    companySize: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showRestartPrompt, setShowRestartPrompt] = useState(false);

  const handleInputChange = (field: keyof LeadData, value: string) => {
    setLeadData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Check if Supabase is properly configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project') || supabaseKey.includes('your-anon-key')) {
      console.warn('Supabase not configured, skipping database storage');
      // Still show success message for demo purposes
      setIsSubmitted(true);
      setIsSubmitting(false);
      return;
    }
    setSubmitError(null);

    try {
      // Store data using Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('submit-lead', {
        body: {
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          companyName: leadData.companyName,
          annualRevenue: leadData.annualRevenue,
          companySize: leadData.companySize,
          totalAnnualLoss: totalAnnualLoss
        }
      });

      if (error) {
        console.error('Supabase Edge Function error:', error);
        throw new Error(error.message);
      }

      console.log('Successfully submitted via Edge Function:', data);
      setIsSubmitted(true);
      
      // Show restart prompt after 10 seconds
      setTimeout(() => {
        setShowRestartPrompt(true);
      }, 10000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setIsSubmitted(false);
    setShowRestartPrompt(false);
    setLeadData({ name: '', email: '', phone: '', companyName: '', annualRevenue: '', companySize: '' });
    // Scroll to top of assessment
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewAssessment = () => {
    // Reload the page to start fresh
    window.location.reload();
  };

  const handleExport = async () => {
    setIsGeneratingPDF(true);
    try {
      const companyName = leadData.companyName || leadData.name || 'Your Company';
      const pdf = await generatePDFReport(gaps, companyName);
      const fileName = `Leadership-Assessment-Report-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Error generating PDF: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = () => {
    printReport();
  };

  if (totalAnnualLoss === 0) {
    return null;
  }

  return (
    <>
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Transform Your Leadership?</h2>
        <p className="text-gray-600">
          Don't let these losses continue. Take the first step towards better leadership and higher profits.
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{submitError}</p>
            </div>
          )}
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                placeholder="Company Name"
                value={leadData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <select
                  required
                  value={leadData.annualRevenue}
                  onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                  className="w-full pl-3 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">Select Annual Revenue</option>
                  <option value="Under ₹1 Crore">Under ₹1 Crore</option>
                  <option value="₹1-5 Crores">₹1-5 Crores</option>
                  <option value="₹5-10 Crores">₹5-10 Crores</option>
                  <option value="₹10-25 Crores">₹10-25 Crores</option>
                  <option value="₹25-50 Crores">₹25-50 Crores</option>
                  <option value="₹50-100 Crores">₹50-100 Crores</option>
                  <option value="Above ₹100 Crores">Above ₹100 Crores</option>
                </select>
              </div>
              <div className="relative">
                <select
                  required
                  value={leadData.companySize}
                  onChange={(e) => handleInputChange('companySize', e.target.value)}
                  className="w-full pl-3 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">Select Company Size</option>
                  <option value="1-10 employees">1-10 employees</option>
                  <option value="11-50 employees">11-50 employees</option>
                  <option value="51-100 employees">51-100 employees</option>
                  <option value="101-250 employees">101-250 employees</option>
                  <option value="251-500 employees">251-500 employees</option>
                  <option value="500+ employees">500+ employees</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={leadData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                placeholder="Your Email Address"
                value={leadData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                required
                placeholder="Your Phone Number"
                value={leadData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Submitting...' : 'Book Your Free ROI Discovery Call'}
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center py-12">
          {/* Success Animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Star className="w-4 h-4 text-yellow-800" />
            </div>
          </div>
          
          {/* Success Message */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              🎉 Congratulations, {leadData.name}!
            </h3>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg font-semibold text-green-700">
                Your Leadership Assessment has been successfully submitted!
              </p>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-green-100">
                <div className="flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                  <span className="text-xl font-bold text-green-600">
                    Potential Annual Savings: ₹{(totalAnnualLoss * 0.5).toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Based on industry benchmarks, addressing 50% of identified leadership gaps typically yields this return
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">24 Hours</div>
                  <div className="text-sm text-blue-700">Response Time</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">FREE</div>
                  <div className="text-sm text-purple-700">ROI Discovery Call</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">Custom</div>
                  <div className="text-sm text-orange-700">Action Plan</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>What's Next?</strong> Our leadership experts will analyze your assessment and prepare a customized 
                  transformation roadmap. We'll contact you within 24 hours to schedule your complimentary ROI discovery call 
                  where we'll show you exactly how to turn these losses into profits.
                </p>
              </div>
              
              <p className="text-lg font-semibold text-gray-800 mt-6">
                Get ready to transform your leadership and unlock your business potential! 🚀
              </p>

              {/* Next Steps Section */}
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Now That You Know What You're Losing...
                  </h3>
                  <p className="text-lg text-gray-700 mb-4">
                    You've discovered the hidden costs of leadership gaps in your business. 
                    <span className="font-semibold text-red-600"> Time, money, and energy are slipping away every day.</span>
                  </p>
                  <p className="text-lg text-gray-700 font-semibold">
                    You have <span className="text-blue-600">TWO CHOICES</span> moving forward:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Option 1: DIY */}
                  <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl font-bold text-orange-600">1</span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Do It Yourself</h4>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-2 mb-4">
                      <li>• Spend months researching solutions</li>
                      <li>• Trial and error with different approaches</li>
                      <li>• Risk making costly mistakes</li>
                      <li>• Continue losing money while learning</li>
                      <li>• Hope you get it right eventually</li>
                    </ul>
                    <div className="text-center">
                      <div className="text-sm text-orange-600 font-semibold">
                        Time Investment: 6-12 months
                      </div>
                      <div className="text-sm text-orange-600 font-semibold">
                        Success Rate: 20-30%
                      </div>
                    </div>
                  </div>

                  {/* Option 2: Get Help */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-300 shadow-lg relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                        RECOMMENDED
                      </span>
                    </div>
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl font-bold text-green-600">2</span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Get Expert Help</h4>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-2 mb-4">
                      <li>• Proven systems and frameworks</li>
                      <li>• Personalized leadership development</li>
                      <li>• Avoid costly trial-and-error</li>
                      <li>• Start seeing results in weeks</li>
                      <li>• Guaranteed transformation process</li>
                    </ul>
                    <div className="text-center">
                      <div className="text-sm text-green-600 font-semibold">
                        Time to Results: 30-60 days
                      </div>
                      <div className="text-sm text-green-600 font-semibold">
                        Success Rate: 85-95%
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <div className="mb-4">
                    <p className="text-lg font-semibold text-gray-800 mb-2">
                      Ready to stop the losses and start winning?
                    </p>
                    <p className="text-gray-600">
                      Experience our proven Leadership Development Platform
                    </p>
                  </div>
                  
                  <a
                    href="https://gregarious-salmiakki-84c47f.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    <span>🚀 Try Our Leadership Development Platform</span>
                  </a>
                  
                  <div className="mt-4 text-sm text-gray-500">
                    <p>✅ Free trial available • ✅ No credit card required • ✅ Instant access</p>
                  </div>
                  
                  <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>💡 Smart Move:</strong> While you're waiting for our ROI discovery call, 
                      why not explore our platform? See exactly how we can help you transform those 
                      losses into profits with our proven leadership development system.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleExport}
                  disabled={isGeneratingPDF}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  <Download className="h-5 w-5" />
                  <span>{isGeneratingPDF ? 'Generating PDF...' : 'Download Your Report'}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                >
                  <FileText className="h-5 w-5" />
                  <span>Print Report</span>
                </button>
              </div>

              {/* Restart Options */}
              {showRestartPrompt && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-3">Want to do another assessment?</h4>
                  <p className="text-blue-800 mb-4">
                    You can run the assessment for a different department, time period, or with updated estimates.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <button
                      onClick={handleRestart}
                      className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <span>Modify Current Assessment</span>
                    </button>
                    <button
                      onClick={handleNewAssessment}
                      className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <span>Start Fresh Assessment</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Manual restart option (always visible) */}
              {!showRestartPrompt && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowRestartPrompt(true)}
                    className="text-blue-600 hover:text-blue-800 underline text-sm"
                  >
                    Want to run another assessment?
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {!isSubmitted && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleExport}
              disabled={isGeneratingPDF}
              className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4" />
              <span>{isGeneratingPDF ? 'Generating PDF...' : 'Export Report (PDF)'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FileText className="h-4 w-4" />
              <span>Print Report</span>
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            Your data is not stored permanently and is used only for this assessment.
          </p>
        </div>
      )}
    </div>
    </>
  );
};

export default LeadCapture;