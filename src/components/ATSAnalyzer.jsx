import { useState } from "react";
import { analyzeATS } from "../services/atsApi";
import { generateCV } from "../services/cvGeneratorApi";

function ATSAnalyzer() {

    const [file, setFile] = useState(null);

    const [jobDescription, setJobDescription] = useState("");

    const [result, setResult] = useState("");

    const [loading, setLoading] = useState(false);

    const [generating, setGenerating] = useState(false);

    const handleGenerateCV = async () => {

    if (!file || !jobDescription) {

        alert("Complete all fields");

        return;
    }

    try {

        setGenerating(true);

        const pdfBlob = await generateCV(
            file,
            jobDescription
        );

        const url = window.URL.createObjectURL(
            new Blob([pdfBlob])
        );

        const link = document.createElement("a");

        link.href = url;

        link.setAttribute(
            "download",
            "optimized_cv.pdf"
        );

        document.body.appendChild(link);

        link.click();

        link.remove();

    } catch (error) {

        console.error(error);

        alert("Error generating CV");

    } finally {

        setGenerating(false);
    }
};

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!file || !jobDescription) {

            alert("Complete all fields");

            return;
        }

        try {

            setLoading(true);

            const data = await analyzeATS(
                file,
                jobDescription
            );

            setResult(data.analysis);

        } catch (error) {

            console.error(error);

            alert("Error analyzing CV");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div>

            <h2>ATS Resume Analyzer</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                        setFile(e.target.files[0])
                    }
                />

                <textarea
                    placeholder="Paste job description..."
                    value={jobDescription}
                    onChange={(e) =>
                        setJobDescription(e.target.value)
                    }
                />

                <button type="submit">

                    {
                        loading
                            ? "Analyzing..."
                            : "Analyze CV"
                    }

                </button>
                <button
                    type="button"
                    onClick={handleGenerateCV}
                >

                    {
                        generating
                            ? "Generating CV..."
                            : "Generate Optimized CV"
                    }

                </button>

            </form>

            {
                result && (

                    <div>

                        <h3>Analysis Result</h3>

                        <pre>{result}</pre>

                    </div>
                )
            }

        </div>
    );
}

export default ATSAnalyzer;