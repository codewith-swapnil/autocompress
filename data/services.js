// data/services.js
import {
    Bell, Wrench, MapPin, RefreshCw, Search, Star,
    CheckCircle, User, ArrowLeft, ArrowRight, Home,
    UserPlus, MoreHorizontal, Trash2, Calendar, Wallet, Users
} from 'lucide-react';

export const services = {
    "Plumbing": {
        title: "प्लंबिंग सेवाएं",
        description: "हमारे सत्यापित प्लंबिंग विशेषज्ञ पाइप लीक, नल स्थापना, सीवर लाइन मरम्मत और अन्य सभी प्लंबिंग समस्याओं के लिए तत्काल सेवा प्रदान करते हैं।",
        icon: "🚿",
        providers: [
            { name: "Rajesh Kumar", rating: 4.8, reviews: 128, location: "सेक्टर 22, दिल्ली" },
            { name: "Vikram Singh", rating: 4.9, reviews: 95, location: "नोएडा सेक्टर 62" },
            { name: "Anil Sharma", rating: 4.7, reviews: 201, location: "ग्रेटर नोएडा" }
        ]
    },
    "Electrical": {
        title: "इलेक्ट्रिकल सेवाएं",
        description: "प्रमाणित इलेक्ट्रीशियन द्वारा वायरिंग, स्विचबोर्ड मरम्मत, लाइटिंग स्थापना और सभी प्रकार की विद्युत समस्याओं का समाधान।",
        icon: "💡",
        providers: [
            { name: "Sunil Sharma", rating: 4.9, reviews: 156, location: "अंधेरी पश्चिम, मुंबई" },
            { name: "Amit Patel", rating: 4.7, reviews: 89, location: "नोएडा सेक्टर 18" }
        ]
    },
    "Painting": {
        title: "पेंटिंग सेवाएं",
        description: "हमारे अनुभवी पेंटर्स घर, कार्यालय और वाणिज्यिक स्थानों के लिए उच्च गुणवत्ता वाली पेंटिंग सेवाएं प्रदान करते हैं।",
        icon: "🎨",
        providers: [
            { name: "Ramesh Verma", rating: 4.6, reviews: 72, location: "ग्रेटर कैलाश, दिल्ली" }
        ]
    },
    "Carpentry": {
        title: "बढ़ईगीरी सेवाएं",
        description: "फर्नीचर मरम्मत, कस्टम वुडवर्क, दरवाजा-खिड़की स्थापना और सभी बढ़ईगीरी कार्यों के लिए विशेषज्ञ।",
        icon: "🔨",
        providers: [
            { name: "Mohan Lal", rating: 4.5, reviews: 64, location: "सेक्टर 45, गुरुग्राम" }
        ]
    },
    "AC Repair": {
        title: "एसी मरम्मत सेवाएं",
        description: "सर्टिफाइड तकनीशियन द्वारा एसी सर्विसिंग, गैस भराई, मरम्मत और रखरखाव सेवाएं उपलब्ध।",
        icon: "❄️",
        providers: [
            { name: "Sanjay Gupta", rating: 4.8, reviews: 112, location: "वसंत कुंज, दिल्ली" }
        ]
    },
    "Cleaning": {
        title: "सफाई सेवाएं",
        description: "पेशेवर सफाईकर्मी द्वारा घर, कार्यालय, कार और फर्नीचर की गहरी सफाई सेवाएं उपलब्ध।",
        icon: "🧹",
        providers: [
            { name: "Priya Cleaners", rating: 4.7, reviews: 205, location: "साकेत, दिल्ली" }
        ]
    }
};

export const locations = [
    "सेक्टर 62, नोएडा",
    "ग्रेटर कैलाश, दिल्ली",
    "बांद्रा पश्चिम, मुंबई",
    "जयनगर, बैंगलोर",
    "साल्ट लेक सिटी, कोलकाता"
];

export const notifications = [
    {
        id: 1,
        title: 'बुकिंग की पुष्टि हुई',
        message: 'आपकी प्लंबिंग सेवा की बुकिंग कल सुबह 10 बजे के लिए पुष्टि की गई है।',
        time: '10 मिनट पहले',
        unread: true,
        icon: Calendar
    },
    {
        id: 2,
        title: 'रीव्यू का अनुरोध',
        message: 'कृपया राजेश कुमार द्वारा प्रदान की गई हाल की इलेक्ट्रिकल सेवा पर अपनी समीक्षा साझा करें।',
        time: '2 घंटे पहले',
        unread: false,
        icon: Star
    },
    {
        id: 3,
        title: 'भुगतान प्राप्त हुआ',
        message: 'आपका भुगतान ₹1,200 सफलतापूर्वक प्राप्त हो गया है। धन्यवाद!',
        time: '2 दिन पहले',
        unread: false,
        icon: Wallet
    },
    {
        id: 4,
        title: 'नया प्रदाता जुड़ा',
        message: 'अब हमारे प्लेटफॉर्म पर 10 नए सत्यापित पेंटिंग विशेषज्ञ उपलब्ध हैं।',
        time: '3 दिन पहले',
        unread: false,
        icon: Users
    }
];