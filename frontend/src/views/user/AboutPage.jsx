import React from 'react';
import '../../styles/AboutStyle.css';
import contentData from '../..//data/aboutdata';

const AboutPage = ({ currentLanguage }) => {
  const currentContent = contentData[currentLanguage || 'en'];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[85vh] bg-cream overflow-hidden animate-fade-in">
        <div className="grid lg:grid-cols-2 h-[85vh]">
          <div className="flex items-center justify-center p-8 lg:p-16 bg-gradient-to-br from-green-900 to-green-800 relative">
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, #FFD700 2px, transparent 2px), radial-gradient(circle at 75% 75%, #FFD700 1px, transparent 1px)`,
                  backgroundSize: "50px 50px",
                }}
              ></div>
            </div>
            <div className="relative z-10 max-w-xl animate-fade-in-up">
              <div className="mb-8">
                <div className="inline-block px-6 py-3 bg-yellow-400/20 rounded-full border border-yellow-400/30 backdrop-blur-sm mb-6 animate-fade-in-up delay-100">
                  <span className="text-yellow-300 font-semibold text-sm uppercase tracking-wider">
                    Agricultural Innovation
                  </span>
                </div>
                <h1
                  className={`${currentLanguage === "kh" ? "text-4xl lg:text-5xl" : "text-5xl lg:text-6xl"
                    } font-black text-white mb-6 leading-tight`}
                >
                  {currentContent.heroTitle}
                </h1>
                <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mb-6"></div>
                <p
                  className={`${currentLanguage === "kh" ? "text-base lg:text-lg" : "text-xl lg:text-2xl"
                    } font-bold text-yellow-300 mb-6`}
                >
                  {currentContent.heroSubtitle}
                </p>
                <p
                  className={`${currentLanguage === "kh" ? "text-base lg:text-lg" : "text-lg"
                    } text-gray-200 leading-relaxed mb-8`}
                >
                  {currentContent.heroDescription}
                </p>
                <button className="group bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl animate-fade-in-up delay-200">
                  <span className="flex items-center">
                    {currentContent.ctaButton}
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Modern Cambodian Agriculture"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-green-900/20 to-green-900/40"></div>
            <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-300">
              <div className="text-3xl font-black text-green-800 mb-2">1000+</div>
              <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Active Farmers
              </div>
            </div>
            <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-400">
              <div className="text-3xl font-black text-yellow-600 mb-2">24/7</div>
              <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Platform Support
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#FAF0E6] to-[#F5F5DC] animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative animate-slide-up">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#FFD700]/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#228B22]/10 rounded-full blur-xl"></div>
              <div className="relative bg-[#FAF0E6]/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg border border-[#FFD700]/20 animate-fade-in-up">
                <h2 className={`${currentLanguage === 'kh' ? 'text-xl lg:text-2xl' : 'text-2xl lg:text-3xl'} font-bold text-[#333333] mb-4 leading-tight`}>
                  {currentContent.missionTitle}
                </h2>
                <p className={`${currentLanguage === 'kh' ? 'text-sm' : 'text-base'} text-[#8B4513] leading-relaxed mb-6`}>
                  {currentContent.missionText}
                </p>
                <div className="border-t border-[#FFD700]/30 pt-6">
                  <h3 className={`${currentLanguage === 'kh' ? 'text-lg lg:text-xl' : 'text-xl lg:text-2xl'} font-bold text-[#333333] mb-3 flex items-center`}>
                    {currentContent.visionTitle}
                  </h3>
                  <p className={`${currentLanguage === 'kh' ? 'text-sm' : 'text-base'} text-[#8B4513] leading-relaxed`}>
                    {currentContent.visionText}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-up delay-100">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#FFD700]/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#228B22]/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg transform rotate-2 hover:rotate-0 transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Cambodian farmer working in field"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#228B22]/30 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 bg-[#FAF0E6]/95 backdrop-blur-sm rounded-xl p-3 shadow-md transform hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-200">
                  <div className="text-xl font-black text-[#228B22] mb-1">2019</div>
                  <div className="text-xs font-semibold text-[#8B4513] uppercase tracking-wide">Founded</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden animate-fade-in">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="valuePattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="#228B22" />
                <circle cx="15" cy="15" r="1" fill="#FFD700" />
                <circle cx="45" cy="45" r="1" fill="#FFD700" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#valuePattern)" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-fade-in-up">
            <h2 className={`${currentLanguage === 'kh' ? 'text-xl lg:text-2xl' : 'text-2xl lg:text-3xl'} font-bold text-[#333333] mb-3`}>
              {currentContent.valuesTitle}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FFD700] to-[#228B22] mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentContent.values.map((value, index) => (
              <div key={index} className="group bg-gradient-to-br from-[#FAF0E6] to-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-2 transform animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`${currentLanguage === 'kh' ? 'text-base' : 'text-lg'} font-bold text-[#333333] mb-3 group-hover:text-[#228B22] transition-colors duration-300`}>
                    {value.title}
                  </h3>
                  <p className={`${currentLanguage === 'kh' ? 'text-sm' : 'text-base'} text-[#8B4513] leading-relaxed`}>
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#228B22]/5 to-[#FFD700]/5 relative animate-fade-in">
        <div className="absolute top-12 left-12 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-12 right-12 w-24 h-24 bg-[#228B22]/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-fade-in-up">
            <h2 className={`${currentLanguage === 'kh' ? 'text-xl lg:text-2xl' : 'text-2xl lg:text-3xl'} font-bold text-[#333333] mb-3`}>
              {currentContent.communityTitle}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#228B22] to-[#FFD700] mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center group animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="relative mb-6">
                <div className="absolute inset-0 w-48 h-48 mx-auto rounded-full border-2 border-[#FFD700]/20 group-hover:border-[#FFD700]/40 transition-colors duration-500 group-hover:rotate-12 transform"></div>
                <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300 border-2 border-white">
                  <img
                    src={currentContent.farmers.image}
                    alt={currentContent.farmers.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#228B22]/20 to-transparent"></div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#FFD700] rounded-full p-2 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="bg-[#FAF0E6]/80 backdrop-blur-sm rounded-xl p-5 shadow-md border border-[#FFD700]/20 group-hover:shadow-lg transition-shadow duration-300">
                <h3 className={`${currentLanguage === 'kh' ? 'text-base lg:text-lg' : 'text-lg lg:text-xl'} font-bold text-[#333333] mb-3 group-hover:text-[#228B22] transition-colors duration-300`}>
                  {currentContent.farmers.title}
                </h3>
                <p className={`${currentLanguage === 'kh' ? 'text-sm' : 'text-base'} text-[#8B4513] leading-relaxed`}>
                  {currentContent.farmers.description}
                </p>
              </div>
            </div>
            <div className="text-center group animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="relative mb-6">
                <div className="absolute inset-0 w-48 h-48 mx-auto rounded-full border-2 border-[#228B22]/20 group-hover:border-[#228B22]/40 transition-colors duration-500 group-hover:rotate-12 transform"></div>
                <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300 border-2 border-white">
                  <img
                    src={currentContent.buyers.image}
                    alt={currentContent.buyers.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/20 to-transparent"></div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#228B22] rounded-full p-2 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m-.4-1L7 13m0 0l-1.5 3h9m-9-3h9M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                </div>
              </div>
              <div className="bg-[#FAF0E6]/80 backdrop-blur-sm rounded-xl p-5 shadow-md border border-[#228B22]/20 group-hover:shadow-lg transition-shadow duration-300">
                <h3 className={`${currentLanguage === 'kh' ? 'text-base lg:text-lg' : 'text-lg lg:text-xl'} font-bold text-[#333333] mb-3 group-hover:text-[#FFD700] transition-colors duration-300`}>
                  {currentContent.buyers.title}
                </h3>
                <p className={`${currentLanguage === 'kh' ? 'text-sm' : 'text-base'} text-[#8B4513] leading-relaxed`}>
                  {currentContent.buyers.description}
                </p>
              </div>
            </div>
            <div className="text-center group animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="relative mb-6">
                <div className="absolute inset-0 w-48 h-48 mx-auto rounded-full border-2 border-[#8B4513]/20 group-hover:border-[#8B4513]/40 transition-colors duration-500 group-hover:rotate-12 transform"></div>
                <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300 border-2 border-white">
                  <img
                    src={currentContent.admins.image}
                    alt={currentContent.admins.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#8B4513]/20 to-transparent"></div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#8B4513] rounded-full p-2 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div className="bg-[#FAF0E6]/80 backdrop-blur-sm rounded-xl p-5 shadow-md border border-[#8B4513]/20 group-hover:shadow-lg transition-shadow duration-300">
                <h3 className={`${currentLanguage === 'kh' ? 'text-base lg:text-lg' : 'text-lg lg:text-xl'} font-bold text-[#333333] mb-3 group-hover:text-[#8B4513] transition-colors duration-300`}>
                  {currentContent.admins.title}
                </h3>
                <p className={`${currentLanguage === 'kh' ? 'text-sm' : 'text-base'} text-[#8B4513] leading-relaxed`}>
                  {currentContent.admins.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden animate-fade-in">
        <div className="absolute inset-0 opacity-3">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #FFD700 1px, transparent 1px), radial-gradient(circle at 75% 75%, #228B22 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-fade-in-up">
            <h2 className={`${currentLanguage === 'kh' ? 'text-xl lg:text-2xl' : 'text-2xl lg:text-3xl'} font-bold text-[#333333] mb-3`}>
              {currentContent.featuresTitle}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#228B22] via-[#FFD700] to-[#8B4513] mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentContent.features.map((feature, index) => (
              <div key={index} className="group bg-gradient-to-br from-[#FAF0E6]/50 to-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-2 transform animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#FFD700]/20 to-[#228B22]/20 rounded-bl-2xl opacity-50"></div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 relative">
                  <h3 className={`${currentLanguage === 'kh' ? 'text-base' : 'text-lg'} font-bold text-[#333333] mb-3 group-hover:text-[#228B22] transition-colors duration-300 flex items-center`}>
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></div>
                    {feature.title}
                  </h3>
                  <p className={`${currentLanguage === 'kh' ? 'text-sm' : 'text-base'} text-[#8B4513] leading-relaxed mb-4`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 lg:py-32 bg-gradient-to-r from-green-600 to-green-700 relative overflow-hidden animate-fade-in">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20 animate-fade-in-up">
            <h2 className={`${currentLanguage === 'kh' ? 'text-2xl lg:text-3xl' : 'text-3xl lg:text-4xl'} font-bold text-white mb-6`}>
              {currentContent.ctaTitle}
            </h2>
            <p className={`${currentLanguage === 'kh' ? 'text-base lg:text-lg' : 'text-lg lg:text-xl'} text-green-50 mb-8 leading-relaxed`}>
              {currentContent.ctaText}
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/25 group animate-fade-in-up delay-100">
              <span className="flex items-center justify-center">
                {currentContent.ctaButton}
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;