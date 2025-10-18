module.exports = (sequelize, DataTypes) => {
    const PaymentEvents = sequelize.define('payment_events', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        payment_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        event_type: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        old_status: {
            type: DataTypes.STRING(16),
            allowNull: true
        },
        new_status: {
            type: DataTypes.STRING(16),
            allowNull: true
        },
        payload: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        source: {
            type: DataTypes.STRING(32),
            allowNull: false
        },        
    }, {
        tableName: 'payment_events',
        timestamps: true
    });

    return PaymentEvents;
};
