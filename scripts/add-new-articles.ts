import 'dotenv/config';

const API_URL = 'http://localhost:3001/api';

const newArticles = [
    {
        title: "Cambodia and Thailand Clash Over Century-Old Border Dispute",
        slug: "cambodia-thailand-border-clash-2025",
        excerpt: "A century-old border dispute over the Prasat Ta Muen Thom temple in the Dangrek Mountains ignited fierce clashes in July 2025, complicated by domestic politics in both nations.",
        content: `<p>A century-old border dispute over the Prasat Ta Muen Thom temple in the Dangrek Mountains ignited fierce clashes between Cambodia and Thailand in July 2025, complicated by domestic politics in both nations. Initial fighting killed dozens and displaced thousands of civilians from border regions.</p>

<h3>International Intervention</h3>
<p>President Trump threatened to halt U.S. trade talks with both nations, leading to an October ceasefire agreement reached in Kuala Lumpur during the ASEAN Summit. However, the diplomatic deal collapsed when a November landmine incident killed several Thai soldiers near the disputed border.</p>

<h3>Escalation and Airstrikes</h3>
<p>December saw a dramatic escalation as Thai jets bombed Cambodian military targets in retaliation. Thailand's new hardline prime minister vowed to establish dominance over the disputed territory, rejecting international mediation efforts.</p>

<h3>Regional Impact</h3>
<p>This conflict highlighted Southeast Asian instability, with severe impacts including suspended trade agreements, refugee crises affecting neighboring countries, and outcomes suggesting prolonged conflict without resolution. ASEAN's credibility as a regional peacekeeper has been severely undermined.</p>`,
        coverImage: "/cambodia-thailand-clash.jpg",
        authorId: "world-desk",
        authorName: "International News Desk",
        categoryId: "1",
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
        content: `<p>The death of Pope Francis on April 21, 2025, from a stroke triggered a historic papal transition, influencing global Catholic politics. A conclave of 133 cardinals elected U.S.-born Cardinal Robert Prevost on May 8, making him the first North American pope in the Church's 2,000-year history.</p>

<h3>Background and Career</h3>
<p>Raised in Chicago and educated at Villanova University, Prevost served as a missionary in Peru for over two decades, becoming Bishop of Chiclayo and later prefect of the Dicastery for Bishops in Rome. His extensive Latin American experience shaped his progressive theological views.</p>

<h3>Historic Significance</h3>
<p>He chose the name Leo XIV, invoking Pope Leo XIII's famous social justice encyclical "Rerum Novarum." As the first Augustinian pope in history, his election shifted Vatican leadership toward progressive reforms on poverty alleviation and interfaith dialogue.</p>

<h3>Global Impact</h3>
<p>Politically, this diversified papal representation for the world's 1.4 billion Catholics, impacting church-state relations worldwide. His election signals a new era of Vatican diplomacy focused on social justice and bridge-building between different faiths and cultures.</p>`,
        coverImage: "/pope-leo-xiv.jpg",
        authorId: "world-desk",
        authorName: "Vatican Correspondent",
        categoryId: "1",
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
        content: `<p>Oscar Bobb is seriously considering leaving Manchester City in the January transfer window if the club successfully completes their pursuit of Bournemouth winger Antoine Semenyo. The Norwegian talent has attracted interest from several top European clubs.</p>

<h3>Borussia Dortmund Interest</h3>
<p>Several clubs have already made approaches for Bobb, including Borussia Dortmund in recent weeks. The German giants view the 21-year-old as a potential long-term investment who could develop into a key player for their squad.</p>

<h3>Semenyo Deal Progress</h3>
<p>Manchester City will talk again with Bournemouth this week to try to wrap up the Antoine Semenyo deal. City remain confident after reaching a verbal agreement with Semenyo, despite calls from Liverpool since November and again last week attempting to hijack the transfer.</p>

<h3>Playing Time Concerns</h3>
<p>Bobb's potential departure stems from concerns about limited playing time, especially with City's attacking depth. The arrival of Semenyo would further reduce his opportunities for first-team football, prompting the consideration of a move to secure regular minutes.</p>`,
        coverImage: "/oscar-bobb-transfer.jpg",
        authorId: "sports-desk",
        authorName: "Football Transfer Correspondent",
        categoryId: "3",
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
        content: `<p>Barcelona and several Premier League clubs are tracking Cameroon midfielder Etta Eyong at the Africa Cup of Nations this month, following his impressive performances for the Indomitable Lions.</p>

<h3>AFCON Breakthrough</h3>
<p>Eyong scored his first goal for Cameroon at the AFCON yesterday, catching the attention of top European scouts. The 22-year-old's dynamic midfield play and technical ability have made him one of the tournament's standout performers.</p>

<h3>European Interest</h3>
<p>He remains on Barcelona and Premier League sides' shortlist for potential signings in 2026. Barcelona's scouting department has been particularly impressed with his versatility and ability to play in multiple midfield positions.</p>

<h3>Rising Profile</h3>
<p>The young midfielder's stock continues to rise with each AFCON appearance. His combination of defensive work rate and attacking creativity fits the profile that top European clubs are seeking in modern midfielders.</p>`,
        coverImage: "/etta-eyong-cameroon.jpg",
        authorId: "sports-desk",
        authorName: "Football Scout Reporter",
        categoryId: "3",
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
        content: `<p>Spanish club Cádiz have agreed a loan deal to sign Antonio Cordero from Newcastle United as the talented winger's loan deal with Belgian side Westerlo has been interrupted. Newcastle sources have confirmed the move.</p>

<h3>Loan Switch</h3>
<p>Cádiz won the race to sign the talented winger after his initial loan arrangement with Westerlo fell through. The Spanish second division club moved quickly to secure his services for the remainder of the season.</p>

<h3>Development Opportunity</h3>
<p>The 20-year-old Spanish youth international will get valuable playing time in La Liga 2, which Newcastle's coaching staff believe will be crucial for his development. Cordero is highly rated at St James' Park but needs regular first-team football.</p>

<h3>Future Prospects</h3>
<p>Newcastle United view this loan as an important step in Cordero's development, with the club monitoring his progress closely. A successful spell at Cádiz could see him return to compete for a first-team spot at Newcastle next season.</p>`,
        coverImage: "/antonio-cordero-transfer.jpg",
        authorId: "sports-desk",
        authorName: "Football Transfer Correspondent",
        categoryId: "3",
        categoryName: "Sports",
        tags: ["Newcastle United", "Antonio Cordero", "Cádiz", "Loan Deal", "La Liga"],
        status: "published",
        publishedAt: new Date("2025-01-20").toISOString(),
        views: 0,
        source: "Football Transfer News"
    }
];

async function addArticles() {
    console.log('Starting to add articles to database...\n');

    try {
        // 1. Fetch categories first
        console.log('Fetching categories...');
        const catResponse = await fetch(`${API_URL}/categories`);
        if (!catResponse.ok) {
            throw new Error(`Failed to fetch categories: ${catResponse.statusText}`);
        }
        const categories = await catResponse.json();
        console.log(`Found ${categories.length} categories.`);

        // Map Name -> ID
        const categoryMap = new Map(categories.map((c: any) => [c.name, c.id]));

        for (const article of newArticles) {
            try {
                // Lookup Category ID
                const catId = categoryMap.get(article.categoryName);
                if (!catId) {
                    console.error(`✗ Skipping "${article.title}": Category "${article.categoryName}" not found.`);
                    continue;
                }

                // Update article with correct ID
                const articleToSend = { ...article, categoryId: catId };

                const response = await fetch(`${API_URL}/articles`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(articleToSend),
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

    } catch (error) {
        console.error('Fatal error:', error);
    }
}

addArticles();
