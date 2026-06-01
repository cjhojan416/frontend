import { useRef, useState } from "react"
import axios from "axios"


export default function App() {

  const fileInputRef = useRef(null)

  const [selectedFile, setSelectedFile] = useState(null)
  const [jobOffer, setJobOffer] = useState("")
  const [analysisResult, setAnalysisResult] = useState(null)

  const [analyzing, setAnalyzing] = useState(false)
  const [generatingCV, setGeneratingCV] = useState(false)

  // funciones...

const openFileSelector = () => {
    fileInputRef.current.click()
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]

    if (!file) return

    setSelectedFile(file)
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  const generateResume = async () => {
   if (!selectedFile || !jobOffer.trim()) {
    return
  }

  setGeneratingCV(true)

  try {
    const formData = new FormData()

    formData.append("file", selectedFile)
    formData.append("job_description", jobOffer)

    const response = await axios.post(
      "http://127.0.0.1:8000/generate-cv",
      formData,
      {
        responseType: "blob",
      }
    )

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    )

    const link = document.createElement("a")

    link.href = url
    link.setAttribute(
      "download",
      "optimized_cv.pdf"
    )

    document.body.appendChild(link)

    link.click()

    link.remove()

  } catch (error) {
    console.error(error)
  } finally {
    setGeneratingCV(false)
  }
  }

const analyzeResume = async () => {
  if (!selectedFile || !jobOffer.trim()) {
    return
  }

  setAnalyzing(true)

  try {
    const formData = new FormData()

    formData.append("file", selectedFile)
    formData.append("job_description", jobOffer)

    const response = await axios.post(
      "http://127.0.0.1:8000/analyze-match",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )

    console.log(response.data)

    setAnalysisResult(response.data.analysis)

  } catch (error) {
    console.error(error)
  } finally {
    setAnalyzing(false)
  }
}

  return (
    <div className="min-h-screen bg-[#0B1120] text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-50">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            AI Job Agent
          </h1>
        </div>

        <button className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10">
          Dashboard
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 mb-6">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            <p className="text-sm text-cyan-300">
              AI Resume Optimization Platform
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-white">
            Optimize Your
            <span className="block text-white">
              Resume With AI
            </span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-10">
            Upload your CV, compare it with job offers, analyze missing
            skills, and generate an optimized resume tailored for recruiters.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={openFileSelector}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold hover:scale-105 transition-all duration-300 shadow-2xl shadow-cyan-500/20"
            >
              Upload Resume
            </button>

            <button className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
              View Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-14">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h2 className="text-3xl font-bold text-cyan-400">95%</h2>
              <p className="text-sm text-gray-400 mt-1">Match Accuracy</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h2 className="text-3xl font-bold text-purple-400">AI</h2>
              <p className="text-sm text-gray-400 mt-1">Resume Analysis</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h2 className="text-3xl font-bold text-green-400">PDF</h2>
              <p className="text-sm text-gray-400 mt-1">Export Ready</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full"></div>

          <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Resume Analyzer</h2>

              <div className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm">
                Online
              </div>
            </div>

            {/* Analyze Section */}
            <div className="rounded-3xl border border-white/10 bg-black/20 p-8 backdrop-blur-xl">
              <h3 className="text-3xl font-bold text-white mb-8">
                Analyze Resume
              </h3>

              {/* Upload CV */}
              <div className="mb-8">
                <label className="block text-white font-medium mb-4">
                  Upload Your CV
                </label>

                <div className="border-2 border-dashed border-white/10 rounded-3xl p-8 text-center bg-black/20 hover:border-cyan-400/40 transition-all duration-300">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg">
                    PDF
                  </div>

                  <p className="text-gray-400 mb-6">
                    Upload your resume in PDF format
                  </p>

                  <input
                    type="file"
                    accept=".pdf"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileUpload}
                  />

                  <button
                    onClick={openFileSelector}
                    className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-all duration-300"
                  >
                    Upload CV
                  </button>
                </div>
              </div>

              {/* Job Offer */}
              <div>
                <label className="block text-white font-medium mb-4">
                  Job Offer Link or Description
                </label>

                <textarea
                  value={jobOffer}
                  onChange={(e) => setJobOffer(e.target.value)}
                  placeholder="Paste the job offer link or description here..."
                  className="w-full h-40 p-4 rounded-2xl bg-black/30 border border-white/10 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-cyan-400 transition-all duration-300"
                />
              </div>
            </div>

            {selectedFile && (
              <div className="mt-6 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                <p className="text-cyan-300 font-medium">
                  Uploaded File:
                </p>

                <p className="text-white mt-1">
                  {selectedFile.name}
                </p>
              </div>
            )}

            {analyzing && (
              <div className="mt-6 flex items-center gap-3 p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                <div className="w-5 h-5 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin"></div>

                <p className="text-purple-200 animate-pulse">
                  Processing AI analysis...
                </p>
              </div>
            )}

            {/* Fake Analysis */}
            <div className="mt-8 space-y-4">
              {!analyzing && selectedFile && jobOffer && (
                <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                  <p className="text-green-300 font-medium">
                    Resume and job offer ready for AI processing.
                  </p>
                  {analysisResult && (
                    <div className="mt-6 p-6 rounded-2xl bg-black/30 border border-cyan-500/20">
                      <h3 className="text-xl font-bold text-cyan-300 mb-4">
                        AI Analysis Result
                      </h3>

                      <div className="text-gray-300 whitespace-pre-wrap">
                        {analysisResult}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {analysisResult && (
                <div className="p-6 rounded-2xl bg-black/30 border border-cyan-500/20">
                  <h3 className="text-xl font-bold text-cyan-300 mb-4">
                    AI Analysis Result
                  </h3>

                  <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {analysisResult}
                  </div>
                </div>
              )}

              <div className="space-y-4">
              <button
                onClick={analyzeResume}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-cyan-500/20"
              >
                Analyze Resume Match ✨
              </button>

              <button
                onClick={generateResume}
                disabled={!analysisResult || generatingCV}
                className="w-full py-4 rounded-2xl border border-white/10 bg-white/5 font-bold text-lg hover:bg-white/10 transition-all duration-300"
              >
                {generatingCV
                  ? "📄 Generating CV..."
                  : "Generate Optimized CV 🚀"}
              </button>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Why Use AI Job Agent?
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to optimize your resume and increase your
            chances of getting hired.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:translate-y-[-5px] transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl mb-6">
              AI
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-white">
              Smart Analysis
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Analyze resumes against job descriptions using AI-powered
              matching and keyword detection.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:translate-y-[-5px] transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 text-2xl mb-6">
              PDF
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-white">
              Resume Generation
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Automatically generate optimized resumes tailored for each job
              offer.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:translate-y-[-5px] transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400 text-2xl mb-6">
              ATS
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-white">
              ATS Optimization
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Improve compatibility with applicant tracking systems and modern
              recruiters.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
