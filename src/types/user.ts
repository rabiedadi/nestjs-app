 import { Document } from 'mongoose';

 export interface User extends Document {
    username: string,
    readonly password: string,
    seller: boolean
    address: string,
    created: Date
 }