/**
 * Validate remote file by url based on accepted mime types (sync way)
 * @param  {String}             url     remote url for validating file
 * @param  {Array of strings}   mime    a list of mime types (e.g. image/jpeg , image/png etc)
 * @return {Boolean}            
 */
function validateFileMimeByUrl(url, ...mime){
    if (!RegExp(/^(http|https):\/\/[^ "]+$/).test(url)) { return false; };

    const type = getFileContentTypeByUrl(url);
    return type ? mime.some(item => item.includes(type)) : false;
}

/**
 * Returns Content-Type of remote file (sync way)
 * @param  {String}     url     url for remote file
 * @return {String}     Content-Type  (e.g. image/jpeg , image/png etc)
 * @return {Boolean}    returns false on fail  
 */
function getFileContentTypeByUrl(url){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);

    try {
        xhr.send();
        if (xhr.status != 200) {
            console.warn(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {            
            return xhr.getResponseHeader('Content-Type');             
        }
    } catch(err) { 
        console.warn(`Unknown error: ${err}`)
    }
    return false;
}

// async function validateFileMimeByUrl(url, mime) {
//     if (!RegExp(/^(http|https):\/\/[^ "]+$/).test(url)) { return undefined; };

//     let responce = await fetch(url);
//     let blob = await responce.blob();
    
//     if (blob.type.localeCompare(mime) === 0) {
//         return true;
//     } 
//     return false;
// }


// const clg = console.log;
// let testurl = 'https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg';
// // testurl = 'ht:/upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.';
// // testurl = 'https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.pg';

// const mimeList = [
//     'image/jpeg',
//     'image/png'
// ];

// clg(validateFileMimeByUrl(testurl, 'image/jpeg'));
// // clg(validateFileMimeByUrl(testurl, ...mimeList));

