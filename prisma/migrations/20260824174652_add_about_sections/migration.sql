-- CreateTable
CREATE TABLE "AboutIntroSection" (
    "id" TEXT NOT NULL DEFAULT 'about_intro_singleton',
    "wrapperClass" TEXT,
    "sectionClass" TEXT,
    "contentWrapperClass" TEXT,
    "headingText" TEXT,
    "headingLevel" INTEGER,
    "headingClass" TEXT,
    "paragraphsBody" TEXT[],
    "paragraphsClass" TEXT,
    "experiencesWrapperClass" TEXT,
    "hobbyHeadingText" TEXT,
    "hobbyHeadingLevel" INTEGER,
    "hobbyHeadingClass" TEXT,
    "ctaLabel" TEXT,
    "ctaVariant" TEXT,
    "ctaIconClass" TEXT,
    "ctaWrapperClass" TEXT,
    "imageId" TEXT,
    "entryAnimations" JSONB NOT NULL,
    "scrollAnimations" JSONB NOT NULL,

    CONSTRAINT "AboutIntroSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "aboutIntroSectionId" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hobby" (
    "id" TEXT NOT NULL,
    "aboutIntroSectionId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "iconClass" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "Hobby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutHireBannerSection" (
    "id" TEXT NOT NULL DEFAULT 'about_hire_banner_singleton',
    "wrapperClass" TEXT,
    "sectionClass" TEXT,
    "contentWrapperClass" TEXT,
    "headingText" TEXT,
    "headingLevel" INTEGER,
    "headingClass" TEXT,
    "paragraphsBody" TEXT[],
    "paragraphsClass" TEXT,
    "ctaLabel" TEXT,
    "ctaVariant" TEXT,
    "ctaWrapperClass" TEXT,
    "ctaColumnClass" TEXT,
    "entryAnimations" JSONB NOT NULL,
    "scrollAnimations" JSONB NOT NULL,

    CONSTRAINT "AboutHireBannerSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AboutIntroSection_imageId_key" ON "AboutIntroSection"("imageId");

-- AddForeignKey
ALTER TABLE "AboutIntroSection" ADD CONSTRAINT "AboutIntroSection_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "SiteImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_aboutIntroSectionId_fkey" FOREIGN KEY ("aboutIntroSectionId") REFERENCES "AboutIntroSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hobby" ADD CONSTRAINT "Hobby_aboutIntroSectionId_fkey" FOREIGN KEY ("aboutIntroSectionId") REFERENCES "AboutIntroSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
