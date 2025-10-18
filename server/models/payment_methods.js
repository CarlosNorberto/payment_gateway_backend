module.exports = (sequelize, DataTypes) => {
    const PaymentMethods = sequelize.define('payment_methods', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        config: {
            type: DataTypes.JSONB,
            allowNull: true
        }
    }, {
        tableName: 'payment_methods',
        timestamps: true,        
    });

    return PaymentMethods;
};
