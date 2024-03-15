const verifyToken = async (token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/tokenVerify/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    return data.valid;
  } catch (error) {
    return false;
  }
};
export default verifyToken;
