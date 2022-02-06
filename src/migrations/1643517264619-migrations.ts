import {MigrationInterface, QueryRunner} from "typeorm";

export class migrations1643517264619 implements MigrationInterface {
    name = 'migrations1643517264619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "login" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tasks" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "title" character varying NOT NULL,
                "order" integer NOT NULL,
                "description" text NOT NULL,
                "userId" uuid,
                "boardId" uuid,
                CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "boards" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "title" character varying NOT NULL,
                CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks"
            ADD CONSTRAINT "FK_8a75fdea98c72c539a0879cb0d1" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP CONSTRAINT "FK_8a75fdea98c72c539a0879cb0d1"
        `);
        await queryRunner.query(`
            ALTER TABLE "tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"
        `);
        await queryRunner.query(`
            DROP TABLE "boards"
        `);
        await queryRunner.query(`
            DROP TABLE "tasks"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }

}
