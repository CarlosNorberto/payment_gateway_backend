module.exports = (sequelize, DataTypes) => {
    const Payments = sequelize.define('payments', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        payment_id: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true
        },
        reference: {
            type: DataTypes.STRING(64),
            allowNull: true
        },
        amount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING(8),
            allowNull: false,
            defaultValue: 'BOB'
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(16),
            allowNull: false,
            defaultValue: 'created'
        },
        transaction_id: {
            type: DataTypes.STRING(128),
            allowNull: true
        },        
        return_url: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        callback_url: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'payments',
        timestamps: true
    });

    return Payments;
};