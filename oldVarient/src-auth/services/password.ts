const bcrypt = require('bcrypt');

export class Password{
    static async toHash(password: string ){
        const hash_Password= await bcrypt.hash(password,12);
        return hash_Password;

    }

    static async compare(storedPassword: string, suppliedPassword: string){
        const result = await bcrypt.compare(suppliedPassword, storedPassword);
        return result;
    }
}

