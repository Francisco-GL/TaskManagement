export interface UserI {
    Alias: string,
    Correo: string,
    Contrasena: string
};

export interface JwtResponseInterface {
    Alias: string,
    Correo: string,
    accessToken: string,
    expiresIn: string,
    ok: true
};

export interface UbicationI {
    cityName: string,
    countryCode: string,
    User: string
};

export interface CreateUserI {
    user: JwtResponseInterface,
    msg: string,
    ok: boolean
};