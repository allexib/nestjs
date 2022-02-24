import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1645087391744 implements MigrationInterface {
  name = 'SeedDb1645087391744';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'),('coffee'),('nestjs')`,
    );

    await queryRunner.query(
      //pass is 12333
      `INSERT INTO users (username, email, password) VALUES ('foo','foo@foo.com',
        '$2b$10$tXp/G/yMQ/4GViqfihKkB.8FeeH5.FMQWEDkeuv2TIKtOrT7MgAg2')`,
    );

    await queryRunner.query(
      `INSERT INTO articles(slug, title, description, body, "tagList", "authorId")
         VALUES('first-article', 'First article', 'first article desc', 'first article body', 
         'coffee,dragons', 1) `,
    );

    await queryRunner.query(
      `INSERT INTO articles(slug, title, description, body, "tagList", "authorId")
         VALUES ('second-article', 'Second article', 'second article desc', 'second article body', 
         'coffee,dragons', 1) `,
    );
  }

  public async down(): Promise<void> {
  }

}
