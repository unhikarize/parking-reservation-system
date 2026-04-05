-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "buildingNumber" INTEGER NOT NULL,
    "roomNumber" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "isFirstLogin" BOOLEAN NOT NULL DEFAULT true,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_buildingNumber_roomNumber_key" ON "User"("buildingNumber", "roomNumber");
