module.exports = (sequelize, DataTypes) => {
    const BankWebhooks = sequelize.define('bank_webhooks', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bank_reference: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
        payment_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        signature: {
            type: DataTypes.STRING(256),
            allowNull: true
        },
        payload: {
            type: DataTypes.JSONB,
            allowNull: false
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        processed: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },        
    }, {
        tableName: 'bank_webhooks',
        timestamps: true
    });

    return BankWebhooks;
};
