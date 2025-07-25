import React, { useState } from 'react';

const LearningCenter = ({ currentLanguage = 'en' }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const content = {
    en: {
      heroTitle: "Agricultural Learning Center",
      heroSubtitle: "Empowering Cambodian Farmers with Modern Knowledge",
      heroDescription: "Access comprehensive educational resources, tutorials, and modern farming techniques to improve your agricultural practices and business success.",
      
      categoriesTitle: "Learning Categories",
      categories: [
        { id: 'all', title: 'All Courses', count: '24' },
        { id: 'crops', title: 'Crop Management', count: '8' },
        { id: 'livestock', title: 'Livestock Care', count: '6' },
        { id: 'business', title: 'Farm Business', count: '5' },
        { id: 'technology', title: 'Modern Technology', count: '5' }
      ],
      
      featuredTitle: "Featured Learning Paths",
      featuredCourses: [
        {
          id: 1,
          category: 'crops',
          title: "Rice Cultivation Excellence",
          description: "Master traditional and modern rice farming techniques for maximum yield and quality.",
          duration: "2.5 hours",
          lessons: "12 lessons",
          level: "Beginner to Advanced",
          image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 2,
          category: 'crops',
          title: "Vegetable Garden Optimization",
          description: "Learn efficient vegetable growing methods, pest control, and harvest timing for better profits.",
          duration: "1.8 hours",
          lessons: "9 lessons",
          level: "Intermediate",
          image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 3,
          category: 'livestock',
          title: "Sustainable Livestock Management",
          description: "Comprehensive guide to raising healthy livestock while maintaining environmental sustainability.",
          duration: "3.2 hours",
          lessons: "15 lessons",
          level: "Beginner",
          image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 4,
          category: 'business',
          title: "Digital Marketing for Farmers",
          description: "Learn to market your products online, build customer relationships, and increase sales through FramerZone.",
          duration: "2.0 hours",
          lessons: "10 lessons",
          level: "Beginner",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 5,
          category: 'technology',
          title: "Smart Farming Tools & Techniques",
          description: "Discover modern agricultural technology, sensors, and data-driven farming approaches.",
          duration: "2.8 hours",
          lessons: "13 lessons",
          level: "Advanced",
          image: "https://images.unsplash.com/photo-1581092795442-65ad172097c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 6,
          category: 'business',
          title: "Financial Planning for Farmers",
          description: "Master budgeting, cost analysis, and financial planning to maximize your farm's profitability.",
          duration: "1.5 hours",
          lessons: "8 lessons",
          level: "Intermediate",
          image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ],
      
      quickTipsTitle: "Quick Learning Tips",
      quickTips: [
        {
          title: "Soil Health Check",
          description: "Test your soil pH and nutrients every season for optimal crop growth.",
          time: "5 min read"
        },
        {
          title: "Water Conservation",
          description: "Implement drip irrigation to reduce water usage by up to 50%.",
          time: "3 min read"
        },
        {
          title: "Pest Prevention",
          description: "Natural pest control methods that protect crops without harmful chemicals.",
          time: "7 min read"
        },
        {
          title: "Harvest Timing",
          description: "Know the perfect time to harvest different crops for maximum quality.",
          time: "4 min read"
        }
      ],
      
      resourcesTitle: "Additional Resources",
      resources: [
        {
          title: "Agricultural Calendar",
          description: "Season-specific planting and harvesting guide for Cambodia",
          type: "PDF Guide"
        },
        {
          title: "Disease Identification Chart",
          description: "Visual guide to common plant diseases and treatment methods",
          type: "Interactive Tool"
        },
        {
          title: "Market Prices Tracker",
          description: "Real-time agricultural product prices across different regions",
          type: "Live Data"
        },
        {
          title: "Weather Forecast Integration",
          description: "Weather-based farming recommendations and alerts",
          type: "Daily Updates"
        }
      ],
      
      ctaTitle: "Ready to Start Learning?",
      ctaText: "Join thousands of Cambodian farmers who are improving their skills and increasing their income through our comprehensive learning platform.",
      ctaButton: "Start Learning Now",
      
      commonButtons: {
        startCourse: "Start Course",
        viewAll: "View All",
        download: "Download",
        watchNow: "Watch Now",
        readMore: "Read More"
      }
    },
    kh: {
      heroTitle: "មជ្ឈមណ្ឌលសិក្សាកសិកម្ម",
      heroSubtitle: "ពង្រឹងកសិករកម្ពុជាដោយចំណេះដឹងទំនើប",
      heroDescription: "ចូលដំណើរការធនធានអប់រំទូលំទូលាយ ការបង្រៀន និងបច្ចេកទេសកសិកម្មទំនើបដើម្បីកែលម្អការអនុវត្តកសិកម្ម និងភាពជោគជ័យក្នុងអាជីវកម្មរបស់អ្នក។",
      
      categoriesTitle: "ប្រភេទការសិក្សា",
      categories: [
        { id: 'all', title: 'គ្រប់មេរៀន', count: '24' },
        { id: 'crops', title: 'ការគ្រប់គ្រងដំណាំ', count: '8' },
        { id: 'livestock', title: 'ការថែទាំសត្វ', count: '6' },
        { id: 'business', title: 'អាជីវកម្មកសិដ្ឋាន', count: '5' },
        { id: 'technology', title: 'បច្ចេកវិទ្យាទំនើប', count: '5' }
      ],
      
      featuredTitle: "មេរៀនពិសេស",
      featuredCourses: [
        {
          id: 1,
          category: 'crops',
          title: "ការដាំស្រូវប្រកបដោយឧត្តមភាព",
          description: "ស្វែងយល់បច្ចេកទេសដាំស្រូវបែបប្រពៃណី និងទំនើបសម្រាប់ទទួលបានផលិតភាព និងគុណភាពអតិបរមា។",
          duration: "2.5 ម៉ោង",
          lessons: "12 មេរៀន",
          level: "កម្រិតដំបូងដល់កម្រិតខ្ពស់",
          image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 2,
          category: 'crops',
          title: "ការបង្កើនប្រសិទ្ធភាពច្បារបន្លែ",
          description: "រៀនវិធីដាំបន្លែប្រកបដោយប្រសិទ្ធភាព ការគ្រប់គ្រងសត្វកាត់ និងពេលវេលាប្រមូលផលសម្រាប់ការចំណេញកាន់តែប្រសើរ។",
          duration: "1.8 ម៉ោង",
          lessons: "9 មេរៀន",
          level: "កម្រិតមធ្យម",
          image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 3,
          category: 'livestock',
          title: "ការគ្រប់គ្រងសត្វចិញ្ចឹមប្រកបដោយចីរភាព",
          description: "មគ្គុទេសក៍ទូលំទូលាយក្នុងការចិញ្ចឹមសត្វមានសុខភាពល្អខណៈពេលរក្សាចីរភាពបរិស្ថាន។",
          duration: "3.2 ម៉ោង",
          lessons: "15 មេរៀន",
          level: "កម្រិតដំបូង",
          image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 4,
          category: 'business',
          title: "ការទីផ្សារឌីជីថលសម្រាប់កសិករ",
          description: "រៀនទីផ្សារផលិតផលរបស់អ្នកតាមអនឡាញ សាងសង់ទំនាក់ទំនងអតិថិជន និងបង្កើនការលក់តាមរយៈ FramerZone។",
          duration: "2.0 ម៉ោង",
          lessons: "10 មេរៀន",
          level: "កម្រិតដំបូង",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 5,
          category: 'technology',
          title: "ឧបករណ៍ និងបច្ចេកទេសកសិកម្មឆ្លាតវៃ",
          description: "ស្វែងរកបច្ចេកវិទ្យាកសិកម្មទំនើប ឧបករណ៍ចាប់សញ្ញាណ និងវិធីសាស្រ្តកសិកម្មដោយផ្អែកលើទិន្នន័យ។",
          duration: "2.8 ម៉ោង",
          lessons: "13 មេរៀន",
          level: "កម្រិតខ្ពស់",
          image: "https://images.unsplash.com/photo-1581092795442-65ad172097c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 6,
          category: 'business',
          title: "ការរៀបចំផែនការហិរញ្ញវត្ថុសម្រាប់កសិករ",
          description: "ស្វែងយល់ការងារថវិកា ការវិភាគថ្លៃដើម និងការរៀបចំផែនការហិរញ្ញវត្ថុដើម្បីបង្កើនការចំណេញកសិដ្ឋានអតិបរមា។",
          duration: "1.5 ម៉ោង",
          lessons: "8 មេរៀន",
          level: "កម្រិតមធ្យម",
          image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ],
      
      quickTipsTitle: "ការណែនាំរហ័ស",
      quickTips: [
        {
          title: "ការពិនិត្យសុខភាពដី",
          description: "ធ្វើតេស្តកម្រិតអាស៊ីត និងសារធាតុចិញ្ចឹមដីរៀងរាល់រដូវសម្រាប់ការលូតលាស់ដ៏ល្អបំផុតរបស់ដំណាំ។",
          time: "អាន 5 នាទី"
        },
        {
          title: "ការអភិរក្សទឹក",
          description: "ប្រើប្រាស់ប្រព័ន្ធស្រោចកាំបិតដើម្បីកាត់បន្ថយការប្រើប្រាស់ទឹកដល់ 50%។",
          time: "អាន 3 នាទី"
        },
        {
          title: "ការការពារសត្វកាត់",
          description: "វិធីសាស្រ្តគ្រប់គ្រងសត្វកាត់ធម្មជាតិដែលការពារដំណាំដោយមិនប្រើសារធាតុគីមី។",
          time: "អាន 7 នាទី"
        },
        {
          title: "ពេលវេលាប្រមូលផល",
          description: "ដឹងពេលវេលាល្អឥតខ្ចោះក្នុងការប្រមូលផលដំណាំផ្សេងៗសម្រាប់គុណភាពអតិបរមា។",
          time: "អាន 4 នាទី"
        }
      ],
      
      resourcesTitle: "ធនធានបន្ថែម",
      resources: [
        {
          title: "ប្រតិទិនកសិកម្ម",
          description: "មគ្គុទេសក៍ការដាំ និងប្រមូលផលតាមរដូវកាលសម្រាប់កម្ពុជា",
          type: "មគ្គុទេសក៍ PDF"
        },
        {
          title: "តារាងកំណត់អត្តសញ្ញាណជំងឺ",
          description: "មគ្គុទេសក៍មើលឃើញជំងឺរុក្ខជាតិទូទៅ និងវិធីសាស្រ្តព្យាបាល",
          type: "ឧបករណ៍អន្តរកម្ម"
        },
        {
          title: "កម្មវិធីតាមដានតម្លៃទីផ្សារ",
          description: "តម្លៃផលិតផលកសិកម្មក្នុងពេលពិតប្រាកដនៅទូទាំងតំបន់ផ្សេងៗ",
          type: "ទិន្នន័យបន្តផ្ទាល់"
        },
        {
          title: "ការរួមបញ្ចូលព្យាករណ៍អាកាសធាតុ",
          description: "ការណែនាំកសិកម្មដោយផ្អែកលើអាកាសធាតុ និងការជូនដំណឹង",
          type: "ការអាប់ដេតប្រចាំថ្ងៃ"
        }
      ],
      
      ctaTitle: "តើអ្នករៀបចំដើម្បីចាប់ផ្តើមរៀនហើយឬនៅ?",
      ctaText: "ចូលរួមជាមួយកសិករកម្ពុជារាប់ពាន់នាក់ដែលកំពុងកែលម្អជំនាញ និងបង្កើនប្រាក់ចំណូលរបស់ពួកគេតាមរយៈវេទិកាសិក្សាទូលំទូលាយរបស់យើង។",
      ctaButton: "ចាប់ផ្តើមសិក្សាឥឡូវនេះ",
      
      commonButtons: {
        startCourse: "ចាប់ផ្តើមមេរៀន",
        viewAll: "មើលទាំងអស់",
        download: "ទាញយក",
        watchNow: "មើលឥឡូវនេះ",
        readMore: "អានបន្ថែម"
      }
    }
  };

  const currentContent = content[currentLanguage || 'en'];
  
  const filteredCourses = activeCategory === 'all' 
    ? currentContent.featuredCourses 
    : currentContent.featuredCourses.filter(course => course.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-yellow-400 opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  {currentContent.heroTitle}
                </h1>
                <p className="text-xl sm:text-2xl text-green-100 font-medium">
                  {currentContent.heroSubtitle}
                </p>
                <p className="text-lg text-green-50 leading-relaxed">
                  {currentContent.heroDescription}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  {currentContent.ctaButton}
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-green-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                  {currentContent.commonButtons.viewAll}
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Agricultural Learning" 
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-white text-green-800 px-6 py-3 rounded-full font-bold text-sm shadow-lg">
                  24+ {currentLanguage === 'en' ? 'Courses' : 'មេរៀន'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              {currentContent.categoriesTitle}
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {currentContent.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-green-800 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-800 border border-gray-200'
                }`}
              >
                {category.title} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              {currentContent.featuredTitle}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-green-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {course.level}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{course.duration}</span>
                    <span>{course.lessons}</span>
                  </div>
                  
                  <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                    {currentContent.commonButtons.startCourse}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              {currentContent.quickTipsTitle}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentContent.quickTips.map((tip, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-green-800 text-2xl font-bold mb-3">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                  {tip.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{tip.time}</span>
                  <button className="text-green-800 hover:text-green-600 font-semibold text-sm">
                    {currentContent.commonButtons.readMore}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              {currentContent.resourcesTitle}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {currentContent.resources.map((resource, index) => (
              <div key={index} className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl p-8 border border-green-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {resource.description}
                    </p>
                    <span className="inline-block bg-green-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {resource.type}
                    </span>
                  </div>
                  <button className="ml-6 bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold transition-all duration-300">
                    {currentContent.commonButtons.download}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-800 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {currentContent.ctaTitle}
          </h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            {currentContent.ctaText}
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-12 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            {currentContent.ctaButton}
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-green-800 mb-2">24+</div>
              <div className="text-gray-600 font-medium">
                {currentLanguage === 'en' ? 'Learning Modules' : 'ម៉ូឌុលសិក្សា'}
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-green-800 mb-2">5,000+</div>
              <div className="text-gray-600 font-medium">
                {currentLanguage === 'en' ? 'Active Learners' : 'អ្នកសិក្សាសកម្ម'}
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-green-800 mb-2">15+</div>
              <div className="text-gray-600 font-medium">
                {currentLanguage === 'en' ? 'Expert Instructors' : 'គ្រូបង្រៀនជំនាញ'}
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-green-800 mb-2">98%</div>
              <div className="text-gray-600 font-medium">
                {currentLanguage === 'en' ? 'Success Rate' : 'អត្រាជោគជ័យ'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {selectedVideo.title}
                </h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl text-gray-400 mb-4">▶</div>
                  <p className="text-gray-600">Video Player Placeholder</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Duration: {selectedVideo.duration}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success Stories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              {currentLanguage === 'en' ? 'Success Stories' : 'រឿងរ៉ាវជោគជ័យ'}
            </h2>
            <p className="text-xl text-gray-600">
              {currentLanguage === 'en' 
                ? 'Real farmers, real results from our learning platform' 
                : 'កសិករពិត លទ្ធផលពិតពីវេទិកាសិក្សារបស់យើង'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: currentLanguage === 'en' ? 'Sophea Chan' : 'ចាន់ សុភា',
                location: currentLanguage === 'en' ? 'Battambang Province' : 'ខេត្តបាត់ដំបង',
                story: currentLanguage === 'en' 
                  ? 'Increased rice yield by 40% using modern techniques learned from FramerZone courses.'
                  : 'បានបង្កើនទិន្នផលស្រូវ 40% ដោយប្រើបច្ចេកទេសទំនើបពីមេរៀន FramerZone។',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
              },
              {
                name: currentLanguage === 'en' ? 'Dara Pich' : 'ពេជ្រ ដារា',
                location: currentLanguage === 'en' ? 'Siem Reap Province' : 'ខេត្តសៀមរាប',
                story: currentLanguage === 'en'
                  ? 'Started online vegetable sales and tripled income within 6 months of joining FramerZone.'
                  : 'ចាប់ផ្តើមលក់បន្លែតាមអនឡាញ និងបានបង្កើនប្រាក់ចំណូល 3 ដងក្នុងរយៈពេល 6 ខែ។',
                image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
              },
              {
                name: currentLanguage === 'en' ? 'Ratana Srey' : 'ស្រី រតនា',
                location: currentLanguage === 'en' ? 'Kandal Province' : 'ខេត្តកណ្តាល',
                story: currentLanguage === 'en'
                  ? 'Reduced farming costs by 30% through sustainable practices and smart resource management.'
                  : 'កាត់បន្ថយចំណាយកសិកម្ម 30% តាមរយៈការអនុវត្តប្រកបដោយចីរភាព។',
                image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
              }
            ].map((story, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <img 
                  src={story.image} 
                  alt={story.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {story.name}
                  </h3>
                  <p className="text-green-600 font-medium mb-3 text-sm">
                    {story.location}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    "{story.story}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-yellow-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            {currentLanguage === 'en' 
              ? 'Stay Updated with Agricultural Tips' 
              : 'ទទួលបានព័ត៌មានថ្មីៗអំពីកសិកម្ម'}
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            {currentLanguage === 'en'
              ? 'Get weekly tips, seasonal guides, and exclusive learning content delivered to your inbox.'
              : 'ទទួលបានការណែនាំប្រចាំសប្តាហ៍ មគ្គុទេសក៍តាមរដូវកាល និងមាតិកាសិក្សាផ្តាច់មុខ។'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={currentLanguage === 'en' ? 'Enter your email' : 'បញ្ចូលអ៊ីម៉ែលរបស់អ្នក'}
              className="flex-1 px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
              {currentLanguage === 'en' ? 'Subscribe' : 'ចុះឈ្មោះ'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearningCenter;