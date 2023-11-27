const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csv = require('csv-parser');

const prisma = new PrismaClient();

async function seed() {
  try {
    // Path to your CSV file
    const csvFilePath = 'src/server/people.csv';

    // Read data from CSV file
    const data = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', async () => {
        // Seed your database with data
        for (const politician of data) {
          await prisma.politician.create({
            data: {
              name: politician.name,
              party: politician.party, 
              role: politician.role, 
              district: politician.district,

              // Add other fields based on your schema
            },
          });
        }

        console.log('Database seeded successfully.');
      });
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();