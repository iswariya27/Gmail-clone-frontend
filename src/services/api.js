import axios from "axios";

const API_URL = "https://gmail-clone-backend-c8be.onrender.com";
// const API_URL = "http://localhost:8000";

const API_GMAIL = async (urlObject, payload, type) => {
  return await axios({
    method: urlObject.method,
    url: `${API_URL}/${urlObject.endpoint}/${type}`,
    data: payload,
  });
};

export default API_GMAIL;
