export function setLocalStorage(key: string, value: string) {
  let ItemValue = value;
  if (typeof value === 'object') {
    ItemValue = JSON.stringify(value);
  }

  localStorage.setItem(key, ItemValue);
  return key;
}

export function getLocalStorage(key: string) {
  return localStorage.getItem(key);
}

export function removeLocalStorage(key: string) {
  if (getLocalStorage(key)) {
    localStorage.removeItem(key);
    return true;
  }
  return false;
}
