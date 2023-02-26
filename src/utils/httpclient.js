import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const getPosts = async () => {
  try {
    const result = await axios.get('/posts');
    return result.data
  } catch (error) {
    console.log(error);
  }
  return {};
};
export const deletePost = async (id) => {
  try {
    const result = await axios.delete(`/posts/${id}`);
    return result.data
  } catch (error) {
    console.log(error);
  }
  return {};
};
export const editPost = async (id,data) => {
  try {
    const result = await axios.patch(`/posts/${id}`,data);
    return result.data
  } catch (error) {
    console.log(error);
  }
  return {};
};
