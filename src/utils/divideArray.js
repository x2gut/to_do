function divideArrayIntoChunks(array, chunkSize) {
  const result = [];

  if (array.length > chunkSize) {
    for (
      let startIndex = 0;
      startIndex < array.length;
      startIndex += chunkSize
    ) {
      const chunk = array.slice(startIndex, startIndex + chunkSize);
      result.push(chunk);
    }
  } else {
    result.push(array);
  }

  return result;
}

export default divideArrayIntoChunks;
