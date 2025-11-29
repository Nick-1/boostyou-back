import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrderAndOrderItemTables1700000000003
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order',
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
            name: 'totalPrice',
            type: 'numeric',
            precision: 10,
            scale: 2,
          },
          {
            name: 'currency',
            type: 'varchar',
            default: `'USD'`,
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'comment',
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
        name: 'order_item',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          {
            name: 'order_id',
            type: 'uuid',
          },
          {
            name: 'sticker_id',
            type: 'uuid',
          },
          {
            name: 'place_id',
            type: 'uuid',
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'itemPrice',
            type: 'numeric',
            precision: 10,
            scale: 2,
          },
          {
            name: 'subtotal',
            type: 'numeric',
            precision: 10,
            scale: 2,
          },
        ],
      }),
    );

    // FK on order(id)
    await queryRunner.createForeignKey(
      'order_item',
      new TableForeignKey({
        name: 'FK_order_item_order',
        columnNames: ['order_id'],
        referencedTableName: 'order',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    // FK on sticker(id)
    await queryRunner.createForeignKey(
      'order_item',
      new TableForeignKey({
        name: 'FK_order_item_sticker',
        columnNames: ['sticker_id'],
        referencedTableName: 'sticker',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT', // як у ентіті
      }),
    );

    // FK on place(id)
    await queryRunner.createForeignKey(
      'order_item',
      new TableForeignKey({
        name: 'FK_order_item_place',
        columnNames: ['place_id'],
        referencedTableName: 'place',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );

    // FK on user(id)
    await queryRunner.createForeignKey(
      'order',
      new TableForeignKey({
        name: 'FK_order_user',
        columnNames: ['user_id'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const orderItemTable = await queryRunner.getTable('order_item');

    if (orderItemTable) {
      const fks = orderItemTable.foreignKeys;
      for (const fk of fks) {
        await queryRunner.dropForeignKey('order_item', fk);
      }
    }

    await queryRunner.dropTable('order_item');

    const orderTable = await queryRunner.getTable('order');

    if (orderTable) {
      for (const fk of orderTable.foreignKeys) {
        await queryRunner.dropForeignKey('order', fk);
      }
    }

    await queryRunner.dropTable('order');
  }
}
