// ===== DAILY PANCHANG DATA =====
const dailyPanchang = {
  dateText: "",
  vaar: "",
  sunrise: "--",
  sunset: "--",
  moonrise: "--",
  moonset: "--",
  vikramSamvat: "2082",
  shakSamvat: "1947",
  maas: "पौष",
  tithi: "कृष्ण पक्ष त्रयोदशी"
};

// ===== TODAY FESTIVALS =====
const todayFestivals = {
  "01-01": ["नववर्ष"],
  "26-01": ["गणतंत्र दिवस"],
  "08-03": ["होली"],
  "12-11": ["दीपावली"],
  "08-11": ["महाशिवरात्रि"]
};

// ===== DEITIES & FESTIVALS CONTENT =====
const bhaktiData = [
  {
    name: "भगवान शिव",
    contents: [
      { type: "प्रार्थना", info: "शिव जी की प्रार्थना..." },
      { type: "चालीसा", info: "शिव चालीसा..." },
      { type: "आरती", info: "शिव आरती..." },
      { type: "पूजा विधि", info: "शिव पूजा विधि..." },
      { type: "प्रमुख स्तोत्र", info: "शिव स्तोत्र..." }
    ]
  },
  {
    name: "दीपावली",
    contents: [
      { type: "पूजा विधि", info: "लक्ष्मी-गणेश पूजा विधि..." },
      { type: "महत्व", info: "दीपावली का धार्मिक महत्व..." }
    ]
  }
];
