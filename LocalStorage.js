class LocalStorageUtil {
    constructor() {
        this.storage = localStorage;
        this.expired = 1000 * 60 * 60 * 24 * 6;
    }
    set(key, value, expired) {
        let tempObject = new Object();
        tempObject.key = key;
        tempObject.value = value;
        if (expired) {
            tempObject.expired = Date.now() + expired;
        } else {
            tempObject.expired = Date.now() + this.expired;
        }
        const tempString = JSON.stringify(tempObject);
        this.storage[key] = tempString;
        return tempObject;
    }
    get(key) {
        let storageData = this.storage.getItem(key);
        if (!storageData) {
            return null;
        }
        let tempObject = JSON.parse(storageData);
        let expired = tempObject["expired"] || Date.now();
        if (Date.now() > expired) {
            this.remove(key)
            return null;
        }

        return tempObject.value;
    }
    remove(key) {
        this.storage.removeItem(key);
    }
}
export default new LocalStorageUtil();