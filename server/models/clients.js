module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('clients', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
        api_token: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        }
    }, {
        tableName: 'clients',
        timestamps: true
    });
    return Client;
};
