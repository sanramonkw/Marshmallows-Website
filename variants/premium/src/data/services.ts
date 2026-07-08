// Price lists extracted verbatim from the live site (2026-07-02).
// AR pages: /services-ar/salon-service-ar/, /services-ar/home-service-ar/
// EN pages: /en/services/salon-service/, /en/services/home-service/

export interface PriceItem {
  name?: string;
  price?: string;
  note?: string;
}

export interface PriceCategory {
  category: string;
  items: PriceItem[];
}

export const salonService: Record<'ar' | 'en', PriceCategory[]> = {
  ar: [
  {
    "category": "الأظافر",
    "items": [
      {
        "name": "مانيكير باديكير",
        "price": "12 د.ك"
      },
      {
        "name": "مانيكير باديكير مع فوتلوجيكس",
        "price": "18 د.ك"
      },
      {
        "name": "مانيكير وباديكير مارشميلو",
        "price": "18 د.ك"
      },
      {
        "name": "مانيكير وباديكير كولاجين",
        "price": "20 د.ك"
      },
      {
        "name": "طلاء أظافر فقط",
        "price": "2 د.ك"
      },
      {
        "name": "إزالة طلاء الأظافر",
        "price": "1 د.ك"
      },
      {
        "name": "فرنش تيب",
        "price": "من 2 إلى 5 د.ك"
      },
      {
        "name": "برد فقط",
        "price": "1 د.ك"
      },
      {
        "name": "قص وبرد",
        "price": "2 د.ك"
      },
      {
        "name": "مانيكير روسي",
        "price": "8 د.ك"
      },
      {
        "name": "مانيكير روسي كامل",
        "price": "20 د.ك"
      }
    ]
  },
  {
    "category": "تقشير",
    "items": [
      {
        "name": "تقشير عادي للأيد والقدم",
        "price": "3 د.ك"
      },
      {
        "name": "تقشير مارشميلوز للأيد والقدم",
        "price": "4 د.ك"
      },
      {
        "name": "فوتلوجيكس",
        "price": "6 د.ك"
      }
    ]
  },
  {
    "category": "طلاء جل للأظافر",
    "items": [
      {
        "name": "طلاء جل للأظافر",
        "price": "8 د.ك"
      },
      {
        "name": "إزالة طلاء الجل",
        "price": "3 د.ك"
      },
      {
        "name": "جل بابل",
        "price": "12 د.ك"
      },
      {
        "name": "إزالة جل بابل",
        "price": "5 د.ك"
      },
      {
        "name": "طلاء جل مع أظافر كروم",
        "price": "13 د.ك"
      },
      {
        "name": "طلاء جل مع أظافر أومبري",
        "price": "13 د.ك"
      },
      {
        "name": "طلاء جل مع أظافر كات آي",
        "price": "13 د.ك"
      },
      {
        "name": "طلاء جل مع أومبري وكروم",
        "price": "15 د.ك"
      },
      {
        "name": "طلاء جل مع فرنش وكروم",
        "price": "15 د.ك"
      },
      {
        "name": "طلاء جل مع أومبري وكات آي",
        "price": "15 د.ك"
      },
      {
        "name": "طلاء جل مع فرنش وكات آي",
        "price": "15 د.ك"
      },
      {
        "name": "كات آي لكل إصبع",
        "price": "1 د.ك"
      },
      {
        "name": "فرنش تيب",
        "price": "من 2 إلى 5 د.ك"
      }
    ]
  },
  {
    "category": "فن الأظافر",
    "items": [
      {
        "name": "فن الأظافر لكل إصبع",
        "price": "من 500 فلس إلى 3 د.ك"
      },
      {
        "name": "فرنش عميق لكل إصبع",
        "price": "500 فلس"
      },
      {
        "name": "فن جل بلومينغ لكل إصبع",
        "price": "من 1 إلى 3 د.ك"
      }
    ]
  },
  {
    "category": "تركيب الأظافر",
    "items": [
      {
        "name": "اظافر بلاستيك",
        "price": "10 د.ك"
      },
      {
        "name": "إزالة أظافر بلاستيك",
        "price": "5 د.ك"
      },
      {
        "name": "اظافر بلاستيك لكل إصبع",
        "price": "1 د.ك"
      },
      {
        "name": "تركيب اظافر بلاستيك",
        "price": "3 د.ك"
      },
      {
        "name": "سوفت جل",
        "price": "20 د.ك"
      },
      {
        "name": "سوفت جل لكل إصبع",
        "price": "2 د.ك"
      },
      {
        "name": "تركيب أظافر دائمة",
        "price": "25 د.ك"
      },
      {
        "name": "إزالة تركيب الأظافر",
        "price": "8 د.ك"
      },
      {
        "name": "تركيب أظافر دائمة لكل إصبع",
        "price": "2.5 د.ك"
      }
    ]
  },
  {
    "category": "الشعر",
    "items": [
      {
        "name": "غسيل شعر عادي",
        "price": "2 د.ك"
      },
      {
        "name": "سشوار",
        "price": "من 7 د.ك فما فوق"
      },
      {
        "name": "ويفي",
        "price": "من 10 د.ك فما فوق"
      },
      {
        "name": "تسريحة شعر",
        "price": "من 20 د.ك فما فوق"
      },
      {
        "name": "ضفيره فرنسيه",
        "price": "من 2 إلى 10 د.ك"
      },
      {
        "name": "قص الغرة",
        "price": "من 2 إلى 3 د.ك"
      },
      {
        "name": "تشذيب الشعر",
        "price": "7 د.ك"
      },
      {
        "name": "قص الشعر بالمكينة",
        "price": "10 د.ك"
      },
      {
        "name": "قص شعر كامل",
        "price": "10 د.ك"
      }
    ]
  },
  {
    "category": "علاج الشعر",
    "items": [
      {
        "name": "فرد الشعر برايم",
        "price": "من 50 د.ك فما فوق"
      },
      {
        "name": "جذور برايم",
        "price": "40 د.ك"
      },
      {
        "name": "فرد الشعر بيو سموث",
        "price": "من 50 د.ك فما فوق"
      },
      {
        "name": "جذور بيو سموث",
        "price": "40 د.ك"
      }
    ]
  },
  {
    "category": "صبغة الشعر",
    "items": [
      {
        "name": "صبغة شعر لون واحد",
        "price": "من 30 د.ك فما فوق"
      },
      {
        "name": "أجرة صبغة شعر",
        "price": "من 15 د.ك فما فوق"
      },
      {
        "name": "جذور الشعر",
        "price": "15 د.ك"
      },
      {
        "name": "أجرة صبغ الجذور",
        "price": "10 د.ك"
      }
    ]
  },
  {
    "category": "العناية بالشعر",
    "items": [
      {
        "name": "ماسك شعر عادي",
        "price": "5 د.ك"
      },
      {
        "name": "صبار",
        "price": "5 د.ك"
      },
      {
        "name": "صبار مع ماسك",
        "price": "7 د.ك"
      },
      {
        "name": "خلطة أعشاب طبيعية مع ماسك",
        "price": "7 د.ك"
      },
      {
        "name": "ماسك تنظيف عميق وترطيب",
        "price": "10 د.ك"
      },
      {
        "name": "علاج فيلر للشعر",
        "price": "15 د.ك"
      },
      {
        "name": "علاج فروة الرأس",
        "price": "15 د.ك"
      }
    ]
  },
  {
    "category": "الوجه",
    "items": [
      {
        "name": "الحواجب",
        "price": "3 د.ك"
      },
      {
        "name": "خيط / شمع للشفة العلوية",
        "price": "2 د.ك"
      },
      {
        "name": "خيط كامل للوجه فقط",
        "price": "5 د.ك"
      },
      {
        "name": "خيط كامل للوجه مع الحواجب",
        "price": "7 د.ك"
      },
      {
        "name": "شمع كامل للوجه",
        "price": "7 د.ك"
      },
      {
        "name": "شمع كامل للوجه مع الحواجب",
        "price": "10 د.ك"
      },
      {
        "name": "شمع نصف الوجه",
        "price": "5 د.ك"
      },
      {
        "name": "خيط نصف الوجه",
        "price": "4 د.ك"
      },
      {
        "name": "شمع داخل الأنف",
        "price": "2 د.ك"
      }
    ]
  },
  {
    "category": "مساج",
    "items": [
      {
        "name": "مساج عادي لليد أو القدم 15 دقيقة",
        "price": "3 د.ك"
      },
      {
        "name": "مساج الرقبة أو الكتف 15 دقيقة",
        "price": "3 د.ك"
      },
      {
        "name": "مساج للأيد والقدم مع شمعة 15 دقيقة",
        "price": "5 د.ك"
      },
      {
        "name": "مساج للرأس 15 دقيقة",
        "price": "3 د.ك"
      }
    ]
  },
  {
    "category": "أميرة صغيرة",
    "items": [
      {
        "name": "مانيكير وباديكير أميرة",
        "price": "6 د.ك"
      },
      {
        "name": "طلاء أظافر أميرة",
        "price": "1 د.ك"
      },
      {
        "name": "غسيل شعر أميرة",
        "price": "2 د.ك"
      },
      {
        "name": "تجفيف شعر أميرة",
        "price": "من 5 د.ك فأكثر"
      },
      {
        "name": "تسريحة مموجة أميرة",
        "price": "7 د.ك"
      },
      {
        "name": "قص أو تشذيب شعر أميرة",
        "price": "من 5 د.ك فأكثر"
      },
      {
        "name": "علاج شعر الأميرة برايم",
        "price": "50 د.ك"
      }
    ]
  }
],
  en: [
  {
    "category": "NAILS",
    "items": [
      {
        "name": "Manicure Pedicure",
        "price": "12 KD"
      },
      {
        "name": "Manicure Pedicure with Footlogic",
        "price": "18 KD"
      },
      {
        "name": "Marshmallow Mani Pedi",
        "price": "18 KD"
      },
      {
        "name": "Collagen Mani Pedi",
        "price": "20 KD"
      },
      {
        "name": "Nail Polish Only",
        "price": "2 KD"
      },
      {
        "name": "Nail Polish Removal",
        "price": "1 KD"
      },
      {
        "name": "French Tip",
        "price": "2 KD to 5 KD"
      },
      {
        "name": "File Only",
        "price": "1 KD"
      },
      {
        "name": "Cut and File",
        "price": "2 KD"
      },
      {
        "name": "Russian Manicure",
        "price": "8 KD"
      },
      {
        "name": "Russian Full Set Manicure",
        "price": "20 KD"
      }
    ]
  },
  {
    "category": "SCRUBS TREATMENT",
    "items": [
      {
        "name": "Regular Scrubs Hand or Feet",
        "price": "3 KD"
      },
      {
        "name": "Marshmallow Scrubs Hands or Feet",
        "price": "4 KD"
      },
      {
        "name": "Footlogic",
        "price": "6 KD"
      }
    ]
  },
  {
    "category": "GEL POLISH",
    "items": [
      {
        "name": "Gel Polish",
        "price": "8 KD"
      },
      {
        "name": "Gel Polish Removal",
        "price": "3 KD"
      },
      {
        "name": "Bubble Gel",
        "price": "12 KD"
      },
      {
        "name": "Bubble Gel Removal",
        "price": "5 KD"
      },
      {
        "name": "Gel Polish with Chrome Nails",
        "price": "13 KD"
      },
      {
        "name": "Gel Polish with Ombre Nails",
        "price": "13 KD"
      },
      {
        "name": "Gel Polish with Cat Eye Nails",
        "price": "13 KD"
      },
      {
        "name": "Gel Polish with Ombre and Chrome",
        "price": "15 KD"
      },
      {
        "name": "Gel Polish with French and Chrome",
        "price": "15 KD"
      },
      {
        "name": "Gel Polish with Ombre and Cat Eye",
        "price": "15 KD"
      },
      {
        "name": "Gel Polish with French and Cat Eye",
        "price": "15 KD"
      },
      {
        "name": "Cat Eye per Finger",
        "price": "1 KD"
      },
      {
        "name": "French Tip",
        "price": "2 KD to 5 KD"
      }
    ]
  },
  {
    "category": "NAIL ART",
    "items": [
      {
        "name": "Nail Art per Finger",
        "price": "0.500 fils to 3 KD"
      },
      {
        "name": "Deep French per Finger",
        "price": "0.500 fils"
      },
      {
        "name": "Blooming Gel Art per Finger",
        "price": "1 KD to 3 KD"
      }
    ]
  },
  {
    "category": "NAIL EXTENSIONS",
    "items": [
      {
        "name": "Party Nails",
        "price": "10 KD"
      },
      {
        "name": "Party Nails Removal",
        "price": "5 KD"
      },
      {
        "name": "Party Nails per Finger",
        "price": "1 KD"
      },
      {
        "name": "Attach Party Nails",
        "price": "3 KD"
      },
      {
        "name": "Soft Gel",
        "price": "20 KD"
      },
      {
        "name": "Soft Gel per Finger",
        "price": "2 KD"
      },
      {
        "name": "Permanent Nail Extension",
        "price": "25 KD"
      },
      {
        "name": "Nail Extension Removal",
        "price": "8 KD"
      },
      {
        "name": "Permanent Nail Extension per Finger",
        "price": "2.5 KD"
      }
    ]
  },
  {
    "category": "HAIR",
    "items": [
      {
        "name": "Regular Hair Wash",
        "price": "2 KD"
      },
      {
        "name": "Blowdry",
        "price": "7 KD and up"
      },
      {
        "name": "Wavy",
        "price": "10 KD and up"
      },
      {
        "name": "Hairstyle",
        "price": "20 KD and up"
      },
      {
        "name": "Hair Braid",
        "price": "2 KD to 10 KD"
      },
      {
        "name": "Bangs Cut",
        "price": "2 KD to 3 KD"
      },
      {
        "name": "Hair Trim",
        "price": "7 KD"
      },
      {
        "name": "Machine Hair Cut",
        "price": "10 KD"
      },
      {
        "name": "Full Haircut",
        "price": "10 KD"
      }
    ]
  },
  {
    "category": "HAIR TREATMENT",
    "items": [
      {
        "name": "Straightening Prime",
        "price": "50 KD and up"
      },
      {
        "name": "Prime Roots",
        "price": "40 KD"
      },
      {
        "name": "Straightening Bio Smooth",
        "price": "50 KD and up"
      },
      {
        "name": "Bio Smooth Roots",
        "price": "40 KD"
      }
    ]
  },
  {
    "category": "HAIR CARE",
    "items": [
      {
        "name": "Regular Hair Mask",
        "price": "5 KD"
      },
      {
        "name": "Fresh Aloe Vera",
        "price": "5 KD"
      },
      {
        "name": "Fresh Aloe Vera with Mask",
        "price": "7 KD"
      },
      {
        "name": "Natural Herbs Blend with Mask",
        "price": "7 KD"
      },
      {
        "name": "Deep Cleansing Moisturizing Mask",
        "price": "10 KD"
      },
      {
        "name": "Filler Hair Treatment",
        "price": "15 KD"
      },
      {
        "name": "Hair Scalp Treatment",
        "price": "15 KD"
      }
    ]
  },
  {
    "category": "MASSAGE",
    "items": [
      {
        "name": "Regular Massage Hand or Feet 15 mins",
        "price": "3 KD"
      },
      {
        "name": "Neck or Shoulder Massage 15 mins",
        "price": "3 KD"
      },
      {
        "name": "Candle Massage Hand or Feet 15 mins",
        "price": "5 KD"
      },
      {
        "name": "Head Massage 15 mins",
        "price": "3 KD"
      }
    ]
  },
  {
    "category": "FACE",
    "items": [
      {
        "name": "Eyebrows",
        "price": "3 KD"
      },
      {
        "name": "Upper Lip Threading / Wax",
        "price": "2 KD"
      },
      {
        "name": "Full-Face Threading Only",
        "price": "5 KD"
      },
      {
        "name": "Full-Face Threading with Eyebrows",
        "price": "7 KD"
      },
      {
        "name": "Full-Face Wax",
        "price": "7 KD"
      },
      {
        "name": "Full-Face Wax with Eyebrows",
        "price": "10 KD"
      },
      {
        "name": "Half Face Wax",
        "price": "5 KD"
      },
      {
        "name": "Half Face Threading",
        "price": "4 KD"
      },
      {
        "name": "Inner Nose Wax",
        "price": "2 KD"
      }
    ]
  },
  {
    "category": "HAIR COLOR",
    "items": [
      {
        "name": "Hair Color 1 Color",
        "price": "30 KD and up"
      },
      {
        "name": "Hair Color Labor",
        "price": "15 KD and up"
      },
      {
        "name": "Roots",
        "price": "15 KD"
      },
      {
        "name": "Roots Labor",
        "price": "10 KD"
      }
    ]
  },
  {
    "category": "LITTLE PRINCESS",
    "items": [
      {
        "name": "Princess Manicure Pedicure",
        "price": "6 KD"
      },
      {
        "name": "Princess Nail Polish",
        "price": "1 KD"
      },
      {
        "name": "Princess Hair Wash",
        "price": "2 KD"
      },
      {
        "name": "Princess Blowdry",
        "price": "5 KD and up"
      },
      {
        "name": "Princess Wavy",
        "price": "7 KD"
      },
      {
        "name": "Princess Trim or Cut",
        "price": "5 KD and up"
      },
      {
        "name": "Princess Hair Treatment Prime",
        "price": "50 KD"
      }
    ]
  }
],
};

