import axios from "axios";

const BASE_URL = "http://localhost:3000";

class YoplyApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

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
    
    return res;
  }

  /** Update user details */

  static async updateUser(id, data) {
    const res = await this.request(`users/${id}`, data, 'put');
    
    return res;
  }

  /** Delete user */
  
  static async deleteUser(id, data) {
    try {
      await this.request(`users/${id}`, data, 'delete');
    } catch (err) {
      console.log(`User id (${id}) does not exist`);
    }
  }
}


export default YoplyApi;