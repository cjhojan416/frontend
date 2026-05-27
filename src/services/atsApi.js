import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const analyzeATS = async (file, jobDescription) => {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("job_description", jobDescription);

    const response = await axios.post(
        `${API_URL}/analyze-match`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};