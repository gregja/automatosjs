function copyObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function copyArray(arr) {
  return arr.slice();
}

