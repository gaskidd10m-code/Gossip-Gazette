import { neonService } from '../services/neon-service';

async function main() {
  const categories = await neonService.getCategories();
  if (!categories.find(c => c.name === 'Entertainment and Trends')) {
    console.log("Creating 'Entertainment and Trends' category...");
    await neonService.createCategory('Entertainment and Trends');
    console.log("Success.");
  } else {
    console.log("Category 'Entertainment and Trends' already exists.");
  }
}
main().catch(console.error);
