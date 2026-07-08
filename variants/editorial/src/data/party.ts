// Party Booth packages extracted verbatim from the live site (2026-07-02).
// AR page: /services-ar/party-booth-ar/ — EN page: /en/services/party-booth/

export interface PartyExtra {
  name: string;
  price: string;
}

export interface PartyPackage {
  name: string;
  features: string[];
  suitable: string;
  prices: string[];
  extras: PartyExtra[];
  note: string;
}

export const partyPackages: Record<'ar' | 'en', PartyPackage[]> = {
  ar: [
  {
    "name": "عالم المارشميلو البراق",
    "features": [
      "ستايل للشعر مع جليتر",
      "كريستالات للوجه",
      "تاتو للأطفال"
    ],
    "suitable": "مناسب لـ 8 إلى 15 طفل",
    "prices": [
      "75 دينار (ساعتين)",
      "85 دينار (3 ساعات)"
    ],
    "extras": [
      {
        "name": "أي زيادة في عدد الأطفال",
        "price": "7 دينار للطفل الواحد"
      },
      {
        "name": "لإضافة فانكي هير",
        "price": "5 دينار للطفل الواحد"
      },
      {
        "name": "لإضافة ختم للشعر مع جليتر",
        "price": "2.5 دينار للطفل الواحد"
      }
    ],
    "note": ""
  },
  {
    "name": "صبغ أظافر مع نيل آرت",
    "features": [
      "صبغ أظافر",
      "برد أظافر",
      "نيل آرت"
    ],
    "suitable": "مناسب لـ 20 طفل",
    "prices": [
      "70 دينار"
    ],
    "extras": [
      {
        "name": "أي زيادة في عدد الأطفال",
        "price": "7 دينار للطفل الواحد"
      }
    ],
    "note": ""
  },
  {
    "name": "ستايل للشعر وعناية بالأظافر",
    "features": [
      "صبغ أظافر",
      "برد أظافر",
      "سيشوار",
      "ويفي"
    ],
    "suitable": "مناسب لـ 15 طفل",
    "prices": [
      "120 دينار"
    ],
    "extras": [
      {
        "name": "أي زيادة في عدد الأطفال",
        "price": "10 دينار للطفل الواحد"
      },
      {
        "name": "لإضافة فانكي هير",
        "price": "5 دينار للطفل الواحد"
      }
    ],
    "note": ""
  },
  {
    "name": "أضفي البريق على حفلة أطفالك في بار التألق لدينا",
    "features": [
      "كريستال للوجه",
      "جليتر للوجه"
    ],
    "suitable": "مناسب لـ 20 طفل",
    "prices": [
      "45 دينار (1.5 ساعة)"
    ],
    "extras": [
      {
        "name": "أي زيادة في عدد الأطفال",
        "price": "2.5 دينار للطفل الواحد"
      },
      {
        "name": "تركيب لؤلؤات للشعر",
        "price": "2.5 دينار للطفل الواحد"
      }
    ],
    "note": ""
  },
  {
    "name": "باقة شعر التألق",
    "features": [
      "تركيب إكسسوارات للشعر",
      "شرائط ملونة",
      "جليتر للشعر"
    ],
    "suitable": "مناسب لـ 20 طفل",
    "prices": [
      "70 دينار (ساعتين)"
    ],
    "extras": [
      {
        "name": "أي زيادة في عدد الأطفال",
        "price": "5 دينار للطفل الواحد"
      }
    ],
    "note": ""
  },
  {
    "name": "سبا بارتي مع شعر",
    "features": [
      "مانيكير",
      "باديكير"
    ],
    "suitable": "مناسب لـ طفلين",
    "prices": [
      "20 دينار"
    ],
    "extras": [
      {
        "name": "أي زيادة في عدد الأطفال",
        "price": "8 دينار للطفل الواحد"
      }
    ],
    "note": "لا يتضمن البوث المنزلي."
  },
  {
    "name": "سبا بارتي (يونيكورن – الأميرات)",
    "features": [
      "مانيكير",
      "باديكير"
    ],
    "suitable": "مناسب لـ طفلين",
    "prices": [
      "20 دينار"
    ],
    "extras": [
      {
        "name": "أي زيادة في عدد الأطفال",
        "price": "8 دينار للطفل الواحد"
      }
    ],
    "note": "لا يتضمن البوث المنزلي."
  },
  {
    "name": "شعر وأظافر مع حفلة كريستال للوجه",
    "features": [
      "مانيكير",
      "باديكير",
      "ويفي",
      "سيشوار",
      "ضفائر وشرائط للشعر"
    ],
    "suitable": "مناسب لـ طفلين",
    "prices": [
      "70 دينار"
    ],
    "extras": [
      {
        "name": "أي زيادة في عدد الأطفال",
        "price": "15 دينار للطفل الواحد"
      }
    ],
    "note": "لا يتضمن البوث المنزلي."
  },
  {
    "name": "حفلات خاصة في الصالون",
    "features": [
      "مانيكير",
      "باديكير",
      "سيشوار",
      "ويفي"
    ],
    "suitable": "مناسب حتى 8 أشخاص (حد أقصى ساعتين)",
    "prices": [
      "السعر: غير محدد"
    ],
    "extras": [
      {
        "name": "لإضافة كيك وبالونات",
        "price": "50 دينار"
      },
      {
        "name": "أي زيادة في عدد الأشخاص",
        "price": "10 دينار للشخص الواحد"
      }
    ],
    "note": ""
  }
],
  en: [
  {
    "name": "MARSHMALLOWS DAZZLING WORLD",
    "features": [
      "Hair Style with Glitters",
      "Face Crystals",
      "Kids Tattoos"
    ],
    "suitable": "Suitable for 8-15 kids",
    "prices": [
      "75 KD (2 HRS)",
      "85 KD (3 HRS)"
    ],
    "extras": [
      {
        "name": "Extra kids additional",
        "price": "7 KD"
      },
      {
        "name": "Additional per person for funky hair",
        "price": "5 KD"
      },
      {
        "name": "Per kids hair stamp glitters",
        "price": "2.5 KD"
      }
    ],
    "note": "Booths and Bars unavailable for Basement and Upper Ground."
  },
  {
    "name": "NAIL POLISH AND NAIL ART",
    "features": [
      "Nail Polish",
      "Filing",
      "Basic Nail Art"
    ],
    "suitable": "Suitable for 20 kids",
    "prices": [
      "70 KD"
    ],
    "extras": [
      {
        "name": "Extra kids additional",
        "price": "7 KD"
      }
    ],
    "note": "Booths and Bars unavailable for Basement and Upper Ground."
  },
  {
    "name": "SPARKLE YOUR KIDS PARTY TO OUR DAZZLE BAR",
    "features": [
      "Face Crystals",
      "Face Glitters"
    ],
    "suitable": "Suitable for 20 kids",
    "prices": [
      "45 KD (1.5 HRS)"
    ],
    "extras": [
      {
        "name": "Additional per kid",
        "price": "2.5 KD"
      },
      {
        "name": "Hair gems per kid",
        "price": "2.5 KD"
      }
    ],
    "note": "Booths and Bars unavailable for Basement and Upper Ground."
  },
  {
    "name": "HAIR STYLE AND NAILS",
    "features": [
      "Nail Polish",
      "Filing",
      "Blow Dry – Wavy"
    ],
    "suitable": "Suitable for 15 kids",
    "prices": [
      "120 KD"
    ],
    "extras": [
      {
        "name": "Extra kids additional",
        "price": "10 KD"
      },
      {
        "name": "Additional per kid for funky hair",
        "price": "5 KD"
      }
    ],
    "note": "Booths and Bars unavailable for Basement and Upper Ground."
  },
  {
    "name": "SPA PARTY WITH THEME (UNICORN/PRINCESS)",
    "features": [
      "Manicure",
      "Pedicure"
    ],
    "suitable": "Suitable for 2 kids",
    "prices": [
      "20 KD"
    ],
    "extras": [
      {
        "name": "Additional kids each",
        "price": "8 KD"
      }
    ],
    "note": "Booth not included."
  },
  {
    "name": "DAZZLE HAIR PACKAGE",
    "features": [
      "Hair Accessories",
      "Hair Tinsel",
      "Hair Glitters"
    ],
    "suitable": "Suitable for 20 kids",
    "prices": [
      "70 KD (2 HRS)"
    ],
    "extras": [
      {
        "name": "Additional kids each",
        "price": "5 KD"
      }
    ],
    "note": "Booths and Bars unavailable for Basement and Upper Ground."
  },
  {
    "name": "SPA PARTY WITH HAIR",
    "features": [
      "Manicure",
      "Pedicure",
      "Hair Wavy/Blow Dry",
      "Hair Braids and Ribbons"
    ],
    "suitable": "Suitable for 2 kids",
    "prices": [
      "50 KD"
    ],
    "extras": [
      {
        "name": "Additional kids each",
        "price": "12 KD"
      }
    ],
    "note": "Booth not included."
  },
  {
    "name": "HAIR AND NAILS WITH FACE CRYSTAL PARTY",
    "features": [
      "Manicure",
      "Pedicure",
      "Hair Wavy/Blow Dry",
      "Hair Braids and Ribbons"
    ],
    "suitable": "Suitable for 2 kids",
    "prices": [
      "70 KD"
    ],
    "extras": [
      {
        "name": "Additional kids each",
        "price": "15 KD"
      }
    ],
    "note": "Booth not included."
  },
  {
    "name": "IN SALOON PRIVATE PARTY",
    "features": [
      "Manicure",
      "Pedicure",
      "Blow Dry",
      "Wavy"
    ],
    "suitable": "Suitable for 8 Girls max (2 HRS)",
    "prices": [
      "Price: Not listed"
    ],
    "extras": [
      {
        "name": "Additional for cakes and balloons",
        "price": "50 KD"
      },
      {
        "name": "Additional per person",
        "price": "10 KD"
      }
    ],
    "note": ""
  }
],
};
