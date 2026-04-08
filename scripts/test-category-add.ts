import { neonService } from '../services/neon-service';
import 'dotenv/config';

async function run() {
  console.log('Testing category creation...');
  try {
    const newCategoryName = 'Test Category Add ' + Date.now();
    const result = await neonService.createCategory(newCategoryName);
    console.log('Created:', result);
    
    // delete it
    await neonService.deleteCategory(result.id);
    console.log('Deleted successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
