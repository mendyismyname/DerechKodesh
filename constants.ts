
import { SugyaSection, LogicType, Era, Concept, AnalysisComponent, PsakEntry, LogicSystemData, ModernApplication, VisualFlowStep, ShulchanAruchData } from './types';

// --- CONCEPTS ---
export const INITIAL_CONCEPTS: Concept[] = [
  { 
    id: 'c1', 
    nameHebrew: 'חזקה', 
    nameEnglish: 'Chazaka', 
    description: 'A legal presumption of ownership or status quo.', 
    category: 'Logic',
    subComponents: ['Chazaka D\'Hashta (Current Status)', 'Chazaka D\'Meikara (Original Status)', 'Mara Kama (Previous Owner)'],
    relatedLaws: ['Hamotzi Mechavero (Burden of Proof)', 'Bari V\'Shema (Certainty vs Uncertainty)']
  },
  { 
    id: 'c2', 
    nameHebrew: 'ערב', 
    nameEnglish: 'Arev', 
    description: 'Guarantor. A legal mechanism where one binds oneself based on the benefit given to another.', 
    category: 'Kinyan',
    subComponents: ['Arev Kablan (Unconditional Guarantor)', 'Shibud HaGuf (Bodily Lien)'],
    relatedLaws: ['Kiddushin M\'Din Arev', 'Halvaah (Loan)', 'Asmachta (Reliance)']
  },
  { 
    id: 'c3', 
    nameHebrew: 'קנין', 
    nameEnglish: 'Kinyan', 
    description: 'The formal act of acquisition.', 
    category: 'Kinyan',
    subComponents: ['Maaseh Kinyan (Act)', 'Daas (Intent)', 'Gemiras Daas (Finalization)'],
    relatedLaws: ['Hagbah (Lifting)', 'Meshicha (Pulling)', 'Kinyan Sudar (Handkerchief)']
  },
  {
      id: 'c4',
      nameHebrew: 'הנאה',
      nameEnglish: 'Hana\'ah',
      description: 'Benefit or pleasure. Can serve as a substitute for monetary value in legal transactions.',
      category: 'Kinyan',
      subComponents: ['Hana\'ah D\'Hashta (Immediate Benefit)', 'Hana\'at Mamon (Monetary Benefit)'],
      relatedLaws: ['Kiddushin', 'Ribis (Interest)']
  },
  {
      id: 'c5',
      nameHebrew: 'שליחות',
      nameEnglish: 'Shlichut',
      description: 'Agency. "A person\'s agent is like himself."',
      category: 'Logic',
      subComponents: ['Yad Poel (Hand of Worker)', 'Shaliach L\'Kabalah (Agent to Receive)'],
      relatedLaws: ['Kiddushin via Agent']
  }
];

// ==========================================
// SUGYA: KIDDUSHIN 6B-7A (Deep Analysis)
// ==========================================

