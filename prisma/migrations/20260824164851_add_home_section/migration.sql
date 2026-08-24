-- CreateTable
CREATE TABLE "SiteImage" (
    "id" TEXT NOT NULL,
    "wrapperId" TEXT,
    "wrapperClass" TEXT,
    "isIllustration" BOOLEAN NOT NULL DEFAULT false,
    "illustrationHtml" TEXT,
    "illustrationClass" TEXT,
    "path" TEXT NOT NULL,

    CONSTRAINT "SiteImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeSection" (
    "id" TEXT NOT NULL DEFAULT 'home_singleton',
    "wrapperClass" TEXT,
    "sectionClass" TEXT,
    "greetMessage" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "viewPageLinks" JSONB NOT NULL,
    "imageId" TEXT,
    "entryAnimations" JSONB NOT NULL,
    "scrollAnimations" JSONB NOT NULL,

    CONSTRAINT "HomeSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HomeSection_imageId_key" ON "HomeSection"("imageId");

-- AddForeignKey
ALTER TABLE "HomeSection" ADD CONSTRAINT "HomeSection_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "SiteImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
