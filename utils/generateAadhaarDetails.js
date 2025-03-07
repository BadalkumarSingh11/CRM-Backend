// config/otpUtil.js
import axios from "axios";

export const generateAadhaarDetails = async (requestID, otp) => {
    const data = JSON.stringify({
        requestId: requestID,
        otp: `${otp}`,
        isAaadhaarMasked: false,
    });

    const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api-preproduction.signzy.app/api/v3/fetchOkycData",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Ks7wDpfSe075bPYvWH6zzQHmoirMD51O",
        },
        data: data,
    };

    try {
        const response = await axios.request(config);
        return response.data; // Return the response data
    } catch (error) {
        throw new Error(error.response?.data?.message || "An error occurred"); // Handle errors
    }
};
