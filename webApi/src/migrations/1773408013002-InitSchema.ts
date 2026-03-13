import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1773408013002 implements MigrationInterface {
    name = 'InitSchema1773408013002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "f1_session" ("id" SERIAL NOT NULL, "cookieHeader" text NOT NULL, "isValid" boolean NOT NULL DEFAULT true, "lastValidatedAt" TIMESTAMP WITH TIME ZONE, "expiredAt" TIMESTAMP WITH TIME ZONE, "lastError" text, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_33e294bdf23885b5d68c0c72aec" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "f1_session"`);
    }

}
