import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCommentsTable1692921469036 implements MigrationInterface {
  private tableName = 'comments';

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
            name: 'content',
            type: 'text',
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
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'post_id',
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
          {
            name: 'fk_post_id',
            columnNames: ['post_id'],
            referencedTableName: 'posts',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.tableName, 'fk_user_id');
    await queryRunner.dropForeignKey(this.tableName, 'fk_post_id');
    await queryRunner.dropTable(this.tableName);
  }
}
