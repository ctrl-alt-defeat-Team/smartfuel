const SearchProduct = async (result) => {
    try {
      const response = await fetch(`/api/search/barcode/${result}`);
        try{
            const data = await response.json();
            return data;
        }catch(error){
            return -1;
        }
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };
  
  export default SearchProduct;