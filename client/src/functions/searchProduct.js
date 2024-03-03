const SearchProduct = async (type, result) => {
    
  if(type === "name"){
    try{
      const response = await fetch(`/api/search/name/${result}`);
      const data = await response.json();  
      console.log(data);
      return data;
    }catch(error){
        return -1;
    }
  }
  else if(type === "barcode"){
    try{
      const response = await fetch(`/api/search/barcode/${result}`);
      const data = await response.json();
      return data;
    }catch(error){
        return -1;
    }
     
    }
  };
  
  export default SearchProduct;