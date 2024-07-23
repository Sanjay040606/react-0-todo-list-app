const apiRequest = async (url = '' , optionObj = null , errMsg = null) => {
    try{
        const response = await fetch(url,optionObj)
        if(!response.ok) throw Error("please reload the App")
    }catch(err){
        errMsg = err.Message
    }finally{
        return errMsg
    }
    

}

export default apiRequest