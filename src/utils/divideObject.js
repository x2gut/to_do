function divideObjectIntoChunks(obj, chunkSize) {
    const keys = Object.keys(obj);
    const result = [];
  
    if (keys.length > chunkSize) {
      for (let startIndex = 0; startIndex < keys.length; startIndex += chunkSize) {
        const chunk = {};
  
        keys.slice(startIndex, startIndex + chunkSize).forEach((key) => {
          chunk[key] = obj[key];
        });
  
        result.push(chunk);
      }
    } else {
      result.push(obj);
    }
  
    return result;
  }
  
  export default divideObjectIntoChunks;