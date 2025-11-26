import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateStickerAndStickerTypeTable1700000000002
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sticker',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'sticker_type_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'highlighted_text',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'promo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qr_code_link',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sticker_form',
            type: 'varchar',
          },
          {
            name: 'highlighted_bg_color',
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
        name: 'sticker_type',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'code',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'redactor_bg_url',
            type: 'varchar',
          },
          {
            name: 'original_bg_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'bg_color',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'numeric',
            precision: 10,
            scale: 2,
          },
          {
            name: 'sponsor_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'limit',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'used',
            type: 'int',
            default: 0,
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

    // FK on user(id)
    await queryRunner.createForeignKey(
      'sticker',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    // FK on sticker_type(id)
    await queryRunner.createForeignKey(
      'sticker',
      new TableForeignKey({
        columnNames: ['sticker_type_id'],
        referencedTableName: 'sticker_type',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );

    // FK on user(id) as sponsor
    await queryRunner.createForeignKey(
      'sticker_type',
      new TableForeignKey({
        columnNames: ['sponsor_id'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const stickerTable = await queryRunner.getTable('sticker');
    if (stickerTable) {
      for (const fk of stickerTable.foreignKeys) {
        await queryRunner.dropForeignKey('sticker', fk);
      }
    }

    await queryRunner.dropTable('sticker');

    const stickerTypeTable = await queryRunner.getTable('sticker_type');
    if (stickerTypeTable) {
      const fk = stickerTypeTable.foreignKeys.find((f) =>
        f.columnNames.includes('sponsor_id'),
      );
      if (fk) {
        await queryRunner.dropForeignKey('sticker_type', fk);
      }
    }

    await queryRunner.dropTable('sticker_type');
  }
}
