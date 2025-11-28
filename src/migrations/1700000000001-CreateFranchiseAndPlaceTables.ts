import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateFranchiseAndPlaceTables1700000000001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'franchise',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'varchar',
            default: `'active'`,
          },
          {
            name: 'logoUrl',
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
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'place',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'franchise_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            default: `'active'`,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'country',
            type: 'varchar',
          },
          {
            name: 'state',
            type: 'varchar',
          },
          {
            name: 'location',
            type: 'jsonb',
            isNullable: false,
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
      }),
    );

    await queryRunner.createForeignKey(
      'place',
      new TableForeignKey({
        name: 'FK_place_franchise',
        columnNames: ['franchise_id'],
        referencedTableName: 'franchise',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('place');
    if (table) {
      const fk = table.foreignKeys.find((f) => f.name === 'FK_place_franchise');
      if (fk) {
        await queryRunner.dropForeignKey('place', fk);
      }
    }

    await queryRunner.dropTable('place');
    await queryRunner.dropTable('franchise');
  }
}
