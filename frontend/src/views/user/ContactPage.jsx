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
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {currentContent.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-green-100">
            {currentContent.heroSubtitle}
          </p>
          <p className="text-lg max-w-3xl mx-auto text-green-200">
            {currentContent.heroDescription}
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            {currentContent.contactInfoTitle}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(currentContent.contactInfo).map(([key, info]) => (
              <div key={key} className="bg-gradient-to-br from-green-50 to-yellow-50 p-6 rounded-lg shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-green-800 mb-4">{info.title}</h3>
                {info.address && (
                  <p className="text-gray-600 mb-2 flex items-center">
                    <span className="mr-2">📍</span> {info.address}
                  </p>
                )}
                {info.description && (
                  <p className="text-gray-600 mb-3">{info.description}</p>
                )}
                <p className="text-green-700 mb-2 flex items-center">
                  <span className="mr-2">📧</span> 
                  <a href={`mailto:${info.email}`} className="hover:underline">{info.email}</a>
                </p>
                {info.phone && (
                  <p className="text-green-700 mb-2 flex items-center">
                    <span className="mr-2">📞</span> 
                    <a href={`tel:${info.phone}`} className="hover:underline">{info.phone}</a>
                  </p>
                )}
                {info.hours && (
                  <p className="text-sm text-gray-500 flex items-center">
                    <span className="mr-2">🕒</span> {info.hours}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {currentContent.formTitle}
            </h2>
            <p className="text-lg text-gray-600">
              {currentContent.formSubtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8 relative overflow-hidden">
            {formSubmitted && (
              <div className="absolute inset-0 bg-green-500 bg-opacity-90 flex items-center justify-center z-10 rounded-lg">
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

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
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
              
              <div>
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
              <div>
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
              
              <div>
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

            <div className="mb-6">
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

            <div className="mb-6">
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
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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