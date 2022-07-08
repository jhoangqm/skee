-- CreateTable
CREATE TABLE "Clients" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firebaseToken" TEXT NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resorts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "map" TEXT NOT NULL,
    "vert" INTEGER NOT NULL,
    "skiableTerrain" INTEGER NOT NULL,
    "runs" INTEGER NOT NULL,
    "lifts" INTEGER NOT NULL,
    "easyRuns" INTEGER NOT NULL,
    "mediumRuns" INTEGER NOT NULL,
    "hardRuns" INTEGER NOT NULL,

    CONSTRAINT "Resorts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pros" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "certBody" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resortsId" INTEGER,

    CONSTRAINT "Pros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "message" TEXT,
    "url" TEXT,
    "type" TEXT NOT NULL DEFAULT 'img',
    "clientsId" INTEGER,
    "resortsId" INTEGER,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" SERIAL NOT NULL,
    "clientsId" INTEGER,
    "resortsId" INTEGER,
    "timeSlotsId" INTEGER,
    "dateFrom" TIMESTAMP(3) NOT NULL,
    "dateTo" TIMESTAMP(3) NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "pending" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeSlots" (
    "id" SERIAL NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "remainingTime" INTEGER NOT NULL DEFAULT 8,
    "time" TEXT NOT NULL,

    CONSTRAINT "timeSlots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "clientsId" INTEGER,
    "prosId" INTEGER,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skills" (
    "id" SERIAL NOT NULL,
    "skill" TEXT NOT NULL,
    "prosId" INTEGER,
    "clientsId" INTEGER,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientsOnSkills" (
    "id" SERIAL NOT NULL,
    "clientsId" INTEGER,
    "skillsId" INTEGER,

    CONSTRAINT "ClientsOnSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProsOnSkills" (
    "id" SERIAL NOT NULL,
    "prosId" INTEGER,
    "skillsId" INTEGER,

    CONSTRAINT "ProsOnSkills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clients_email_key" ON "Clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_phoneNumber_key" ON "Clients"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Resorts_map_key" ON "Resorts"("map");

-- CreateIndex
CREATE UNIQUE INDEX "Pros_email_key" ON "Pros"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pros_phoneNumber_key" ON "Pros"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "timeSlots_time_key" ON "timeSlots"("time");

-- AddForeignKey
ALTER TABLE "Pros" ADD CONSTRAINT "Pros_resortsId_fkey" FOREIGN KEY ("resortsId") REFERENCES "Resorts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "Clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_resortsId_fkey" FOREIGN KEY ("resortsId") REFERENCES "Resorts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "Clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_resortsId_fkey" FOREIGN KEY ("resortsId") REFERENCES "Resorts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_timeSlotsId_fkey" FOREIGN KEY ("timeSlotsId") REFERENCES "timeSlots"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "Clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_prosId_fkey" FOREIGN KEY ("prosId") REFERENCES "Pros"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "Clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_prosId_fkey" FOREIGN KEY ("prosId") REFERENCES "Pros"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientsOnSkills" ADD CONSTRAINT "ClientsOnSkills_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "Clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientsOnSkills" ADD CONSTRAINT "ClientsOnSkills_skillsId_fkey" FOREIGN KEY ("skillsId") REFERENCES "Skills"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProsOnSkills" ADD CONSTRAINT "ProsOnSkills_prosId_fkey" FOREIGN KEY ("prosId") REFERENCES "Pros"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProsOnSkills" ADD CONSTRAINT "ProsOnSkills_skillsId_fkey" FOREIGN KEY ("skillsId") REFERENCES "Skills"("id") ON DELETE SET NULL ON UPDATE CASCADE;
