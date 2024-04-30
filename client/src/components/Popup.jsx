import { Button, Modal, FileInput, Label } from "flowbite-react";
import { useState } from "react";

export function Popup() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="mx-4">
      <Button onClick={() => setOpenModal(true)}>Upload statement </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Uploader</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="file-upload" value="Upload file" />
              </div>
              <FileInput id="file-upload" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
