//configuracion de las env este archivo tambien se puede llamar  app.config
export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    //con el mas transformamos el valor a numero
    defaultLimit: +process.env.DEFAULT_LIMIT || 7
})