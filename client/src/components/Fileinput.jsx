import React, { useState } from "react";
import { FileInput, Label } from "flowbite-react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.min.js`;

export function Fileinput() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [pdfText, setPdfText] = useState("");

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const extractText = async () => {
    if (!selectedFile) return null;

    const reader = new FileReader();
    reader.onload = async function () {
      const typedarray = new Uint8Array(this.result);

      const pdf = await pdfjsLib.getDocument(typedarray).promise;
      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item) => item.str);
        text += strings.join(" ") + " ";
      }

      setPdfText(text);
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  console.log("pdf text", pdfText);

  // const handleUpload = async () => {
  //   if (selectedFile) {
  //     const formData = new FormData();
  //     formData.append("file", selectedFile);

  //     const options = {
  //       headers: {
  //         Authorization: "Bearer <token>",
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };

  //     setUploading(true);

  //     try {
  //       const response = await axios.post(
  //         "https://api.worqhat.com/api/ai/v2/pdf-extract",
  //         formData,
  //         options
  //       );
  //       console.log(response);
  //       setResponse(response.data);
  //       setUploading(false);
  //     } catch (err) {
  //       setError(err.message);
  //       setUploading(false);
  //     }
  //   }
  // };
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="file-upload" value="Upload file" />{" "}
        <input type="file" id="file-upload" onChange={handleFileChange} />
      </div>
      <button onClick={extractText} disabled={!selectedFile || uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
