import {MigrationInterface, QueryRunner} from "typeorm";

export class migrations1643556459859 implements MigrationInterface {
    name = 'migrations1643556459859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "columns" DROP CONSTRAINT "FK_ac92bfd7ba33174aabef610f361"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP CONSTRAINT "FK_8a75fdea98c72c539a0879cb0d1"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP CONSTRAINT "FK_0ecfe75e5bd731e00e634d70e5f"
        `);
        await queryRunner.query(`
            ALTER TABLE "columns"
                RENAME COLUMN "boardId" TO "boardIdId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP COLUMN "boardId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP COLUMN "columnId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD "userIdId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD "boardIdId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD "columnIdId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "columns"
            ADD CONSTRAINT "FK_4e94104681a6311ee9c0fbc2865" FOREIGN KEY ("boardIdId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD CONSTRAINT "FK_4776af095a2d88f235336aab523" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD CONSTRAINT "FK_225d5e92ab6cd6d6f745ce91939" FOREIGN KEY ("boardIdId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD CONSTRAINT "FK_11fcd4d77e66a3913f9aafb9bfb" FOREIGN KEY ("columnIdId") REFERENCES "columns"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP CONSTRAINT "FK_11fcd4d77e66a3913f9aafb9bfb"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP CONSTRAINT "FK_225d5e92ab6cd6d6f745ce91939"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP CONSTRAINT "FK_4776af095a2d88f235336aab523"
        `);
        await queryRunner.query(`
            ALTER TABLE "columns" DROP CONSTRAINT "FK_4e94104681a6311ee9c0fbc2865"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP COLUMN "columnIdId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP COLUMN "boardIdId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP COLUMN "userIdId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD "columnId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD "boardId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD "userId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "columns"
                RENAME COLUMN "boardIdId" TO "boardId"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD CONSTRAINT "FK_0ecfe75e5bd731e00e634d70e5f" FOREIGN KEY ("columnId") REFERENCES "columns"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD CONSTRAINT "FK_8a75fdea98c72c539a0879cb0d1" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "columns"
            ADD CONSTRAINT "FK_ac92bfd7ba33174aabef610f361" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
