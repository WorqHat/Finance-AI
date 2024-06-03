import axios from "axios";
import { Button, Modal, FileInput, Label } from "flowbite-react";
import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { server_url } from "../utils/constants";
import Shimmer from "./Shimmer";
import { Loading } from "./Loading";

pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

export function Popup() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [advice, setAdvice] = useState();

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
      getAdviceFromExtractedText(text);
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  const getAdviceFromExtractedText = async (pdfText) => {
    if (!pdfText) return null;

    const options = {
      headers: {
        Authorization:
          "Bearer " + import.meta.env.VITE_REACT_APP_WORQHAT_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: `Given the following data of the budgets and expenses of the user according to the category: 
          briefly analyze the extracted pdf data and give advice to the user on how to manage their budget and expenses and possibly suggest budget plans. Differentia between the necessary expenses and the unnecessary expenses, and give advices accordingly.
          Dont give advice on every individual expense but give a overall brief about it.
          And also give savings tip. 
          (we are going to show the data in the form of timeline where there should be a heading and a passage of advive after that, so return the data in such format which will be easier to parse for such feature. get the response in a proper json fromat so that its easier to fromat, segragate each heading, subheading, bullet points, and its descriptions, etc. properly)
          use this json format: [
            response {
            "Analysis": {
                "OverallAnalysis": "",
                "AdviceOnBudget": {
                    "NeedsAndWants": ",
                    "BudgetPlansSuggestions": [
                        {
                            "Plan": "",
                            "Description": ""
                        },
                        {
                            "Plan": "",
                            "Description": ""
                        }
                    ]
                },
                "SavingsTips": {
                    "TipOne": {
                        "Title": "",
                        "Description": ""
                    },
                    "TipTwo": {
                        "Title": "",
                        "Description": ""
                    },
                    //might be more such tips
                }
            }
        }]`,
        randomness: 0.5,
        training_data: "extracted data: " + JSON.stringify(pdfText),
        response_type: "json",
      }),
    };

    setUploading(true);

    try {
      const response = await axios.post(
        "https://api.worqhat.com/api/ai/content/v2",
        options.body,
        { headers: options.headers }
      );
      const content = JSON.parse(response.data.content);

      console.log("response", content[0].response.Analysis);
      setAdvice(content[0].response.Analysis);

      if (response) {
        const history = await axios.post(
          `${server_url}history/`,
          { advice: content[0].response.Analysis },
          { withCredentials: true }
        );
        if (!history) {
          console.log("Error while saving history");
          setError("Error while saving history");
        }
      }
    } catch (err) {
      console.log("error while getting the advice response", err);
      setUploading(false);
    } finally {
      setUploading(false);
    }
  };

  const { OverallAnalysis, AdviceOnBudget, SavingsTips } = advice || {};
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

          {advice ? (
            <div className="flex justify-center items-center">
              {uploading ? (
                <div className="w-full h-full">
                  <Shimmer />
                </div>
              ) : (
                <div className="container mx-auto py-8">
                  <div className="bg-gray-100 rounded-lg p-4 dark:bg-gray-500 dark:text-white">
                    <h2 className="text-2xl font-semibold mb-4">
                      Overall Analysis:
                    </h2>
                    <p>{OverallAnalysis}</p>
                  </div>

                  <div className="mt-8 dark:text-white">
                    <h3 className="text-xl font-semibold mb-4">
                      Advice on Budget:
                    </h3>
                    <p className="ml-4">{AdviceOnBudget?.NeedsAndWants}</p>

                    <div className="mt-4">
                      <h4 className="text-lg font-semibold mb-2">
                        Budget Plans Suggestions:
                      </h4>
                      <ul className="pl-4 grid grid-cols-2 gap-12">
                        {AdviceOnBudget?.BudgetPlansSuggestions.map(
                          (item, index) => (
                            <li
                              key={index}
                              className="mb-2 p-3 bg-gray-100 rounded-lg dark:bg-gray-500 dark:text-white"
                            >
                              <strong>{item.Plan}:</strong> {item.Description}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">
                      Savings Tips:
                    </h3>

                    <div className="flex flex-col space-y-4">
                      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-500 dark:text-white">
                        <h4 className="text-lg font-semibold mb-2">
                          {SavingsTips?.TipOne.Title}
                        </h4>
                        <p>{SavingsTips?.TipOne.Description}</p>
                      </div>

                      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-500 dark:text-white">
                        <h4 className="text-lg font-semibold mb-2">
                          {SavingsTips?.TipTwo.Title}
                        </h4>
                        <p>{SavingsTips?.TipTwo.Description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : uploading ? (
            <Shimmer />
          ) : null}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
