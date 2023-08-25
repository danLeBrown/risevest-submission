import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePostsTable1692921349521 implements MigrationInterface {
  private tableName = 'posts';

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
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
            name: 'title',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'content',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'int',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'int',
            default: 'now()',
          },
          {
            name: 'user_id',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_user_id',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
