import { Facebook, Twitter, Instagram, MapPin, Phone, Mail, ArrowRight } from "lucide-react"

export default function Footer({ currentLanguage }) {
  // Language texts
  const texts = {
    kh: {
      companyName: "FarmerZone",
      companyDesc: "ភ្ជាប់កសិករ និងអ្នកទិញដោយផ្ទាល់ តាមរយៈវេទិកាអនឡាញទំនើប សម្រាប់ផលិតផលកសិកម្មស្រស់ៗ",
      explore: "ស្វែងរក",
      home: "ទំព័រដើម",
      products: "ផលិតផល",
      about: "អំពីពួកយើង",
      learningCenter: "មជ្ឈមណ្ឌលសិក្សា",
      contact: "ទំនាក់ទំនង",
      farmers: "ជួបកសិករ",
      newsTitle: "ព័ត៌មានថ្មីរបស់ FarmerZone",
      news1: "វគ្គសិក្សាថ្មីដែលបានណែនាំសម្រាប់កសិករ",
      news1Desc: "ស្វែងរកវគ្គសិក្សាកសិកម្មថ្មីដែលបានជ្រើសរើសដើម្បីបង្កើនទិន្នផលដំណាំ និងស្ទាត់ជំនាញបច្ចេកទេសកសិកម្មទំនើប!",
      news1Link: "/learning-center",
      news2: "ផែនទីអន្តរកម្មឥឡូវនេះបើកដំណើរការសម្រាប់អ្នកទិញ",
      news2Desc: "ស្វែងរកកសិដ្ឋាននៅជិតអ្នក និងកម្ម៉ង់ផលិតផលស្រស់ៗដោយផ្ទាល់ជាមួយនឹងមុខងារផែនទីអន្តរកម្មថ្មី។",
      news2Link: "/products",
      contactTitle: "ទំនាក់ទំនង",
      phone: "០១២ ៣៤៥ ៦៧៨",
      email: "needhelp@farmerzone.com",
      address: "ភ្នំពេញ កម្ពុជា",
      emailPlaceholder: "អាសយដ្ឋានអ៊ីមែលរបស់អ្នក",
      allRights: "រក្សាសិទ្ធិគ្រប់យ៉ាង",
      by: "ដោយ",
      termsOfUse: "លក្ខខណ្ឌប្រើប្រាស់",
      privacyPolicy: "គោលការណ៍ភាពឯកជន",
    },
    en: {
      companyName: "FarmerZone",
      companyDesc:
        "Connecting farmers and buyers directly through our modern online platform for fresh agricultural products.",
      explore: "Explore",
      home: "Home",
      about: "About",
      products: "Products",
      learningCenter: "Learning Center",
      contact: "Contact",
      farmers: "Meet the Farmers",
      newsTitle: "FramerZone Updates",
      news1: "New Courses Recommended for Farmers",
      news1Desc: "Discover our latest curated agricultural courses to boost crop yields and master modern farming techniques!",
      news1Link: "/learning-center",
      news2: "Interactive Map Now Live for Buyers",
      news2Desc: "Find nearby farms and order fresh products directly with our new interactive map feature.",
      news2Link: "/products",
      contactTitle: "Contact",
      phone: "+855 (0) 12 345 678",
      email: "needhelp@framerzone.com",
      address: "Phnom Penh, Cambodia",
      emailPlaceholder: "Your Email Address",
      allRights: "All rights reserved",
      by: "by",
      termsOfUse: "Terms of Use",
      privacyPolicy: "Privacy Policy",
    },
  }

  const currentTexts = texts[currentLanguage] || texts.en

  return (
    <footer className="bg-[#24231D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2.5 rounded-full shadow-lg">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.66C8.24 14.6 11.79 12 16.8 12c3.47 0 6.2-2.8 6.2-6.25S20.27 0 16.8 0C11.79 0 8.24 2.6 5.66 7.34L7.55 8c.95-2.66 3.14-4.32 5.73-4.32 2.4 0 4.32 1.6 4.32 3.57S19.68 11 17.28 11c-3.47 0-6.2 2.8-6.2 6.25v.57c0 .31.25.57.57.57s.57-.25.57-.57v-.57c0-2.4 1.92-4.32 4.32-4.32S20.86 15.6 20.86 18s-1.92 4.32-4.32 4.32-4.32-1.92-4.32-4.32" />
                </svg>
              </div>
              <span className="text-2xl font-bold">
                <span className="text-green-400">Farmer</span>
                <span className="text-white">Zone</span>
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">{currentTexts.companyDesc}</p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">{currentTexts.explore}</h3>
            <ul className="space-y-3">
              {[
                { text: currentTexts.home, href: "/" },
                { text: currentTexts.products, href: "/products" },
                { text: currentTexts.about, href: "/about" },
                { text: currentTexts.learningCenter, href: "/learning-center" },
                { text: currentTexts.contact, href: "/contact" },
              ].map((item) => (
                <li key={item.text}>
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight
                      size={14}
                      className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* News */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">
              {currentTexts.newsTitle || (currentLanguage === "kh" ? "ព័ត៌មានថ្មីរបស់ FramerZone" : "FramerZone Updates")}
            </h3>
            <div className="space-y-6">
              <div className="border-l-2 border-green-600 pl-4">
                <a href={currentTexts.news1Link || "/learning-center"} className="text-white font-medium mb-1 hover:text-green-400 cursor-pointer transition-colors duration-300">
                  {currentTexts.news1 || (currentLanguage === "kh" ? "វគ្គសិក្សាថ្មីដែលបានណែនាំសម្រាប់កសិករ" : "New Courses Recommended for Farmers")}
                </a>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {currentTexts.news1Desc || (currentLanguage === "kh" ? "ស្វែងរកវគ្គសិក្សាកសិកម្មថ្មីដែលបានជ្រើសរើសដើម្បីបង្កើនទិន្នផលដំណាំ និងស្ទាត់ជំនាញបច្ចេកទេសកសិកម្មទំនើប!" : "Discover our latest curated agricultural courses to boost crop yields and master modern farming techniques!")}
                </p>
                <p className="text-sm text-gray-400">October 15, 2025</p>
              </div>
              <div className="border-l-2 border-green-600 pl-4">
                <a href={currentTexts.news2Link || "/products"} className="text-white font-medium mb-1 hover:text-green-400 cursor-pointer transition-colors duration-300">
                  {currentTexts.news2 || (currentLanguage === "kh" ? "ផែនទីអន្តរកម្មឥឡូវនេះបើកដំណើរការសម្រាប់អ្នកទិញ" : "Interactive Map Now Live for Buyers")}
                </a>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {currentTexts.news2Desc || (currentLanguage === "kh" ? "ស្វែងរកកសិដ្ឋាននៅជិតអ្នក និងកម្ម៉ង់ផលិតផលស្រស់ៗដោយផ្ទាល់ជាមួយនឹងមុខងារផែនទីអន្តរកម្មថ្មី។" : "Find nearby farms and order fresh products directly with our new interactive map feature.")}
                </p>
                <p className="text-sm text-gray-400">October 10, 2025</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">{currentTexts.contactTitle}</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone size={18} className="text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-300">{currentTexts.phone}</span>
              </div>
              <div className="flex items-start space-x-3">
                <Mail size={18} className="text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-300">{currentTexts.email}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-300">{currentTexts.address}</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-8">
              <div className="flex">
                <input
                  type="email"
                  placeholder={currentTexts.emailPlaceholder}
                  className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-l-lg focus:outline-none focus:border-green-600 text-white placeholder-gray-400"
                />
                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-r-lg transition-colors duration-300 flex items-center justify-center">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentTexts.allRights} 2025 {currentTexts.by} <span className="text-green-400">FarmerZone</span>
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                {currentTexts.termsOfUse}
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                {currentTexts.privacyPolicy}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
