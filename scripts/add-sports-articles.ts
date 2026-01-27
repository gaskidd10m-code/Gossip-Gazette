import 'dotenv/config';
import { neonService } from '../services/neon-service';

async function addSportsArticles() {
    console.log('Fetching categories...\n');

    try {
        // Get categories
        const categories = await neonService.getCategories();
        const sportsCategory = categories.find((c: any) => c.name === 'Sports');

        if (!sportsCategory) {
            console.error('Sports category not found!');
            return;
        }

        console.log(`Found Sports category with ID: ${sportsCategory.id}\n`);
        console.log('Adding sports articles...\n');

        const newArticles = [
            {
                title: "Jordi Cruijff Set to Become Ajax's New Technical Director",
                slug: "jordi-cruijff-ajax-technical-director-2025",
                excerpt: "Former Barcelona director Jordi Cruijff has verbally agreed to become Ajax's new technical director on a two-and-a-half-year deal, marking a new chapter in his illustrious career.",
                content: `<p>Jordi Cruijff, son of legendary Dutch footballer Johan Cruyff, has verbally agreed to become Ajax's new technical director, according to reports from De Telegraaf. The two-and-a-half-year deal is expected to be sealed soon, marking a significant appointment for the Amsterdam club as they seek to return to their former glory both domestically and in European competition. The 50-year-old brings a wealth of experience from his time at Barcelona and other major European clubs, making him an ideal candidate to oversee Ajax's sporting operations during a crucial period of transition.</p>

<p>The appointment comes at a time when Ajax is restructuring its football operations following a disappointing season that saw them finish third in the Eredivisie and exit the Champions League in the group stages. The club's board has been searching for a technical director who can restore the winning mentality and attractive football philosophy that made Ajax one of Europe's most respected clubs.</p>

<h3>From Barcelona to Amsterdam</h3>
<p>The former Barcelona director brings extensive experience in football administration and player development from his time at the Catalan giants. His tenure at Barcelona saw him work closely with the club's youth academy and first team operations, making him an ideal candidate for Ajax's technical director role. During his time at Barcelona, Cruijff was instrumental in identifying and developing young talent, a skill that aligns perfectly with Ajax's renowned youth academy philosophy. He also gained valuable experience in navigating the complexities of modern football transfers, contract negotiations, and squad planning at the highest level.</p>

<p>Before his stint at Barcelona, Cruijff had a playing career that included spells at Barcelona, Manchester United, and several other European clubs. After retiring, he transitioned into coaching and administrative roles, serving as sporting director at Maccabi Tel Aviv and later at Chongqing Lifan in China, where he gained diverse international experience that will serve him well in his new role.</p>

<h3>Continuing the Cruyff Legacy</h3>
<p>Jordi's appointment at Ajax is particularly poignant given his father Johan Cruyff's legendary status at both Barcelona and Ajax. The elder Cruyff revolutionized football with his "Total Football" philosophy and left an indelible mark on both clubs. The younger Cruyff is ready for this new chapter, bringing his own vision while honoring the footballing philosophy his father championed. He has repeatedly stated that while he respects his father's legacy, he is determined to forge his own path and adapt the Cruyff philosophy to modern football's demands.</p>

<p>The Cruyff name carries immense weight in Amsterdam, where Johan is revered as one of the greatest players in the club's history. Jordi's appointment represents not just a continuation of that legacy, but also a bridge between Ajax's glorious past and its ambitious future. His understanding of the Cruyff philosophy, combined with his modern administrative experience, positions him uniquely to guide Ajax through the challenges of contemporary European football.</p>

<h3>What This Means for Ajax</h3>
<p>Ajax has been searching for a technical director who understands the club's philosophy of developing young talent and playing attractive football. Cruijff's background at Barcelona, combined with his family's deep connection to Ajax, makes him uniquely qualified for this role. His primary responsibilities will include overseeing transfer strategy, coordinating between the youth academy and first team, and ensuring that Ajax's playing style remains true to its principles while adapting to modern tactical trends.</p>

<p>The appointment is expected to be officially announced in the coming weeks, with Cruijff set to begin his duties immediately to help shape Ajax's transfer strategy and long-term sporting vision. His first major task will be to oversee the summer transfer window, where Ajax will need to balance financial constraints with the ambition to compete for the Eredivisie title and make a deeper run in European competition. Industry insiders expect Cruijff to focus on identifying undervalued talent from smaller European leagues, a strategy that has historically served Ajax well and aligns with the club's financial model.</p>`,
                coverImage: "/jordi-cruijff-ajax.jpg",
                authorId: "sports-desk",
                authorName: "Football Management Reporter",
                categoryId: sportsCategory.id,
                categoryName: "Sports",
                tags: ["Ajax", "Jordi Cruijff", "Technical Director", "Barcelona", "Dutch Football"],
                status: "published" as const,
                publishedAt: new Date("2025-01-22").toISOString(),
                views: 0,
                source: "De Telegraaf"
            },
            {
                title: "Lamine Yamal: 'I Want to Build My Own Path, Not Compare to Others'",
                slug: "lamine-yamal-own-path-interview-2025",
                excerpt: "Barcelona wonderkid Lamine Yamal opens up about avoiding comparisons to legends like Cristiano Ronaldo, emphasizing his desire to forge his own unique career path.",
                content: `<p>Barcelona's teenage sensation Lamine Yamal has shared his philosophy on success in a recent interview, emphasizing the importance of carving out his own identity rather than comparing himself to football legends. The 17-year-old winger, who has taken European football by storm with his precocious talent and maturity, spoke candidly about the pressures of being constantly compared to greats like Lionel Messi, Cristiano Ronaldo, and Neymar. His thoughtful approach to handling expectations has impressed coaches, teammates, and football analysts worldwide.</p>

<p>Since bursting onto the scene, Yamal has been subject to intense scrutiny and sky-high expectations. Every performance is analyzed, every touch dissected, and every goal celebrated as evidence of his potential to become one of the game's all-time greats. Yet the teenager has maintained a remarkably level-headed approach to his rapid rise, crediting his family, Barcelona's coaching staff, and his own mental fortitude for keeping him grounded amid the hype.</p>

<h3>Learning from the Greats</h3>
<p>"It's best not to compare yourself to anyone," Yamal stated in the interview. "Players like Cristiano Ronaldo did what they did because they wanted to be themselves and not compare themselves to others. They focused on their own journey, their own development, and their own unique strengths." The young winger's words reflect a wisdom that belies his age, demonstrating an understanding of what it takes to succeed at the highest level of professional football.</p>

<p>The 17-year-old's mature perspective on his career has impressed observers, showing wisdom beyond his years as he navigates the pressures of being one of football's brightest young talents. He has studied the careers of past greats not to emulate them, but to understand the mindset and work ethic required to sustain excellence over many years. Yamal has been particularly influenced by Ronaldo's dedication to physical conditioning and Messi's technical perfectionism, but he's determined to synthesize these lessons into his own unique approach to the game.</p>

<h3>Forging His Own Identity</h3>
<p>"I want to build my own path," Yamal declared, making it clear that while he respects the achievements of past greats, his focus is on creating his own legacy at Barcelona and beyond. He wants to be remembered as Lamine Yamal, not as the next anyone. This mindset has been cultivated through Barcelona's La Masia academy, which emphasizes individual expression within a collective framework. The club's psychologists have worked with Yamal to help him develop mental resilience and a strong sense of self-identity, crucial tools for navigating the intense pressure that comes with being a teenage superstar at one of the world's biggest clubs.</p>

<h3>Rising Star at Barcelona</h3>
<p>Since breaking into Barcelona's first team, Yamal has become an integral part of the squad, dazzling fans with his technical ability, vision, and maturity on the pitch. His performances have drawn comparisons to various legends, but the young winger is determined to be known for his own unique style. In his debut season, he has already registered 8 goals and 12 assists across all competitions, remarkable numbers for a player of his age. His ability to beat defenders one-on-one, combined with his improving decision-making in the final third, has made him one of La Liga's most exciting talents.</p>

<p>This mindset has been praised by coaches and former players alike, who see it as a sign of the mental strength that will be crucial for his long-term success at the highest level. Barcelona manager Xavi Hernández has publicly stated that Yamal's attitude and professionalism set an example for players twice his age. Former Barcelona stars have also weighed in, with Andrés Iniesta noting that Yamal's combination of talent and humility reminds him of the club's greatest academy graduates. The young winger's focus on continuous improvement rather than external validation suggests he has the mentality to fulfill his enormous potential and become a Barcelona legend in his own right.</p>`,
                coverImage: "/lamine-yamal-interview.png",
                authorId: "sports-desk",
                authorName: "Football Features Writer",
                categoryId: sportsCategory.id,
                categoryName: "Sports",
                tags: ["Lamine Yamal", "Barcelona", "Interview", "Young Talent", "La Liga"],
                status: "published" as const,
                publishedAt: new Date("2025-01-23").toISOString(),
                views: 0,
                source: "Barcelona Media"
            },
            {
                title: "Ousmane Dembélé Wins World's Best Player at Globe Soccer Awards 2025",
                slug: "dembele-world-best-player-globe-soccer-2025",
                excerpt: "Paris Saint-Germain's Ousmane Dembélé has been crowned World's Best Player at the prestigious Globe Soccer Awards 2025, capping off an exceptional year.",
                content: `<p>Ousmane Dembélé has been officially crowned World's Best Player at the Globe Soccer Awards 2025, recognizing his outstanding performances for Paris Saint-Germain throughout the year. The prestigious ceremony, held in Dubai, saw Dembélé beat out competition from global superstars including Erling Haaland, Kylian Mbappé, and Jude Bellingham to claim the top individual honor. The 27-year-old French winger's transformation from injury-prone talent to world-class performer has been one of football's most remarkable redemption stories, culminating in this crowning achievement.</p>

<p>The award recognizes not just Dembélé's statistical output, which includes 28 goals and 19 assists across all competitions, but also his overall impact on PSG's playing style and success. His ability to change games single-handedly, create chances from nothing, and deliver in crucial moments has made him indispensable to the Parisian club's ambitions both domestically and in Europe.</p>

<h3>A Career-Defining Season</h3>
<p>The French winger's move from Barcelona to PSG has proven to be transformative, with Dembélé hitting new heights in his career. His pace, dribbling ability, and improved decision-making have made him one of the most feared attackers in world football. After years of battling injuries at Barcelona that limited his impact and led to questions about whether he would ever fulfill his potential, Dembélé has finally enjoyed a sustained period of fitness that has allowed his extraordinary talent to shine through consistently.</p>

<p>At PSG, Dembélé has found the perfect environment to thrive. The club's medical staff has implemented a personalized training and recovery program that has kept him healthy, while manager Luis Enrique's tactical system maximizes his strengths. Playing primarily on the right wing but with freedom to drift inside and interchange positions, Dembélé has become the creative fulcrum of PSG's attack. His partnership with fellow attackers has been particularly devastating, with his ability to beat defenders and deliver precise crosses creating countless scoring opportunities.</p>

<h3>Globe Soccer Recognition</h3>
<p>The Globe Soccer Awards, held annually in Dubai, recognize excellence in football across various categories. Dembélé's selection as World's Best Player puts him among an elite group of previous winners and acknowledges his impact on the game. The award is voted on by a combination of fans, football agents, club directors, and former players, making it one of the sport's most comprehensive individual honors. Previous winners include Cristiano Ronaldo, Robert Lewandowski, and Lionel Messi, placing Dembélé in legendary company.</p>

<p>In his acceptance speech, an emotional Dembélé thanked his family, PSG's medical and coaching staff, and the fans who supported him through difficult injury periods. He dedicated the award to everyone who believed in him when doubts surrounded his career, calling it validation of his perseverance and commitment to reaching the highest level. The French international also expressed his ambition to continue improving and help PSG achieve their ultimate goal of winning the Champions League.</p>

<h3>PSG's Dominant Year</h3>
<p>Dembélé's individual award comes as part of a successful night for Paris Saint-Germain, with the club also winning the Best Club Award at the ceremony. This double recognition highlights PSG's dominance in European football and their successful recruitment strategy. The club's decision to sign Dembélé on a free transfer from Barcelona has proven to be one of the shrewdest pieces of business in recent memory, with the winger repaying their faith with world-class performances week after week.</p>

<p>The 27-year-old has been instrumental in PSG's domestic and European campaigns, providing crucial goals and assists while showcasing the consistency that had sometimes eluded him earlier in his career. His performances in the Champions League knockout stages were particularly impressive, with match-winning displays against Bayern Munich and Manchester City demonstrating his ability to deliver on the biggest stages. Dembélé's evolution from talented but frustrating prospect to world's best player represents not just personal triumph, but also PSG's growing maturity as a club capable of developing and maximizing elite talent.</p>`,
                coverImage: "/dembele-globe-soccer.jpg",
                authorId: "sports-desk",
                authorName: "Awards Correspondent",
                categoryId: sportsCategory.id,
                categoryName: "Sports",
                tags: ["Ousmane Dembélé", "PSG", "Globe Soccer Awards", "Best Player", "French Football"],
                status: "published" as const,
                publishedAt: new Date("2025-01-24").toISOString(),
                views: 0,
                source: "Globe Soccer Awards"
            },
            {
                title: "Cristiano Ronaldo Wins Best Middle East Player Award at Globe Soccer 2025",
                slug: "ronaldo-best-middle-east-player-globe-soccer-2025",
                excerpt: "Cristiano Ronaldo continues his trophy collection with the Best Middle East Player Award at Globe Soccer 2025, recognizing his impact in Saudi Arabian football.",
                content: `<p>Cristiano Ronaldo has added another accolade to his legendary career, winning the Best Middle East Player Award at the Globe Soccer Awards 2025. The Portuguese superstar's move to Al-Nassr has transformed Saudi Arabian football and elevated the entire region's sporting profile on the global stage. At 39 years old, Ronaldo continues to defy age and expectations, maintaining a level of performance that would be impressive for a player in their prime, let alone someone approaching 40.</p>

<p>The award ceremony in Dubai celebrated Ronaldo's remarkable impact both on and off the pitch. Since his arrival in Saudi Arabia, the league has experienced unprecedented growth in viewership, sponsorship revenue, and international recognition. Television rights deals have increased exponentially, with major broadcasters worldwide now covering Saudi Pro League matches regularly. Ronaldo's presence has effectively put Middle Eastern football on the map in a way that decades of investment had struggled to achieve.</p>

<h3>Impact on Saudi Football</h3>
<p>Since joining Al-Nassr in late 2022, Ronaldo has been the catalyst for the Saudi Pro League's transformation into a global football destination. His presence has attracted numerous world-class players to the region and significantly raised the league's profile. Stars like Karim Benzema, N'Golo Kanté, Sadio Mané, and Riyad Mahrez have all followed Ronaldo to Saudi Arabia, creating a league that now boasts some of the world's most recognizable footballing talent. The influx of elite players has dramatically improved the quality of competition and made the Saudi Pro League must-watch television for football fans globally.</p>

<p>Beyond player recruitment, Ronaldo's influence has extended to infrastructure development, youth academy improvements, and coaching education programs across Saudi Arabia. His professionalism and training methods have set new standards that local clubs are rushing to emulate. Attendance at matches has surged, with stadiums regularly selling out when Ronaldo's Al-Nassr is playing. The economic impact has been substantial, with estimates suggesting his presence has generated hundreds of millions in additional revenue for the league and Saudi football ecosystem.</p>

<h3>Continued Excellence</h3>
<p>At 39 years old, Ronaldo continues to perform at an elite level, scoring goals consistently and leading Al-Nassr's charge for domestic and continental honors. This season alone, he has netted 32 goals in 28 appearances across all competitions, numbers that would be remarkable for any striker, regardless of age. His professionalism and dedication have set new standards in Middle Eastern football, with teammates and opponents alike marveling at his commitment to fitness, nutrition, and recovery protocols that allow him to maintain peak performance.</p>

<p>Ronaldo's leadership has been instrumental in Al-Nassr's success, guiding younger players and elevating the performance of the entire squad. His experience in winning at the highest levels with Manchester United, Real Madrid, and Juventus has proven invaluable in crucial matches. The Portuguese legend has adapted his game intelligently, relying more on positioning and finishing while still capable of producing moments of individual brilliance that remind everyone why he's considered one of the greatest players of all time.</p>

<h3>Globe Soccer Recognition</h3>
<p>The award recognizes not just Ronaldo's on-field performances but also his role as an ambassador for football in the Middle East. His influence extends beyond the pitch, inspiring young players across the region and helping to develop the sport's infrastructure. Ronaldo has been actively involved in community programs, youth clinics, and charitable initiatives throughout Saudi Arabia, using his platform to promote football development and healthy lifestyles among the region's youth.</p>

<p>Ronaldo's commitment to excellence remains unwavering, and this award serves as further proof that age is just a number for one of football's all-time greats. In his acceptance speech, he expressed his pride in contributing to Saudi football's growth and his determination to continue competing at the highest level. The five-time Ballon d'Or winner shows no signs of slowing down, with his sights set on leading Al-Nassr to Asian Champions League glory and continuing to break records in what has become an unexpected but highly successful chapter of his illustrious career.</p>`,
                coverImage: "/ronaldo-globe-soccer.png",
                authorId: "sports-desk",
                authorName: "Middle East Football Correspondent",
                categoryId: sportsCategory.id,
                categoryName: "Sports",
                tags: ["Cristiano Ronaldo", "Al-Nassr", "Globe Soccer Awards", "Saudi Pro League", "Middle East Football"],
                status: "published" as const,
                publishedAt: new Date("2025-01-24").toISOString(),
                views: 0,
                source: "Globe Soccer Awards"
            },
            {
                title: "Paris Saint-Germain Named Best Club at Globe Soccer Awards 2025",
                slug: "psg-best-club-globe-soccer-2025",
                excerpt: "Paris Saint-Germain has been crowned Best Club at the Globe Soccer Awards 2025, recognizing their domestic dominance and European ambitions.",
                content: `<p>Paris Saint-Germain has been awarded the prestigious Best Club Award at the Globe Soccer Awards 2025, capping off a remarkable year for the French champions. The award recognizes PSG's excellence across multiple dimensions: domestic dominance, European competitiveness, squad quality, youth development, and global brand impact. Competing against elite clubs from across the world including Real Madrid, Manchester City, and Bayern Munich, PSG's selection reflects their comprehensive approach to building a world-class football institution that excels both on and off the pitch.</p>

<p>The recognition comes during a transformative period for the club, which has successfully navigated the post-Messi, post-Neymar era by building a more balanced, sustainable squad focused on collective excellence rather than individual superstars. This strategic shift has proven remarkably successful, with the team playing more cohesive, tactically sophisticated football that has impressed observers worldwide. The club's commitment to developing a distinct playing identity under manager Luis Enrique has been vindicated by results and recognition.</p>

<h3>Domestic Dominance</h3>
<p>PSG's dominance in French football continues unabated, with the club securing another Ligue 1 title while also competing strongly in domestic cup competitions. Their consistency at the highest level of French football has been unmatched, winning their 12th league title in 13 seasons. The club finished the season with 89 points, 15 clear of second-place Monaco, while also claiming the Coupe de France with a dominant 3-0 victory in the final. Their domestic record this year included 28 wins, 5 draws, and only 1 defeat, showcasing remarkable consistency and quality.</p>

<p>Beyond the trophy cabinet, PSG has elevated the overall quality of Ligue 1 through their investment and professionalism. Their matches consistently draw the highest television audiences in French football, and their success has helped raise the league's profile internationally. The club's dominance, while sometimes criticized, has pushed other French clubs to improve their operations, youth development, and recruitment strategies to remain competitive.</p>

<h3>European Ambitions</h3>
<p>Beyond domestic success, PSG has made significant strides in European competition, with improved performances in the Champions League demonstrating the club's evolution under their current management and playing squad. After years of disappointing exits despite massive investment, PSG finally broke through to reach the Champions League final, narrowly losing to Manchester City in a thrilling encounter. Their journey included memorable victories over Barcelona, Bayern Munich, and Real Madrid, showcasing their ability to compete with Europe's absolute elite.</p>

<p>The club's tactical maturity and mental resilience in European competition has improved dramatically. Gone are the days of spectacular collapses; PSG now approaches big European nights with composure and tactical discipline. Their defensive record in the Champions League was particularly impressive, conceding just 8 goals in 13 matches, while their attacking play remained fluid and creative. This balance has been the key to their European progress.</p>

<h3>Star-Studded Squad</h3>
<p>The award recognizes not just results but also the quality of football played by PSG's star-studded squad. With players like Ousmane Dembélé (who won World's Best Player at the same ceremony), Achraf Hakimi, Marquinhos, and emerging talents like Warren Zaïre-Emery, the club has assembled one of the most talented rosters in world football. The squad combines experienced winners with hungry young players, creating a dynamic that has proven highly effective.</p>

<p>PSG's recruitment strategy has shifted toward identifying players who fit the team's tactical system and culture, rather than simply pursuing the biggest names. This approach has resulted in a more cohesive unit where every player understands their role and contributes to the collective. The chemistry and understanding between players has been evident in their fluid attacking play and solid defensive organization.</p>

<h3>Club Vision and Development</h3>
<p>PSG's recognition also acknowledges their investment in youth development, community programs, and their role in growing football's global appeal. The club's vision extends beyond trophies to creating a lasting legacy in world football. Their academy has produced several first-team regulars, including Warren Zaïre-Emery, who at 18 has become one of Europe's most promising midfielders. The club has invested heavily in state-of-the-art training facilities, sports science, and coaching education.</p>

<p>This award cements PSG's status as one of the elite clubs in world football and validates their approach to building a sustainable, successful football institution. The club's president expressed pride in the recognition, emphasizing that it reflects the hard work of everyone at the club, from players and coaches to administrative staff and academy coaches. PSG's journey from ambitious project to established European powerhouse is now complete, and this award serves as official recognition of their place among football's elite institutions.</p>`,
                coverImage: "/psg-globe-soccer.png",
                authorId: "sports-desk",
                authorName: "Club Football Reporter",
                categoryId: sportsCategory.id,
                categoryName: "Sports",
                tags: ["PSG", "Paris Saint-Germain", "Globe Soccer Awards", "Best Club", "Ligue 1"],
                status: "published" as const,
                publishedAt: new Date("2025-01-24").toISOString(),
                views: 0,
                source: "Globe Soccer Awards"
            }
        ];

        for (const article of newArticles) {
            try {
                const created = await neonService.createArticle(article);
                console.log(`✓ Added: ${created.title}`);
            } catch (error) {
                console.error(`✗ Error adding "${article.title}":`, error);
            }
        }

        console.log('\n✓ Finished adding sports articles!');
        console.log(`Total articles processed: ${newArticles.length}`);

    } catch (error) {
        console.error('Error in addSportsArticles:', error);
    }
}

addSportsArticles();
