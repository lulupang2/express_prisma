-- AlterTable
ALTER TABLE `Post` ADD COLUMN `commentsId` INTEGER NULL;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `viewCount` INTEGER NOT NULL DEFAULT 0,
    `authorId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `user_id` ON `User`(`id`);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_commentsId_fkey` FOREIGN KEY (`commentsId`) REFERENCES `comments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
