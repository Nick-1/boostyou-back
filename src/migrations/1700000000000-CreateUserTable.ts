import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'login',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'role',
            type: 'varchar',
            length: '20',
            default: `'customer'`,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '30',
            default: `'not verified'`, // not verified | verified | disable
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'first_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'last_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'NOW()',
          },
        ],
        uniques: [
          {
            name: 'UQ_user_login',
            columnNames: ['login'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
