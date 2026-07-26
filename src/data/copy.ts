// Real copy extracted verbatim from marshmallows.co (2026-07-02).

export const aboutIntro = {
  ar: [
    'تأسست شركة صالون مارشميلوز لتجميل السيدات عام 2013 في دولة الكويت منذ البدايه و نحن نهدف لتقديم افضل الخدمات ذات جودة عالية للسيدات من كل الفئات العمرية مع مواكبه الموضه باحدث الصيحات.',
    'لدينا فريق عمل متخصص فى مجال تجميل الاظافر والعناية بهم وتركيب وصلات الاظافر بكل انواعها وفن الرسم عليها باستخدام افضل المنتجات واحدث الادوات بالاضافة لمهارة التدليك لاراحة اليدين والقدمين وملتزمون بتقديم خدمات العناية بالشعر باستخدام أجود الماسكات والعلاجات الامنة لكل انواع الشعر للحصول على شعر صحى ذات لمعة.',
    'هدفنا هو ضمان شعور كل امرأة بالرفاهية والرعاية الرفيعة.',
  ],
  en: [
    'Marshmallows Salon was established in 2013 in Kuwait we aim to provide services of quality, value and sophistication to women of all age groups. We are always catching up with new trends and discovering new techniques.',
    'We have a team specialized in the field of nail care, nail extensions of all kinds and nail art using the best products and the latest tools, in addition to the art of massage to relax the hands and feet, and we are committed to providing hair care services using the best hair masks and safe treatments for all types of hair to get healthy and shiny hair.',
    'Our goal is to ensure that every woman feels pampered and cared for in our salon.',
  ],
} as const;

export const aboutHair = {
  ar: [
    'صالون مارشملوز يهتم برغبتك في العناية بشعرك والظهور دائمًا بمظهر جديد يجذب انتباه الجميع حولك، من خلال تسريحة جديدة، أو قصة شعر عصرية، أو تغيير كامل بلون شعرك باستخدام أفضل أنواع الصبغات، كل ذلك بالإضافة إلى العناية بصحة شعرك وإشراقه باستخدام أفضل الأقنعة الطبيعية التي تمنح شعرك كل ما يحتاجه من تغذية وترطيب، بالإضافة إلى العلاجات الحديثة والآمنة لجميع أنواع الشعر.',
    'وقد قمنا بتوفير منتجات العناية بالأظافر والشعر المفضلة لديك التي يمكنك شراؤها والاستمتاع باستخدامها في أي وقت ومن أي مكان.',
    'أسعار الصالون معقولة. لدينا ثلاث فروع في مناطق مختلفة من الكويت (السالمية، الشرق، والإجارة). لأننا نعتبر وقتك وجهدك؛ لدينا خدمات منزلية تصل في الوقت المناسب لك في أي منطقة دون تأخير، مع أفضل فريق وخدمة تجعلك تشعر كما لو كنت قد زرت الصالون بينما كنت في منزلك.',
  ],
  en: [
    'Marshmallows Salon is concerned with your desire to take care of your hair and always appear with a new look that dazzles everyone around you, with a new hairstyle, a modern haircut, or a complete change of hair color using the best types of dyes, all this in addition to taking care of the health and radiance of your hair by using the best natural masks that give your hair all it needs. Nourishment and hydration, in addition to modern and safe treatments for all hair types.',
    'And we provided you with your favorite nail and hair care products that you can buy and enjoy using anytime and anywhere.',
    'Salon prices are reasonable. We have three branches in different regions of Kuwait (Salmiya, Sharq, and Egaila). Because we consider your time and effort; We have home services that arrive at the right time for you in any area without delay, with the best team and service that makes you feel as if you visited the salon while you were at home.',
  ],
} as const;

export const aboutTeam = {
  ar: [
    'فريقنا من الخبراء ذوي الخبرة متخصص في جمال الأظافر ورعايتها، ويقدم مجموعة واسعة من تمديدات الأظافر الحديثة وتصميمات فن الأظافر الرائعة باستخدام منتجات ممتازة وأدوات ومعدات متطورة. هذا يضمن لعملائنا الحصول على مظهر أنيق وفريد. نقدم أيضًا مساجات لليدين والقدمين لتجربة استرخاء ورعاية لا مثيل لها. هدفنا هو ضمان أن تشعر كل امرأة بالتدليل والرعاية الفائقة في صالوننا.',
  ],
  en: [
    'Our team of seasoned experts specialize in nail beauty and care, offering a wide array of modern nail extensions and masterful nail art designs using premium products, cutting-edge tools and equipment. This ensures our clients achieve a stylish and unique look. We also offer hand and foot massages for unparalleled relaxation and care. Our goal is to ensure every woman feels pampered and exquisitely cared for at our salon.',
  ],
} as const;

/** Gallery: nail-art photos + current (grey-walled) salon interiors.
 * The older pink-walled interior shots (marshmallowskwt-*.webp) were removed at
 * the salon's request — the salon was refitted with grey/white walls. */
export const galleryImages = [
  ...Array.from({ length: 12 }, (_, i) => `/images/marshmellows${i + 1}.png`),
  '/images/IMG_2921.jpg',
  '/images/IMG_2920.jpg',
  '/images/IMG_4592.jpg',
  '/images/homeservice.jpg',
];
