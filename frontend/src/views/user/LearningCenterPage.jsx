import React, { useState } from 'react';
import learningContentData from '../../data/learningContentData'; // Adjust path based on your project structure

const LearningCenter = ({ currentLanguage = 'en' }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const currentContent = learningContentData[currentLanguage || 'en'];
  
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