const KID_6B_DEEP_DATA: SugyaSection = {
    id: 'kid-6b-deep',
    title: 'Kiddushin 6b-7a: Ten Manah (Arev)',
    sourceRef: 'Kiddushin 6b-7a',
    resources: {
        videoUrl: "https://www2.kolhalashon.com/en/regularSite/playShiur/41836819/-1/0/false",
        pdfUrl: "https://www2.kolhalashon.com/regularSite/playShiur/41836825",
        hlsUrl: "https://upload.kolhalashon.com:9001/KHL_Video/_definst_/amlst:NewArchive/Compressed/41836/41836820/playlist.m3u8"
    },
    chumashText: {
        sourceRef: "דברים כד:א",
        text: "כִּי יִקַּח אִישׁ אִשָּׁה וּבְעָלָהּ, וְהָיָה אִם לֹא תִמְצָא חֵן בְּעֵינָיו כִּי מָצָא בָהּ עֶרְוַת דָּבָר, וְכָתַב לָהּ סֵפֶר כְּרִיתֻת וְנָתַן בְּיָדָהּ וְשִׁלְּחָהּ מִבֵּיתוֹ.",
        translation: "When a man takes a wife and marries her, and it happens that she finds no favor in his eyes because he has found some indecency in her, and he writes her a certificate of divorce and puts it in her hand and sends her out of his house.",
        targum: "אֲרֵי יִסַּב גְּבַר אִתְּתָא וְיִבְעֲלִינַּהּ וִיהֵי אִם לָא תַשְׁכַּח רַחֲמִין בְּעֵינוֹהִי אֲרֵי אַשְׁכַּח בַּהּ עֲבֵירַת פִּתְגָם וְיִכְתּוֹב לַהּ סְפַר תֵּירוּכִין וְיִתֵּין בִּידַהּ וְיִפְטְרִינַּהּ מִבֵּיתֵיהּ.",
        targumTranslation: "When a man marries a woman and possesses her, and it happens that she does not find mercy in his eyes because he found in her a matter of transgression, he shall write for her a document of dismissal and place it in her hand and dismiss her from his house.",
        rashi: [
            { 
                id: "ch-r1", 
                text: "כי יקח - אין קיחה אלא בכסף, וכן הוא אומר (בראשית כג) נתתי כסף השדה קח ממני.",
                translation: "'When a man takes' - The term 'taking' (kicha) implies acquisition with money. As it says elsewhere (Genesis 23): 'I have given the money for the field, take it from me.'"
            },
            { 
                id: "ch-r2", 
                text: "ויצאה... והיתה - מקיש יציאה להויה, מה יציאה בשטר אף הויה בשטר.",
                translation: "'And she leaves... and becomes' - The verse juxtaposes 'leaving' (divorce) to 'becoming' (marriage). Just as leaving is effected by a document (Get), so too becoming a wife can be effected by a document."
            }
        ]
    },
    mishnaContext: {
        previous: {
            ref: 'מסכת סוטה פרק ט',
            hebrew: '...עֶגְלָה עֲרוּפָה בַּלָּשׁוֹן הַקֹּדֶשׁ. שֶׁנֶּאֱמַר (דברים כא) כִּי יִמָּצֵא חָלָל בָּאֲדָמָה...',
            english: '...The Eglah Arufah is recited in the Holy Tongue, as it says...'
        },
        next: {
            ref: 'משנה ב',
            hebrew: 'עֶבֶד עִבְרִי נִקְנֶה בְכֶסֶף וּבִשְׁטָר. וְקוֹנֶה אֶת עַצְמוֹ בְשָׁנִים וּבַיּוֹבֵל וּבְגִרְעוֹן כָּסֶף.',
            english: 'A Hebrew slave is acquired with money or a deed, and acquires himself through years, Jubilee, or deduction of money.'
        },
        bartenura: [
            {
                id: 'bart-1',
                scholar: 'Rabbi Ovadiah of Bartenura',
                hebrewText: 'האשה נקנית - משום דבעי למתני סיפא וקונה את עצמה, תנא לשון קנין. אי נמי, משום דכתיב (דברים כב) כי יקח איש אשה, ותניא בקידושין (דף ב) כי יקח, אין קיחה אלא בכסף.',
                englishText: '"The woman is acquired" - Because the Tanna wanted to teach later "and acquires herself", he used the language of "acquisition". Alternatively, because it is written "When a man takes (yikach) a wife", and "taking" implies money.'
            },
            {
                id: 'bart-2',
                scholar: 'Rabbi Ovadiah of Bartenura',
                hebrewText: 'בשלש דרכים - כסף, שטר, וביאה. וכסף מנלן? גמר קיחה קיחה משדה עפרון. כתיב הכא כי יקח איש אשה, וכתיב התם (בראשית כג) נתתי כסף השדה קח ממני.',
                englishText: '"In three ways" - Money, Deed, and Intercourse. How do we know Money? We derive "taking" from the field of Ephron.'
            }
        ]
    },
    baseText: {
        id: 'base-text-kid6b',
        type: LogicType.STATEMENT,
        era: Era.TANNA,
        speaker: 'Mishna',
        hebrewText: 'הָאִשָּׁה נִקְנֵית בְּשָׁלֹשׁ דְּרָכִים, וְקוֹנָה אֶת עַצְמָהּ בִּשְׁתֵּי דְרָכִים. נִקְנֵית בְּכֶסֶף, בִּשְׁטָר, וּבְבִיאָה.',
        englishText: 'A woman is acquired [betrothed] in three ways, and acquires herself [becomes free] in two ways. She is acquired with money, with a document, or with marital relations.',
        concepts: ['c2', 'c3', 'c4'],
        children: [],
        timestamp: 0
    },
    gemaraText: {
        id: 'gemara-root-kid6b',
        type: LogicType.PROOF,
        era: Era.AMORA,
        speaker: 'Gemara',
        hebrewText: 'אמר רבא: תן מנה לפלוני ואקדש אני לך - מקודשת מדין ערב. ערב לאו אף על גב דלא מטי הנאה לידיה קא משעבד נפשיה? האי איתתא נמי אף על גב דלא מטי הנאה לידה קא מקניא נפשה. הילך מנה והתקדשי לפלוני - מקודשת מדין עבד כנעני. עבד כנעני לאו אף על גב דלא קא חסר ולא מידי קא קני נפשיה? האי גברא נמי אף על גב דלא קא חסר ולא מידי קא קני לה להאי איתתא.',
        englishText: 'Rava said: "Give a manah to Ploni (a third party) and I will be betrothed to you" - she is betrothed via the law of Arev (Guarantor). Just as a guarantor binds himself financially even though he receives no money into his own hand, so too this woman transfers herself (sanctification) even though she receives no money into her hand. \n\nCompare also: "Here is a Manah and be betrothed to Ploni" - she is betrothed based on the laws of a Canaanite Slave (who acquires freedom without paying).',
        concepts: ['c2', 'c3'],
        children: [],
        timestamp: 120
    },
    secondaryGemaraText: {
        id: 'gemara-sec-bb173',
        type: LogicType.SOURCE,
        era: Era.AMORA,
        speaker: 'Bava Basra 173b',
        hebrewText: 'גמרא בבא בתרא (קעג:): אמר רב אשי, האי מאן דאמר ליה לחבריה קני האי חמרא ומשעבדנא לך, קני. מדין ערב. ערב מי קא שקיל מידי? לא, והא משתעבד. אף האי נמי, לא קא שקיל מידי وמשתעבד.',
        englishText: 'Source for Arev Logic: Rav Ashi says, if one says "Acquire this donkey and I will be bound to pay you", he acquires it. Why? Law of Arev. Does an Arev take anything? No, yet he is bound.',
        concepts: ['c2'],
        children: [],
        timestamp: 450
    },
    // PART 1: RISHONIM (Separated Logic)
    perspectives: [
        {
            id: 'seg-rashi',
            scholarName: 'Rashi',
            scholarNameHebrew: 'רש"י',
            description: 'Commentary on the text',
            timestamp: 180,
            rootNode: {
                id: 'rashi-root',
                type: LogicType.STATEMENT,
                era: Era.RISHON,
                speaker: 'Rashi',
                hebrewText: 'מדין ערב - שהערב משתעבד למלוה ומתחייב לו לפרוע חובו, ואף על פי שלא הלוהו כלום, והכי קיימא לן (ב"ב קעג, ב) דערב משתעבד, ומפרש התם טעמא בההיא הנאה דקא מהימן ליה גמר ומשעבד נפשיה, הכא נמי בההיא הנאה דקא ציית לה ויהיב מנא לפלוני גמרה ומקניא נפשה. מדין עבד כנעני - דנפשיה קני ליה רבו וממונו של אדון הוא, וכי אמר ליה הילך מנה והוי בן חורין, אף על גב דאדון לא חסר מידי, דהא מנה דידיה הוא, אפילו הכי גמר ומקני ליה נפשיה.',
                englishText: 'Rashi defines the mechanism: Arev works because of the benefit of trust ("Hana\'ah d\'ka meheinan lei"). The woman is betrothed because of the benefit that he listened to her ("Hana\'ah d\'ka tzayis lah"). He gives the money to Ploni, but her satisfaction creates the Kinyan.',
                concepts: ['c4', 'c2'],
                children: []
            },
            analysis: {
                focus: "Definition of Benefit (Hana'ah)",
                chiddush: "Equates the psychological satisfaction of obedience with monetary value.",
                reasoning: "Money effects Kinyan via satisfaction. Here, satisfaction is achieved via the act of giving to Ploni."
            }
        },
        {
            id: 'seg-tosfos',
            scholarName: 'Tosfos',
            scholarNameHebrew: 'תוספות',
            description: 'Analytical Difficulty',
            timestamp: 320,
            rootNode: {
                id: 'tosfos-root',
                type: LogicType.QUESTION,
                era: Era.RISHON,
                speaker: 'Tosfos',
                hebrewText: 'אף על גב דלא מטי הנאה לידיה - וא"ת גבי ערב גופיה מנלן דמשתעבד בלא קנין? וי"ל דסברא הוא דבההיא הנאה דקא מהימן ליה גמר ומשעבד נפשיה. ומיהו בסוף פרק גט פשוט (ב"ב קעג, ב) מייתי לה מקראי דשלמה. ועוד קשה, דהכא מדמה ליה לערב, וערב גופיה בעי קנין אם אין לו מעות, כדאמרינן (ב"ב קעו, א) ערב בשעת מתן מעות לא בעי קנין, לאחר מתן מעות בעי קנין!',
                englishText: 'Tosfos asks: How do we know Arev itself works without a Kinyan? Answer: It is Svara (Logic). Benefit of trust creates binding. Challenge: But elsewhere we derive it from verses! And furthermore, Arev sometimes requires a Kinyan (after money is given). Here, "Ten Manah" implies the money is given now (B\'Shas Matan Maot), so no Kinyan Sudar is needed.',
                concepts: ['c2', 'c1'],
                children: []
            },
            analysis: {
                focus: "Source of Arev",
                chiddush: "Arev is primarily logical (Svara), independent of verses.",
                reasoning: "The concept of 'Shibud' (Lien) can be generated by social dynamics (Trust/Hana'ah) alone."
            }
        },
        {
            id: 'seg-rambam',
            scholarName: 'Rambam',
            scholarNameHebrew: 'רמב"ם',
            description: 'The Requirement of Speech',
            timestamp: 540,
            rootNode: {
                id: 'rambam-root',
                type: LogicType.STATEMENT,
                era: Era.RISHON,
                speaker: 'Rambam',
                hebrewText: 'הרמב"ם (הלכות אישות פרק ה הלכה כה): האשה שאמרה לאיש תן דינר לפלוני ואתקדש אני לך, ונתן לו ואמר לה הרי את מקודשת לי בהנאת מתנה זו שנתתי על פיך - הרי זו מקודשת. אבל אם אמר לה הרי את מקודשת לי בדינר זה - אינה מקודשת, שהרי לא הגיע לידה. ואם לא אמר לה כלום - אינה מקודשת, שמשמעות הדברים שיהיה הדינר הזה קידושין, והרי אינו שלה.',
                englishText: 'Rambam rules: He must say "Behold you are betrothed with the *benefit* of the gift I gave...". If he says "With this Dinar", it is invalid (she didn\'t get it). If he is silent, it is invalid (ambiguity).',
                concepts: ['c3', 'c4'],
                children: []
            },
            analysis: {
                focus: "Defining the Value",
                chiddush: "The Kinyan is the 'Benefit', not the 'Money'. Therefore, the speech must designate the Benefit.",
                reasoning: "Since the coin is not hers, silence implies the coin is the Kinyan (which fails). Speech redirects the Kinyan to the Benefit."
            }
        },
        {
            id: 'seg-rashba',
            scholarName: 'Rashba',
            scholarNameHebrew: 'רשב"א',
            description: 'Automatic Kinyan',
            timestamp: 680,
            rootNode: {
                id: 'rashba-root',
                type: LogicType.REBUTTAL,
                era: Era.RISHON,
                speaker: 'Rashba',
                hebrewText: 'הרשב"א (חידושים דף ז): ואיני יודע מי דחקו לזה... ואדרבה לכאורה משמע דכל כהאי גוונא קרוב הוא להיות כהילך מנה ואתקדש אני לך... משמע דמדין ערב קאמר, דחלה עליה קידושין ממילא בנתינה זו לפלוני, כמו שחלה על הערב שעבוד ממילא באותה נתינה שלוה מלוה את הלוה.',
                englishText: 'Rashba argues: The Gemara compares it to Arev. In Arev, the guarantor does not say "I bind myself via the benefit". The binding happens *automatically* when the lender gives the money. So too here, the betrothal should happen automatically upon giving to Ploni.',
                concepts: ['c2', 'c3'],
                children: []
            },
            analysis: {
                focus: "Nature of the Comparison",
                chiddush: "Arev is a mechanism of 'Constructive Action', not just 'Benefit Exchange'.",
                reasoning: "If Arev is automatic, Kiddushin M'Din Arev must be automatic.",
                dispute: "Disputes Rambam's need for speech."
            }
        }
    ],
    // PART 2: ACHRONIM (Deep Lomdus)
    achronimPerspectives: [
        {
            id: 'seg-birchas-shmuel',
            scholarName: 'Birchas Shmuel',
            scholarNameHebrew: 'ברכת שמואל',
            description: 'Siman 1: Nesina vs Hana\'ah',
            timestamp: 820,
            rootNode: {
                id: 'bs-root',
                type: LogicType.STATEMENT,
                era: Era.ACHRON,
                speaker: 'Birchas Shmuel',
                hebrewText: 'בביאור המחלוקת (קידושין סימן א): יש לחקור בדין ערב, האם נתינת המלוה ללוה חשיב כנתינה להערב (כאילו הערב קיבל ונתן ללוה), ונמצא דהערב משתעבד מחמת "כסף" שקיבל (על ידי הלוה), או דנימא דגוף הכסף אינו נחשב כניתן להערב כלל, רק דהערב משעבד נפשיה בההיא הנאה דהימניה. \n\nונראה דבזה פליגי הרמב"ם והרשב"א. הרשב"א סובר דמדין ערב הוי כנתינה ממש, ואם כן הוי כנתן לה כסף קידושין, ולא בעי דיבור. אבל הרמב"ם סובר דמדין ערב אינו אלא קנין הנאה, וכיון דהקידושין חלין על ההנאה, צריך לייחד הדיבור לההנאה.',
                englishText: 'The Chakira: Is Arev "Constructive Giving" (The lender gave to the guarantor via the borrower) or "Benefit Binding" (The guarantor never received money, only benefit)? \n\nApplication: Rashba holds Arev = Giving. Thus, "Ten Manah" is like giving her money. No speech needed. Rambam holds Arev = Benefit. Thus, "Ten Manah" is a purchase via abstract benefit. Abstract value requires explicit definition via speech.',
                concepts: ['c2', 'c3', 'c5'],
                children: []
            },
            analysis: {
                focus: "The Definition of Arev",
                chiddush: "The dispute is not about the laws of Kiddushin speech, but the definition of the Arev mechanism itself.",
                reasoning: "Objective Act (Nesina) vs Subjective Exchange (Hana'ah).",
                dispute: "Explains the root of Rambam/Rashba."
            }
        }
    ],
    analysis: [
        { id: 'kid6b-ana-1', category: 'CASE', title: 'Ten Manah L\'Ploni', description: 'Woman says: "Give money to a third party, and I will be betrothed to you."', refId: 'base-text-kid6b' },
        { id: 'kid6b-ana-2', category: 'LAW', title: 'Mekudeshes (Betrothed)', description: 'She is betrothed, even though she received no money directly.', refId: 'base-text-kid6b' },
        { id: 'kid6b-ana-3', category: 'FACTOR', title: 'Hana\'ah (Benefit)', description: 'The pleasure of her will being done substitutes for money.', refId: 'rashi-root' },
        { id: 'kid6b-ana-4', category: 'SOURCE', title: 'Arev (Guarantor)', description: 'Derived from the law that one can be bound by a loan given to another.', refId: 'gemara-root' },
    ],
    psakChain: [
        { 
            id: 'psak-kid6b-1', 
            authority: 'Shulchan Aruch', 
            citation: 'Even HaEzer 29:1', 
            text: 'אמרה לו תן מנה לפלוני ואתקדש אני לך, מקודשת מדין ערב.', 
            ruling: 'If she says "Give a manah to Ploni and I will be betrothed to you", she is betrothed via the law of Arev.', 
            basedOn: ['kid-6b-gemara'] 
        },
        { 
            id: 'psak-kid6b-2', 
            authority: 'Rema', 
            citation: 'Even HaEzer 29:1', 
            text: 'ויש אומרים שצריך לומר לה בהנאה זו... ולכתחילה טוב לחוש לדבריהם.', 
            ruling: 'Some say (Rambam) he must explicitly tell her "with this benefit". Initially, one should be concerned for this view.', 
            basedOn: ['rambam-view'] 
        }
    ],
    shulchanAruch: {
        siman: "כט",
        seif: "א",
        mainText: [
            { type: 'MECHABER', text: "אמרה לו תן מנה לפלוני ואתקדש אני לך, מקודשת מדין ערב: שהערב משתעבד ולא קבל מעות, אף זו מקנית עצמה ולא קבלה מעות.", translation: "If she said to him: 'Give a manah to Ploni and I will be betrothed to you', she is betrothed based on the law of Arev: Just as a guarantor is bound without receiving money, she transfers herself without receiving money." },
            { type: 'REMA', text: "ויש אומרים שצריך שיאמר לה: הרי את מקודשת לי בהנאת מתנה זו שנתתי לפלוני. (ולכתחילה נכון לחוש לדבריהם).", translation: "And some say he must say to her: 'Behold you are betrothed to me with the benefit of this gift that I gave to Ploni'. (And initially one should regard their words)." }
        ],
        mishnaBrura: [
            { id: 'mb-1', noteChar: 'א', text: "מדין ערב - הדין דין אמת, אלא שהסברא היא מדין ערב. ואע\"ג דבקידושין בעינן כסף דוקא, הנאה שווה כסף.", translation: "Law of Arev - The ruling is accepted law. Even though Kiddushin usually requires money, 'Benefit' is considered money equivalent." },
            { id: 'mb-2', noteChar: 'ב', text: "בהנאת מתנה - הטעם כדמפרש המגיד משנה, דכיון דלא מטי הנאה לידה, לא גמרה ומקניא נפשה בסתמא, אלא אם כן פירש לה.", translation: "With the benefit of the gift - The reason, as the Maggid Mishneh explains, is that since she receives no direct pleasure, she does not resolve to betroth herself implicitly unless he explicitly states it." }
        ],
        shulchanAruchHarav: [
            { id: 'sh-1', text: "באר היטב: עיין בבית שמואל ס\"ק א' שכתב דבלא אמירה הוי ספק מקודשת לחומרא, וצריכה גט מספק.", translation: "Ba'er Heteyv: See Beis Shmuel SK 1, who writes that without the explicit speech, she is 'Doubtfully Betrothed' strictly, and requires a Get out of doubt." },
            { id: 'sh-2', text: "חלקת מחוקק: אם אמר לה 'הרי את מקודשת לי' סתם, ולא פירש 'בהנאה זו', הוי פלוגתא דרבוותא.", translation: "Chelkas Mechokek: If he just said 'You are betrothed to me' without adding 'with this benefit', it is a dispute among the authorities." }
        ]
    },
    logicSystem: {
        statements: [
            { text: 'תן מנה לפלוני', type: 'Maaseh', color: 'blue', analysis: { subject: 'Act of Giving', predicate: 'Transfer to Third Party', statementType: 'Action', reason: 'Requested by Woman' } },
            { text: 'מדין ערב', type: 'Heikesh', color: 'amber', analysis: { subject: 'Legal Mechanism', predicate: 'Guarantor Logic', statementType: 'Derivation', reason: 'Binding without Receipt' } },
            { text: 'מקודשת', type: 'Din', color: 'green', analysis: { subject: 'Status', predicate: 'Betrothed', statementType: 'Legal Ruling', reason: 'Valid Kinyan via Hanaah/Nesina' } }
        ],
        syllogism: {
            premise1: 'A guarantor (Arev) creates a legal bond (Shibud) solely through the benefit of trust, without receiving assets.',
            premise2: 'Kiddushin is a legal bond that can be effected by whatever mechanism effects a monetary bond (Mamon).',
            conclusion: 'Therefore, a woman can effect Kiddushin by the benefit of her request being fulfilled (giving to a third party), akin to Arev.'
        }
    },
    modernAnalysis: [
        { 
            id: 'ma-1', 
            title: 'Corporate Guarantee', 
            scenario: 'A parent company guarantees a loan for a subsidiary. The parent receives no money, but is legally bound.', 
            parallels: 'Exact parallel to Arev. The parent company binds itself based on the "benefit" of the subsidiary getting the loan.', 
            ruling: 'Legally binding obligation.',
            deepAnalysis: {
                yesod: 'Does legal binding require direct benefit, or can the "pleasure of being trusted" (Hana\'ah) substitute for assets?',
                perspectives: [
                    { 
                        authority: 'Rashba (Constructive Action)', 
                        logic: 'Giving the loan to the subsidiary is considered a direct legal act towards the parent company. The money "bypasses" but the legal effect hits the guarantor.', 
                        outcome: 'Binding immediately upon loan transfer, no extra speech needed.' 
                    },
                    { 
                        authority: 'Rambam (Benefit Exchange)', 
                        logic: 'The parent company receives no assets. They are "buying" the trust/benefit. Since "Benefit" is abstract, they must explicitly state "I bind myself for this benefit".', 
                        outcome: 'Only binding if the guarantee agreement explicitly references the "benefit" of the loan.' 
                    },
                    { 
                        authority: 'Psak (Shulchan Aruch)', 
                        logic: 'We rule like the Rashba regarding monetary Arev (automatic), but in Kiddushin we suspect for the Rambam.', 
                        outcome: 'Binding in civil law (monetary). In marriage, requires explicit speech to be 100% valid.' 
                    }
                ]
            }
        }
    ],
    visualFlow: [
        { id: 'vf-1', label: 'Woman: "Give to Ploni"', type: 'ACTION', status: 'NEUTRAL', description: 'She instructs the man to give money to a third party.' },
        { id: 'vf-2', label: 'Man Gives Money', type: 'ACTION', status: 'VALID', description: 'He hands the money to Ploni.' },
        { 
            id: 'vf-3', 
            label: 'Check: Explicit Speech?', 
            type: 'QUESTION', 
            status: 'DISPUTED', 
            description: 'Did he say "Behold.. with this benefit"?',
            branches: [
                { id: 'vf-4a', label: 'Yes (Explicit)', type: 'RESULT', status: 'VALID', description: 'Mekudeshes (Acc. to Everyone).' },
                { id: 'vf-4b', label: 'No (Silent)', type: 'RESULT', status: 'DISPUTED', description: 'Valid acc. to Rashba, Invalid acc. to Rambam -> Safek Kiddushin.' }
            ]
        }
    ]
};

