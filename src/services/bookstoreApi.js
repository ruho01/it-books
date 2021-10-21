const bookApi = 'https://api.itbook.store/1.0/';



async function findBook(bookTittle, pageNumber, handleData){    
    try {        
        const action = 'search/';
        const response = await fetch(
                concatApiUrl(bookApi, action, bookTittle, pageNumber)
            );
        const json = await response.json();
        handleData(json);
    }
    catch (error) {
        console.error(error);
    }
}

function concatApiUrl(baseApi, action, keyword, pageNumber){
    console.log(baseApi+action+keyword+'/'+pageNumber);
    return baseApi+action+keyword+'/'+pageNumber;
}

export default findBook;