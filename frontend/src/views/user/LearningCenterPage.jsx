import React, { useState } from 'react';
import '../../styles/LearningCenterStyle.css';

const EnhancedLearningCenter = ({ currentLanguage = 'en' }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Function to get translated value with fallback
  const getTranslation = (key, defaultValue, context = {}) => {
    const langContent = content[currentLanguage] || content['en'];
    if (typeof context === 'object' && context !== null && context.id) {
      const courseIndex = context.id - 1;
      if (key.startsWith('courses[')) {
        const subKey = key.replace(`courses[${courseIndex}].`, '');
        return langContent.courses?.[courseIndex]?.[subKey] || defaultValue;
      }
    }
    return langContent[key] !== undefined ? langContent[key] : defaultValue;
  };

  const content = {
    en: {
      heroTitle: "Discover Agricultural Learning Resources",
      heroSubtitle: "Curated Recommendations for Modern Farming Education",
      heroDescription: "Explore the best online agricultural courses, tutorials, and resources from trusted educational platforms. Connect directly with training providers for personalized guidance.",
      categories: [
        { id: 'all', title: 'All Resources', count: '48' },
        { id: 'crops', title: 'Crop Management', count: '16' },
        { id: 'livestock', title: 'Livestock Care', count: '12' },
        { id: 'business', title: 'Agri-Business', count: '10' },
        { id: 'technology', title: 'Smart Farming', count: '10' }
      ],
      courses: [
        {
          id: 1,
          category: 'crops',
          title: "Advanced Rice Cultivation",
          description: "Master both traditional and modern rice farming techniques for maximum yield and sustainability through expert-led video courses.",
          duration: "6 weeks",
          lessons: "24 lessons",
          level: "Intermediate",
          rating: 4.8,
          students: 1250,
          image: "https://media.istockphoto.com/id/1132684948/photo/rice-paddies.jpg?s=612x612&w=0&k=20&c=UECzCG66U281TiWWdewOMS_ZA_NxeBlKAXXqIR-ExQA=",
          instructor: "Prof. Sambo Khen",
          highlights: ['SRI Method', 'Pest Management', 'Soil Health', 'Water Management'],
          platforms: [
            { name: "Coursera - Rice Production", url: "https://www.coursera.org/learn/rice-production", type: "Video Course", price: "Free with Certificate Option" },
            { name: "YouTube - Modern Rice Farming", url: "https://youtube.com/playlist?list=rice-farming-techniques", type: "Video Playlist", price: "Free" },
            { name: "edX - Sustainable Agriculture", url: "https://www.edx.org/course/sustainable-agriculture", type: "Online Course", price: "Free Audit" }
          ],
          contact: { name: "Prof. Sambo Khen", phone: "+855 12 345 678", email: "sambo.khen@agri-cambodia.edu", organization: "Cambodia Agricultural Institute" }
        },
        {
          id: 2,
          category: 'crops',
          title: "Organic Vegetable Production",
          description: "Learn sustainable vegetable farming without chemicals through comprehensive online resources and expert guidance.",
          duration: "4 weeks",
          lessons: "16 lessons",
          level: "Beginner",
          rating: 4.9,
          students: 890,
          image: "https://media.istockphoto.com/id/2159967225/photo/growing-lettuce-watering-the-garden-bed-with-a-watering-can.jpg?s=612x612&w=0&k=20&c=WeZSKGyPUNe4ix1-S-dXdQZRoGLJEUKVNIhXqB8GCBI=",
          instructor: "Ms. Sreypov Lim",
          highlights: ['Organic Certification', 'Composting', 'Natural Pesticides', 'Market Premium'],
          platforms: [
            { name: "FutureLearn - Organic Farming", url: "https://www.futurelearn.com/courses/organic-farming", type: "Interactive Course", price: "Free Access" },
            { name: "Khan Academy - Agriculture Basics", url: "https://www.khanacademy.org/science/agriculture", type: "Video Lessons", price: "Free" },
            { name: "Udemy - Organic Vegetable Gardening", url: "https://www.udemy.com/course/organic-vegetable-gardening/", type: "Video Course", price: "$49.99" }
          ],
          contact: { name: "Ms. Sreypov Lim", phone: "+855 12 567 890", email: "sreypov.lim@organic-cambodia.org", organization: "Cambodia Organic Farmers Association" }
        },
        {
          id: 3,
          category: 'livestock',
          title: "Modern Poultry Management",
          description: "Comprehensive poultry farming education covering breeding, health management, and business optimization through online platforms.",
          duration: "5 weeks",
          lessons: "20 lessons",
          level: "Intermediate",
          rating: 4.7,
          students: 650,
          image: "https://media.istockphoto.com/id/1436256943/photo/egg-production-on-selection-process-from-laying-hens.jpg?s=612x612&w=0&k=20&c=OodQhLye2DdmUIBUwX0S0fRCfmMqkCFkE-F6oWq2MOM=",
          instructor: "Dr. Pisach Teng",
          highlights: ['Disease Prevention', 'Feed Optimization', 'Housing Design', 'Profit Analysis'],
          platforms: [
            { name: "FAO E-learning - Poultry Production", url: "https://www.fao.org/elearning/course/poultry-production", type: "Professional Course", price: "Free" },
            { name: "YouTube - Poultry Farming Channel", url: "https://youtube.com/channel/poultry-farming-guide", type: "Video Tutorials", price: "Free" },
            { name: "Coursera - Animal Husbandry", url: "https://www.coursera.org/learn/animal-husbandry", type: "University Course", price: "Free Audit" }
          ],
          contact: { name: "Dr. Pisach Teng", phone: "+855 17 234 567", email: "pisach.teng@livestock-cambodia.edu", organization: "Royal University of Agriculture" }
        },
        {
          id: 4,
          category: 'business',
          title: "Digital Agricultural Marketing",
          description: "Master online marketing strategies to sell agricultural products directly to consumers through digital platforms and social media.",
          duration: "3 weeks",
          lessons: "12 lessons",
          level: "Beginner",
          rating: 4.6,
          students: 420,
          image: "https://media.istockphoto.com/id/1215793469/photo/farmer-using-technology-at-a-hydroponic-lettuce-crop.jpg?s=612x612&w=0&k=20&c=NI1190rn8KqxUpiFjGEHqRwR3RwyB0KvpzMMLf3h51A=",
          instructor: "Mr. Virak Chan",
          highlights: ['Social Media Marketing', 'E-commerce Setup', 'Customer Relations', 'Price Strategy'],
          platforms: [
            { name: "Google Digital Marketing Course", url: "https://learndigital.withgoogle.com/digitalgarage", type: "Certification Course", price: "Free" },
            { name: "Facebook Blueprint", url: "https://www.facebook.com/business/learn", type: "Social Media Marketing", price: "Free" },
            { name: "Skillshare - Digital Marketing", url: "https://www.skillshare.com/browse/business/marketing", type: "Creative Courses", price: "Free Trial" }
          ],
          contact: { name: "Mr. Virak Chan", phone: "+855 96 789 012", email: "virak.chan@digital-agri.com", organization: "Cambodia Digital Agriculture Hub" }
        },
        {
          id: 5,
          category: 'technology',
          title: "Smart Irrigation Systems",
          description: "Learn to design and implement automated irrigation systems using sensors and mobile technology through online engineering courses.",
          duration: "4 weeks",
          lessons: "18 lessons",
          level: "Advanced",
          rating: 4.8,
          students: 320,
          image: "https://media.istockphoto.com/id/898449496/photo/agriculture-drone-fly-to-sprayed-fertilizer-on-the-green-tea-fie.jpg?s=612x612&w=0&k=20&c=XB9L5U65qaNqs8k7KPKOiL6N_mj1d1JpKPJFcmMsrz0=",
          instructor: "Eng. Sopheak Ros",
          highlights: ['Sensor Technology', 'Mobile Apps', 'Water Conservation', 'Cost Analysis'],
          platforms: [
            { name: "MIT OpenCourseWare - Water Systems", url: "https://ocw.mit.edu/courses/water-systems/", type: "University Course", price: "Free" },
            { name: "Arduino Project Hub", url: "https://create.arduino.cc/projecthub/projects/tags/irrigation", type: "DIY Projects", price: "Free" },
            { name: "Coursera - IoT Agriculture", url: "https://www.coursera.org/learn/iot-agriculture", type: "Technical Course", price: "Free Audit" }
          ],
          contact: { name: "Eng. Sopheak Ros", phone: "+855 78 345 678", email: "sopheak.ros@smartfarm-cambodia.tech", organization: "Cambodia Smart Agriculture Tech" }
        },
        {
          id: 6,
          category: 'business',
          title: "Agricultural Finance & Investment",
          description: "Master financial planning, investment strategies, and funding opportunities for agricultural businesses through expert-led online courses.",
          duration: "3 weeks",
          lessons: "14 lessons",
          level: "Intermediate",
          rating: 4.5,
          students: 280,
          image: "https://media.istockphoto.com/id/1400960132/photo/light-bulb-is-located-on-soil-plants-grow-on-stacked-coins-renewable-energy-generation-is.jpg?s=612x612&w=0&k=20&c=BdJbzNurQMAsxkINA9dF1quvLNPK-zqA9FwOodTdbn8=",
          instructor: "Ms. Chanthy Sok",
          highlights: ['Loan Applications', 'Investment Planning', 'Risk Management', 'Profit Optimization'],
          platforms: [
            { name: "World Bank Open Learning Campus", url: "https://olc.worldbank.org/content/agricultural-finance", type: "Professional Development", price: "Free" },
            { name: "Coursera - Agricultural Finance", url: "https://www.coursera.org/learn/agricultural-finance", type: "University Course", price: "Free Audit" },
            { name: "LinkedIn Learning - Business Finance", url: "https://www.linkedin.com/learning/topics/business-finance", type: "Professional Course", price: "Free Trial" }
          ],
          contact: { name: "Ms. Chanthy Sok", phone: "+855 15 456 789", email: "chanthy.sok@agrifinance-cambodia.com", organization: "Cambodia Agricultural Finance Institute" }
        }
      ],
      stats: {
        title: "Learning Resources Impact",
        data: [
          { label: "Curated Resources", value: "500+" },
          { label: "Expert Instructors", value: "45+" },
          { label: "Partner Platforms", value: "25+" },
          { label: "Success Stories", value: "94%" }
        ]
      },
      buttons: {
        viewResources: "View Resources",
        learnMore: "Learn More",
        contactInstructor: "Contact Instructor",
        visitPlatform: "Visit Platform",
        getRecommendations: "Get Recommendations"
      }
    },
    kh: {
      heroTitle: "ស្វែងរកធនធានសិក្សាកសិកម្ម",
      heroSubtitle: "ការណែនាំដែលបានជ្រើសរើសសម្រាប់ការអប់រំកសិកម្មទំនើប",
      heroDescription: "ស្វែងយល់មេរៀនកសិកម្មអនឡាញ ការបង្រៀន និងធនធានល្អបំផុតពីវេទិកាអប់រំដែលអាចទុកចិត្តបាន។ ទាក់ទងដោយផ្ទាល់ជាមួយអ្នកផ្តល់ការបណ្តុះបណ្តាលសម្រាប់ការណែនាំផ្ទាល់ខ្លួន។",
      categories: [
        { id: 'all', title: 'គ្រប់ធនធាន', count: '48' },
        { id: 'crops', title: 'ការគ្រប់គ្រងដំណាំ', count: '16' },
        { id: 'livestock', title: 'ការថែទាំសត្វ', count: '12' },
        { id: 'business', title: 'អាជីវកម្មកសិ', count: '10' },
        { id: 'technology', title: 'កសិកម្មឆ្លាតវៃ', count: '10' }
      ],
      courses: [
        {
          id: 1,
          category: 'crops',
          title: "ការដាំស្រូវកម្រិតខ្ពស់",
          description: "ស្វែងយល់បច្ចេកទេសដាំស្រូវបែបបុរាណ និងទំនើបសម្រាប់ទិន្នផលអតិបរមា និងនិរន្តរភាព។",
          duration: "6 សប្តាហ៍",
          lessons: "24 មេរៀន",
          level: "កម្រិតមធ្យម",
          rating: 4.8,
          students: 1250,
          image: "https://media.istockphoto.com/id/1132684948/photo/rice-paddies.jpg?s=612x612&w=0&k=20&c=UECzCG66U281TiWWdewOMS_ZA_NxeBlKAXXqIR-ExQA=",
          instructor: "លោកបណ្ឌិត សំបូខេន",
          highlights: ['វិធី SRI', 'ការគ្រប់គ្រងសត្វល្អ', 'សុខភាពដី', 'ការគ្រប់គ្រងទឹក'],
          platforms: [
            { name: "Coursera - ផលិតកម្មស្រូវ", url: "https://www.coursera.org/learn/rice-production", type: "វគ្គវីដេអូ", price: "ឥតគិតថ្លៃជាមួយជម្រើសសញ្ញាបត្រ" },
            { name: "YouTube - ការដាំស្រូវទំនើប", url: "https://youtube.com/playlist?list=rice-farming-techniques", type: "បញ្ជីវីដេអូ", price: "ឥតគិតថ្លៃ" },
            { name: "edX - កសិកម្មនិរន្តរភាព", url: "https://www.edx.org/course/sustainable-agriculture", type: "វគ្គអនឡាញ", price: "អង្កេតឥតគិតថ្លៃ" }
          ],
          contact: { name: "លោកបណ្ឌិត សំបូខេន", phone: "+855 12 345 678", email: "sambo.khen@agri-cambodia.edu", organization: "វិទ្យាស្ថានកសិកម្មកម្ពុជា" }
        },
        {
          id: 2,
          category: 'crops',
          title: "ការផលិតបន្ទះបន្លែសរីរាង្គ",
          description: "ស្វែងយល់ពីការដាំបន្លែសរីរាង្គដោយគ្មានគីមីតាមរយៈធនធានអនឡាញ និងការណែនាំពីអ្នកជំនាញ។",
          duration: "4 សប្តាហ៍",
          lessons: "16 មេរៀន",
          level: "កម្រិតចាប់ផ្តើម",
          rating: 4.9,
          students: 890,
          image: "https://media.istockphoto.com/id/2159967225/photo/growing-lettuce-watering-the-garden-bed-with-a-watering-can.jpg?s=612x612&w=0&k=20&c=WeZSKGyPUNe4ix1-S-dXdQZRoGLJEUKVNIhXqB8GCBI=",
          instructor: "នាង ស្រីពៅ លីម",
          highlights: ['សញ្ញាបត្រសរីរាង្គ', 'ការផលិតលាមក', 'ថ្នាំកសិកម្មធម្មជាតិ', 'តម្លៃផ្សារខ្ពស់'],
          platforms: [
            { name: "FutureLearn - កសិកម្មសរីរាង្គ", url: "https://www.futurelearn.com/courses/organic-farming", type: "វគ្គអន្តរកម្ម", price: "ចូលប្រើឥតគិតថ្លៃ" },
            { name: "Khan Academy - មូលដ្ឋានកសិកម្ម", url: "https://www.khanacademy.org/science/agriculture", type: "មេរៀនវីដេអូ", price: "ឥតគិតថ្លៃ" },
            { name: "Udemy - ការដាំឱសថសរីរាង្គ", url: "https://www.udemy.com/course/organic-vegetable-gardening/", type: "វគ្គវីដេអូ", price: "$49.99" }
          ],
          contact: { name: "នាង ស្រីពៅ លីម", phone: "+855 12 567 890", email: "sreypov.lim@organic-cambodia.org", organization: "សមាគមអ្នកចម្ការសរីរាង្គកម្ពុជា" }
        },
        {
          id: 3,
          category: 'livestock',
          title: "ការគ្រប់គ្រងសត្វក្តាន់ទំនើប",
          description: "ការអប់រំកសិកម្មសត្វក្តាន់ទូលំទូលាយដោយគ្របដណ្តប់លើការបង្កាត់ ការគ្រប់គ្រងសុខភាព និងការប្រសើរអាជីវកម្មតាមរយៈវេទិកាអនឡាញ។",
          duration: "5 សប្តាហ៍",
          lessons: "20 មេរៀន",
          level: "កម្រិតមធ្យម",
          rating: 4.7,
          students: 650,
          image: "https://media.istockphoto.com/id/1436256943/photo/egg-production-on-selection-process-from-laying-hens.jpg?s=612x612&w=0&k=20&c=OodQhLye2DdmUIBUwX0S0fRCfmMqkCFkE-F6oWq2MOM=",
          instructor: "លោកវេជ្ជបណ្ឌិត ពិសាច ទេង",
          highlights: ['ការបង្ការជំងឺ', 'ការប្រសើរអាហារ', 'ការរចនាផ្ទះ', 'ការវិភាគប្រាក់ចំណេញ'],
          platforms: [
            { name: "FAO E-learning - ផលិតកម្មសត្វក្តាន់", url: "https://www.fao.org/elearning/course/poultry-production", type: "វគ្គអាជីព", price: "ឥតគិតថ្លៃ" },
            { name: "YouTube - ចនលផលិតកម្មសត្វក្តាន់", url: "https://youtube.com/channel/poultry-farming-guide", type: "មេរៀនវីដេអូ", price: "ឥតគិតថ្លៃ" },
            { name: "Coursera - ការថែទាំសត្វ", url: "https://www.coursera.org/learn/animal-husbandry", type: "វគ្គសាកលវិទ្យាល័យ", price: "អង្កេតឥតគិតថ្លៃ" }
          ],
          contact: { name: "លោកវេជ្ជបណ្ឌិត ពិសាច ទេង", phone: "+855 17 234 567", email: "pisach.teng@livestock-cambodia.edu", organization: "សាកលវិទ្យាល័យភូមិន្ទកសិកម្ម" }
        },
        {
          id: 4,
          category: 'business',
          title: "ទីផ្សារកសិកម្មឌីជីថល",
          description: "គ្រប់គ្រងយុទ្ធសាស្ត្រទីផ្សារអនឡាញដើម្បីលក់ផលិតផលកសិកម្មដោយផ្ទាល់ទៅកាន់អ្នកប្រើប្រាស់តាមរយៈវេទិកាឌីជីថល និងបណ្តាញសង្គម។",
          duration: "3 សប្តាហ៍",
          lessons: "12 មេរៀន",
          level: "កម្រិតចាប់ផ្តើម",
          rating: 4.6,
          students: 420,
          image: "https://media.istockphoto.com/id/1215793469/photo/farmer-using-technology-at-a-hydroponic-lettuce-crop.jpg?s=612x612&w=0&k=20&c=NI1190rn8KqxUpiFjGEHqRwR3RwyB0KvpzMMLf3h51A=",
          instructor: "លោក វីរៈ ចាន់",
          highlights: ['ទីផ្សារបណ្តាញសង្គម', 'ការដំឡើងអេ-វណ្ណៈ', 'ទំនាក់ទំនងអតិថិជន', 'យុទ្ធសាស្ត្រតម្លៃ'],
          platforms: [
            { name: "វគ្គទីផ្សារឌីជីថល Google", url: "https://learndigital.withgoogle.com/digitalgarage", type: "វគ្គសញ្ញាបត្រ", price: "ឥតគិតថ្លៃ" },
            { name: "Facebook Blueprint", url: "https://www.facebook.com/business/learn", type: "ទីផ្សារបណ្តាញសង្គម", price: "ឥតគិតថ្លៃ" },
            { name: "Skillshare - ទីផ្សារឌីជីថល", url: "https://www.skillshare.com/browse/business/marketing", type: "វគ្គច្នៃប្រឌិត", price: "ការសាកល្បងឥតគិតថ្លៃ" }
          ],
          contact: { name: "លោក វីរៈ ចាន់", phone: "+855 96 789 012", email: "virak.chan@digital-agri.com", organization: "មជ្ឈមណ្ឌលកសិកម្មឌីជីថលកម្ពុជា" }
        },
        {
          id: 5,
          category: 'technology',
          title: "ប្រព័ន្ធស្រោចស៊ីឆ្លាតវៃ",
          description: "ស្វែងយល់ពីការរចនា និងការអនុវត្តប្រព័ន្ធស្រោចស៊ីអូតូម៉ាទិកដោយប្រើឧបករណ៍ហ្វឹកហាត់ និងបច្ចេកវិទ្យាទូរស័ព្ទតាមរយៈវគ្គវិស្វកម្មអនឡាញ។",
          duration: "4 សប្តាហ៍",
          lessons: "18 មេរៀន",
          level: "កម្រិតខ្ពស់",
          rating: 4.8,
          students: 320,
          image: "https://media.istockphoto.com/id/898449496/photo/agriculture-drone-fly-to-sprayed-fertilizer-on-the-green-tea-fie.jpg?s=612x612&w=0&k=20&c=XB9L5U65qaNqs8k7KPKOiL6N_mj1d1JpKPJFcmMsrz0=",
          instructor: "លោកវិស្វករ សុផាក រ៉ុស",
          highlights: ['បច្ចេកវិទ្យាឧបករណ៍', 'កម្មវិធីទូរស័ព្ទ', 'ការអភិរក្សទឹក', 'ការវិភាគថ្លៃដើម'],
          platforms: [
            { name: "MIT OpenCourseWare - ប្រព័ន្ធទឹក", url: "https://ocw.mit.edu/courses/water-systems/", type: "វគ្គសាកលវិទ្យាល័យ", price: "ឥតគិតថ្លៃ" },
            { name: "Arduino Project Hub", url: "https://create.arduino.cc/projecthub/projects/tags/irrigation", type: "គម្រោង DIY", price: "ឥតគិតថ្លៃ" },
            { name: "Coursera - IoT កសិកម្ម", url: "https://www.coursera.org/learn/iot-agriculture", type: "វគ្គបច្ចេកទេស", price: "អង្កេតឥតគិតថ្លៃ" }
          ],
          contact: { name: "លោកវិស្វករ សុផាក រ៉ុស", phone: "+855 78 345 678", email: "sopheak.ros@smartfarm-cambodia.tech", organization: "បច្ចេកវិទ្យាកសិកម្មឆ្លាតវៃកម្ពុជា" }
        },
        {
          id: 6,
          category: 'business',
          title: "ហិរញ្ញវត្ថុ និងការវិនិយោគកសិកម្ម",
          description: "គ្រប់គ្រងផែនការហិរញ្ញវត្ថុ យុទ្ធសាស្ត្រវិនិយោគ និងឱកាសហិរញ្ញប្បទានសម្រាប់អាជីវកម្មកសិកម្មតាមរយៈវគ្គអនឡាញដឹកនាំដោយអ្នកជំនាញ។",
          duration: "3 សប្តាហ៍",
          lessons: "14 មេរៀន",
          level: "កម្រិតមធ្យម",
          rating: 4.5,
          students: 280,
          image: "https://media.istockphoto.com/id/1400960132/photo/light-bulb-is-located-on-soil-plants-grow-on-stacked-coins-renewable-energy-generation-is.jpg?s=612x612&w=0&k=20&c=BdJbzNurQMAsxkINA9dF1quvLNPK-zqA9FwOodTdbn8=",
          instructor: "នាង ចន្ទី សុខ",
          highlights: ['ការដាក់ពាក្យឥណទាន', 'ផែនការវិនិយោគ', 'ការគ្រប់គ្រងហានិភ័យ', 'ការប្រសើរប្រាក់ចំណេញ'],
          platforms: [
            { name: "World Bank Open Learning Campus", url: "https://olc.worldbank.org/content/agricultural-finance", type: "ការអភិវឌ្ឍអាជីព", price: "ឥតគិតថ្លៃ" },
            { name: "Coursera - ហិរញ្ញវត្ថុកសិកម្ម", url: "https://www.coursera.org/learn/agricultural-finance", type: "វគ្គសាកលវិទ្យាល័យ", price: "អង្កេតឥតគិតថ្លៃ" },
            { name: "LinkedIn Learning - ហិរញ្ញវត្ថុអាជីវកម្ម", url: "https://www.linkedin.com/learning/topics/business-finance", type: "វគ្គអាជីព", price: "ការសាកល្បងឥតគិតថ្លៃ" }
          ],
          contact: { name: "នាង ចន្ទី សុខ", phone: "+855 15 456 789", email: "chanthy.sok@agrifinance-cambodia.com", organization: "វិទ្យាស្ថានហិរញ្ញវត្ថុកសិកម្មកម្ពុជា" }
        }
      ],
      stats: {
        title: "ផលប៉ះពាល់នៃធនធានសិក្សា",
        data: [
          { label: "ធនធានដែលបានជ្រើសរើស", value: "500+" },
          { label: "គ្រូបង្រៀនជំនាញ", value: "45+" },
          { label: "វេទិកាដៃគូ", value: "25+" },
          { label: "រឿងជោគជ័យ", value: "94%" }
        ]
      },
      buttons: {
        viewResources: "មើលធនធាន",
        learnMore: "ស្វែងយល់បន្ថែម",
        contactInstructor: "ទាក់ទងគ្រូបង្រៀន",
        visitPlatform: "ទៅកាន់វេទិកា",
        getRecommendations: "ទទួលការណែនាំ"
      }
    }
  };

  const filteredCourses = activeCategory === 'all'
    ? (getTranslation('courses', []).map(course => ({
      ...course,
      title: getTranslation(`courses[${course.id - 1}].title`, course.title, course),
      description: getTranslation(`courses[${course.id - 1}].description`, course.description, course),
      duration: getTranslation(`courses[${course.id - 1}].duration`, course.duration, course),
      lessons: getTranslation(`courses[${course.id - 1}].lessons`, course.lessons, course),
      level: getTranslation(`courses[${course.id - 1}].level`, course.level, course),
      instructor: getTranslation(`courses[${course.id - 1}].instructor`, course.instructor, course),
      highlights: getTranslation(`courses[${course.id - 1}].highlights`, course.highlights, course) || [],
      platforms: getTranslation(`courses[${course.id - 1}].platforms`, course.platforms, course) || [],
      contact: {
        ...course.contact,
        name: getTranslation(`courses[${course.id - 1}].contact.name`, course.contact?.name, course),
        organization: getTranslation(`courses[${course.id - 1}].contact.organization`, course.contact?.organization, course),
      }
    })))
    : (getTranslation('courses', []).filter(course => course.category === activeCategory).map(course => ({
      ...course,
      title: getTranslation(`courses[${course.id - 1}].title`, course.title, course),
      description: getTranslation(`courses[${course.id - 1}].description`, course.description, course),
      duration: getTranslation(`courses[${course.id - 1}].duration`, course.duration, course),
      lessons: getTranslation(`courses[${course.id - 1}].lessons`, course.lessons, course),
      level: getTranslation(`courses[${course.id - 1}].level`, course.level, course),
      instructor: getTranslation(`courses[${course.id - 1}].instructor`, course.instructor, course),
      highlights: getTranslation(`courses[${course.id - 1}].highlights`, course.highlights, course) || [],
      platforms: getTranslation(`courses[${course.id - 1}].platforms`, course.platforms, course) || [],
      contact: {
        ...course.contact,
        name: getTranslation(`courses[${course.id - 1}].contact.name`, course.contact?.name, course),
        organization: getTranslation(`courses[${course.id - 1}].contact.organization`, course.contact?.organization, course),
      }
    })));

  return (
    <div className="min-h-screen bg-gray-50">
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
                  {getTranslation('heroBadge', currentLanguage === 'en' ? 'Curated Learning Resources' : 'ធនធានសិក្សាដែលបានជ្រើសរើស')}
                </div>
                <h1 className="text-4xl sm:text-6xl font-bold leading-tight animate-fade-in-up animation-delay-100">
                  {getTranslation('heroTitle', 'Discover Agricultural Learning Resources')}
                </h1>
                <p className="text-xl sm:text-2xl text-green-100 font-medium animate-fade-in-up animation-delay-200">
                  {getTranslation('heroSubtitle', 'Curated Recommendations for Modern Farming Education')}
                </p>
                <p className="text-lg text-green-50 leading-relaxed max-w-2xl animate-fade-in-up animation-delay-300">
                  {getTranslation('heroDescription', 'Explore the best online agricultural resources.')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center animate-bounce-in animation-delay-400">
                  {getTranslation('buttons.getRecommendations', 'Get Recommendations')}
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-green-800 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center animate-bounce-in animation-delay-500">
                  {getTranslation('buttons.viewResources', 'View Resources')}
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-slide-in-up animation-delay-600">
                    <h3 className="font-bold mb-2">{getTranslation('heroSection.onlineCourses', currentLanguage === 'en' ? 'Online Courses' : 'មេរៀនអនឡាញ')}</h3>
                    <p className="text-sm text-green-100">{getTranslation('heroSection.courseRecommendations', currentLanguage === 'en' ? 'Expert-curated course recommendations' : 'ការណែនាំមេរៀនដោយអ្នកជំនាញ')}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform translate-y-8 animate-slide-in-up animation-delay-700">
                    <h3 className="font-bold mb-2">{getTranslation('heroSection.directContact', currentLanguage === 'en' ? 'Direct Contact' : 'ទាក់ទងផ្ទាល់')}</h3>
                    <p className="text-sm text-green-100">{getTranslation('heroSection.connectInstructors', currentLanguage === 'en' ? 'Connect with expert instructors' : 'ទាក់ទងជាមួយគ្រូបង្រៀនជំនាញ')}</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-slide-in-up animation-delay-800">
                    <h3 className="font-bold mb-2">{getTranslation('heroSection.platformAccess', currentLanguage === 'en' ? 'Platform Access' : 'ចូលប្រើវេទិកា')}</h3>
                    <p className="text-sm text-green-100">{getTranslation('heroSection.trustedPlatforms', currentLanguage === 'en' ? 'Links to trusted learning platforms' : 'តំណភ្ជាប់ទៅវេទិកាសិក្សាដែលអាចទុកចិត្តបាន')}</p>
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
            {getTranslation('categories', []).map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 animate-slide-in-left animation-delay-${index * 100} ${activeCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-200 hover:border-green-200'
                  }`}
              >
                {category.title} ({category.count})
              </button>
            )) || <p className="animate-fade-in">{currentLanguage === 'en' ? 'No categories available' : 'គ្មានប្រភេទអាចរកបាន'}</p>}
          </div>
        </div>
      </section>

      {/* Learning Resources Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              {currentLanguage === 'en' ? 'Recommended Learning Resources' : 'ធនធានសិក្សាដែលបានណែនាំ'}
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in-up animation-delay-100">
              {currentLanguage === 'en'
                ? 'Carefully selected courses and tutorials from trusted educational platforms'
                : 'មេរៀន និងការបង្រៀនដែលបានជ្រើសរើសដោយយកចិត្តទុកដាក់ពីវេទិកាអប់រំដែលអាចទុកចិត្តបាន'}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {filteredCourses?.map((course, index) => (
              <div
                key={course.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-card-reveal animation-delay-${index * 100}`}
              >
                <div className="relative">
                  <img
                    src={course.image}
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
                      Online
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
                      <strong>{currentLanguage === 'en' ? 'Expert:' : 'អ្នកជំនាញ៖'}</strong> {course.instructor}
                    </div>
                    <div className="flex flex-wrap gap-1 animate-fade-in animation-delay-400">
                      {course.highlights?.slice(0, 3).map((highlight, index) => (
                        <span key={index} className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">
                          {highlight}
                        </span>
                      )) || <p>{currentLanguage === 'en' ? 'No highlights available' : 'គ្មានចំណុចសំខាន់អាចរកបាន'}</p>}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-3 text-center animate-slide-in-up animation-delay-500">
                      <div className="text-lg font-bold text-blue-600">
                        {currentLanguage === 'en' ? 'Multiple Platforms' : 'វេទិកាច្រើន'}
                      </div>
                      <div className="text-xs text-blue-500">
                        {currentLanguage === 'en' ? 'Free & Paid Options' : 'ជម្រើសឥតគិតថ្លៃ និងមានបង់ថ្លៃ'}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center animate-bounce-in animation-delay-600"
                    >
                      {getTranslation('buttons.viewResources', 'View Resources')}
                    </button>
                  </div>
                </div>
              </div>
            )) || <p className="animate-fade-in">{currentLanguage === 'en' ? 'No courses available' : 'គ្មានមេរៀនអាចរកបាន'}</p>}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              {getTranslation('stats.title', 'Learning Resources Impact')}
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in-up animation-delay-100">
              {currentLanguage === 'en'
                ? 'Our impact in providing high-quality agricultural education'
                : 'ផលប៉ះពាល់របស់យើងក្នុងការផ្តល់ការអប់រំកសិកម្មគុណភាពខ្ពស់'}
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {getTranslation('stats.data', []).map((stat, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg p-6 text-center animate-pop-in animation-delay-${index * 100}`}
              >
                <div className="text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Modern gradient header instead of image */}
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
                  <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                    {selectedCourse.title}
                  </h2>
                  <div className="flex items-center gap-4 text-white/90">
                    <span className="flex items-center gap-1 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {selectedCourse.duration}
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      {selectedCourse.lessons}
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                      {selectedCourse.students}
                    </span>
                  </div>
                </div>

                {/* Status badge */}
                <div className="absolute bottom-6 right-6">
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {currentLanguage === 'en' ? 'Online Available' : 'អាចរកបានអនឡាញ'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    {selectedCourse.description}
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
                      <div className="font-semibold text-blue-900">{selectedCourse.duration}</div>
                      <div className="text-sm text-blue-600">{currentLanguage === 'en' ? 'Duration' : 'រយៈពេល'}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-100">
                      <div className="font-semibold text-purple-900">{selectedCourse.lessons}</div>
                      <div className="text-sm text-purple-600">{currentLanguage === 'en' ? 'Lessons' : 'មេរៀន'}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center border border-green-100">
                      <div className="font-semibold text-green-900">{selectedCourse.students}</div>
                      <div className="text-sm text-green-600">{currentLanguage === 'en' ? 'Students' : 'សិស្ស'}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {currentLanguage === 'en' ? 'Course Highlights' : 'ចំណុចសំខាន់នៃមេរៀន'}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedCourse.highlights?.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                          <span className="text-gray-700 text-sm">{highlight}</span>
                        </div>
                      )) || <p>{currentLanguage === 'en' ? 'No highlights available' : 'គ្មានចំណុចសំខាន់អាចរកបាន'}</p>}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                      {currentLanguage === 'en' ? 'Recommended Learning Platforms' : 'វេទិកាសិក្សាដែលបានណែនាំ'}
                    </h3>
                    <div className="space-y-4">
                      {selectedCourse.platforms?.map((platform, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all">
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
                              {getTranslation('buttons.visitPlatform', 'Visit Platform')}
                            </a>
                          </div>
                        </div>
                      )) || <p>{currentLanguage === 'en' ? 'No platforms available' : 'គ្មានវេទិកាអាចរកបាន'}</p>}
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                      </svg>
                      {currentLanguage === 'en' ? 'Note:' : 'ចំណាំ៖'}
                    </h4>
                    <p className="text-amber-700 text-sm">
                      {currentLanguage === 'en'
                        ? 'These are curated recommendations from trusted educational platforms. For personalized guidance and additional support, contact the expert instructor directly.'
                        : 'ទាំងនេះគឺជាការណែនាំដែលបានជ្រើសរើសពីវេទិកាអប់រំដែលអាចទុកចិត្តបាន។ សម្រាប់ការណែនាំផ្ទាល់ខ្លួន និងការគាំទ្របន្ថែម សូមទាក់ទងគ្រូបង្រៀនជំនាញដោយផ្ទាល់។'}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 sticky top-6 border border-gray-200">
                    <div className="text-center mb-6">
                      <div className="text-sm text-gray-500 mb-1">
                        {currentLanguage === 'en' ? 'Expert Instructor' : 'គ្រូបង្រៀនជំនាញ'}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedCourse.instructor}
                      </div>
                      <div className="flex items-center justify-center mb-2">
                        <span className="font-semibold text-amber-600">{selectedCourse.rating}/5.0</span>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 mb-6 border border-green-200 shadow-sm">
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {currentLanguage === 'en' ? 'Contact Information' : 'ព័ត៌មានទំនាក់ទំនង'}
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <a href={`tel:${selectedCourse.contact?.phone}`} className="text-blue-600 hover:underline">
                            {selectedCourse.contact?.phone || 'N/A'}
                          </a>
                        </div>
                        <div className="flex items-center text-sm">
                          <a href={`mailto:${selectedCourse.contact?.email}`} className="text-blue-600 hover:underline break-all">
                            {selectedCourse.contact?.email || 'N/A'}
                          </a>
                        </div>
                        <div className="flex items-start text-sm">
                          <span className="text-gray-700">
                            {selectedCourse.contact?.organization || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                        {getTranslation('buttons.contactInstructor', 'Contact Instructor')}
                      </button>
                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                        {getTranslation('buttons.viewResources', 'View Resources')}
                      </button>
                    </div>

                    <div className="mt-6 text-center">
                      <p className="text-xs text-gray-500">
                        {currentLanguage === 'en'
                          ? 'Contact the instructor for personalized guidance and enrollment assistance'
                          : 'ទាក់ទងគ្រូបង្រៀនសម្រាប់ការណែនាំផ្ទាល់ខ្លួន និងជំនួយក្នុងការចុះឈ្មោះ'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section id="cta" className="py-20 bg-gradient-to-r from-green-700 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-12 left-12 w-28 h-28 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-16 right-16 w-20 h-20 bg-white/15 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-float-slow"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in-up">
            {currentLanguage === 'en' ? 'Ready to Start Learning?' : 'តើអ្នករៀបចំចាប់ផ្តើមរៀនហើយឬនៅ?'}
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed animate-fade-in-up animation-delay-100">
            {currentLanguage === 'en'
              ? 'Connect with expert instructors and access curated learning resources from top educational platforms worldwide.'
              : 'ទាក់ទងជាមួយគ្រូបង្រៀនជំនាញ និងចូលប្រើធនធានសិក្សាដែលបានជ្រើសរើសពីវេទិកាអប់រំកំពូលទូទាំងពិភពលោក។'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg animate-bounce-in animation-delay-200">
              {getTranslation('buttons.getRecommendations', 'Get Recommendations')}
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 animate-bounce-in animation-delay-300">
              {getTranslation('buttons.contactInstructor', 'Contact Expert')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedLearningCenter;