import axios from "axios";

const API_URL = "http://127.0.0.1:8000";


export const generateCV = async (
    file,
    jobDescription
) => {

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
        "job_description",
        jobDescription
    );

    const response = await axios.post(
        `${API_URL}/generate-cv`,
        formData,
        {
            responseType: "blob"
        }
    );

    return response.data;
};