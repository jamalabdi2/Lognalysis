export const getFirstTenURLs = (inputObject)  =>{
    return Object.fromEntries(Object.entries(inputObject).slice(0,5))
}