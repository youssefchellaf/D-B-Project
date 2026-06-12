export interface TranslationSet {
  statusTag: string;
  location: string;
  title: string;
  description: string;
  pageTitle: string;
  whatsappBtn: string;
  aboutBtn: string;
  footerRights: string;
  
  // Modal translations
  modalBadge: string;
  modalTitle: string;
  modalSubtitle: string;
  modalP1: string;
  modalP2: string;
  modalP3: string;
  
  // Modal Highlights
  hl1Title: string;
  hl1Desc: string;
  hl2Title: string;
  hl2Desc: string;
  
  // Quote
  quoteText: string;
  quoteAuthor: string;
  modalClose: string;

  // Tagline
  logoTagline: string;
}

export type LanguageType = 'ar' | 'en' | 'es' | 'fr';

export const translations: Record<LanguageType, TranslationSet> = {
  ar: {
    statusTag: "...قريباً",
    location: "الفنيدق، المغرب",
    title: "شيء مميز قيد التحضير",
    description: "نعمل على إطلاق تجربة فاخرة تليق بكم لعرض أشهى العصائر الطبيعية والتحليات الفاخرة بلمسات نسائية مغربية متقنة وبكل حب وشغف.",
    pageTitle: "بسمة ودعاء | الصفحة الرسمية لعلامة عصائر وتحليات فاخرة",
    whatsappBtn: "للتواصل معنا عبر الواتساب",
    aboutBtn: "تعرف على مشروعنا",
    footerRights: "© 2026 Douaa & Basma - جميع الحقوق محفوظة",
    
    modalBadge: "👑 قصة مشروعنا الفاخر",
    modalTitle: "مشروع \"بسمة ودعاء\" المنزلي",
    modalSubtitle: "مذاق طبيعي... بلمسة فاخرة ✨",
    modalP1: "بدأت رحلة \"بسمة ودعاء\" في كنف عائلة مغربية تفخر بمطبخها وتقاليدها المتوارثة عبر الأجيال بمدينة الفنيدق والمناطق المجاورة.",
    modalP2: "كعصاميات شغوفات بالتفاصيل، لاحظنا أن هناك فراغاً لعرض العصائر الطبيعية الطازجة والتحليات الفاخرة بطابع منزلي خالص وبلمسة تقديم راقية وملكية تليق بمناسباتكم وجلساتكم الفاخرة.",
    modalP3: "وقررنا معاً المزج بين المذاق المنعش للعصائر الطبيعية المستخلصة من الفواكه المنقاة بكل حب، وبراعة التحليات المغربية والراقية المبتكرة لتصل إلى مائدتكم بأبهى حلة.",
    
    hl1Title: "بأيدي نسائية 100%",
    hl1Desc: "مشروع منزلي نسائي يعتني بأدق التفاصيل والتقديم الراقي.",
    hl2Title: "جودة وطراوة مطلقة",
    hl2Desc: "فواكه عذبة ومكونات فاخرة خالية تماما من الحوافظ والمضافات.",
    
    quoteText: "\"الجودة ليست خياراً بل هي انعكاس لأصالتنا. كل كوب عصير طازج وكل قطعة تحلية نصنعها في مطبخنا، نعتبرها تحفة فنية مميزة نسعد بتقديمها لكم.\"",
    quoteAuthor: "— بسمة ودعاء",
    modalClose: "حسناً، فهمت 🤎",
    logoTagline: "بسمة و دعاء | عصائر و تحليات طازجة"
  },
  en: {
    statusTag: "Coming Soon...",
    location: "Fnideq, Morocco",
    title: "Something special is in the making",
    description: "We are working on launching a luxury experience worthy of you, presenting the most delicious natural juices and high-end desserts, masterfully crafted with Moroccan feminine touches, love, and passion.",
    pageTitle: "Douaa & Basma | Official Page of Luxury Juices & Desserts",
    whatsappBtn: "Contact us on WhatsApp",
    aboutBtn: "Learn about our project",
    footerRights: "© 2026 Douaa & Basma - All rights reserved",
    
    modalBadge: "👑 Our Luxury Story",
    modalTitle: "The \"Douaa & Basma\" Home Project",
    modalSubtitle: "Natural taste... with a luxurious touch ✨",
    modalP1: "The journey of \"Douaa & Basma\" began in the heart of a Moroccan family proud of its kitchen and generations-old traditions, in the city of Fnideq and nearby regions.",
    modalP2: "As passionate self-made women, we noticed a gap in offering fresh natural juices and fine desserts with a pure homemade character and an elegant royal presentation that suits your special occasions and luxurious gatherings.",
    modalP3: "We decided to combine the refreshing taste of natural juices, extracted from fruits selected with love, with the craftsmanship of innovative refined Moroccan desserts to reach your table in the most beautiful presentation.",
    
    hl1Title: "100% Female-Run",
    hl1Desc: "A homemade project caring for the finest details and elegant presentation.",
    hl2Title: "Absolute Quality & Freshness",
    hl2Desc: "Fresh pure fruits and premium ingredients completely free of preservatives.",
    
    quoteText: "\"Quality is not an option, but a reflection of our authenticity. Every cup of fresh juice and every dessert we make in our kitchen is a masterpiece we are delighted to serve to you.\"",
    quoteAuthor: "— Douaa & Basma",
    modalClose: "Got it! 🤎",
    logoTagline: "بسمة و دعاء | Fresh Juices & Desserts"
  },
  es: {
    statusTag: "Próximamente...",
    location: "Fnideq, Marruecos",
    title: "Algo especial se está preparando",
    description: "Estamos trabajando en el lanzamiento de una experiencia de lujo digna de ustedes, presentando los más deliciosos jugos naturales y postres de alta gama, elaborados magistralmente con toques femeninos marroquíes, amor y pasión.",
    pageTitle: "Douaa y Basma | Página Oficial de Zumos y Postres de Lujo",
    whatsappBtn: "Contáctanos por WhatsApp",
    aboutBtn: "Conoce nuestro proyecto",
    footerRights: "© 2026 Douaa & Basma - Todos los derechos reservados",
    
    modalBadge: "👑 Nuestra Historia de Lujo",
    modalTitle: "El Proyecto Casero \"Douaa y Basma\"",
    modalSubtitle: "Sabor natural... con un toque lujoso ✨",
    modalP1: "El viaje de \"Douaa y Basma\" comenzó en el corazón de una familia marroquí orgullosa de su cocina y tradiciones de generaciones, en la ciudad de Fnideq y regiones cercanas.",
    modalP2: "Como mujeres apasionadas, notamos un vacío al ofrecer jugos naturales frescos y postres finos con un carácter puramente casero y una presentación elegante y real que se adapte a sus ocasiones especiales.",
    modalP3: "Decidimos combinar el refrescante sabor de los jugos naturales seleccionados con amor, con la artesanía de los postres marroquíes refinados e innovadores para llegar a su mesa de la mejor manera.",
    
    hl1Title: "100% Hecho por Mujeres",
    hl1Desc: "Un proyecto casero que cuida los detalles más finos y una presentación elegante.",
    hl2Title: "Calidad y Frescura Absoluta",
    hl2Desc: "Frutas frescas e ingredientes premium completamente libres de conservantes o aditivos.",
    
    quoteText: "\"La calidad no es una opción, sino un reflejo de nuestra autenticidad. Cada taza de jugo fresco y cada postre que preparamos en nuestra cocina es una obra de arte que nos complace servirle.\"",
    quoteAuthor: "— Douaa y Basma",
    modalClose: "¡Entendido! 🤎",
    logoTagline: "بسمة و دعاء | Zumos y Postres Frescos"
  },
  fr: {
    statusTag: "Prochainement...",
    location: "Fnideq, Maroc",
    title: "Quelque chose de spécial se prépare",
    description: "Nous travaillons au lancement d'une expérience de luxe digne de vous, présentant les plus délicieux jus naturels et desserts haut de gamme, magistralement conçus avec des touches féminines marocaines, d'amour et de passion.",
    pageTitle: "Douaa & Basma | Page Officielle de Jus & Desserts de Luxe",
    whatsappBtn: "Contactez-nous sur WhatsApp",
    aboutBtn: "Découvrez notre projet",
    footerRights: "© 2026 Douaa & Basma - Tous droits réservés",
    
    modalBadge: "👑 Notre Histoire de Luxe",
    modalTitle: "Le Projet Maison \"Douaa & Basma\"",
    modalSubtitle: "Goût naturel... avec une touche luxueuse ✨",
    modalP1: "Le voyage de \"Douaa & Basma\" a commencé au cœur d'une famille marocaine fière de sa cuisine et de ses traditions intergénérationnelles, dans la ville de Fnideq et les régions voisines.",
    modalP2: "En tant que femmes autodidactes passionnées par les détails, nous avons constaté un manque dans l'offre de jus de fruits frais et de desserts raffinés au caractère purement fait maison et à la présentation royale élégante.",
    modalP3: "Nous avons décidé de combiner le goût rafraîchissant des jus de fruits frais sélectionnés avec amour, avec le savoir-faire de desserts marocains raffinés et innovants pour atteindre votre table de la plus belle façon.",
    
    hl1Title: "100% Fait par des Femmes",
    hl1Desc: "Un projet fait maison qui prend soin des moindres détails et d'une présentation élégante.",
    hl2Title: "Qualité & Fraîcheur Absolues",
    hl2Desc: "Fruits frais et ingrédients de qualité supérieure sans aucun agent de conservation.",
    
    quoteText: "\"La qualité n'est pas une option, mais le reflet de notre authenticité. Chaque tasse de jus frais et chaque préparation que nous réalisons dans notre cuisine est un chef-d'œuvre.\"",
    quoteAuthor: "— Douaa & Basma",
    modalClose: "D'accord, j'ai compris 🤎",
    logoTagline: "بسمة و دعاء | Jus & Desserts Frais"
  }
};
