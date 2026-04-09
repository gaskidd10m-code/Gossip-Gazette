const fs = require('fs');

let content = fs.readFileSync('views/AdminDashboard.tsx', 'utf8');

// Replace imports
content = content.replace(/TransferNews/g, 'SportsNews');
content = content.replace(/transferNews/g, 'sportsNews');
content = content.replace(/setTransferNews/g, 'setSportsNews');
content = content.replace(/handleCreateTransfer/g, 'handleCreateSportsNews');
content = content.replace(/handleEditTransfer/g, 'handleEditSportsNews');
content = content.replace(/handleDeleteTransfer/g, 'handleDeleteSportsNews');
content = content.replace(/handleSubmitTransfer/g, 'handleSubmitSportsNews');
content = content.replace(/isEditingTransfer/g, 'isEditingSportsNews');
content = content.replace(/setIsEditingTransfer/g, 'setIsEditingSportsNews');
content = content.replace(/currentTransfer/g, 'currentSportsNews');
content = content.replace(/setCurrentTransfer/g, 'setCurrentSportsNews');
content = content.replace(/Transfer News/g, 'Sports News');
content = content.replace(/transfer news/g, 'sports news');
content = content.replace(/\+ Transfer/g, '+ Sports News');

// Change tab name 'transfer' to 'sports-news'
content = content.replace(/activeTab === 'transfer'/g, "activeTab === 'sports-news'");
content = content.replace(/setActiveTab\('transfer'\)/g, "setActiveTab('sports-news')");

// Add Category Select
const statusSelectHtml = `
            <div>
              <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Category</label>
              <select 
                required
                value={currentSportsNews.category}
                onChange={e => setCurrentSportsNews(prev => ({ ...prev, category: e.target.value as 'Transfer News' | 'Sports Today' }))}
                className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:border-black outline-none bg-white"
              >
                <option value="Transfer News">Transfer News</option>
                <option value="Sports Today">Sports Today</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Status</label>
`;

content = content.replace(/<div>\s*<label className="block text-xs font-bold uppercase mb-1 text-gray-500">Status<\/label>/g, statusSelectHtml);

// Fix initial state
content = content.replace(/\{ title: '', content: '', status: 'draft' \}/g, "{ title: '', content: '', category: 'Sports Today', status: 'draft' }");

fs.writeFileSync('views/AdminDashboard.tsx', content);
console.log('Done replacement.');
