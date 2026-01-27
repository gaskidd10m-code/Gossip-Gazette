import 'dotenv/config';
import { neonService } from '../services/neon-service';

async function addEntertainmentArticles() {
    try {
        console.log('Adding Entertainment articles...');

        const categories = await neonService.getCategories();
        const entertainmentCategory = categories.find(c => c.name === 'Entertainment');

        if (!entertainmentCategory) {
            console.error('Entertainment category not found!');
            return;
        }

        const articles = [
            {
                title: 'Award Season Heats Up: Predictions for This Year\'s Biggest Winners',
                slug: 'award-season-predictions-2026',
                excerpt: 'As award season approaches, industry insiders weigh in on the frontrunners for major categories across film, television, and music.',
                content: `
<h2>Film Categories Lead the Conversation</h2>
<p>This year's award season is shaping up to be one of the most competitive in recent memory, with several critically acclaimed films vying for top honors across multiple categories. The race for Best Picture features an unprecedented eight nominees, ranging from intimate character studies to sweeping historical epics, each bringing unique artistic visions to the screen. Early frontrunners include a powerful biographical drama about a civil rights icon, an innovative science fiction thriller that has captivated audiences worldwide, and a darkly comedic exploration of family dysfunction that has resonated with critics.</p>

<p>Industry analysts predict tight races in major categories, with no clear frontrunner emerging in the Best Picture category. The diversity of nominees reflects a broader shift in the entertainment industry toward more inclusive storytelling, with films directed by women, people of color, and international filmmakers receiving unprecedented recognition. Acting categories are equally competitive, with veteran performers facing off against breakthrough newcomers who have delivered career-defining performances. The Best Director race features an eclectic mix of established auteurs and fresh voices, signaling a generational shift in Hollywood's creative leadership.</p>

<p>Technical categories are generating significant buzz, particularly for achievements in cinematography, visual effects, and sound design. Several films have pushed the boundaries of what's possible in filmmaking, utilizing cutting-edge technology while maintaining artistic integrity. The expanded international film category has brought global cinema into sharper focus, with submissions from over 90 countries competing for recognition.</p>

<h2>Television's Golden Age Continues</h2>
<p>The television categories are equally competitive, with streaming platforms and traditional networks both fielding strong contenders. Limited series and drama categories are particularly crowded with quality programming that rivals theatrical releases in production value and storytelling ambition. Netflix, HBO, Apple TV+, and Amazon Prime Video have all invested heavily in prestige content, resulting in a remarkable depth of nominated programs. The drama series category features returning champions alongside ambitious newcomers that have redefined their genres.</p>

<p>Breakthrough performances from newcomers are challenging established stars, making predictions especially difficult this year. The limited series category has become a showcase for A-list film actors transitioning to television, attracted by complex characters and creative freedom. Comedy categories are experiencing a renaissance, with shows that blend humor with social commentary earning critical acclaim and audience devotion. Several programs have broken traditional format boundaries, creating hybrid works that defy easy categorization but demonstrate television's expanding creative possibilities.</p>

<h2>Music Industry Surprises</h2>
<p>The music categories feature unexpected nominees alongside established artists, reflecting the industry's evolving landscape and the democratization of music production and distribution. Genre-blending albums are receiving recognition across multiple categories, as artists increasingly resist traditional classification and create innovative sonic experiences. Hip-hop, R&B, pop, and alternative artists are crossing over into categories that were once dominated by specific genres, demonstrating music's fluid nature in the streaming era.</p>

<p>Experts predict several upsets in major music categories, with younger artists challenging industry veterans for top honors. The Album of the Year category features a diverse array of releases, from introspective singer-songwriter projects to ambitious concept albums that push artistic boundaries. Social media platforms like TikTok have influenced the nomination process, with viral hits earning recognition alongside traditional radio successes. The rise of independent artists and smaller labels in major categories signals a shift away from the dominance of major record companies, reflecting changing consumption patterns and the power of direct artist-to-fan connections in the digital age.</p>
                `,
                coverImage: '/entertainment-awards-season.jpg',
                authorId: 'gg-entertainment-desk',
                authorName: 'Gossip Gazette Entertainment Desk',
                categoryId: entertainmentCategory.id,
                categoryName: entertainmentCategory.name,
                tags: ['Awards', 'Film', 'Television', 'Music', 'Entertainment'],
                status: 'published' as const,
                publishedAt: new Date().toISOString(),
                views: 0,
                source: 'Gossip Gazette Entertainment'
            },
            {
                title: 'Streaming Wars Intensify as Platforms Announce Major Content Deals',
                slug: 'streaming-wars-content-deals-2026',
                excerpt: 'Major streaming platforms unveil billion-dollar content investments, signaling continued competition for subscriber attention in the crowded marketplace.',
                content: `
<h2>Content is King</h2>
<p>The battle for streaming supremacy has entered a new phase, with major platforms announcing unprecedented investments in original content and exclusive licensing deals totaling over $50 billion combined for 2026. Netflix has committed $17 billion to content production, while Amazon Prime Video and Apple TV+ have each pledged double-digit billion-dollar investments. These massive financial commitments reflect the high stakes in the streaming wars, where content libraries have become the primary differentiator in an increasingly saturated market.</p>

<p>These moves come as subscriber growth slows across the industry, forcing platforms to compete more aggressively for viewer attention and loyalty. The era of easy growth through market expansion has ended, replaced by intense competition for existing subscribers who are becoming more selective about their streaming subscriptions. Platforms are focusing on creating "must-watch" content that prevents subscription cancellations, leading to increased spending on high-profile projects featuring A-list talent. The shift from quantity to quality has resulted in fewer but more expensive productions, with budgets for flagship series often exceeding $200 million per season.</p>

<p>Password-sharing crackdowns and ad-supported tiers have emerged as additional strategies to maximize revenue from existing user bases. Platforms are also experimenting with release strategies, with some returning to weekly episode drops to maintain subscriber engagement over longer periods, moving away from the binge-release model that dominated the early streaming era.</p>

<h2>Exclusive Partnerships</h2>
<p>Several platforms have secured exclusive partnerships with major production studios and acclaimed creators, betting that premium content will differentiate them in an increasingly crowded market. Apple TV+ has signed multi-year deals with renowned directors and producers, guaranteeing creative freedom in exchange for platform exclusivity. Netflix has locked in partnerships with prolific showrunners who have proven track records of creating hit series, while Amazon has focused on acquiring rights to established intellectual property with built-in fan bases.</p>

<p>The deals include multi-year commitments for original series, films, and documentaries, with budgets rivaling traditional Hollywood productions. Some agreements guarantee minimum production commitments, ensuring a steady stream of content while providing creators with financial security and artistic autonomy. These partnerships have created a new class of content creators who operate with unprecedented resources and freedom, fundamentally changing the power dynamics between creators and distributors. The competition for top talent has driven up costs significantly, with some creators commanding eight-figure overall deals that include production companies and first-look agreements.</p>

<h2>Impact on Traditional Media</h2>
<p>The streaming wars are reshaping the entire entertainment landscape, with traditional cable and broadcast networks adapting their strategies to compete with digital-first platforms. Major networks have launched their own streaming services, fragmenting the market further and creating confusion among consumers who now face dozens of subscription options. Cable subscriber numbers continue to decline precipitously, with cord-cutting accelerating as younger demographics eschew traditional television packages entirely.</p>

<p>Industry observers predict further consolidation as smaller players struggle to match the content spending of major platforms. Recent mergers and acquisitions have already reshaped the competitive landscape, with media conglomerates combining resources to create super-platforms that can compete with tech giants. The survival of mid-tier streaming services remains uncertain, as consumers show resistance to maintaining more than three to four active subscriptions simultaneously. This consolidation trend is expected to continue through 2026, potentially reducing the number of major streaming platforms from the current dozen to perhaps five or six dominant players who can sustain the massive content investments required to remain competitive in this evolving market.</p>
                `,
                coverImage: '/entertainment-streaming-wars.jpg',
                authorId: 'gg-entertainment-desk',
                authorName: 'Gossip Gazette Entertainment Desk',
                categoryId: entertainmentCategory.id,
                categoryName: entertainmentCategory.name,
                tags: ['Streaming', 'Television', 'Content', 'Entertainment Industry'],
                status: 'published' as const,
                publishedAt: new Date(Date.now() - 86400000).toISOString(),
                views: 0,
                source: 'Gossip Gazette Entertainment'
            }
        ];

        for (const article of articles) {
            const created = await neonService.createArticle(article);
            console.log(`✅ Created: ${created.title}`);
        }

        console.log('\n✅ All Entertainment articles added successfully!');

    } catch (error) {
        console.error('❌ Error adding articles:', error);
    }
}

addEntertainmentArticles();
