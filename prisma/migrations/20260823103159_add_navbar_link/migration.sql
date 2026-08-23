-- CreateTable
CREATE TABLE "NavbarLink" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "iconClass" TEXT NOT NULL,
    "iconFontSizeClass" TEXT,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "NavbarLink_pkey" PRIMARY KEY ("id")
);
