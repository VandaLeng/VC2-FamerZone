const learningContentData = {
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
        featuredCourses: [{
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
                image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            }
        ],

        quickTipsTitle: "Quick Learning Tips",
        quickTips: [{
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
        resources: [{
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
        featuredCourses: [{
                id: 1,
                category: 'crops',
                title: "ការដាំស្រូវប្រកបដោយឧត្តមភាព",
                description: "ស្វែងយល់បច្ចេកទេសដាំស្រូវបែបប្រពៃណី និងទំនើបសម្រាប់ទទួលបានផលិតផល និងគុណភាពអតិបរមា។",
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
                description: "ស្វែងរកបច្ចេកវិទ្យាកសិកម្មទំនើប ឧបករណ៍ចាប់សញ្ញា និងវិធីសាស្រ្តកសិកម្មដោយផ្អែកលើទិន្នន័យ។",
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
                image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            }
        ],

        quickTipsTitle: "ការណែនាំរហ័ស",
        quickTips: [{
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
        resources: [{
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

export default learningContentData;