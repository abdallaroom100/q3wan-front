import axios from "axios";

const useLoginUser = () => {
  const loginUser = async (
    loginData: any
  ): Promise<{
    success: boolean;
    userData?: any;
    error?: string;
  }> => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        loginData
      );
      return { success: true, userData: response.data };
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "حدث خطأ أثناء التسجيل";

      return { success: false, error: errorMessage };
    }
  };
  return { loginUser };
};

export default useLoginUser;
