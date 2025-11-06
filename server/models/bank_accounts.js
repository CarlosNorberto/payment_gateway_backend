module.exports = (sequelize, DataTypes) => {
    const BankAccount = sequelize.define('bank_accounts', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bank_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        account_number: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        account_alias: {
            type: DataTypes.STRING(64),
            allowNull: true
        },
        api_key: {
            type: DataTypes.STRING(256),
            allowNull: true
        },
        api_secret: {
            type: DataTypes.STRING(256),
            allowNull: true
        },
        currency: {
            type: DataTypes.STRING(8),
            allowNull: true,
            defaultValue: 'BOB'
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        }
    }, {
        tableName: 'bank_accounts',
        timestamps: true
    });
    return BankAccount;
};