export const homeService: Record<'ar' | 'en', PriceCategory[]> = {
  ar: [
  {
    "category": "الأظافر",
    "items": [
      {
        "name": "مانيكير",
        "price": "7.5 د.ك"
      },
      {
        "name": "باديكير",
        "price": "7.5 د.ك"
      },
      {
        "name": "مانيكير مارشميلو",
        "price": "10 د.ك"
      },
      {
        "name": "باديكير مارشميلو",
        "price": "10 د.ك"
      },
      {
        "name": "مانيكير وباديكير بالكولاجين",
        "price": "22 د.ك"
      },
      {
        "name": "عناية سريعة لليدين",
        "price": "5 د.ك"
      },
      {
        "name": "عناية سريعة للقدمين",
        "price": "5 د.ك"
      },
      {
        "name": "طلاء أظافر فقط",
        "price": "2 د.ك"
      },
      {
        "name": "إزالة طلاء الأظافر",
        "price": "1 د.ك"
      },
      {
        "name": "فرنش تيب",
        "price": "من 2 إلى 5 د.ك"
      },
      {
        "name": "قص وتقليم الأظافر",
        "price": "3 د.ك"
      },
      {
        "name": "مانيكير روسي",
        "price": "8 د.ك"
      },
      {
        "name": "مانيكير روسي كامل",
        "price": "20 د.ك"
      }
    ]
  },
  {
    "category": "إطالة الأظافر",
    "items": [
      {
        "name": "أظافر بلاستيك",
        "price": "12 د.ك"
      },
      {
        "name": "إزالة أظافر بلاستيك",
        "price": "5 د.ك"
      },
      {
        "name": "أظافر بلاستيك لكل إصبع",
        "price": "1 د.ك"
      },
      {
        "name": "تركيب أظافر بلاستيك",
        "price": "3 د.ك"
      },
      {
        "name": "سوفت جل",
        "price": "25 د.ك"
      },
      {
        "name": "تركيب أظافر دائمة",
        "price": "27 د.ك"
      },
      {
        "name": "تركيب أظافر دائمة لكل إصبع",
        "price": "3 د.ك"
      },
      {
        "name": "إزالة تركيب الأظافر",
        "price": "8 د.ك"
      },
      {
        "name": "صيانة تركيب الأظافر",
        "price": "17 د.ك"
      }
    ]
  },
  {
    "category": "علاج الشعر",
    "items": [
      {
        "name": "تمليس برايم",
        "price": "من 75 د.ك فأعلى"
      },
      {
        "name": "برايم للجذور",
        "price": "45 د.ك"
      },
      {
        "name": "تمليس بيو سموث",
        "price": "من 75 د.ك فأعلى"
      },
      {
        "name": "بيو سموث للجذور",
        "price": "45 د.ك"
      }
    ]
  },
  {
    "category": "طلاء جل للأظافر",
    "items": [
      {
        "name": "جل بوليش",
        "price": "9 د.ك"
      },
      {
        "name": "إزالة الجل بوليش",
        "price": "4 د.ك"
      },
      {
        "name": "جل بابل",
        "price": "14 د.ك"
      },
      {
        "name": "إزالة جل بابل",
        "price": "7 د.ك"
      },
      {
        "name": "جيليش مع كروم",
        "price": "14 د.ك"
      },
      {
        "name": "كروم لكل إصبع",
        "price": "2 د.ك"
      },
      {
        "name": "جيليش مع أظافر أومبري",
        "price": "14 د.ك"
      },
      {
        "name": "جيليش مع أظافر كات آي",
        "price": "14 د.ك"
      },
      {
        "name": "كات آي لكل إصبع",
        "price": "2 د.ك"
      },
      {
        "name": "فرنش تيب",
        "price": "من 2 إلى 5 د.ك"
      },
      {
        "name": "جيليش مع أومبري وكروم",
        "price": "18 د.ك"
      },
      {
        "name": "جيليش مع فرنش وكروم",
        "price": "18 د.ك"
      },
      {
        "name": "جيليش مع أومبري وكات آي",
        "price": "18 د.ك"
      }
    ]
  },
  {
    "category": "فن الأظافر",
    "items": [
      {
        "name": "فن الأظافر لكل إصبع",
        "price": "من 500 فلس إلى 3 د.ك"
      },
      {
        "name": "فرنش عميق لكل إصبع",
        "price": "500 فلس"
      },
      {
        "name": "فن جل بلومينغ لكل إصبع",
        "price": "من 1 إلى 3 د.ك"
      }
    ]
  },
  {
    "category": "الشعر",
    "items": [
      {
        "name": "غسيل شعر عادي",
        "price": "3 د.ك"
      },
      {
        "name": "سشوار",
        "price": "من 10 د.ك فأعلى"
      },
      {
        "name": "ويفي",
        "price": "من 12 د.ك فأعلى"
      },
      {
        "name": "قص أطراف الشعر",
        "price": "7 د.ك"
      },
      {
        "name": "قص شعر كامل",
        "price": "10 د.ك"
      },
      {
        "name": "قص الشعر بالماكينة",
        "price": "10 د.ك"
      },
      {
        "name": "قص الغرة",
        "price": "من 2 إلى 3 د.ك"
      },
      {
        "name": "تجديل الشعر",
        "price": "من 2 إلى 10 د.ك"
      },
      {
        "name": "تسريحة شعر",
        "price": "من 25 د.ك فأعلى"
      }
    ]
  },
  {
    "category": "العناية بالشعر",
    "items": [
      {
        "name": "ماسك شعر عادي",
        "price": "من 7 د.ك فأعلى"
      },
      {
        "name": "صبار",
        "price": "7 د.ك"
      },
      {
        "name": "صبار مع ماسك",
        "price": "10 د.ك"
      },
      {
        "name": "خلطة أعشاب طبيعية مع ماسك",
        "price": "12 د.ك"
      },
      {
        "name": "ماسك شعر لتنظيف عميق وترطيب",
        "price": "12 د.ك"
      },
      {
        "name": "علاج فيلر للشعر",
        "price": "17 د.ك"
      },
      {
        "name": "علاج فروة الرأس",
        "price": "17 د.ك"
      }
    ]
  },
  {
    "category": "صبغ الشعر",
    "items": [
      {
        "name": "صبغ الشعر بلون واحد فقط",
        "price": "من 35 د.ك فأعلى"
      },
      {
        "name": "خدمة صبغ الشعر",
        "price": "من 20 د.ك فأعلى"
      },
      {
        "name": "الجذور",
        "price": "17 د.ك"
      },
      {
        "name": "خدمة الجذور",
        "price": "12 د.ك"
      }
    ]
  },
  {
    "category": "مساج",
    "items": [
      {
        "name": "مساج عادي لليد أو القدم 15 دقيقة",
        "price": "5 د.ك"
      },
      {
        "name": "مساج الشمع لليد أو القدم 15 دقيقة",
        "price": "7 د.ك"
      },
      {
        "name": "مساج الرأس 15 دقيقة",
        "price": "5 د.ك"
      },
      {
        "name": "مساج الرقبة أو الكتف 15 دقيقة",
        "price": "5 د.ك"
      },
      {
        "name": "كرسي المساج",
        "price": "2 د.ك"
      }
    ]
  },
  {
    "category": "الوجه",
    "items": [
      {
        "name": "الحواجب",
        "price": "3 د.ك"
      },
      {
        "name": "خيط أو شمع للشفاه العلوية",
        "price": "2 د.ك"
      },
      {
        "name": "خيط للوجه بالكامل فقط",
        "price": "5 د.ك"
      },
      {
        "name": "خيط للوجه بالكامل مع الحواجب",
        "price": "7 د.ك"
      },
      {
        "name": "شمع للوجه بالكامل",
        "price": "7 د.ك"
      },
      {
        "name": "شمع للوجه بالكامل مع الحواجب",
        "price": "10 د.ك"
      },
      {
        "name": "شمع نصف الوجه",
        "price": "5 د.ك"
      },
      {
        "name": "خيط نصف الوجه",
        "price": "4 د.ك"
      },
      {
        "name": "شمع داخل الأنف",
        "price": "2 د.ك"
      }
    ]
  },
  {
    "category": "أميرة صغيرة",
    "items": [
      {
        "name": "مانيكير الأميرة",
        "price": "4 د.ك"
      },
      {
        "name": "باديكير الأميرة",
        "price": "4 د.ك"
      },
      {
        "name": "طلاء أظافر الأميرة",
        "price": "1 د.ك"
      },
      {
        "name": "إزالة طلاء الأظافر الأميرة",
        "price": "1 د.ك"
      },
      {
        "name": "قص شعر الأميرة",
        "price": "من 5 إلى 10 د.ك"
      },
      {
        "name": "تسريحة ويفي أو سشوار الأميرة",
        "price": "من 5 إلى 10 د.ك"
      }
    ]
  }
],
  en: [
  {
    "category": "NAILS",
    "items": [
      {
        "name": "Manicure",
        "price": "7.5 KD"
      },
      {
        "name": "Pedicure",
        "price": "7.5 KD"
      },
      {
        "name": "Marshmallow Manicure",
        "price": "10 KD"
      },
      {
        "name": "Marshmallow Pedicure",
        "price": "10 KD"
      },
      {
        "name": "Collagen Mani Pedi",
        "price": "22 KD"
      },
      {
        "name": "Quick Fix Hand",
        "price": "5 KD"
      },
      {
        "name": "Quick Fix Feet",
        "price": "5 KD"
      },
      {
        "name": "Nail Polish Only",
        "price": "2 KD"
      },
      {
        "name": "Nail Polish Removal",
        "price": "1 KD"
      },
      {
        "name": "French Tip",
        "price": "2 KD to 5 KD"
      },
      {
        "name": "Cut and File",
        "price": "3 KD"
      },
      {
        "name": "Russian Manicure",
        "price": "8 KD"
      },
      {
        "name": "Russian Full Set Manicure",
        "price": "20 KD"
      }
    ]
  },
  {
    "category": "GEL POLISH",
    "items": [
      {
        "name": "Gel Polish",
        "price": "9 KD"
      },
      {
        "name": "Gel Polish Removal",
        "price": "4 KD"
      },
      {
        "name": "Bubble Gel",
        "price": "14 KD"
      },
      {
        "name": "Bubble Gel Removal",
        "price": "7 KD"
      },
      {
        "name": "Gel Polish with Chrome",
        "price": "14 KD"
      },
      {
        "name": "Chrome per Finger",
        "price": "2 KD"
      },
      {
        "name": "Gel Polish with Ombre Nails",
        "price": "14 KD"
      },
      {
        "name": "Gel Polish with Cat Eye Nail",
        "price": "14 KD"
      },
      {
        "name": "Cat Eye per Finger",
        "price": "2 KD"
      },
      {
        "name": "French Tip",
        "price": "2 KD to 5 KD"
      },
      {
        "name": "Gel Polish with Ombre and Chrome",
        "price": "18 KD"
      },
      {
        "name": "Gel Polish with French and Chrome",
        "price": "18 KD"
      },
      {
        "name": "Gel Polish with Ombre and Cat Eye",
        "price": "18 KD"
      }
    ]
  },
  {
    "category": "NAIL ART",
    "items": [
      {
        "name": "Nail Art per Finger",
        "price": "0.500 fils to 3 KD"
      },
      {
        "name": "Deep French per Finger",
        "price": "0.500 fils"
      },
      {
        "name": "Blooming Gel Art per Finger",
        "price": "1 KD to 3 KD"
      }
    ]
  },
  {
    "category": "NAIL EXTENSIONS",
    "items": [
      {
        "name": "Party Nails",
        "price": "12 KD"
      },
      {
        "name": "Party Nails Removal",
        "price": "5 KD"
      },
      {
        "name": "Party Nails per Finger",
        "price": "1 KD"
      },
      {
        "name": "Attach Party Nails",
        "price": "3 KD"
      },
      {
        "name": "Soft Gel",
        "price": "25 KD"
      },
      {
        "name": "Permanent Nail Extension",
        "price": "27 KD"
      },
      {
        "name": "Permanent Nail Extensions per Finger",
        "price": "3 KD"
      },
      {
        "name": "Nail Extension Removal",
        "price": "8 KD"
      },
      {
        "name": "Nail Extensions Maintenance",
        "price": "17 KD"
      }
    ]
  },
  {
    "category": "HAIR",
    "items": [
      {
        "name": "Regular Hair Wash",
        "price": "3 KD"
      },
      {
        "name": "Blowdry",
        "price": "10 KD and up"
      },
      {
        "name": "Wavy",
        "price": "12 KD and up"
      },
      {
        "name": "Hair Trim",
        "price": "7 KD"
      },
      {
        "name": "Full Haircut",
        "price": "10 KD"
      },
      {
        "name": "Machine Hair Cut",
        "price": "10 KD"
      },
      {
        "name": "Bangs Cut",
        "price": "2 KD to 3 KD"
      },
      {
        "name": "Hair Braid",
        "price": "2 KD to 10 KD"
      },
      {
        "name": "Hairstyle",
        "price": "25 KD and up"
      }
    ]
  },
  {
    "category": "HAIR CARE",
    "items": [
      {
        "name": "Regular Hair Mask",
        "price": "7 KD and up"
      },
      {
        "name": "Fresh Aloe Vera",
        "price": "7 KD"
      },
      {
        "name": "Fresh Aloe Vera with Mask",
        "price": "10 KD"
      },
      {
        "name": "Natural Herbal Blend with Mask",
        "price": "12 KD"
      },
      {
        "name": "Deep Cleansing Moisturizing Hair Mask",
        "price": "12 KD"
      },
      {
        "name": "Filler Hair Treatment",
        "price": "17 KD"
      },
      {
        "name": "Scalp Hair Treatment",
        "price": "17 KD"
      }
    ]
  },
  {
    "category": "HAIR COLOR",
    "items": [
      {
        "name": "Hair Color 1 Color Only",
        "price": "35 KD and up"
      },
      {
        "name": "Hair Color Labor",
        "price": "20 KD and up"
      },
      {
        "name": "Roots",
        "price": "17 KD"
      },
      {
        "name": "Roots Labor",
        "price": "12 KD"
      }
    ]
  },
  {
    "category": "HAIR TREATMENT",
    "items": [
      {
        "name": "Straightening Prime",
        "price": "75 KD and up"
      },
      {
        "name": "Prime Roots",
        "price": "45 KD"
      },
      {
        "name": "Straightening Bio Smooth",
        "price": "75 KD and up"
      },
      {
        "name": "Bio Smooth Roots",
        "price": "45 KD"
      }
    ]
  },
  {
    "category": "MASSAGE",
    "items": [
      {
        "name": "Regular Massage Hand or Feet 15 mins",
        "price": "5 KD"
      },
      {
        "name": "Candle Massage Hands or Feet 15 mins",
        "price": "7 KD"
      },
      {
        "name": "Head Massage 15 mins",
        "price": "5 KD"
      },
      {
        "name": "Neck or Shoulder Massage 15 mins",
        "price": "5 KD"
      },
      {
        "name": "Massager Chair",
        "price": "2 KD"
      }
    ]
  },
  {
    "category": "FACE",
    "items": [
      {
        "name": "Eyebrows",
        "price": "3 KD"
      },
      {
        "name": "Upper Lip Threading / Wax",
        "price": "2 KD"
      },
      {
        "name": "Full-Face Threading Only",
        "price": "5 KD"
      },
      {
        "name": "Full-Face Threading with Eyebrows",
        "price": "7 KD"
      },
      {
        "name": "Full-Face Wax",
        "price": "7 KD"
      },
      {
        "name": "Full-Face Wax with Eyebrows",
        "price": "10 KD"
      },
      {
        "name": "Half Face Wax",
        "price": "5 KD"
      },
      {
        "name": "Half Face Threading",
        "price": "4 KD"
      },
      {
        "name": "Inner Nose Wax",
        "price": "2 KD"
      }
    ]
  },
  {
    "category": "LITTLE PRINCESS",
    "items": [
      {
        "name": "Princess Manicure",
        "price": "4 KD"
      },
      {
        "name": "Princess Pedicure",
        "price": "4 KD"
      },
      {
        "name": "Princess Nail Polish",
        "price": "1 KD"
      },
      {
        "name": "Princess Remove Polish",
        "price": "1 KD"
      },
      {
        "name": "Princess Haircut",
        "price": "5 KD to 10 KD"
      },
      {
        "name": "Princess Wavy or Blowdry",
        "price": "5 KD to 10 KD"
      }
    ]
  }
],
};
