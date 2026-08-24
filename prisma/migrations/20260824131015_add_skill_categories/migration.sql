-- CreateTable
CREATE TABLE "SkillsCategoriesSection" (
    "id" TEXT NOT NULL DEFAULT 'skills_categories_singleton',
    "sectionClass" TEXT,
    "headingText" TEXT,
    "headingLevel" INTEGER,
    "headingClass" TEXT,
    "entryAnimations" JSONB NOT NULL,
    "scrollAnimations" JSONB NOT NULL,

    CONSTRAINT "SkillsCategoriesSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillCategory" (
    "id" TEXT NOT NULL,
    "skillsCategoriesSectionId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "labelText" TEXT NOT NULL,
    "labelClass" TEXT,
    "itemsWrapperClass" TEXT,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "SkillCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillItem" (
    "id" TEXT NOT NULL,
    "skillCategoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "SkillItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SkillCategory_slug_key" ON "SkillCategory"("slug");

-- AddForeignKey
ALTER TABLE "SkillCategory" ADD CONSTRAINT "SkillCategory_skillsCategoriesSectionId_fkey" FOREIGN KEY ("skillsCategoriesSectionId") REFERENCES "SkillsCategoriesSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillItem" ADD CONSTRAINT "SkillItem_skillCategoryId_fkey" FOREIGN KEY ("skillCategoryId") REFERENCES "SkillCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