// Fallback & Mock Assignments
export const MOCK_SUGYA = KID_6B_DEEP_DATA;

export const AVAILABLE_SUGYAS = [
    {
        id: 'kid-6b-deep',
        title: 'Kiddushin 6b: Ten Manah',
        masechta: 'Kiddushin',
        masechtaHebrew: 'קידושין',
        daf: '6b',
        description: 'Analysis of Kiddushin via Arev (Guarantor) mechanism. Deep dive into Rishonim & Achronim.',
        color: 'bg-slate-900',
        hasContent: true,
        data: KID_6B_DEEP_DATA
    }
];

// Navigation Data Structures
export const SEDARIM = [
    { id: 'zeraim', hebrew: 'זרעים', english: 'Zeraim', description: 'Agricultural Laws' },
    { id: 'moed', hebrew: 'מועד', english: 'Moed', description: 'Festivals & Shabbat' },
    { id: 'nashim', hebrew: 'נשים', english: 'Nashim', description: 'Family Law' },
    { id: 'nezikin', hebrew: 'נזיקין', english: 'Nezikin', description: 'Civil & Criminal Law' },
    { id: 'kodshim', hebrew: 'קדשים', english: 'Kodshim', description: 'Sacrificial Service' },
    { id: 'tahorot', hebrew: 'טהרות', english: 'Tahorot', description: 'Ritual Purity' },
];

