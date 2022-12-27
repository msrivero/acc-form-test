const axios = require("axios").default;

const getUserDetails = async () => {
  let response = await axios.get("https://randomuser.me/api/");
  return response;
};

const postUserDetails = async (body: any, callback: any) => {
  axios
    .post("https://acc-test-vjn7.onrender.com/form", body, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "letmein",
      },
    })
    .then((res: any) => {
      callback(res);
    })
    .catch((error: any) => {
      console.log(error);
    });
};

export { getUserDetails, postUserDetails }
