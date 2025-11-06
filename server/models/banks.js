module.exports = (sequelize, DataTypes) => {
    const Bank = sequelize.define('banks', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        code: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true
        },
        api_base_url: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        }
    }, {
        tableName: 'banks',
        timestamps: true
    });
    return Bank;
};
