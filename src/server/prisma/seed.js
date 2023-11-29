const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const csv = require("csv-parser");

const prisma = new PrismaClient();

async function seed() {
  try {
    // Seed Politicians from people.csv
    const politiciansFilePath = "src/server/people.csv";
    const politiciansData = await readCSV(politiciansFilePath);

    for (const politician of politiciansData) {
      await prisma.politician.create({
        data: {
          first_name: politician.first_name,
          middle_name: politician.middle_name,
          last_name: politician.last_name,
          party: politician.party,
          role: politician.role,
          district: politician.district,
          // Add other fields based on your schema
        },
      });
    }

    // Seed Companies from constituents.csv
    const companiesFilePath = "src/server/constituents.csv";
    const companiesData = await readCSV(companiesFilePath);

    for (const company of companiesData) {
      // Check if the required fields are present
      if (company.Symbol) {
        await prisma.company.create({
          data: {
            symbol: company.Symbol,
            security: company.Security || null,
            sector: company["GICS Sector"] || null,
            sub_industry: company["GICS Sub-Industry"] || null,
            hq: company["Headquarters Location"] || null,
            founded: company.Founded
              ? parseInt(company.Founded, 10) || null
              : null,
            // Add other fields based on your schema
          },
        });
      } else {
        console.error(
          `Skipping entry without symbol: ${JSON.stringify(company)}`
        );
      }
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

seed();
