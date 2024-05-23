import axios from "axios";
import { Button, Drawer, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { server_url } from "../utils/constants";

const HistoryDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  const handleClose = () => setIsOpen(false);

  const getAdvicehistory = async () => {
    try {
      const history = await axios.get(`${server_url}history/`, {
        withCredentials: true,
      });
      if (!history) {
        console.log("Error while fetching history");
      }
      setHistory(history.data.data.history);
    } catch (error) {
      console.log("error while getting the history", error);
    }
  };
  useEffect(() => {
    getAdvicehistory();
  }, []);

  const handleHistoryClick = (item) => {
    setSelectedHistoryItem(item);
    setOpenModal(true); // Open the modal when a history item is clicked
  };

  return (
    <>
      <div className="flex  p-4">
        <Button
          className="bg-white text-black hover:text-white hover:bg-black border border-black"
          onClick={() => setIsOpen(true)}
        >
          Show History
        </Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Header title="History" />
        <Drawer.Items>
          <div className="grid  gap-4 ">
            {history &&
              history.map((item, index) => (
                <div
                  key={index}
                  className="border-t border-b p-2 m-2 cursor-pointer"
                  onClick={() => handleHistoryClick(item.advice)}
                >
                  <div className="text-lg">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-gray-400 ">
                    {item.advice.OverallAnalysis.slice(40, 150) + "..."}
                  </div>
                </div>
              ))}
          </div>
        </Drawer.Items>
      </Drawer>
      {selectedHistoryItem && (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Previous Advices</Modal.Header>
          <Modal.Body>
            <div className="container mx-auto py-8 ">
              <div className="bg-gray-100 rounded-lg p-4 ">
                <h2 className="text-2xl font-semibold mb-4">
                  Overall Analysis:
                </h2>
                <p>{selectedHistoryItem.OverallAnalysis}</p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">
                  Advice on Budget:
                </h3>
                <p>{selectedHistoryItem.AdviceOnBudget?.NeedsAndWants}</p>

                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2">
                    Budget Plans Suggestions:
                  </h4>
                  <ul className="list-disc pl-4 grid grid-cols-2 gap-12">
                    {selectedHistoryItem.AdviceOnBudget?.BudgetPlansSuggestions.map(
                      (item, index) => (
                        <li
                          key={index}
                          className="mb-2 p-3 bg-gray-100 rounded-lg"
                        >
                          <strong>{item.Plan}:</strong> {item.Description}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Savings Tips:</h3>

                <div className="flex flex-col space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">
                      {selectedHistoryItem.SavingsTips?.TipOne.Title}
                    </h4>
                    <p>{selectedHistoryItem.SavingsTips?.TipOne.Description}</p>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">
                      {selectedHistoryItem.SavingsTips?.TipTwo.Title}
                    </h4>
                    <p>{selectedHistoryItem.SavingsTips?.TipTwo.Description}</p>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default HistoryDrawer;
