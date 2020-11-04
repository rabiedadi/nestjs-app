 import { Document } from 'mongoose';

 export interface User extends Document {
    ame: string,
    readonly password: string,
    seller: boolean
    address: string,
    created: Date
 }