export const MESECHTOS: Record<string, string[]> = {
    'nashim': ['Kiddushin', 'Gittin', 'Ketubot', 'Yevamot', 'Nedarim', 'Nazir', 'Sota'],
    'nezikin': ['Bava Kamma', 'Bava Metzia', 'Bava Basra', 'Sanhedrin', 'Makkot', 'Shevuot'],
    // Mock data for others
    'zeraim': ['Berakhot'], 
    'moed': ['Shabbat'],
    'kodshim': ['Zevachim'],
    'tahorot': ['Niddah']
};

export const TURIM = [
    { id: 'oc', hebrew: 'אורח חיים', english: 'Orach Chaim', description: 'Daily Life, Prayer', color: 'bg-blue-800' },
    { id: 'yd', hebrew: 'יורה דעה', english: 'Yoreh Deah', description: 'Dietary Laws', color: 'bg-red-800' },
    { id: 'eh', hebrew: 'אבן העזר', english: 'Even HaEzer', description: 'Marriage, Divorce', color: 'bg-purple-800' },
    { id: 'cm', hebrew: 'חושן משפט', english: 'Choshen Mishpat', description: 'Civil Law', color: 'bg-amber-800' },
];

// Mock Simanim for Halacha Mode
export const SIMANIM_MOCK: Record<string, {id: string, label: string, desc: string, linkedSugyaId?: string}[]> = {
    'eh': [
        { id: '29', label: 'Siman 29', desc: 'Kiddushin via Arev & Eved Cnaani', linkedSugyaId: 'kid-6b-deep' }
    ]
};
