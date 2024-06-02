import axios from "axios";
import { Button, Modal, FileInput, Label } from "flowbite-react";
import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.min.js`;

export function Popup() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const [pdfText, setPdfText] = useState("");

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
  //         Authorization:
  //           "Bearer " + import.meta.env.VITE_REACT_APP_WORQHAT_API_KEY,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };

  //     setUploading(true);

  //     try {
  //       const response = await axios.post(
  //         "https://api.worqhat.com/api/ai/v2/pdf-extract",
  //         formData,
  //         { headers: options }
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
    <div className="mx-4">
      <Button onClick={() => setOpenModal(true)}>Upload statement </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Uploader</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="file-upload" value="Upload file" />{" "}
                <FileInput
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={extractText}
                  disabled={!selectedFile || uploading}
                  className="bg-gray-800 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-700 ml-auto "
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
