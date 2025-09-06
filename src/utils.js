export function isSubsequence(personList, favList) {
    if (favList.length === 0) return true;
    let i = 0;
    for (const t of personList) {
      if (t === favList[i]) i++;
      if (i === favList.length) return true;
    }        
    return false;
}

export function isSubarray(personList, favList) {
  if (favList.length === 0) return true;
  for (let i = 0; i <= personList.length - favList.length; i++) {
    let ok = true;
    for (let j = 0; j < favList.length; j++) {
      if (personList[i + j] !== favList[j]) {
        ok = false;
        break;
      }
    }
    if (ok) return true;
  }
  return false;
}

export function hasAllToysAnyOrder(personList, favList) {
  const set = new Set(personList);
  for (const t of favList) {
    if (!set.has(t)) return false;
  }
  return true;
}
