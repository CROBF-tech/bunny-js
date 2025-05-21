import BunnyContainer from "./core/BunnyContainer";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";
import { BunnyDiv, BunnyParagraph, BunnyButton, BunnyInput, BunnyTable, BunnyRow, BunnyTableHead, BunnyTableField, BunnyList, BunnyItemList, BunnyHeading } from "./elements";


// Función base por defecto
function bunny<T extends HTMLElement = HTMLDivElement>(tag = "div") {
    return new BunnyContainer<T>(tag);
}

// Métodos directos: bunny.div(), bunny.p(), etc.
bunny.div = (...args: ConstructorParameters<typeof BunnyDiv>) =>
    new BunnyDiv(...args);

bunny.p = (...args: ConstructorParameters<typeof BunnyParagraph>) =>
    new BunnyParagraph(...args);

bunny.button = (...args: ConstructorParameters<typeof BunnyButton>) =>
    new BunnyButton(...args);

bunny.input = (...args: ConstructorParameters<typeof BunnyInput>) =>
    new BunnyInput(...args);

bunny.table = (...args: ConstructorParameters<typeof BunnyTable>) =>
    new BunnyTable(...args);

bunny.row = (...args: ConstructorParameters<typeof BunnyRow>) =>
    new BunnyRow(...args);

bunny.th = (...args: ConstructorParameters<typeof BunnyTableHead>) =>
    new BunnyTableHead(...args);

bunny.td = (...args: ConstructorParameters<typeof BunnyTableField>) =>
    new BunnyTableField(...args);

bunny.ul = (...args: ConstructorParameters<typeof BunnyList>) =>
    new BunnyList(...args);

bunny.li = (...args: ConstructorParameters<typeof BunnyItemList>) =>
    new BunnyItemList(...args);

bunny.title = (...args: ConstructorParameters<typeof BunnyHeading>) =>
    new BunnyHeading(...args);

bunny.set = <T = unknown>(key: string, value: T, ttl?: number) => {
    try {
        const payload = {
            value,
            expiresAt: ttl ? Date.now() + ttl : null,
        };
        const json = JSON.stringify(payload);
        const compressed = compressToUTF16(json);
        localStorage.setItem(key, compressed);
    } catch (e) {
        console.error(`bunny.set error:`, e);
    }
};

bunny.get = <T = unknown>(key: string): T | null => {
    try {
        const compressed = localStorage.getItem(key);
        if (!compressed) return null;

        const json = decompressFromUTF16(compressed);
        if (!json) return null;

        const payload = JSON.parse(json) as { value: T; expiresAt: number | null };
        if (payload.expiresAt && Date.now() > payload.expiresAt) {
            localStorage.removeItem(key);
            return null;
        }

        return payload.value;
    } catch (e) {
        console.error(`bunny.get error:`, e);
        return null;
    }
};

bunny.clear = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.error(`bunny.clear error:`, e);
    }
};

bunny.all = (): Record<string, unknown> => {
    const result: Record<string, unknown> = {};

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;

        const value = bunny.get(key);
        if (value !== null) {
            result[key] = value;
        }
    }

    return result;
};


// Export
export default bunny;
