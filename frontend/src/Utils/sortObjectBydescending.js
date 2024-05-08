export const sortByValueDescending = (inputObject) => {
    return Object.fromEntries(
      Object.entries(inputObject).sort((a, b) => b[1] - a[1])
    );
};


