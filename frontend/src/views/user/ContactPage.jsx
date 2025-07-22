
import React, { useState } from 'react';

const ContactPage = ({ currentLanguage = 'en' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: '',
    subject: '',
    message: ''
  });

  const content = {
    en: {
      heroTitle: "Contact FramerZone",
      heroSubtitle: "Connect with Cambodia's Agricultural Community",
      heroDescription: "We're here to help farmers, buyers, and partners build stronger agricultural connections. Get in touch with us for support, partnerships, or any questions about our platform.",
      
      contactInfoTitle: "Get in Touch",
      contactInfo: {
        office: {
          title: "Main Office",
          address: "Phnom Penh, Cambodia",
          phone: "+855 23 xxx xxx",
          email: "info@framerzone.com",
          hours: "Monday - Friday: 8:00 AM - 6:00 PM"
        },
        support: {
          title: "Customer Support",
          description: "Need help with your account, orders, or platform features?",
          email: "support@framerzone.com",
          phone: "+855 23 xxx xxx",
          hours: "Available 24/7"
        },
        partnerships: {
          title: "Business Partnerships",
          description: "Interested in collaborating or partnering with FramerZone?",
          email: "partnerships@framerzone.com",
          phone: "+855 23 xxx xxx"
        },
        technical: {
          title: "Technical Support",
          description: "Experiencing technical issues or need platform assistance?",
          email: "tech@framerzone.com",
          hours: "Monday - Saturday: 7:00 AM - 9:00 PM"
        }
      },
      
      formTitle: "Send us a Message",
      formSubtitle: "Fill out the form below and we'll get back to you within 24 hours",
      form: {
        name: "Full Name",
        namePlaceholder: "Enter your full name",
        email: "Email Address",
        emailPlaceholder: "Enter your email address",
        phone: "Phone Number",
        phonePlaceholder: "Enter your phone number",
        userType: "I am a...",
        userTypes: {
          farmer: "Farmer/Seller",
          buyer: "Buyer/Customer",
          partner: "Business Partner",
          other: "Other"
        },
        subject: "Subject",
        subjectPlaceholder: "What is this regarding?",
        message: "Message",
        messagePlaceholder: "Tell us more about your inquiry, feedback, or how we can help you...",
        submit: "Send Message",
        required: "Required"
      },
      
      servicesTitle: "How We Can Help",
      services: [
        {
          title: "For Farmers",
          description: "Get help setting up your digital storefront, managing products, understanding sales analytics, and connecting with buyers.",
          features: ["Product listing assistance", "Sales dashboard training", "Marketing guidance", "Technical support"]
        },
        {
          title: "For Buyers",
          description: "Find the freshest produce, connect with local farmers, learn about seasonal availability, and get the best deals.",
          features: ["Product recommendations", "Farmer verification info", "Order tracking help", "Quality assurance"]
        },
        {
          title: "For Partners",
          description: "Explore collaboration opportunities, integration possibilities, and ways to support Cambodia's agricultural community.",
          features: ["Partnership programs", "API integration", "Bulk ordering solutions", "Custom development"]
        },
        {
          title: "Platform Support",
          description: "Technical assistance, account management, security concerns, and general platform guidance for all users.",
          features: ["Account recovery", "Security guidance", "Feature tutorials", "Bug reporting"]
        }
      ],
      
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          question: "How do I start selling on FramerZone?",
          answer: "Create a farmer account, complete your profile verification, and start listing your products. Our support team will guide you through the entire process."
        },
        {
          question: "Is there a fee to use the platform?",
          answer: "Basic registration is free for both farmers and buyers. We charge a small commission only when sales are completed, ensuring farmers pay only for successful transactions."
        },
        {
          question: "How do I ensure product quality and freshness?",
          answer: "We have a rating system, farmer verification process, and quality guidelines. Buyers can also communicate directly with farmers about harvest dates and handling."
        },
        {
          question: "Can I use FramerZone on my mobile phone?",
          answer: "Yes! FramerZone is fully responsive and works perfectly on smartphones, tablets, and computers. You can manage your account and make purchases from anywhere."
        },
        {
          question: "How do payments work?",
          answer: "We support various payment methods including mobile money, bank transfers, and cash on delivery. All transactions are secure and protected."
        },
        {
          question: "What if I have a problem with my order?",
          answer: "Contact our support team immediately. We have a dispute resolution process and work with both farmers and buyers to ensure fair outcomes."
        }
      ],
      
      emergencyTitle: "Emergency Support",
      emergencyDescription: "For urgent issues affecting your livelihood, orders, or account security:",
      emergencyPhone: "+855 23 xxx xxx",
      emergencyHours: "Available 24/7 for emergencies"
    },
    
    kh: {
      heroTitle: "ទាក់ទង FramerZone",
      heroSubtitle: "តភ្ជាប់ជាមួយសហគមន៍កសិកម្មកម្ពុជា",
      heroDescription: "យើងនៅទីនេះដើម្បីជួយកសិករ អ្នកទិញ និងដៃគូសាងសង់ការតភ្ជាប់កសិកម្មកាន់តែរឹងមាំ។ ទាក់ទងមកយើងសម្រាប់ការគាំទ្រ ភាពជាដៃគូ ឬសំណួរណាមួយអំពីវេទិការបស់យើង។",
      
      contactInfoTitle: "ទាក់ទងមកយើង",
      contactInfo: {
        office: {
          title: "ការិយាល័យកណ្តាល",
          address: "ភ្នំពេញ កម្ពុជា",
          phone: "+855 23 xxx xxx",
          email: "info@framerzone.com",
          hours: "ច័ន្ទ - សុក្រ: 8:00 ព្រឹក - 6:00 ល្ងាច"
        },
        support: {
          title: "ការគាំទ្រអតិថិជន",
          description: "ត្រូវការជំនួយជាមួយគណនី ការបញ្ជាទិញ ឬលក្ខណៈពិសេសវេទិកា?",
          email: "support@framerzone.com",
          phone: "+855 23 xxx xxx",
          hours: "មាន 24/7"
        },
        partnerships: {
          title: "ភាពជាដៃគូអាជីវកម្ម",
          description: "ចាប់អារម្មណ៍ក្នុងការសហការ ឬភាពជាដៃគូជាមួយ FramerZone?",
          email: "partnerships@framerzone.com",
          phone: "+855 23 xxx xxx"
        },
        technical: {
          title: "ការគាំទ្របច្ចេកទេស",
          description: "កំពុងជួបបញ្ហាបច្ចេកទេស ឬត្រូវការជំនួយវេទិកា?",
          email: "tech@framerzone.com",
          hours: "ច័ន្ទ - សៅរ៍: 7:00 ព្រឹក - 9:00 ល្ងាច"
        }
      },
      
      formTitle: "ផ្ញើសារមកយើង",
      formSubtitle: "បំពេញទម្រង់ខាងក្រោម ហើយយើងនឹងតបស្នើងក្នុងរយៈពេល 24 ម៉ោង",
      form: {
        name: "ឈ្មោះពេញ",
        namePlaceholder: "បញ្ចូលឈ្មោះពេញរបស់អ្នក",
        email: "អ៊ីមែល",
        emailPlaceholder: "បញ្ចូលអ៊ីមែលរបស់អ្នក",
        phone: "លេខទូរស័ព្ទ",
        phonePlaceholder: "បញ្ចូលលេខទូរស័ព្ទរបស់អ្នក",
        userType: "ខ្ញុំជា...",
        userTypes: {
          farmer: "កសិករ/អ្នកលក់",
          buyer: "អ្នកទិញ/អតិថិជន",
          partner: "ដៃគូអាជីវកម្ម",
          other: "ផ្សេងទៀត"
        },
        subject: "ប្រធានបទ",
        subjectPlaceholder: "នេះទាក់ទងនឹងអ្វី?",
        message: "សារ",
        messagePlaceholder: "ប្រាប់យើងបន្ថែមអំពីការសាកសួរ មតិកែលម្អ ឬរបៀបដែលយើងអាចជួយអ្នក...",
        submit: "ផ្ញើសារ",
        required: "ទាមទារ"
      },
      
      servicesTitle: "របៀបដែលយើងអាចជួយ",
      services: [
        {
          title: "សម្រាប់កសិករ",
          description: "ទទួលបានជំនួយក្នុងការរៀបចំហាងឌីជីថលរបស់អ្នក គ្រប់គ្រងផលិតផល យល់ដឹងអំពីវិភាគការលក់ និងតភ្ជាប់ជាមួយអ្នកទិញ។",
          features: ["ជំនួយក្នុងការចុះបញ្ជីផលិតផល", "ការបណ្តុះបណ្តាលផ្ទាំងការលក់", "ការណែនាំទីផ្សារ", "ការគាំទ្របច្ចេកទេស"]
        },
        {
          title: "សម្រាប់អ្នកទិញ",
          description: "ស្វែងរកផលិតផលស្រស់បំផុត តភ្ជាប់ជាមួយកសិករក្នុងស្រុក ស្វែងយល់អំពីភាពអាចរកបានតាមរដូវកាល និងទទួលបានការព្រមព្រៀងល្អបំផុត។",
          features: ["ការណែនាំផលិតផល", "ព័ត៌មានផ្ទៀងផ្ទាត់កសិករ", "ជំនួយតាមដានការបញ្ជាទិញ", "ការធានាគុណភាព"]
        },
        {
          title: "សម្រាប់ដៃគូ",
          description: "ស្វែងយល់ឱកាសសហការ លទ្ធភាពបញ្ចូលគ្នា និងវិធីគាំទ្រសហគមន៍កសិកម្មកម្ពុជា។",
          features: ["កម្មវិធីភាពជាដៃគូ", "ការបញ្ចូលគ្នា API", "ដំណោះស្រាយការបញ្ជាទិញច្រើន", "ការអភិវឌ្ឍន៍ផ្ទាល់ខ្លួន"]
        },
        {
          title: "ការគាំទ្រវេទិកា",
          description: "ជំនួយបច្ចេកទេស ការគ្រប់គ្រងគណនី បារម្ភសុវត្ថិភាព និងការណែនាំវេទិកាទូទៅសម្រាប់អ្នកប្រើប្រាស់ទាំងអស់។",
          features: ["ការស្តារគណនី", "ការណែនាំសុវត្ថិភាព", "ការបង្រៀនលក្ខណៈពិសេស", "ការរាយការណ៍កំហុស"]
        }
      ],
      
      faqTitle: "សំណួរដែលសួរញឹកញាប់",
      faqs: [
        {
          question: "តើខ្ញុំចាប់ផ្តើមលក់នៅលើ FramerZone យ៉ាងដូចម្តេច?",
          answer: "បង្កើតគណនីកសិករ បញ្ចប់ការផ្ទៀងផ្ទាត់ប្រវត្តិរូបរបស់អ្នក ហើយចាប់ផ្តើមចុះបញ្ជីផលិតផលរបស់អ្នក។ ក្រុមគាំទ្ររបស់យើងនឹងណែនាំអ្នកតាមដំណើរការទាំងមូល។"
        },
        {
          question: "តើមានកម្រៃសម្រាប់ប្រើប្រាស់វេទិកានេះទេ?",
          answer: "ការចុះឈ្មោះជាមូលដ្ឋានគឺឥតគិតថ្លៃសម្រាប់ទាំងកសិករ និងអ្នកទិញ។ យើងគិតកំរៃតូចមួយតែនៅពេលការលក់ត្រូវបានបញ្ចប់ ធានាថាកសិករបង់តែសម្រាប់ប្រតិបត្តិការជោគជ័យ។"
        },
        {
          question: "តើខ្ញុំធានាគុណភាព និងភាពស្រស់របស់ផលិតផលយ៉ាងដូចម្តេច?",
          answer: "យើងមានប្រព័ន្ធវាយតម្លៃ ដំណើរការផ្ទៀងផ្ទាត់កសិករ និងគោលការណ៍ណែនាំគុណភាព។ អ្នកទិញក៏អាចទំនាក់ទំនងដោយផ្ទាល់ជាមួយកសិករអំពីកាលបរិច្ឆេទប្រមូលផល និងការដោះស្រាយ។"
        },
        {
          question: "តើខ្ញុំអាចប្រើ FramerZone នៅលើទូរស័ព្ទរបស់ខ្ញុំបានទេ?",
          answer: "បាទ! FramerZone ឆ្លើយតបពេញលេញ និងដំណើរការល្អឥតខ្ចោះនៅលើស្មាតហ្វូន ថេប្លេត និងកំព្យូទ័រ។ អ្នកអាចគ្រប់គ្រងគណនី និងធ្វើការទិញពីកន្លែងណាក៏បាន។"
        },
        {
          question: "តើការទូទាត់ដំណើរការយ៉ាងដូចម្តេច?",
          answer: "យើងគាំទ្រវិធីសាស្ត្រទូទាត់ផ្សេងៗរួមទាំងលុយទូរស័ព្ទ ការផ្ទេរប្រាក់ធនាគារ និងការទូទាត់សាច់ប្រាក់នៅពេលដឹកជញ្ជូន។ ប្រតិបត្តិការទាំងអស់មានសុវត្ថិភាព និងការពារ។"
        },
        {
          question: "តើប្រសិនបើខ្ញុំមានបញ្ហាជាមួយការបញ្ជាទិញរបស់ខ្ញុំ?",
          answer: "ទាក់ទងក្រុមគាំទ្ររបស់យើងភ្លាមៗ។ យើងមានដំណើរការដោះស្រាយជម្លោះ ហើយធ្វើការជាមួយទាំងកសិករ និងអ្នកទិញដើម្បីធានាលទ្ធផលយុត្តិធម៌។"
        }
      ],
      
      emergencyTitle: "ការគាំទ្រអាសន្ន",
      emergencyDescription: "សម្រាប់បញ្ហាបន្ទាន់ដែលប៉ះពាល់ដល់ការរស់នៅ ការបញ្ជាទិញ ឬសុវត្ថិភាពគណនីរបស់អ្នក:",
      emergencyPhone: "+855 23 xxx xxx",
      emergencyHours: "មានសម្រាប់ករណីអាសន្ន 24/7"
    }
  };

  const currentContent = content[currentLanguage];

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

//  const currentContent = content[currentLanguage];
//  const [openFAQ, setOpenFAQ] = useState(null);
//  const [formSubmitted, setFormSubmitted] = useState(false);

//  const handleInputChange = (e) => {
//    const { name, value } = e.target;
//    setFormData(prev => ({
//      ...prev,
//      [name]: value
//    }));
//  };

//  const handleSubmit = (e) => {
//    e.preventDefault();
//    console.log('Form submitted:', formData);
//    setFormSubmitted(true);
   
//    setTimeout(() => {
//      setFormData({
//        name: '',
//        email: '',
//        phone: '',
//        userType: '',
//        subject: '',
//        message: ''
//      });
//      setFormSubmitted(false);
//    }, 3000);
//  };
};

export default ContactPage;