/* eslint-disable camelcase */

exports.up = (pgm) => {
    pgm.createTable("threads", {
        id: {
            type: "VARCHAR(60)",
            primaryKey: true,
        },
        title: {
            type: "VARCHAR(255)",
            notNull: true,
        },
        body: {
            type: "TEXT",
            notNull: true,
        },
        owner: {
            type: "VARCHAR(50)",
            notNull: true,
            references: 'users(id)',
            onDelete: "cascade",
        },

        updatedAt: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },

        createdAt: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("threads");
};
