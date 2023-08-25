import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1692921197636 implements MigrationInterface {
  private tableName = 'users';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'token',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'created_at',
            type: 'int',
            width: 11,
          },
          {
            name: 'updated_at',
            type: 'int',
            width: 11,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
