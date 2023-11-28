-- CreateTable
CREATE TABLE "Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "symbol" TEXT NOT NULL,
    "security" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "sub_industry" TEXT NOT NULL,
    "hq" TEXT NOT NULL,
    "founded" INTEGER NOT NULL
);
