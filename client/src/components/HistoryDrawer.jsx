import { Button, Drawer } from "flowbite-react";
import { useState } from "react";

const HistoryDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

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
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            fetch history from db{" "}
          </p>
          <div className="grid  gap-4 ">
            <div className=" border-t border-b p-2 m-2"> Your chat history</div>
            <div className=" border-t border-b p-2 m-2"> Your chat history</div>
            <div className=" border-t border-b p-2 m-2"> Your chat history</div>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default HistoryDrawer;
