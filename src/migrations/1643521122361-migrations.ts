import {MigrationInterface, QueryRunner} from "typeorm";

export class migrations1643521122361 implements MigrationInterface {
    name = 'migrations1643521122361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "columns" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "order" integer NOT NULL,
                "boardId" uuid,
                CONSTRAINT "PK_4ac339ccbbfed1dcd96812abbd5" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "columns"
            ADD CONSTRAINT "FK_ac92bfd7ba33174aabef610f361" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "columns" DROP CONSTRAINT "FK_ac92bfd7ba33174aabef610f361"
        `);
        await queryRunner.query(`
            DROP TABLE "columns"
        `);
    }

}
