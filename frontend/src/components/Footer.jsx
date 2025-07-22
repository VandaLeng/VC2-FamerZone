import { Facebook, Twitter, Instagram, MapPin, Phone, Mail, ArrowRight } from "lucide-react"

export default function Footer({ currentLanguage }) {
  // Language texts
  const texts = {
    kh: {
      companyName: "FramerZone",
      companyDesc: "ភ្ជាប់កសិករ និងអ្នកទិញដោយផ្ទាល់ តាមរយៈវេទិកាអនឡាញទំនើប សម្រាប់ផលិតផលកសិកម្មស្រស់ៗ",
      explore: "ស្វែងរក",
      home: "ទំព័រដើម",
      products: "ផលិតផល",
      about: "អំពីពួកយើង",
      learningCenter: "មជ្ឈមណ្ឌលសិក្សា",
      contact: "ទំនាក់ទំនង",
      farmers: "ជួបកសិករ",
      news: "ព័ត៌មាន",
      newsTitle: "ព័ត៌មានថ្មីៗ",
      news1: "នាំយកការផលិតអាហារត្រលប់មកទីក្រុង",
      news2: "អនាគតនៃកសិកម្ម ដំណោះស្រាយស្រោចស្រពឆ្លាតវៃ",
      contactTitle: "ទំនាក់ទំនង",
      phone: "០១២ ៣៤៥ ៦៧៨",
      email: "needhelp@framerzone.com",
      address: "ភ្នំពេញ កម្ពុជា",
      emailPlaceholder: "អាសយដ្ឋានអ៊ីមែលរបស់អ្នក",
      allRights: "រក្សាសិទ្ធិគ្រប់យ៉ាង",
      by: "ដោយ",
      termsOfUse: "លក្ខខណ្ឌប្រើប្រាស់",
      privacyPolicy: "គោលការណ៍ភាពឯកជន",
    },
    en: {
      companyName: "FramerZone",
      companyDesc:
        "Connecting farmers and buyers directly through our modern online platform for fresh agricultural products.",
      explore: "Explore",
      home: "Home",
      about: "About",
      products: "Products",
      learningCenter: "មជ្ឈមណ្ឌលសិក្សា",
      contact: "Contact",
      farmers: "Meet the Farmers",
      news: "Latest News",
      newsTitle: "News",
      news1: "Bringing Food Production Back To Cities",
      news2: "The Future of Farming, Smart Irrigation Solutions",
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
                <span className="text-green-400">Framer</span>
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
                { text: currentTexts.home, href: "/about" },
                { text: currentTexts.about, href: "/services" },
                { text: currentTexts.products, href: "/products" },
                { text: currentTexts.contact, href: "/contact" },
                { text: currentTexts.farmers, href: "/farmers" },
                { text: currentTexts.news, href: "/news" },
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
            <h3 className="text-xl font-semibold">{currentTexts.newsTitle}</h3>
            <div className="space-y-4">
              <div className="border-l-2 border-green-600 pl-4">
                <h4 className="text-white font-medium mb-1 hover:text-green-400 cursor-pointer transition-colors duration-300">
                  {currentTexts.news1}
                </h4>
                <p className="text-sm text-gray-400">July 5, 2024</p>
              </div>
              <div className="border-l-2 border-green-600 pl-4">
                <h4 className="text-white font-medium mb-1 hover:text-green-400 cursor-pointer transition-colors duration-300">
                  {currentTexts.news2}
                </h4>
                <p className="text-sm text-gray-400">July 5, 2024</p>
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
              © {currentTexts.allRights} 2024 {currentTexts.by} <span className="text-green-400">FramerZone</span>
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
