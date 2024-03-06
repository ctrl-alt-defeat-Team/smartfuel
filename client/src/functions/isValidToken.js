const verifyToken = async (token) => {
    try {
        const response = await fetch(`/api/tokenVerify/`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        //console.log(data.valid);
        return data.valid;
    }catch(error){
        return false;
    }
}    
    export default verifyToken;
