import React, { useState } from "react";
import { FileInput, Label } from "flowbite-react";

export function Fileinput() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const options = {
        headers: {
          Authorization: "Bearer <token>",
          "Content-Type": "multipart/form-data",
        },
      };

      setUploading(true);

      try {
        const response = await axios.post(
          "https://api.worqhat.com/api/ai/v2/pdf-extract",
          formData,
          options
        );
        console.log(response);
        setResponse(response.data);
        setUploading(false);
      } catch (err) {
        setError(err.message);
        setUploading(false);
      }
    }
  };
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="file-upload" value="Upload file" />{" "}
        <input type="file" id="file-upload" onChange={handleFileChange} />
      </div>
      <button onClick={handleUpload} disabled={!selectedFile || uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
