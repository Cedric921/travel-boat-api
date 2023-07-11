-- CreateTable
CREATE TABLE "ClassImage" (
    "id" TEXT NOT NULL,
    "previewUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,

    CONSTRAINT "ClassImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClassImage" ADD CONSTRAINT "ClassImage_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
