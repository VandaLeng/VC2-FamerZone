
import React from 'react';

const AboutPage = ({ currentLanguage }) => {
  const content = {
    en: {
      heroTitle: "About FramerZone",
      heroSubtitle: "Transforming Cambodia's Agricultural Ecosystem",
      heroDescription: "We connect farmers directly with communities through innovative technology, eliminating middlemen and creating sustainable agricultural commerce.",
      
      missionTitle: "Our Mission",
      missionText: "FramerZone bridges the gap between Cambodia's hardworking farmers and families seeking fresh, quality agricultural products through innovative digital solutions. We're building a platform where technology serves to strengthen traditional agricultural communities while embracing modern commerce possibilities.",
      
      visionTitle: "Our Vision", 
      visionText: "We envision a Cambodia where every farmer has direct access to markets, where families can source the freshest produce directly from the source, and where technology strengthens rather than replaces traditional agricultural communities.",
      
      valuesTitle: "Our Values",
      values: [
        {
          title: "Direct Connection",
          description: "Eliminating middlemen to create direct relationships between farmers and consumers, ensuring fair prices and fresh products.",
          image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Technology for Good",
          description: "Using modern technology to solve real problems in agriculture while preserving the essence of farming communities.",
          image: "https://images.unsplash.com/photo-1581092795442-65ad172097c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Sustainable Growth", 
          description: "Building long-term solutions that benefit farmers, consumers, and the environment through responsible agricultural practices.",
          image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Community First",
          description: "Prioritizing the needs of local communities and ensuring that technology serves to strengthen rather than displace traditional networks.",
          image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ],
      
      communityTitle: "Our Community",
      farmers: {
        title: "Farmers",
        description: "Local Cambodian farmers growing fruits, vegetables, rice, and raising livestock. Access new markets, manage sales digitally, and connect directly with customers without intermediaries.",
        image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      buyers: {
        title: "Consumers",
        description: "Families and individuals seeking fresh, quality agricultural products. Purchase directly from farmers to get the best prices and freshest produce while supporting local agriculture.",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      admins: {
        title: "Platform Team", 
        description: "Dedicated professionals ensuring smooth operations, user security, and system reliability to maintain trust in our agricultural marketplace.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      
      featuresTitle: "Platform Features",
      features: [
        {
          title: "Digital Marketplace",
          description: "Modern e-commerce platform designed specifically for agricultural products with intuitive interfaces for both farmers and buyers.",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Direct Communication", 
          description: "Built-in messaging system allowing farmers and customers to communicate directly about products, quality, and delivery.",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Location Services",
          description: "Interactive maps helping customers find nearby farms and farmers reach local markets more effectively.",
          image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Learning Resources",
          description: "Educational content and tutorials helping farmers adopt modern techniques while preserving traditional knowledge.",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Quality Assurance",
          description: "Rating and review systems ensuring product quality and building trust between farmers and consumers.",
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "Mobile Accessibility",
          description: "Fully responsive design ensuring farmers and customers can access the platform from any device, anywhere.",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ],
      
      ctaTitle: "Join the Agricultural Revolution",
      ctaText: "Be part of the change that empowers farmers, connects communities, and builds a sustainable future for Cambodian agriculture.",
      ctaButton: "Get Started Today"
    },
    kh: {
      heroTitle: "អំពី FramerZone",
      heroSubtitle: "បំលែងប្រព័ន្ធអេកូកសិកម្មកម្ពុជា", 
      heroDescription: "យើងភ្ជាប់កសិករជាមួយសហគមន៍ដោយផ្ទាល់តាមរយៈបច្ចេកវិទ្យាប្រកបដោយភាពច្នៃប្រឌិត លុបបំបាត់អ្នកកណ្តាល និងបង្កើតពាណិជ្ជកម្មកសិកម្មប្រកបដោយចីរភាព។",
      
      missionTitle: "បេសកកម្មរបស់យើង",
      missionText: "FramerZone ជាស្ពានភ្ជាប់រវាងកសិករកម្ពុជាដែលធ្វើការយ៉ាងខ្លាំង និងគ្រួសារដែលស្វែងរកផលិតផលកសិកម្មស្រស់ និងមានគុណភាពតាមរយៈដំណោះស្រាយឌីជីថលច្នៃប្រឌិត។ យើងកំពុងសាងសង់វេទិកាមួយដែលបច្ចេកវិទ្យាបម្រើដើម្បីពង្រឹងសហគមន៍កសិកម្មប្រពៃណីខណៈពេលដែលទទួលយកលទ្ធភាពពាណិជ្ជកម្មទំនើប។",
      
      visionTitle: "ចក្ខុវិស័យរបស់យើង",
      visionText: "យើងមានចក្ខុវិស័យចង់ឃើញកម្ពុជាដែលកសិករគ្រប់រូបមានការចូលដំណើរការទីផ្សារដោយផ្ទាល់ ដែលគ្រួសារអាចទទួលបានផលិតផលស្រស់ដោយផ្ទាល់ពីប្រភព និងដែលបច្ចេកវិទ្យាពង្រឹងជាជាងជំនួសសហគមន៍កសិកម្មប្រពៃណី។",
      
      valuesTitle: "តម្លៃរបស់យើង",
      values: [
        {
          title: "ការតភ្ជាប់ដោយផ្ទាល់",
          description: "លុបបំបាត់អ្នកកណ្តាលដើម្បីបង្កើតទំនាក់ទំនងផ្ទាល់រវាងកសិករ និងអ្នកប្រើប្រាស់ ធានាតម្លៃយុត្តិធម៌ និងផលិតផលស្រស់។",
          image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "បច្ចេកវិទ្យាសម្រាប់ការល្អ",
          description: "ប្រើប្រាស់បច្ចេកវិទ្យាទំនើបដើម្បីដោះស្រាយបញ្ហាពិតប្រាកដនៅក្នុងកសិកម្មខណៈពេលដែលរក្សាសារៈសំខាន់នៃសហគមន៍កសិកម្ម។",
          image: "https://images.unsplash.com/photo-1581092795442-65ad172097c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "ការរីកចម្រើនប្រកបដោយចីរភាព",
          description: "សាងសង់ដំណោះស្រាយរយៈពេលវែងដែលផ្តល់ប្រយោជន៍ដល់កសិករ អ្នកប្រើប្រាស់ និងបរិស្ថានតាមរយៈការអនុវត្តកសិកម្មប្រកបដោយទំនួលខុសត្រូវ។",
          image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "សហគមន៍ជាទីមួយ",
          description: "ផ្តល់អាទិភាពលើតម្រូវការរបស់សហគមន៍ក្នុងស្រុក និងធានាថាបច្ចេកវិទ្យាបម្រើដើម្បីពង្រឹងជាជាងជំនួសបណ្តាញប្រពៃណី។",
          image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ],
      
      communityTitle: "សហគមន៍របស់យើង",
      farmers: {
        title: "កសិករ",
        description: "កសិករកម្ពុជាក្នុងស្រុកដែលដាំដុះផ្លែឈើ បន្លែ អង្ករ និងចិញ្ចឹមសត្វ។ ចូលដំណើរការទីផ្សារថ្មី គ្រប់គ្រងការលក់តាមបែបឌីជីថល និងតភ្ជាប់ដោយផ្ទាល់ជាមួយអតិថិជនដោយគ្មានអន្តរការី។",
        image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      buyers: {
        title: "អ្នកប្រើប្រាស់",
        description: "គ្រួសារ និងបុគ្គលដែលស្វែងរកផលិតផលកសិកម្មស្រស់ និងមានគុណភាព។ ទិញដោយផ្ទាល់ពីកសិករដើម្បីទទួលបានតម្លៃល្អបំផុត និងផលិតផលស្រស់បំផុតខណៈពេលដែលគាំទ្រកសិកម្មក្នុងស្រុក។",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      admins: {
        title: "ក្រុមការងារវេទិកា",
        description: "អ្នកជំនាញដែលលះបង់ធានាដំណើរការរលូន សុវត្ថិភាពអ្នកប្រើប្រាស់ និងភាពអាស្រ័យប្រព័ន្ធដើម្បីរក្សាទំនុកចិត្តក្នុងទីផ្សារកសិកម្មរបស់យើង។",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      
      featuresTitle: "លក្ខណៈពិសេសវេទិកា",
      features: [
        {
          title: "ទីផ្សារឌីជីថល",
          description: "វេទិកាពាណិជ្ជកម្មអេឡិចត្រូនិកទំនើបដែលរចនាឡើងជាពិសេសសម្រាប់ផលិតផលកសិកម្មជាមួយនឹងចំណុចប្រទាក់ងាយស្រួលសម្រាប់ទាំងកសិករ និងអ្នកទិញ។",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "ការទំនាក់ទំនងដោយផ្ទាល់",
          description: "ប្រព័ន្ធការផ្ញើសារដែលបានបង្កើតឡើងអនុញ្ញាតឱ្យកសិករ និងអតិថិជនទំនាក់ទំនងដោយផ្ទាល់អំពីផលិតផល គុណភាព និងការដឹកជញ្ជូន។",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "សេវាកម្មទីតាំង",
          description: "ផែនទីអន្តរកម្មជួយអតិថិជនរកកសិដ្ឋានក្បែរៗ និងកសិករទៅដល់ទីផ្សារក្នុងស្រុកកាន់តែមានប្រសិទ្ធភាព។",
          image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "ធនធានសម្រាប់ការសិក្សា",
          description: "មាតិកាអប់រំ និងការបង្រៀនជួយកសិករទទួលយកបច្ចេកទេសទំនើបខណៈពេលរក្សាចំណេះដឹងប្រពៃណី។",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "ការធានាគុណភាព",
          description: "ប្រព័ន្ធវាយតម្លៃ និងការវាយតម្លៃធានាគុណភាពផលិតផល និងសាងសង់ទំនុកចិត្តរវាងកសិករ និងអ្នកប្រើប្រាស់។",
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "ការចូលដំណើរការតាមទូរស័ព្ទ",
          description: "ការរចនាដែលឆ្លើយតបពេញលេញធានាថាកសិករ និងអតិថិជនអាចចូលដំណើរការវេទិកាពីឧបករណ៍ណាមួយ គ្រប់ទីកន្លែង។",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ],
      
      ctaTitle: "ចូលរួមបដិវត្តកសិកម្ម",
      ctaText: "ជាផ្នែកនៃការផ្លាស់ប្តូរដែលពង្រឹងកសិករ ភ្ជាប់សហគមន៍ និងសាងសង់អនាគតប្រកបដោយចីរភាពសម្រាប់កសិកម្មកម្ពុជា។",
      ctaButton: "ចាប់ផ្តើមថ្ងៃនេះ"
    }
  };

  const currentContent = content[currentLanguage || 'en'];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://media.istockphoto.com/id/501594418/photo/beautiful-sunset-over-a-paddy-field.jpg?s=612x612&w=0&k=20&c=Thw_CeRb5qnck0vOnGGjlUJ6sILq3WeqR4TN_6wdWj4=" 
            alt="Cambodian agriculture landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-green-800/60 to-black/40"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className={`${currentLanguage === 'kh' ? 'text-4xl lg:text-5xl' : 'text-5xl lg:text-6xl'} font-bold text-white mb-6 tracking-tight drop-shadow-lg`}>
              {currentContent.heroTitle}
            </h1>
            <p className={`${currentLanguage === 'kh' ? 'text-lg lg:text-xl' : 'text-xl lg:text-2xl'} text-yellow-300 font-semibold mb-8 drop-shadow-md`}>
              {currentContent.heroSubtitle}
            </p>
            <p className={`${currentLanguage === 'kh' ? 'text-base lg:text-lg' : 'text-lg lg:text-xl'} text-gray-100 leading-relaxed max-w-3xl mx-auto drop-shadow-md`}>
              {currentContent.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div>
              <h2 className={`${currentLanguage === 'kh' ? 'text-2xl lg:text-3xl' : 'text-3xl lg:text-4xl'} font-bold text-gray-900 mb-6`}>
                {currentContent.missionTitle}
              </h2>
              <p className={`${currentLanguage === 'kh' ? 'text-base' : 'text-lg'} text-gray-600 leading-relaxed mb-8`}>
                {currentContent.missionText}
              </p>
              
              <h3 className={`${currentLanguage === 'kh' ? 'text-xl lg:text-2xl' : 'text-2xl lg:text-3xl'} font-bold text-gray-900 mb-4`}>
                {currentContent.visionTitle}
              </h3>
              <p className={`${currentLanguage === 'kh' ? 'text-base' : 'text-lg'} text-gray-600 leading-relaxed`}>
                {currentContent.visionText}
              </p>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Cambodian farmer working in field" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`${currentLanguage === 'kh' ? 'text-2xl lg:text-3xl' : 'text-3xl lg:text-4xl'} font-bold text-gray-900 mb-4`}>
              {currentContent.valuesTitle}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={value.image} 
                    alt={value.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`${currentLanguage === 'kh' ? 'text-lg' : 'text-xl'} font-bold text-gray-900 mb-3`}>
                    {value.title}
                  </h3>
                  <p className={`${currentLanguage === 'kh' ? 'text-sm' : 'text-base'} text-gray-600 leading-relaxed`}>
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`${currentLanguage === 'kh' ? 'text-2xl lg:text-3xl' : 'text-3xl lg:text-4xl'} font-bold text-gray-900 mb-4`}>
              {currentContent.communityTitle}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                  <img 
                    src={currentContent.farmers.image} 
                    alt={currentContent.farmers.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <h3 className={`${currentLanguage === 'kh' ? 'text-lg lg:text-xl' : 'text-xl lg:text-2xl'} font-bold text-gray-900 mb-4`}>
                {currentContent.farmers.title}
              </h3>
              <p className={`${currentLanguage === 'kh' ? 'text-sm' : 'text-base'} text-gray-600 leading-relaxed`}>
                {currentContent.farmers.description}
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                  <img 
                    src={currentContent.buyers.image} 
                    alt={currentContent.buyers.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <h3 className={`${currentLanguage === 'kh' ? 'text-lg lg:text-xl' : 'text-xl lg:text-2xl'} font-bold text-gray-900 mb-4`}>
                {currentContent.buyers.title}
              </h3>
              <p className={`${currentLanguage === 'kh' ? 'text-sm' : 'text-base'} text-gray-600 leading-relaxed`}>
                {currentContent.buyers.description}
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                  <img 
                    src={currentContent.admins.image} 
                    alt={currentContent.admins.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <h3 className={`${currentLanguage === 'kh' ? 'text-lg lg:text-xl' : 'text-xl lg:text-2xl'} font-bold text-gray-900 mb-4`}>
                {currentContent.admins.title}
              </h3>
              <p className={`${currentLanguage === 'kh' ? 'text-sm' : 'text-base'} text-gray-600 leading-relaxed`}>
                {currentContent.admins.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`${currentLanguage === 'kh' ? 'text-2xl lg:text-3xl' : 'text-3xl lg:text-4xl'} font-bold text-gray-900 mb-4`}>
              {currentContent.featuresTitle}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentContent.features.map((feature, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform">
                {/* Image Section */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-lg"></div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-8">
                  <h3 className={`${currentLanguage === 'kh' ? 'text-lg' : 'text-xl'} font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300`}>
                    {feature.title}
                  </h3>
                  <p className={`${currentLanguage === 'kh' ? 'text-sm' : 'text-base'} text-gray-600 leading-relaxed`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-green-600 to-green-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20">
            <h2 className={`${currentLanguage === 'kh' ? 'text-2xl lg:text-3xl' : 'text-3xl lg:text-4xl'} font-bold text-white mb-6`}>
              {currentContent.ctaTitle}
            </h2>
            <p className={`${currentLanguage === 'kh' ? 'text-base lg:text-lg' : 'text-lg lg:text-xl'} text-green-50 mb-8 leading-relaxed`}>
              {currentContent.ctaText}
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/25 group">
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