const LocalStorageHandler = {
  setItem(saveKey: string, itemToSave: any): boolean {
    let modeledItem: string = itemToSave;
    if (itemToSave == null || itemToSave == "") return false;

    if (Array.isArray(itemToSave)) modeledItem = JSON.stringify(itemToSave);
    if (itemToSave instanceof Object) modeledItem = JSON.stringify(itemToSave);
    if (typeof itemToSave == "number" || typeof itemToSave == "boolean")
      modeledItem = itemToSave.toString();

    localStorage.setItem(saveKey, modeledItem);

    return true;
  },
  getItem(saveKey: string): any {
    const localItem = localStorage.getItem(saveKey) || "";

    if (localItem == null || localItem == "") {
      console.error({
        error: `Localstorage item with key ${saveKey} could not be found!`,
        solution:
          "try to run 'LocalStorageHandler.getAllItems' or 'localStorageHandler.getAllKeys' to find what you want",
      });
      return null;
    }

    return JSON.parse(localItem);
  },
  getAllItems(): any[] {
    const values = [];
    const keys = Object.keys(localStorage);
    let amountOfKeys = keys.length;

    while (amountOfKeys--) {
      values.push(localStorage.getItem(keys[amountOfKeys]));
    }

    return values;
  },
  getAllKeys(): string[] {
    return Object.keys(localStorage);
  },
  removeItem(key: string): void {
    localStorage.removeItem(key);
  },
};

export default LocalStorageHandler;
