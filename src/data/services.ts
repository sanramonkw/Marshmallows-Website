// Price lists — updated from the salon's bilingual price list PDF
// (hs and salon price updated.pdf), replacing the original 2026-07-02 extraction.
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
  "ar": [
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
          "name": "قص فقط",
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
          "name": "بوابل جل لكل إصبع",
          "price": "1.500 فلس"
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
          "name": "كروم لكل إصبع",
          "price": "1 د.ك"
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
          "name": "بلومينغ جل لكل إصبع",
          "price": "من 1 إلى 3 د.ك"
        }
      ]
    },
    {
      "category": "تركيب الأظافر",
      "items": [
        {
          "name": "أظافر بلاستيك",
          "price": "10 د.ك"
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
          "price": "من 7 د.ك فأعلى"
        },
        {
          "name": "ويفي",
          "price": "من 10 د.ك فأعلى"
        },
        {
          "name": "تسريحة شعر",
          "price": "من 20 د.ك فأعلى"
        },
        {
          "name": "ضفيرة فرنسية",
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
      "category": "صبغة الشعر",
      "items": [
        {
          "name": "صبغة شعر لون واحد",
          "price": "من 30 د.ك فأعلى"
        },
        {
          "name": "أجرة صبغ الشعر",
          "price": "من 15 د.ك فأعلى"
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
      "category": "علاج الشعر",
      "items": [
        {
          "name": "فرد الشعر برايم",
          "price": "من 50 د.ك فأعلى"
        },
        {
          "name": "جذور برايم",
          "price": "40 د.ك"
        },
        {
          "name": "فرد الشعر بيو سموث",
          "price": "من 50 د.ك فأعلى"
        },
        {
          "name": "جذور بيو سموث",
          "price": "40 د.ك"
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
          "name": "مساج للأيد والقدم 15 دقيقة مع شمعة مساج",
          "price": "5 د.ك"
        },
        {
          "name": "مساج للرأس لمدة 15 دقيقة",
          "price": "3 د.ك"
        }
      ]
    },
    {
      "category": "أميرة صغيرة",
      "items": [
        {
          "name": "مانيكير وباديكير أميرة",
          "price": "8 د.ك"
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
          "price": "من 5 د.ك فأعلى"
        },
        {
          "name": "تسريحة مموجة أميرة",
          "price": "من 7 د.ك فأعلى"
        },
        {
          "name": "قص أو تشذيب شعر أميرة",
          "price": "من 5 د.ك فأعلى"
        },
        {
          "name": "علاج شعر الأميرة",
          "price": "50 د.ك"
        }
      ]
    }
  ],
  "en": [
    {
      "category": "NAILS",
      "items": [
        {
          "name": "Manicure pedicure",
          "price": "12 KD"
        },
        {
          "name": "Manicure pedicure with footlogic",
          "price": "18 KD"
        },
        {
          "name": "Marshmallow mani pedi",
          "price": "18 KD"
        },
        {
          "name": "Collagen mani pedi",
          "price": "20 KD"
        },
        {
          "name": "Nail polish only",
          "price": "2 KD"
        },
        {
          "name": "Nail polish removal",
          "price": "1 KD"
        },
        {
          "name": "French tip",
          "price": "2 KD to 5 KD"
        },
        {
          "name": "File only",
          "price": "1 KD"
        },
        {
          "name": "Cut only",
          "price": "1 KD"
        },
        {
          "name": "Cut and file",
          "price": "2 KD"
        },
        {
          "name": "Russian manicure",
          "price": "8 KD"
        },
        {
          "name": "Russian full set manicure",
          "price": "20 KD"
        }
      ]
    },
    {
      "category": "SCRUBS TREATMENT",
      "items": [
        {
          "name": "Regular scrubs hand or feet",
          "price": "3 KD"
        },
        {
          "name": "Marshmallow scrubs hand or feet",
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
          "name": "Gel polish",
          "price": "8 KD"
        },
        {
          "name": "Gel polish removal",
          "price": "3 KD"
        },
        {
          "name": "Bubble Gel",
          "price": "12 KD"
        },
        {
          "name": "Bubble Gel removal",
          "price": "5 KD"
        },
        {
          "name": "Bubble Gel per finger",
          "price": "1.500 fils"
        },
        {
          "name": "Gel polish with Chrome nails",
          "price": "13 KD"
        },
        {
          "name": "Gel polish with Ombre nails",
          "price": "13 KD"
        },
        {
          "name": "Gel polish with Cat eye nails",
          "price": "13 KD"
        },
        {
          "name": "Gel polish with ombre and chrome",
          "price": "15 KD"
        },
        {
          "name": "Gel polish with french and chrome",
          "price": "15 KD"
        },
        {
          "name": "Gel polish with ombre and cat eye",
          "price": "15 KD"
        },
        {
          "name": "Gel polish with french and cat eye",
          "price": "15 KD"
        },
        {
          "name": "Cat eye per finger",
          "price": "1 KD"
        },
        {
          "name": "Chrome per finger",
          "price": "1 KD"
        }
      ]
    },
    {
      "category": "NAIL ART",
      "items": [
        {
          "name": "Nail art per finger",
          "price": "0.500 fils to 3 KD"
        },
        {
          "name": "Deep french per finger",
          "price": "0.500 fils"
        },
        {
          "name": "Blooming gel per finger",
          "price": "1 KD to 3 KD"
        }
      ]
    },
    {
      "category": "NAIL EXTENSIONS",
      "items": [
        {
          "name": "Partynails",
          "price": "10 KD"
        },
        {
          "name": "Partynails removal",
          "price": "5 KD"
        },
        {
          "name": "Partynails per finger",
          "price": "1 KD"
        },
        {
          "name": "Attach partynails",
          "price": "3 KD"
        },
        {
          "name": "Softgel",
          "price": "20 KD"
        },
        {
          "name": "Softgel per finger",
          "price": "2 KD"
        },
        {
          "name": "Permanent nail extension",
          "price": "25 KD"
        },
        {
          "name": "Nail extension removal",
          "price": "8 KD"
        },
        {
          "name": "Permanent nail extension per finger",
          "price": "2.5 KD"
        }
      ]
    },
    {
      "category": "HAIR",
      "items": [
        {
          "name": "Regular hair wash",
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
          "name": "Hairbraid",
          "price": "2 KD to 10 KD"
        },
        {
          "name": "Bangs cut",
          "price": "2 KD to 3 KD"
        },
        {
          "name": "Hair-trim",
          "price": "7 KD"
        },
        {
          "name": "Machine hair cut",
          "price": "10 KD"
        },
        {
          "name": "Full haircut",
          "price": "10 KD"
        }
      ]
    },
    {
      "category": "HAIR CARE",
      "items": [
        {
          "name": "Regular hairmask",
          "price": "5 KD"
        },
        {
          "name": "Fresh Aloevera",
          "price": "5 KD"
        },
        {
          "name": "Fresh Aloevera with mask",
          "price": "7 KD"
        },
        {
          "name": "Natural Herbs Blend with mask",
          "price": "7 KD"
        },
        {
          "name": "Deep cleansing moisturizing mask",
          "price": "10 KD"
        },
        {
          "name": "Filler hair treatment",
          "price": "15 KD"
        },
        {
          "name": "Hair scalp treatment",
          "price": "15 KD"
        }
      ]
    },
    {
      "category": "HAIR COLOR",
      "items": [
        {
          "name": "Hair color 1 color",
          "price": "30 KD and up"
        },
        {
          "name": "Hair color labor",
          "price": "15 KD and up"
        },
        {
          "name": "Roots",
          "price": "15 KD"
        },
        {
          "name": "Roots labor",
          "price": "10 KD"
        }
      ]
    },
    {
      "category": "HAIR TREATMENT",
      "items": [
        {
          "name": "Hair Straigthening Prime",
          "price": "50 KD and up"
        },
        {
          "name": "Prime roots",
          "price": "40 KD"
        },
        {
          "name": "Hair Straightening Bio smooth",
          "price": "50 KD and up"
        },
        {
          "name": "Bio smooth roots",
          "price": "40 KD"
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
          "name": "Upper lip threading / wax",
          "price": "2 KD"
        },
        {
          "name": "Full-face threading only",
          "price": "5 KD"
        },
        {
          "name": "Full-face threading with eyebrows",
          "price": "7 KD"
        },
        {
          "name": "Full-face wax",
          "price": "7 KD"
        },
        {
          "name": "Full-face wax with eyebrows",
          "price": "10 KD"
        },
        {
          "name": "Half face wax",
          "price": "5 KD"
        },
        {
          "name": "Half face threading",
          "price": "4 KD"
        },
        {
          "name": "Inner nose wax",
          "price": "2 KD"
        }
      ]
    },
    {
      "category": "MASSAGE",
      "items": [
        {
          "name": "Regular massage hand or feet 15mins",
          "price": "3 KD"
        },
        {
          "name": "Neck or shoulder massage 15mins",
          "price": "3 KD"
        },
        {
          "name": "Candle massage hand or feet 15mins",
          "price": "5 KD"
        },
        {
          "name": "Head massage 15mins",
          "price": "3 KD"
        }
      ]
    },
    {
      "category": "LITTLE PRINCESS",
      "items": [
        {
          "name": "Princess manicure pedicure",
          "price": "8 KD"
        },
        {
          "name": "Princess nail polish",
          "price": "1 KD"
        },
        {
          "name": "Princess hair wash",
          "price": "2 KD"
        },
        {
          "name": "Princess blowdry",
          "price": "5 KD and up"
        },
        {
          "name": "Princess wavy",
          "price": "7 KD and up"
        },
        {
          "name": "Princess trim or cut",
          "price": "5 KD and up"
        },
        {
          "name": "Princess hair treatment prime",
          "price": "50 KD"
        }
      ]
    }
  ]
};

export const homeService: Record<'ar' | 'en', PriceCategory[]> = {
  "ar": [
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
          "name": "جل بوليش",
          "price": "9 د.ك"
        },
        {
          "name": "إزالة الجل بوليش",
          "price": "4 د.ك"
        },
        {
          "name": "مانيكير روسي",
          "price": "13 د.ك"
        },
        {
          "name": "مانيكير روسي كامل",
          "price": "23 د.ك"
        }
      ]
    },
    {
      "category": "طلاء جل للأظافر",
      "items": [
        {
          "name": "جل بابل",
          "price": "14 د.ك"
        },
        {
          "name": "إزالة جل بابل",
          "price": "7 د.ك"
        },
        {
          "name": "بوبل جل لكل إصبع",
          "price": "1.500 فلس"
        },
        {
          "name": "كات آي لكل إصبع",
          "price": "2 د.ك"
        },
        {
          "name": "كروم لكل إصبع",
          "price": "2 د.ك"
        },
        {
          "name": "جل بوليش مع أظافر كروم",
          "price": "14 د.ك"
        },
        {
          "name": "جل بوليش مع أظافر كات آي",
          "price": "14 د.ك"
        },
        {
          "name": "جل بوليش مع أظافر أومبري",
          "price": "14 د.ك"
        },
        {
          "name": "جل بوليش مع أومبري وكروم",
          "price": "18 د.ك"
        },
        {
          "name": "جل بوليش مع فرنش وكروم",
          "price": "18 د.ك"
        },
        {
          "name": "جل بوليش مع أومبري وكات آي",
          "price": "18 د.ك"
        },
        {
          "name": "جل بوليش مع فرنش وكات آي",
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
          "name": "بلومينغ جل لكل إصبع",
          "price": "من 1 إلى 3 د.ك"
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
          "name": "تركيب أظافر دائمة لكل إصبع",
          "price": "3 د.ك"
        },
        {
          "name": "إزالة تركيب الأظافر",
          "price": "8 د.ك"
        },
        {
          "name": "تركيب أظافر دائمة",
          "price": "27 د.ك"
        },
        {
          "name": "صيانة الأظافر الصناعية",
          "price": "17 د.ك"
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
          "price": "7 د.ك"
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
      "category": "علاج الشعر",
      "items": [
        {
          "name": "برايم فرد الشعر",
          "price": "من 75 د.ك فأعلى"
        },
        {
          "name": "برايم للجذور",
          "price": "45 د.ك"
        },
        {
          "name": "بايو سموث لفرد الشعر",
          "price": "من 75 د.ك فأعلى"
        },
        {
          "name": "بايو سموث للجذور",
          "price": "45 د.ك"
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
          "price": "5 د.ك"
        },
        {
          "name": "باديكير الأميرة",
          "price": "5 د.ك"
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
          "name": "تقصيف الأميرة",
          "price": "5 د.ك"
        },
        {
          "name": "قص شعر الأميرة",
          "price": "من 7 إلى 10 د.ك"
        },
        {
          "name": "تمويج شعر الأميرة",
          "price": "من 7 د.ك فأعلى"
        },
        {
          "name": "سشوار الأميرة",
          "price": "من 6 د.ك فأعلى"
        },
        {
          "name": "برايم فرد الشعر للأميرات",
          "price": "من 50 د.ك فأعلى"
        }
      ]
    }
  ],
  "en": [
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
          "name": "Marshmallow manicure",
          "price": "10 KD"
        },
        {
          "name": "Marshmallow pedicure",
          "price": "10 KD"
        },
        {
          "name": "Collagen mani pedi",
          "price": "22 KD"
        },
        {
          "name": "Quick fix hand",
          "price": "5 KD"
        },
        {
          "name": "Quick fix feet",
          "price": "5 KD"
        },
        {
          "name": "Nail polish only",
          "price": "2 KD"
        },
        {
          "name": "Nail polish removal",
          "price": "1 KD"
        },
        {
          "name": "French tip",
          "price": "2 KD to 5 KD"
        },
        {
          "name": "Cut and file",
          "price": "3 KD"
        },
        {
          "name": "Gel polish",
          "price": "9 KD"
        },
        {
          "name": "Gel polish removal",
          "price": "4 KD"
        },
        {
          "name": "Russian manicure",
          "price": "13 KD"
        },
        {
          "name": "Russian full set manicure",
          "price": "23 KD"
        }
      ]
    },
    {
      "category": "GEL POLISH",
      "items": [
        {
          "name": "Bubble Gel",
          "price": "14 KD"
        },
        {
          "name": "Bubble Gel removal",
          "price": "7 KD"
        },
        {
          "name": "Bubble Gel per finger",
          "price": "1.500 fils"
        },
        {
          "name": "Cat eye per finger",
          "price": "2 KD"
        },
        {
          "name": "Chrome per finger",
          "price": "2 KD"
        },
        {
          "name": "Gel polish with Chrome nails",
          "price": "14 KD"
        },
        {
          "name": "Gel polish with Cat eye nails",
          "price": "14 KD"
        },
        {
          "name": "Gel polish with Ombre nails",
          "price": "14 KD"
        },
        {
          "name": "Gel polish with ombre and chrome",
          "price": "18 KD"
        },
        {
          "name": "Gel polish with french and chrome",
          "price": "18 KD"
        },
        {
          "name": "Gel polish with ombre and cat eye",
          "price": "18 KD"
        },
        {
          "name": "Gel polish with french and cat eye",
          "price": "18 KD"
        }
      ]
    },
    {
      "category": "NAIL ART",
      "items": [
        {
          "name": "Nail art per finger",
          "price": "0.500 fils to 3 KD"
        },
        {
          "name": "Deep French per finger",
          "price": "0.500 fils"
        },
        {
          "name": "Blooming gel per finger",
          "price": "1 KD to 3 KD"
        }
      ]
    },
    {
      "category": "NAIL EXTENSIONS",
      "items": [
        {
          "name": "Partynails",
          "price": "12 KD"
        },
        {
          "name": "Partynails removal",
          "price": "5 KD"
        },
        {
          "name": "Partynails per finger",
          "price": "1 KD"
        },
        {
          "name": "Attach partynails",
          "price": "3 KD"
        },
        {
          "name": "Softgel",
          "price": "25 KD"
        },
        {
          "name": "Permanent nail extensions per finger",
          "price": "3 KD"
        },
        {
          "name": "Nail extension removal",
          "price": "8 KD"
        },
        {
          "name": "Permanent nail extension",
          "price": "27 KD"
        },
        {
          "name": "Nail extension maintenance",
          "price": "17 KD"
        }
      ]
    },
    {
      "category": "HAIR",
      "items": [
        {
          "name": "Regular hair wash",
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
          "name": "Full haircut",
          "price": "10 KD"
        },
        {
          "name": "Machine haircut",
          "price": "10 KD"
        },
        {
          "name": "Bangs Cut",
          "price": "2 KD to 3 KD"
        },
        {
          "name": "Hair braid",
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
          "name": "Regular hairmask",
          "price": "7 KD"
        },
        {
          "name": "Fresh Aloevera",
          "price": "7 KD"
        },
        {
          "name": "Fresh Aloevera with mask",
          "price": "10 KD"
        },
        {
          "name": "Natural Herbal blend with mask",
          "price": "12 KD"
        },
        {
          "name": "Deep cleansing moisturizing hairmask",
          "price": "12 KD"
        },
        {
          "name": "Filler hair treatment",
          "price": "17 KD"
        },
        {
          "name": "Scalp hair treatment",
          "price": "17 KD"
        }
      ]
    },
    {
      "category": "HAIR COLOR",
      "items": [
        {
          "name": "Hair color 1 color only",
          "price": "35 KD and up"
        },
        {
          "name": "Hair color labor",
          "price": "20 KD and up"
        },
        {
          "name": "Roots",
          "price": "17 KD"
        },
        {
          "name": "Roots labor",
          "price": "12 KD"
        }
      ]
    },
    {
      "category": "HAIR TREATMENT",
      "items": [
        {
          "name": "Hair Straighthening Prime",
          "price": "75 KD and up"
        },
        {
          "name": "Prime roots",
          "price": "45 KD"
        },
        {
          "name": "Hair Straigthening Bio smooth",
          "price": "75 KD and up"
        },
        {
          "name": "Bio smooth roots",
          "price": "45 KD"
        }
      ]
    },
    {
      "category": "MASSAGE",
      "items": [
        {
          "name": "Regular massage hand or feet 15mins",
          "price": "5 KD"
        },
        {
          "name": "Candle massage hands or feet 15mins",
          "price": "7 KD"
        },
        {
          "name": "Head massage 15mins",
          "price": "5 KD"
        },
        {
          "name": "Neck or shoulder massage 15mins",
          "price": "5 KD"
        },
        {
          "name": "Massager chair",
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
          "name": "Upper lip threading / wax",
          "price": "2 KD"
        },
        {
          "name": "Full-face threading only",
          "price": "5 KD"
        },
        {
          "name": "Full-face threading with eyebrows",
          "price": "7 KD"
        },
        {
          "name": "Full-face wax",
          "price": "7 KD"
        },
        {
          "name": "Full-face wax with eyebrows",
          "price": "10 KD"
        },
        {
          "name": "Half face wax",
          "price": "5 KD"
        },
        {
          "name": "Half face threading",
          "price": "4 KD"
        },
        {
          "name": "Inner nose wax",
          "price": "2 KD"
        }
      ]
    },
    {
      "category": "LITTLE PRINCESS",
      "items": [
        {
          "name": "Princess manicure",
          "price": "5 KD"
        },
        {
          "name": "Princess pedicure",
          "price": "5 KD"
        },
        {
          "name": "Princess nail polish",
          "price": "1 KD"
        },
        {
          "name": "Princess remove polish",
          "price": "1 KD"
        },
        {
          "name": "Princess trim",
          "price": "5 KD"
        },
        {
          "name": "Princess haircut",
          "price": "7 KD to 10 KD"
        },
        {
          "name": "Princess Wavy",
          "price": "7 KD and up"
        },
        {
          "name": "Princess blowdry",
          "price": "6 KD and up"
        },
        {
          "name": "Princess Hair Straigthening Prime",
          "price": "50 KD and up"
        }
      ]
    }
  ]
};
