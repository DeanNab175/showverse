-- CreateTable
CREATE TABLE "SkillsServicesSection" (
    "id" TEXT NOT NULL DEFAULT 'services_singleton',
    "sectionClass" TEXT,
    "headingText" TEXT,
    "headingLevel" INTEGER,
    "headingClass" TEXT,
    "servicesWrapperClass" TEXT,
    "entryAnimations" JSONB NOT NULL,
    "scrollAnimations" JSONB NOT NULL,

    CONSTRAINT "SkillsServicesSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "skillsServicesSectionId" TEXT NOT NULL,
    "iconClass" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_skillsServicesSectionId_fkey" FOREIGN KEY ("skillsServicesSectionId") REFERENCES "SkillsServicesSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
