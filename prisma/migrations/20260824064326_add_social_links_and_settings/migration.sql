-- CreateTable
CREATE TABLE "SocialMediaLink" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "iconClass" TEXT NOT NULL,
    "hoverColorClass" TEXT,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "SocialMediaLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "contactEmail" TEXT,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);
