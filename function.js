window.function = function(index, input2, input3, input4) {
  // Ensure inputs are valid strings
  if (!index || !input2 || !input3 || !input4) {
    throw new Error("All inputs are required and must be strings.");
  }

  // Parse inputs
  const idx = parseInt(index.value.trim(), 10);
  if (isNaN(idx) || idx < 0) {
    throw new Error("Index must be a valid non-negative integer.");
  }

  const idsArray = [
    ...input2.value.split(",").map(id => id.trim()),
    ...input3.value.split(",").map(id => id.trim()),
    ...input4.value.split(",").map(id => id.trim())
  ];

  if (idx >= idsArray.length) {
    throw new Error("Index is out of range for the cumulative array.");
  }

  // Extract the ID at the given index
  return idsArray[idx];
};