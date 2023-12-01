import axios from "axios";

const getUsers = async () => {
  try {
    const res = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export default getUsers;
