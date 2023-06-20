import { scrypt, randomBytes } from "crypto";

export const autoHash = async (toBeChecked: string, generatedHash: string) => {
    return new Promise((resolve, reject) => {
        const [salt, key] = generatedHash.split(":");

        scrypt(toBeChecked, salt, 64, (error, derivedKey) => {
            if (error) {
                reject(error);
            } else {
                resolve(key == derivedKey.toString("hex"));
            }
        });
    });
};

export const generateHash = async (toBeHashed: string) => {
    if (!process.env.SECRET) {
        return null;
    }

    const secret = process.env.SECRET[0];

    return new Promise((resolve, reject) => {
        const salt = randomBytes(16).toString("hex");

        scrypt(
            `${secret[0]}${secret[secret.length - 1]}${toBeHashed}${secret}`,
            salt,
            64,
            (error, derivedKey) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(`${salt}:${derivedKey.toString("hex")}`);
                }
            }
        );
    });
};
