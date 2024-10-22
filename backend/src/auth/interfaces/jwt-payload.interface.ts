// it contains the interface that defines the structure of the payload stored in the JWT


export interface JwtPayload {  //header payload and signature
    email: string;
    sub: number;
}
