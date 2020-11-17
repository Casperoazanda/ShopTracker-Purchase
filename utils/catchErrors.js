// displayError() 是一个function 是一个callback 前面所有的都执行完毕后 再执行这个方法
// 从前面传来的是setError
function catchErrors(error,displayError)
{
    let errorMsg;
    // The request was made and the server responded with a status code that is not in the range of 2XX
    if(error.response)
    {
        errorMsg=error.response.data;
        console.error("Error response",errorMsg);

        // For cloudinary image uploads
        if(error.response.data.error)
        {
            errorMsg=error.response.data.error.message;
        }
    }
    else if(error.request)
    {
        // the request was made, but no response was received
        errorMsg=error.request;
        console.error("Error Request",errorMsg);
    }
    else
    {
        // something else happened in making the request that triggered an error
        errorMsg=error.message;
        console.error("Error Message",errorMsg);
    }
    displayError(errorMsg);

    

     
}

export default catchErrors;