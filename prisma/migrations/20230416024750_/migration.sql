-- CreateTable
CREATE TABLE "ContactUs" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "phoneNumber" INTEGER,
    "message" TEXT NOT NULL,

    CONSTRAINT "ContactUs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailSubscribe" (
    "email" TEXT NOT NULL,

    CONSTRAINT "EmailSubscribe_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailSubscribe_email_key" ON "EmailSubscribe"("email");
