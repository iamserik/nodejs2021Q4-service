import {MigrationInterface, QueryRunner} from "typeorm";

export class migrations1643554399002 implements MigrationInterface {
    name = 'migrations1643554399002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD "columnId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD CONSTRAINT "FK_0ecfe75e5bd731e00e634d70e5f" FOREIGN KEY ("columnId") REFERENCES "columns"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP CONSTRAINT "FK_0ecfe75e5bd731e00e634d70e5f"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP COLUMN "columnId"
        `);
    }

}