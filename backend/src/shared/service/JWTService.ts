import * as jwt from 'jsonwebtoken';


interface IJWTData {
    uid: number
}

const sign = (data: IJWTData): string | 'JWT_SECRET NOT FOUND' => {
    if(!process.env.JWT_SECRET) return 'JWT_SECRET NOT FOUND';

    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h'});
}

const verify = (token: string): IJWTData | 'JWT_SECRET NOT FOUND' | 'INVALID_TOKEN'  => {
    if(!process.env.JWT_SECRET)  return 'JWT_SECRET NOT FOUND'

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
        if(typeof decoded === 'string') return 'INVALID_TOKEN';

        return decoded as IJWTData;
    }catch(error){
        return 'INVALID_TOKEN';
    }

}

export const JWTService = {
    sign,
    verify
}