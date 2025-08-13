"use client"

import { useState } from "react"
import learningContentData from "../../data/learningContentData"

const LearningCenter = ({ currentLanguage = "en" }) => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState(null)

  const content = learningContentData[currentLanguage] || learningContentData["en"]

  const filteredCourses =
    activeCategory === "all" ? content.courses : content.courses.filter((course) => course.category === activeCategory)

  return (
    <div className={`min-h-screen bg-gray-50 ${currentLanguage === "kh" ? "font-khmer" : "font-english"}`}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white overflow-hidden h-[85vh]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-12 left-12 w-28 h-28 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-16 right-16 w-20 h-20 bg-white/15 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-float-slow"></div>
        </div>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Agricultural field"
            className="w-full h-full object-cover opacity-20 animate-zoom-in"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-semibold animate-fade-in-up">
                  {content.heroBadge}
                </div>
                <h1 className="text-4xl sm:text-6xl font-bold leading-tight animate-fade-in-up animation-delay-100">
                  {content.heroTitle}
                </h1>
                <p className="text-xl sm:text-2xl text-green-100 font-medium animate-fade-in-up animation-delay-200">
                  {content.heroSubtitle}
                </p>
                <p className="text-lg text-green-50 leading-relaxed max-w-2xl animate-fade-in-up animation-delay-300">
                  {content.heroDescription}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center animate-bounce-in animation-delay-400">
                  {content.buttons.getRecommendations}
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-green-800 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center animate-bounce-in animation-delay-500">
                  {content.buttons.viewResources}
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-slide-in-up animation-delay-600">
                    <h3 className="font-bold mb-2">{content.heroSection.onlineCourses}</h3>
                    <p className="text-sm text-green-100">{content.heroSection.courseRecommendations}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform translate-y-8 animate-slide-in-up animation-delay-700">
                    <h3 className="font-bold mb-2">{content.heroSection.directContact}</h3>
                    <p className="text-sm text-green-100">{content.heroSection.connectInstructors}</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-slide-in-up animation-delay-800">
                    <h3 className="font-bold mb-2">{content.heroSection.platformAccess}</h3>
                    <p className="text-sm text-green-100">{content.heroSection.trustedPlatforms}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {content.categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 animate-slide-in-left animation-delay-${index * 100} ${
                  activeCategory === category.id
                    ? "bg-green-600 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-200 hover:border-green-200"
                }`}
              >
                {category.title} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Resources Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up">{content.resourcesTitle}</h2>
            <p className="text-xl text-gray-600 animate-fade-in-up animation-delay-100">
              {content.resourcesDescription}
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-card-reveal animation-delay-${index * 100}`}
              >
                <div className="relative">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2 animate-fade-in">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {course.level}
                    </span>
                    <span className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                      {course.rating}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 animate-fade-in">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {content.onlineLabel}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight animate-fade-in">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed animate-fade-in animation-delay-100">
                      {course.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4 animate-fade-in animation-delay-200">
                    <div className="flex items-center gap-4">
                      <span>{course.duration}</span>
                      <span>{course.lessons}</span>
                    </div>
                    <span className="flex items-center text-green-600">{course.students}</span>
                  </div>
                  <div className="border-t pt-4 mb-4">
                    <div className="text-sm text-gray-600 mb-2 animate-fade-in animation-delay-300">
                      <strong>{content.expertLabel}:</strong> {course.instructor}
                    </div>
                    <div className="flex flex-wrap gap-1 animate-fade-in animation-delay-400">
                      {course.highlights.slice(0, 3).map((highlight, index) => (
                        <span key={index} className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-3 text-center animate-slide-in-up animation-delay-500">
                      <div className="text-lg font-bold text-blue-600">{content.multiplePlatformsLabel}</div>
                      <div className="text-xs text-blue-500">{content.freeAndPaidLabel}</div>
                    </div>
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center animate-bounce-in animation-delay-600"
                    >
                      {content.buttons.viewResources}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Modern gradient header */}
              <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 h-48 rounded-t-2xl relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                  </div>
                </div>
                {/* Course level badge */}
                <div className="absolute top-6 left-6">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                    {selectedCourse.level}
                  </span>
                </div>
                {/* Close button */}
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl border border-white/30 transition-all"
                >
                  ×
                </button>
                {/* Course title and basic info in header */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{selectedCourse.title}</h2>
                  <div className="flex items-center gap-4 text-white/90">
                    <span className="flex items-center gap-1 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {selectedCourse.duration}
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      {selectedCourse.lessons}
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                        />
                      </svg>
                      {selectedCourse.students}
                    </span>
                  </div>
                </div>
                {/* Status badge */}
                <div className="absolute bottom-6 right-6">
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {content.onlineAvailableLabel}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">{selectedCourse.description}</p>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
                      <div className="font-semibold text-blue-900">{selectedCourse.duration}</div>
                      <div className="text-sm text-blue-600">{content.durationLabel}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-100">
                      <div className="font-semibold text-purple-900">{selectedCourse.lessons}</div>
                      <div className="text-sm text-purple-600">{content.lessonsLabel}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center border border-green-100">
                      <div className="font-semibold text-green-900">{selectedCourse.students}</div>
                      <div className="text-sm text-green-600">{content.studentsLabel}</div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {content.courseHighlightsLabel}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedCourse.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <svg
                            className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                          <span className="text-gray-700 text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                        />
                      </svg>
                      {content.recommendedPlatformsLabel}
                    </h3>
                    <div className="space-y-4">
                      {selectedCourse.platforms.map((platform, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{platform.name}</h4>
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                              {platform.type}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-green-600 font-medium">{platform.price}</span>
                            <a
                              href={platform.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105"
                            >
                              {content.buttons.visitPlatform}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                      </svg>
                      {content.noteLabel}
                    </h4>
                    <p className="text-amber-700 text-sm">{content.noteDescription}</p>
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 sticky top-6 border border-gray-200">
                    <div className="text-center mb-6">
                      <div className="text-sm text-gray-500 mb-1">{content.expertInstructorLabel}</div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">{selectedCourse.instructor}</div>
                      <div className="flex items-center justify-center mb-2">
                        <span className="font-semibold text-amber-600">{selectedCourse.rating}/5.0</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 mb-6 border border-green-200 shadow-sm">
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        {content.contactInformationLabel}
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <a href={`tel:${selectedCourse.contact.phone}`} className="text-blue-600 hover:underline">
                            {selectedCourse.contact.phone}
                          </a>
                        </div>
                        <div className="flex items-center text-sm">
                          <a
                            href={`mailto:${selectedCourse.contact.email}`}
                            className="text-blue-600 hover:underline break-all"
                          >
                            {selectedCourse.contact.email}
                          </a>
                        </div>
                        <div className="flex items-start text-sm">
                          <span className="text-gray-700">{selectedCourse.contact.organization}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                        {content.buttons.contactInstructor}
                      </button>
                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                        {content.buttons.viewResources}
                      </button>
                    </div>
                    <div className="mt-6 text-center">
                      <p className="text-xs text-gray-500">{content.contactDescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section
        id="cta"
        className="py-20 bg-gradient-to-r from-green-700 to-teal-600 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-12 left-12 w-28 h-28 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-16 right-16 w-20 h-20 bg-white/15 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-float-slow"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">{content.ctaTitle}</h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed animate-fade-in-up animation-delay-100">
            {content.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg animate-bounce-in animation-delay-200">
              {content.buttons.getRecommendations}
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 animate-bounce-in animation-delay-300">
              {content.buttons.contactInstructor}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LearningCenter;
