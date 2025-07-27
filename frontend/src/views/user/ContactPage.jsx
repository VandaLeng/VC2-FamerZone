import React, { useState } from 'react';
import contactData from '../../data/contactdata'; // Adjust path based on your project structure

const ContactPage = ({ currentLanguage = 'en' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: '',
    subject: '',
    message: ''
  });

  const currentContent = contactData[currentLanguage];

  const [openFAQ, setOpenFAQ] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        userType: '',
        subject: '',
        message: ''
      });
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
      {/* Hero Section */}
      <div className="relative h-[85vh] bg-gradient-to-br from-emerald-900 via-green-800 to-teal-700 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-12 left-12 w-28 h-28 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-16 right-16 w-20 h-20 bg-white/15 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-float-slow"></div>
        </div>

        {/* Main Content */}
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="max-w-5xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 animate-fade-in">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-sm font-medium text-green-100">
                    {currentLanguage === 'kh' ? 'ស្វាគមន៍មកកាន់' : 'Welcome to'}
                  </span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold leading-tight animate-slide-in-left">
                  <span className="block text-white">
                    {currentLanguage === 'kh' ? 'ទាក់ទង' : 'Contact'}
                  </span>
                  <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent animate-slide-in-left animate-delay-200">
                    FramerZone
                  </span>
                </h1>

                <p className="text-lg text-emerald-100 font-medium animate-slide-in-left animate-delay-300">
                  {currentContent.heroSubtitle}
                </p>

                <p className="text-base text-emerald-200 leading-relaxed max-w-md animate-slide-in-left animate-delay-400">
                  {currentContent.heroDescription}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-left animate-delay-500">
                  <button className="group bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900 font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-bounce-subtle">
                    <span className="flex items-center justify-center">
                      {currentLanguage === 'kh' ? 'ចាប់ផ្តើមសន្ទនា' : 'Start Conversation'}
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                  <button className="group border-2 border-white/30 hover:border-white text-white hover:bg-white hover:text-emerald-800 font-semibold px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm animate-bounce-subtle animate-delay-100">
                    <span className="flex items-center justify-center">
                      {currentLanguage === 'kh' ? 'មើលព័ត៌មានបន្ថែម' : 'Learn More'}
                      <svg className="w-5 h-5 ml-2 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              {/* Right Content - Contact Methods Preview */}
              <div className="relative animate-slide-in-right animate-delay-300">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-4 animate-slide-in-right">
                    {currentLanguage === 'kh' ? 'ទាក់ទងយើងឥឡូវនេះ' : 'Reach Us Now'}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group animate-slide-in-right animate-delay-400">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Email Support</p>
                        <p className="text-emerald-200 text-sm">info@framerzone.com</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group animate-slide-in-right animate-delay-500">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-semibold">Phone Support</p>
                        <p className="text-emerald-200 text-sm">+855 23 xxx xxx</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-16" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-white"></path>
          </svg>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-12 left-12 w-28 h-28 bg-[#FFD700]/10 rounded-full animate-float"></div>
          <div className="absolute bottom-16 right-16 w-20 h-20 bg-[#228B22]/15 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-[#FFD700]/10 rounded-full animate-float-slow"></div>
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4 animate-text-shimmer">
              {currentContent.contactInfoTitle}
            </h2>
            <div className="w-20 h-1 bg-[#FFD700] mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {Object.entries(currentContent.contactInfo).map(([key, info], index) => (
              <div key={key} className={`group animate-slide-in-up animate-delay-${(index + 1) * 100}`}>
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-[#228B22] h-full">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-[#2D5016] mb-4 group-hover:text-[#228B22] transition-colors">
                      {info.title}
                    </h3>
                    <div className="w-12 h-0.5 bg-[#FFD700] group-hover:w-16 transition-all duration-300"></div>
                  </div>
                  <div className="space-y-4">
                    {info.address && (
                      <div className="text-[#333333]">
                        <span className="font-semibold text-[#8B4513]">Address:</span>
                        <p className="mt-1">{info.address}</p>
                      </div>
                    )}
                    {info.description && (
                      <p className="text-[#333333] leading-relaxed">{info.description}</p>
                    )}
                    <div className="text-[#2D5016]">
                      <span className="font-semibold text-[#8B4513]">Email:</span>
                      <p className="mt-1">
                        <a href={`mailto:${info.email}`} className="hover:text-[#228B22] transition-colors hover:underline">
                          {info.email}
                        </a>
                      </p>
                    </div>
                    {info.phone && (
                      <div className="text-[#2D5016]">
                        <span className="font-semibold text-[#8B4513]">Phone:</span>
                        <p className="mt-1">
                          <a href={`tel:${info.phone}`} className="hover:text-[#228B22] transition-colors hover:underline">
                            {info.phone}
                          </a>
                        </p>
                      </div>
                    )}
                    {info.hours && (
                      <div className="text-[#8B4513]">
                        <span className="font-semibold">Hours:</span>
                        <p className="mt-1 text-sm">{info.hours}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate-text-shimmer">
              {currentContent.formTitle}
            </h2>
            <p className="text-lg text-gray-600 animate-slide-in-up">
              {currentContent.formSubtitle}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8 relative overflow-hidden animate-slide-in-up animate-delay-100">
            {formSubmitted && (
              <div className="absolute inset-0 bg-green-500 bg-opacity-90 flex items-center justify-center z-10 rounded-lg animate-fade-in">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold mb-2">
                    {currentLanguage === 'kh' ? 'សារត្រូវបានផ្ញើរួចរាល់!' : 'Message Sent Successfully!'}
                  </h3>
                  <p className="text-lg">
                    {currentLanguage === 'kh' ? 'យើងនឹងតបស្នើងឆាប់ៗនេះ' : "We'll get back to you soon!"}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="animate-slide-in-up animate-delay-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentContent.form.name} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={currentContent.form.namePlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>

                <div className="animate-slide-in-up animate-delay-300">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentContent.form.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={currentContent.form.emailPlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="animate-slide-in-up animate-delay-400">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentContent.form.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={currentContent.form.phonePlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div className="animate-slide-in-up animate-delay-500">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentContent.form.userType} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                    required
                  >
                    <option value="">Select...</option>
                    {Object.entries(currentContent.form.userTypes).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6 animate-slide-in-up animate-delay-600">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentContent.form.subject} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={currentContent.form.subjectPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>

              <div className="mb-6 animate-slide-in-up animate-delay-700">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentContent.form.message} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={currentContent.form.messagePlaceholder}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-bounce-subtle"
                disabled={formSubmitted}
              >
                {formSubmitted ?
                  (currentLanguage === 'kh' ? 'កំពុងផ្ញើ...' : 'Sending...') :
                  currentContent.form.submit
                }
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            {currentContent.servicesTitle}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.services.map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-yellow-50 p-6 rounded-lg shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <h3 className="text-xl font-bold text-green-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-gray-500 flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            {currentContent.faqTitle}
          </h2>
          
          <div className="space-y-4">
            {currentContent.faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg border border-green-100 overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-green-50 transition-colors duration-200"
                >
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  <span className={`text-green-600 transform transition-transform duration-200 ${openFAQ === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4 text-gray-600 border-t border-green-100">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Support */}
      <div className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {currentContent.emergencyTitle}
          </h2>
          <p className="text-xl mb-6 text-red-100">
            {currentContent.emergencyDescription}
          </p>
          <div className="bg-red-700 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-2xl font-bold mb-2">
              <a href={`tel:${currentContent.emergencyPhone}`} className="hover:underline">
                {currentContent.emergencyPhone}
              </a>
            </p>
            <p className="text-red-200">{currentContent.emergencyHours}</p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-16 bg-gradient-to-r from-green-800 to-green-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {currentLanguage === 'kh' ? 'រួចរាល់ហើយក្នុងការចាប់ផ្តើម?' : 'Ready to Get Started?'}
          </h2>
          <p className="text-xl mb-8 text-green-100">
            {currentLanguage === 'kh' ? 
              'ចូលរួមជាមួយសហគមន៍កសិកម្មកម្ពុជា ហើយចាប់ផ្តើមធ្វើការជាមួយ FramerZone ថ្ងៃនេះ' : 
              'Join Cambodia\'s agricultural community and start working with FramerZone today'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 text-green-800 font-bold py-3 px-8 rounded-lg hover:bg-yellow-400 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              {currentLanguage === 'kh' ? 'ចាប់ផ្តើមការលក់' : 'Start Selling'}
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-green-800 transition duration-300">
              {currentLanguage === 'kh' ? 'រកមើលផលិតផល' : 'Browse Products'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;