import { useState } from "react";
import API from "../services/api";

function UploadCV() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {

      const response = await API.post(
        "/upload-cv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      // crear URL del PDF
      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      // crear link descarga
      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        `improved_${file.name}`
      );

      document.body.appendChild(link);

      // descargar automáticamente
      link.click();

      // limpiar
      link.remove();

    } catch (error) {
      console.error(error);
      alert("Error al subir el CV");
    }
  };

  return (
    <div>
      <h2>Subir CV</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Mejorar CV
      </button>
    </div>
  );
}

export default UploadCV;