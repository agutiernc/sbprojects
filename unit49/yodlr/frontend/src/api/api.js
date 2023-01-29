import axios from "axios";

const BASE_URL = "http://localhost:3000";

class YoplyApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    // there are multiple ways to pass an authorization token, this is how you
    //    pass it in the header.
    // this has been provided to show you another way to pass the token. you are
    //    only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${YoplyApi.token}` };
    const params = (method === "get") ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);

      let message = err.response.data.error.message;

      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Get users */

  static async getUsers() {
    const res = await this.request('users');
    
    return res;
  }

  /** Get current user */

  static async getUser(id) {
    const res = await this.request(`users/${id}`);

    return res;
  }

  /** Sign up */

  static async signup(data) {
    const res = await this.request('users', data, 'post');
    console.log('res from api: ', res)
    return res;
  }
}


export default YoplyApi;



// export const getUsers = async () => {
//   const res = await axios.get(`${BASE_URL}/users`);

//   return res.data
// }