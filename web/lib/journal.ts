export type JournalSection = { h: string; p: string[] };

export type JournalArticle = {
  slug: string;
  date: string;
  reading: string;
  image: string;
  imageCaption: string;
  en: { title: string; dek: string; sections: JournalSection[] };
  zh: { title: string; dek: string; sections: JournalSection[] };
};

export const journal: JournalArticle[] = [
  {
    slug: "coffee-at-26-5-north",
    date: "2026-10-24",
    reading: "6 min",
    image: "/images/coffee-cherry.jpg",
    imageCaption:
      "Coffea arabica — illustrative (CC0) / 示意图，非怒江实拍",
    en: {
      title: "Why Nujiang grows coffee at 26.5° north",
      dek: "Commercial arabica normally stops around 25°N. Nujiang pushed it a full degree and a half further north — and the cup is better for it.",
      sections: [
        {
          h: "The limit, and who moved it",
          p: [
            "Coffee belts are usually drawn between 25°N and 25°S. Yunnan's mainstream growing zone sits right on that northern edge, around 24–25°N. Nujiang sits above it: the prefecture's coffee belt runs to roughly 26.5°N, which makes it one of the highest-latitude commercial coffee areas in the world.",
            "That is not a marketing claim — the prefecture's own coffee-industry documents describe pushing the crop north, and the resulting cup profile is what the region now sells: clean, floral, with a sweet-sour balance rather than heavy body.",
          ],
        },
        {
          h: "What altitude does to a bean",
          p: [
            "Plots run from roughly 800 m to 1,500 m, with some reaching 1,800 m; the 1,200 m belt is treated locally as the sweet spot. Higher ground means cooler nights, a slower ripening season and denser fruit — the same logic that makes high-grown coffee prized everywhere.",
            "The soil is volcanic-ash and selenium-rich; locals call it “panda soil”. Add a sharp day–night temperature swing and distinct wet and dry seasons, and you get the slow, even maturation that specialty buyers look for.",
          ],
        },
        {
          h: "The varietals actually in the ground",
          p: [
            "Geisha, Typica, Bourbon and Caturra are planted alongside Yunnan's own selections — Yunka No.2, Biluoxue, Gaoligong, Dere 5. Catimor, the hardy legacy of the 1990s expansion, still occupies a large share of older plots.",
            "Prefecture figures put the planted area at just over 6 万 mu (about 4,000 ha), with 4.98 万 mu under improved varieties — an 83% improved-variety rate. In Lushui, the core district, 2025 coffee output value reached ¥576 million and the crop supported 2,813 households at an average of ¥35,900 extra income each.",
          ],
        },
        {
          h: "Why the processing moved uphill",
          p: [
            "For years, picked cherry and parchment were trucked to Baoshan for processing — cost and quality both suffered. Local firm Akgbi has since built a 300 m² primary-processing line that handles 1.5 tonnes of parchment an hour and grades by screen size.",
            "That single change explains a lot of the recent quality story: the fruit is processed where it is grown, so the lot keeps its identity instead of dissolving into a regional blend.",
          ],
        },
      ],
    },
    zh: {
      title: "怒江为什么能在北纬 26.5° 种咖啡",
      dek: "商业阿拉比卡的北界通常画在北纬 25°。怒江把它往北推了一度半——杯子也因此更干净。",
      sections: [
        {
          h: "那条线，是谁挪的",
          p: [
            "咖啡带一般画在北纬 25° 到南纬 25° 之间，云南主产区正好压在这条北界上，大约 24–25°。怒江在这条线以北：全州咖啡带大致到北纬 26.5°，是全球纬度最高的商业咖啡产区之一。",
            "这不是宣传话术——州里的咖啡产业文件本身就写着“把咖啡往北推”，而它换来的风味也确实是现在对外讲的那套：干净、带花香、酸甜平衡，而不是厚重的醇苦。",
          ],
        },
        {
          h: "海拔对一颗豆做了什么",
          p: [
            "地块从 800 米分布到 1500 米，部分到 1800 米，1200 米被本地当作黄金带。海拔越高夜里越凉，成熟期越长，果实越紧实——这是全世界高山咖啡共通的道理。",
            "土壤是火山灰、富硒，本地人叫它“熊猫土”。再加上昼夜温差大、干湿季分明，就得到了精品买家要找的那种缓慢而均匀的成熟。",
          ],
        },
        {
          h: "地里真正种着什么",
          p: [
            "瑰夏、铁皮卡、波邦、卡杜拉，配上云南自己的选育品种——云咖2号、碧罗雪、高黎贡、德热5号。而 1990 年代扩种留下的卡蒂姆，仍然占着不少老地块。",
            "州里公布的数字是：种植面积突破 6 万亩，其中优质品种 4.98 万亩，良种覆盖率 83%。核心产区泸水 2025 年咖啡综合产值 5.76 亿元，带动 2813 户咖农，户均增收 3.59 万元。",
          ],
        },
        {
          h: "为什么加工搬回了山上",
          p: [
            "过去鲜果和生豆要运到保山加工，成本高，品质也吃亏。本土企业阿克比建了 300 平方米的初加工线，每小时处理 1.5 吨带壳豆，还能按颗粒大小分级。",
            "这一件事解释了很多近年的品质变化：果实在产地就被处理，批次保住了自己的身份，而不是被混成一个大区域的拼配。",
          ],
        },
      ],
    },
  },
  {
    slug: "zhiziluo-coffee-estate",
    date: "2026-10-10",
    reading: "5 min",
    image: "/images/gaoligong-crown.jpg",
    imageCaption: "Crown Mountain above Pihe, Fugong / 福贡匹河，皇冠山",
    en: {
      title: "Zhiziluo: the town that emptied, then filled with coffee",
      dek: "In 1986 the county seat moved away and left a 1960s town behind at 2,023 m. Forty years later, a coffee estate turned the empty streets into an itinerary stop.",
      sections: [
        {
          h: "A town preserved by being abandoned",
          p: [
            "Zhiziluo sits at 2,023 m above Pihe township in Fugong County. It was the seat of Bijiang County and, from 1954, of the Nujiang prefecture government; barracks, a hospital, a school, a department store and an octagonal tower went up in turn.",
            "In 1973 the prefecture moved south. In 1986 Bijiang County was dissolved. The town emptied and stopped — which is why its 1960s–70s street fabric survives intact, and why people now call it the “memory city above the clouds”.",
          ],
        },
        {
          h: "The bean arrives",
          p: [
            "In 2025 Fugong County began planting specialty coffee — Geisha, Typica — on the high-altitude belt around Pihe and Zilijia, and converted idle old buildings in Zhiziluo into a coffee estate.",
            "The estate roasts beans named after two landmarks you can see from the terrace: Stone Moon and Crown Mountain. The naming is not decoration; those peaks are the horizon of the growing area.",
          ],
        },
        {
          h: "What it changed",
          p: [
            "Visitors now walk the old streets, cup coffee, eat local food and watch Nu and Lisu performances in the same afternoon. Villagers have come back to run guesthouses and estate work; the village collective takes a dividend from the old houses it contributed as shares.",
            "It is a small, specific model — coffee plus tourism, with the tourism not bolted on but sited inside the coffee story. For a prefecture selling 秘境怒江 · 户外天堂, that is exactly the kind of stop the brand needs: somewhere to sit down between two hikes.",
          ],
        },
      ],
    },
    zh: {
      title: "知子罗：人走了，咖啡来了",
      dek: "1986 年县城搬走，把一个 1960 年代的小城留在了海拔 2023 米。四十年后，一座咖啡庄园把空街变成了行程里的一站。",
      sections: [
        {
          h: "一座因为被放弃而保住的城",
          p: [
            "知子罗在福贡县匹河乡上方，海拔 2023 米。它曾是碧江县城，1954 年起还是怒江州府驻地；营房、医院、学校、百货商店、八角楼陆续建起。",
            "1973 年州府南迁，1986 年碧江县建制撤销。城空了，也停住了——所以六七十年代的街巷原样留了下来，人们现在叫它“云端上的记忆之城”。",
          ],
        },
        {
          h: "豆子进山",
          p: [
            "2025 年，福贡县在匹河、子里甲等乡镇的高海拔带规模化种下瑰夏、铁皮卡，并把知子罗的闲置老建筑改成了咖啡庄园。",
            "庄园烘焙的豆子，用了从露台上就能看见的两座地标命名：石月亮、皇冠山。这不是修辞——那两座山就是这片产区的天际线。",
          ],
        },
        {
          h: "它改变了什么",
          p: [
            "现在游客可以在同一个下午逛老街、喝咖啡、吃本地菜、看怒族和傈僳族的歌舞。外出务工的村民回来开民宿、进庄园；村集体拿老房子入股分红。",
            "这是一个小而具体的模型——咖啡加文旅，而文旅不是硬贴上去，是长在咖啡故事里的。对一个正在推“秘境怒江·户外天堂”的州来说，这恰好是品牌需要的那种停留点：两段徒步之间，能坐下来喝一杯的地方。",
          ],
        },
      ],
    },
  },
  {
    slug: "three-winter-routes",
    date: "2026-09-26",
    reading: "4 min",
    image: "/images/first-bend.jpg",
    imageCaption: "The First Bend of the Nu River / 怒江第一湾",
    en: {
      title: "The three winter routes Nujiang is actually promoting",
      dek: "Not a brochure list — the prefecture packages its 2025–26 season as three named routes, and coffee appears in the third one.",
      sections: [
        {
          h: "How the season is framed",
          p: [
            "Nujiang's culture and tourism bureau now works under two official lines: the destination IP 有一种向往去怒江 (“there is a longing to go to Nujiang”), and the brand 秘境怒江 · 户外天堂 — secret Nujiang, outdoor paradise. Both sit inside Yunnan's provincial campaign 有一种叫云南的生活.",
            "For the 2025–26 winter season those lines became three products, announced with the 2026 Lisu Kuoshi festival (20 December 2025 – 5 January 2026).",
          ],
        },
        {
          h: "One: whitewater and secret valleys",
          p: [
            "激情野水 · 秘境探险 — rafting on the Salween, including the run from Buladi to Mijing Bay and a race course through Lushui itself. The invitation is blunt: “come raft Nujiang in winter”, on 20-degree water.",
            "The land version follows G219, the Beautiful Highway: Tiger Leaping rapids, the First Bend, and up to Kongque Shan. Add zip-lines, paragliding, canyon trekking and climbing.",
          ],
        },
        {
          h: "Two: festival and living heritage",
          p: [
            "欢乐阔时 · 非遗寻踪 — Laomden, Baihualing, Wuli, Dulongjiang and Luoguqing. Lisu four-part harmony, the Nu dabiya, Pumi folk music, Dulong weaving, hand-grabbed rice and the Kuoshi festival itself.",
            "This is the route where a visitor is a guest rather than a spectator: most stops are working villages, not staged sites.",
          ],
        },
        {
          h: "Three: warm winter, above the clouds",
          p: [
            "暖冬康养 · 云上栖心 — hot springs at Denggeng, canyon-view hotels and guesthouses, and a slow cup of Nujiang specialty coffee above the cloud sea. Coffee is the punctuation mark at the end of the day, not a separate attraction.",
            "That is the strategic shift worth noticing: the prefecture is no longer selling scenery alone. It is selling a sequence — move hard, eat and sing, then sit still with a cup.",
          ],
        },
      ],
    },
    zh: {
      title: "怒江这个冬天，官方在推的三条线路",
      dek: "不是宣传册上的罗列——州里把 2025–2026 冬春做成了三条具名线路，而咖啡在第三条里。",
      sections: [
        {
          h: "这个季节是怎么被讲出来的",
          p: [
            "怒江州文旅部门现在对外用两句话：目的地 IP「有一种向往去怒江」，品牌「秘境怒江·户外天堂」。两句都嵌在云南省「有一种叫云南的生活」之下。",
            "到了 2025–2026 冬春，这两句话被做成了三个产品，与 2026 怒江傈僳「阔时」文化节（2025.12.20–2026.1.5）一起发布。",
          ],
        },
        {
          h: "一：野水与秘境",
          p: [
            "「激情野水·秘境探险」——怒江漂流，从布拉底漂到秘境湾，也可以在泸水主城区竞速。邀请说得很直白：冬季到怒江来漂流，20 度的水。",
            "陆路版本沿 G219 美丽公路走：老虎跳、怒江第一湾，一路到孔雀山。中间还能接溜索、滑翔伞、峡谷徒步和攀岩。",
          ],
        },
        {
          h: "二：节庆与非遗",
          p: [
            "「欢乐阔时·非遗寻踪」——老姆登、百花岭、雾里、独龙江、罗古箐。傈僳四声部、怒族达比亚、普米琴声、独龙毯、手抓饭，以及阔时本身。",
            "这条线里，游客是客人而不是观众：大部分停靠点是还在生活的村子，不是布景。",
          ],
        },
        {
          h: "三：暖冬与云上",
          p: [
            "「暖冬康养·云上栖心」——登埂温泉、峡谷景观酒店与民宿，以及云海之上慢慢喝一杯怒江精品咖啡。咖啡是一天的句号，不是一个单独的景点。",
            "这里有个值得注意的转向：怒江不再只卖风景，而是在卖一个顺序——先动起来，再吃再唱，最后坐下来喝一杯。",
          ],
        },
      ],
    },
  },
];

export function getArticle(slug: string): JournalArticle | undefined {
  return journal.find((a) => a.slug === slug);
}

export const journalSlugs = journal.map((a) => a.slug);
