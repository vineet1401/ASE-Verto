
const { initDb, getDb } = require("./models/db.js");

const positions = ['Manager', 'Developer', 'Designer', 'QA', 'HR', 'Support'];

const seedEmployees = async () => {
  await initDb();
  const db = getDb();
  for (let i = 1; i <= 100; i++) {
    const name = `Virto Employee ${i}`;
    const email = `vineet.virto.${i}@virto.com`;
    const position = positions[i % positions.length];
    try {
      await db.run('INSERT INTO employees (name, email, position) VALUES (?, ?, ?)', [name, email, position]);
    } catch (e) {
    
    }
  }
  console.log('Seeded 100 employees!');
  process.exit(0);
};

seedEmployees();
