-- CreateTable
CREATE TABLE "Following" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "politicianId" INTEGER NOT NULL,
    CONSTRAINT "Following_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Following_politicianId_fkey" FOREIGN KEY ("politicianId") REFERENCES "Politician" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
