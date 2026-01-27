import 'dotenv/config';

const API_URL = 'http://localhost:3001/api';

// First, let's ensure categories exist
const categories = [
    { name: 'World' },
    { name: 'Politics' },
    { name: 'Sports' },
    { name: 'Entertainment' },
    { name: 'Technology' },
    { name: 'Business' }
];

async function setupCategories() {
    console.log('Setting up categories...\n');

    // Get existing categories
    const response = await fetch(`${API_URL}/categories`);
    const existingCategories = await response.json();

    console.log(`Found ${existingCategories.length} existing categories`);

    // Create categories if they don't exist
    for (const category of categories) {
        const exists = existingCategories.find((c: any) => c.name === category.name);
        if (!exists) {
            try {
                const response = await fetch(`${API_URL}/categories`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(category),
                });

                if (response.ok) {
                    console.log(`✓ Created category: ${category.name}`);
                }
            } catch (error) {
                console.error(`✗ Failed to create category "${category.name}":`, error);
            }
        } else {
            console.log(`- Category already exists: ${category.name}`);
        }
    }

    // Return updated categories list
    const updatedResponse = await fetch(`${API_URL}/categories`);
    return await updatedResponse.json();
}

async function addArticles(categories: any[]) {
    console.log('\n\nAdding articles...\n');

    // Find category IDs
    const worldCategory = categories.find(c => c.name === 'World');
    const sportsCategory = categories.find(c => c.name === 'Sports');

    if (!worldCategory || !sportsCategory) {
        console.error('Required categories not found!');
        return;
    }

    const newArticles = [
        {
            title: "Cambodia and Thailand Clash Over Century-Old Border Dispute",
            slug: "cambodia-thailand-border-clash-2025",
            excerpt: "A century-old border dispute over the Prasat Ta Muen Thom temple in the Dangrek Mountains ignited fierce clashes in July 2025, complicated by domestic politics in both nations.",
            content: `<p>A century-old border dispute over the Prasat Ta Muen Thom temple in the Dangrek Mountains ignited fierce clashes between Cambodia and Thailand in July 2025, complicated by domestic politics in both nations. Initial fighting killed dozens and displaced thousands of civilians from border regions. The ancient Khmer temple, perched on the border ridge, has been a source of national pride and territorial claims for both countries since the colonial era.</p>

<p>The conflict stems from unclear demarcation maps drawn during French colonial rule in the early 1900s. Both nations claim sovereignty over approximately 4.6 square kilometers of disputed territory surrounding the temple complex. Historical tensions have periodically flared into violence, but the 2025 escalation marked the most serious confrontation in decades, fueled by nationalist rhetoric and political instability in both capitals.</p>

<h3>International Intervention</h3>
<p>President Trump threatened to halt U.S. trade talks with both nations, leading to an October ceasefire agreement reached in Kuala Lumpur during the ASEAN Summit. The United Nations Security Council convened emergency sessions, with China and Russia advocating for regional solutions while Western powers pushed for UN peacekeepers. However, the diplomatic deal collapsed when a November landmine incident killed several Thai soldiers near the disputed border, reigniting nationalist fervor and accusations of treaty violations from both sides.</p>

<h3>Escalation and Airstrikes</h3>
<p>December saw a dramatic escalation as Thai F-16 jets bombed Cambodian military targets in retaliation, marking the first aerial combat in Southeast Asia since the Vietnam War era. Thailand's new hardline prime minister vowed to establish dominance over the disputed territory, rejecting international mediation efforts. Cambodia responded by mobilizing reserves and seeking military assistance from regional allies. Artillery exchanges forced the evacuation of over 50,000 civilians from border provinces, creating a humanitarian crisis.</p>

<h3>Regional Impact</h3>
<p>This conflict highlighted Southeast Asian instability, with severe impacts including suspended trade agreements worth billions, refugee crises affecting neighboring Laos and Vietnam, and outcomes suggesting prolonged conflict without resolution. ASEAN's credibility as a regional peacekeeper has been severely undermined. Tourism industries in both countries suffered massive losses, and international investors withdrew from major infrastructure projects. The conflict raised concerns about wider regional instability and the erosion of decades of diplomatic progress in Southeast Asia.</p>`,
            coverImage: "/cambodia-thailand-clash.jpg",
            authorId: "world-desk",
            authorName: "International News Desk",
            categoryId: worldCategory.id,
            categoryName: "World",
            tags: ["Cambodia", "Thailand", "Border Dispute", "ASEAN", "Conflict"],
            status: "published",
            publishedAt: new Date("2025-07-15").toISOString(),
            views: 0,
            source: "Southeast Asia Bureau"
        },
        {
            title: "Cardinal Robert Prevost Becomes Pope Leo XIV",
            slug: "cardinal-prevost-becomes-pope-leo-xiv",
            excerpt: "The death of Pope Francis on April 21, 2025, from a stroke triggered a historic papal transition. U.S.-born Cardinal Robert Prevost was elected as the first North American pope.",
            content: `<p>The death of Pope Francis on April 21, 2025, from a stroke triggered a historic papal transition, influencing global Catholic politics and marking the end of a transformative papacy. A conclave of 133 cardinals from 68 nations gathered in the Sistine Chapel and elected U.S.-born Cardinal Robert Prevost on May 8, making him the first North American pope in the Church's 2,000-year history. The election required four ballots over two days, reflecting initial divisions among cardinals about the Church's future direction.</p>

<p>Pope Francis, born Jorge Mario Bergoglio, had served for twelve years and became known for his reform agenda, emphasis on social justice, and outreach to marginalized communities. His death at age 88 came unexpectedly despite recent health concerns, sending shockwaves through the Catholic world and prompting an unprecedented global mourning period.</p>

<h3>Background and Career</h3>
<p>Raised in Chicago's South Side and educated at Villanova University, Prevost joined the Order of St. Augustine at age 22, drawn by the order's commitment to serving the poor. He served as a missionary in Peru for over two decades, working in impoverished communities and becoming fluent in Spanish and Quechua. His pastoral work earned him recognition, leading to his appointment as Bishop of Chiclayo in 2014 and later prefect of the Dicastery for Bishops in Rome in 2023. His extensive Latin American experience shaped his progressive theological views and deep understanding of liberation theology's role in modern Catholicism.</p>

<h3>Historic Significance</h3>
<p>He chose the name Leo XIV, invoking Pope Leo XIII's famous social justice encyclical "Rerum Novarum," which addressed workers' rights and economic justice in the industrial age. As the first Augustinian pope in history, his election shifted Vatican leadership toward progressive reforms on poverty alleviation, environmental stewardship, and interfaith dialogue. He immediately announced plans to convene a synod on economic inequality and pledged to strengthen the Church's response to climate change, building on Francis's environmental legacy.</p>

<h3>Global Impact</h3>
<p>Politically, this diversified papal representation for the world's 1.4 billion Catholics, impacting church-state relations worldwide, particularly in the Americas where over 40% of Catholics reside. His election signals a new era of Vatican diplomacy focused on social justice, human rights, and bridge-building between different faiths and cultures. Conservative factions within the Church expressed concerns about his progressive stance on pastoral approaches, while reformers celebrated the continuation of Francis's vision. His unique American perspective brings fresh insights to global Catholic challenges, from secularization in the West to persecution in authoritarian states.</p>`,
            coverImage: "/pope-leo-xiv.jpg",
            authorId: "world-desk",
            authorName: "Vatican Correspondent",
            categoryId: worldCategory.id,
            categoryName: "World",
            tags: ["Vatican", "Pope", "Catholic Church", "Religion", "Leo XIV"],
            status: "published",
            publishedAt: new Date("2025-05-08").toISOString(),
            views: 0,
            source: "Vatican News Bureau"
        },
        {
            title: "Oscar Bobb Considers Manchester City Exit Amid Semenyo Deal",
            slug: "oscar-bobb-manchester-city-exit-january",
            excerpt: "Manchester City's Oscar Bobb could leave in January if the club completes the signing of Bournemouth's Antoine Semenyo, with Borussia Dortmund among interested clubs.",
            content: `<p>Oscar Bobb is seriously considering leaving Manchester City in the January transfer window if the club successfully completes their pursuit of Bournemouth winger Antoine Semenyo. The Norwegian talent has attracted interest from several top European clubs, with his representatives exploring options to secure regular first-team football. Bobb, who joined City's academy in 2019 from Norwegian side Vålerenga, has shown flashes of brilliance in limited appearances but struggles to break into Pep Guardiola's star-studded squad.</p>

<p>The 21-year-old attacking midfielder has made just eight Premier League appearances this season, accumulating only 147 minutes of playing time. Despite impressive performances in cup competitions and training sessions, the fierce competition for places in City's forward line has restricted his development. Guardiola has publicly praised Bobb's technical ability and tactical intelligence, but the arrival of another winger would effectively close the door on his Manchester City career for the foreseeable future.</p>

<h3>Borussia Dortmund Interest</h3>
<p>Several clubs have already made approaches for Bobb, including Borussia Dortmund in recent weeks. The German giants view the 21-year-old as a potential long-term investment who could develop into a key player for their squad. Dortmund's track record of developing young talent, demonstrated through players like Jude Bellingham and Jadon Sancho, makes them an attractive destination. The Bundesliga club is prepared to offer Bobb a significant role in their attacking setup and guarantee substantial playing time to accelerate his development.</p>

<p>Sources close to the player indicate that Dortmund's sporting director Sebastian Kehl has held preliminary discussions with Bobb's representatives. The German club could offer a permanent transfer fee of around £15 million or a loan with an obligation to buy, depending on Manchester City's preference. Other interested parties include RB Leipzig, Real Sociedad, and Brighton, all monitoring the situation closely.</p>

<h3>Semenyo Deal Progress</h3>
<p>Manchester City will talk again with Bournemouth this week to try to wrap up the Antoine Semenyo deal. City remain confident after reaching a verbal agreement with Semenyo, despite calls from Liverpool since November and again last week attempting to hijack the transfer. Bournemouth is holding out for a fee of £40 million for the 25-year-old Ghanaian international, who has scored seven goals and provided three assists in 21 Premier League appearances this season. His physicality, pace, and versatility across the forward line have impressed City's recruitment team.</p>

<h3>Playing Time Concerns</h3>
<p>Bobb's potential departure stems from concerns about limited playing time, especially with City's attacking depth that includes Phil Foden, Jack Grealish, Jeremy Doku, and Bernardo Silva. The arrival of Semenyo would further reduce his opportunities for first-team football, prompting the consideration of a move to secure regular minutes crucial for his development at this stage of his career. At 21, Bobb recognizes the need for consistent game time to fulfill his potential and earn a place in Norway's national team setup ahead of future major tournaments. His advisors are counseling patience, but the lure of guaranteed starting opportunities elsewhere may prove too tempting to resist.</p>`,
            coverImage: "/oscar-bobb-transfer.jpg",
            authorId: "sports-desk",
            authorName: "Football Transfer Correspondent",
            categoryId: sportsCategory.id,
            categoryName: "Sports",
            tags: ["Manchester City", "Oscar Bobb", "Transfer News", "Borussia Dortmund", "Antoine Semenyo"],
            status: "published",
            publishedAt: new Date("2025-01-10").toISOString(),
            views: 0,
            source: "Football Insider"
        },
        {
            title: "Barcelona Track Cameroon's Etta Eyong at AFCON",
            slug: "barcelona-track-etta-eyong-afcon",
            excerpt: "Barcelona and Premier League clubs are tracking Cameroon's Etta Eyong at the AFCON this month after his impressive performances and first international goal.",
            content: `<p>Barcelona and several Premier League clubs are tracking Cameroon midfielder Etta Eyong at the Africa Cup of Nations this month, following his impressive performances for the Indomitable Lions. The 22-year-old box-to-box midfielder currently plays for Belgian Pro League side KAA Gent, where he has been instrumental in their strong domestic campaign this season. His performances have caught the attention of Europe's elite, with scouts from Arsenal, Liverpool, and Tottenham also present at AFCON matches to monitor his progress.</p>

<p>Eyong has emerged as one of Cameroon's key players in the tournament, starting all three group stage matches and playing a crucial role in their qualification to the knockout rounds. His energy, tactical discipline, and ability to transition quickly from defense to attack have drawn comparisons to former Chelsea midfielder N'Golo Kanté. Standing at 5'10", Eyong combines physical presence with exceptional technical skills, making him a complete modern midfielder.</p>

<h3>AFCON Breakthrough</h3>
<p>Eyong scored his first goal for Cameroon at the AFCON yesterday in their 2-1 victory over Guinea, catching the attention of top European scouts who have now made him a priority target. The 22-year-old's dynamic midfield play and technical ability have made him one of the tournament's standout performers. His goal came from a surging run from deep, demonstrating the attacking threat he poses. He completed 89% of his passes in the match, won 7 duels, and made 3 key interceptions, showcasing his all-around game.</p>

<h3>European Interest</h3>
<p>He remains on Barcelona and Premier League sides' shortlist for potential signings in 2026, with transfer valuations already reaching €25 million. Barcelona's scouting department has been particularly impressed with his versatility and ability to play in multiple midfield positions, from defensive midfielder to box-to-box and even as an attacking midfielder. The Catalan club views him as a potential long-term replacement for aging midfielders and a player who fits their possession-based philosophy. Director of football Deco has reportedly placed Eyong on Barcelona's priority list for summer recruitment.</p>

<p>KAA Gent is bracing for significant offers at the end of the season, with the Belgian club hoping to secure at least €30 million for their prized asset. Eyong signed with Gent in 2023 for just €3 million from Cameroonian club Bamboutos FC, representing a potential windfall for the Belgian side.</p>

<h3>Rising Profile</h3>
<p>The young midfielder's stock continues to rise with each AFCON appearance, with his performances drawing widespread acclaim from pundits and former players. His combination of defensive work rate and attacking creativity fits the profile that top European clubs are seeking in modern midfielders. Former Cameroon international Samuel Eto'o has publicly endorsed Eyong, stating he has "the quality to play for any top club in Europe." With Cameroon advancing to the quarter-finals, Eyong will have more opportunities to showcase his talent on the continental stage and potentially force clubs into making early bids before his price rises further.</p>`,
            coverImage: "/etta-eyong-cameroon.jpg",
            authorId: "sports-desk",
            authorName: "Football Scout Reporter",
            categoryId: sportsCategory.id,
            categoryName: "Sports",
            tags: ["Barcelona", "Etta Eyong", "Cameroon", "AFCON", "Transfer Rumors"],
            status: "published",
            publishedAt: new Date("2025-01-18").toISOString(),
            views: 0,
            source: "African Football News"
        },
        {
            title: "Newcastle's Antonio Cordero Joins Cádiz on Loan",
            slug: "antonio-cordero-cadiz-loan-newcastle",
            excerpt: "Cádiz have agreed a loan deal to sign talented winger Antonio Cordero from Newcastle United, winning the race after his Westerlo loan was interrupted.",
            content: `<p>Spanish club Cádiz have agreed a loan deal to sign Antonio Cordero from Newcastle United as the talented winger's loan deal with Belgian side Westerlo has been interrupted due to limited playing opportunities. Newcastle sources have confirmed the move, with the 20-year-old set to join the Spanish second division club immediately. The switch represents a strategic recalibration of Cordero's development pathway, with Newcastle's recruitment team believing exposure to Spanish football will better suit his playing style and accelerate his progression.</p>

<p>Cordero had joined Westerlo on loan in August 2024, but featured in only four matches, playing a total of 89 minutes as a substitute. The lack of regular minutes prompted Newcastle to activate a recall clause in the loan agreement and seek a more suitable destination where the winger could gain substantial competitive experience. His brief stint in Belgium highlighted the challenges young players face when loan moves don't align with promises of playing time.</p>

<h3>Loan Switch</h3>
<p>Cádiz won the race to sign the talented winger after his initial loan arrangement with Westerlo fell through, beating competition from fellow Spanish clubs Real Oviedo and Racing Santander. The Spanish second division club moved quickly to secure his services for the remainder of the season, with manager Paco López specifically requesting his signing to add pace and creativity to Cádiz's promotion push. The Andalusian club, currently sitting in 7th place in La Liga 2, views Cordero as a key addition to their playoff aspirations.</p>

<p>Cordero is expected to debut this weekend against Levante, with López indicating the winger will be integrated into the starting XI once he completes his registration and medical. The loan agreement includes no option to buy, as Newcastle views Cordero as a long-term asset they want to retain.</p>

<h3>Development Opportunity</h3>
<p>The 20-year-old Spanish youth international will get valuable playing time in La Liga 2, which Newcastle's coaching staff believe will be crucial for his development at this pivotal stage of his career. Cordero is highly rated at St James' Park but needs regular first-team football to refine his decision-making and defensive work rate. The winger excels in one-on-one situations and possesses exceptional dribbling ability, but needs to add end product and tactical maturity. Spain's second tier, known for its competitive nature and technical quality, provides an ideal environment for Cordero to develop these aspects of his game while playing in his native country.</p>

<h3>Future Prospects</h3>
<p>Newcastle United view this loan as an important step in Cordero's development, with the club monitoring his progress closely through regular scouting visits and analysis reports. A successful spell at Cádiz could see him return to compete for a first-team spot at Newcastle next season, particularly if the club qualifies for European competition and requires squad depth. Eddie Howe has personally called Cordero to discuss the move and outline expectations, emphasizing that consistent performances in Spain could open doors to Newcastle's first team. The club's recent success with loan strategies, exemplified by Elliot Anderson's development, gives them confidence in Cordero's pathway. If Cordero can deliver 5-7 goals and assists combined before the season ends, Newcastle will consider him ready for Premier League integration.</p>`,
            coverImage: "/antonio-cordero-transfer.jpg",
            authorId: "sports-desk",
            authorName: "Football Transfer Correspondent",
            categoryId: sportsCategory.id,
            categoryName: "Sports",
            tags: ["Newcastle United", "Antonio Cordero", "Cádiz", "Loan Deal", "La Liga"],
            status: "published",
            publishedAt: new Date("2025-01-20").toISOString(),
            views: 0,
            source: "Football Transfer News"
        }
    ];

    for (const article of newArticles) {
        try {
            const response = await fetch(`${API_URL}/articles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(article),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(`✓ Added: ${article.title}`);
            } else {
                const error = await response.text();
                console.error(`✗ Failed to add "${article.title}": ${error}`);
            }
        } catch (error) {
            console.error(`✗ Error adding "${article.title}":`, error);
        }
    }

    console.log('\n✓ Finished adding articles!');
    console.log(`Total articles processed: ${newArticles.length}`);
}

async function main() {
    try {
        const categories = await setupCategories();
        await addArticles(categories);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
