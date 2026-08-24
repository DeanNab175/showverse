-- CreateTable
CREATE TABLE "PortfolioSection" (
    "id" TEXT NOT NULL DEFAULT 'portfolio_singleton',
    "sectionClass" TEXT,
    "headingText" TEXT,
    "headingLevel" INTEGER,
    "headingClass" TEXT,
    "projectsWrapperClass" TEXT,
    "perPage" INTEGER NOT NULL DEFAULT 6,
    "entryAnimations" JSONB NOT NULL,
    "scrollAnimations" JSONB NOT NULL,

    CONSTRAINT "PortfolioSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "portfolioSectionId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "previewUrl" TEXT,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_portfolioSectionId_fkey" FOREIGN KEY ("portfolioSectionId") REFERENCES "PortfolioSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
