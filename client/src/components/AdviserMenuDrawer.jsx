import { Button, Drawer } from "flowbite-react";
import { useState } from "react";
import AdviserMenu from "./AdviserMenu";
import { ChevronRight } from "lucide-react";

export function AdviserMenuDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex min-h-[50vh] items-center justify-center">
        <button onClick={() => setIsOpen(true)}>
          <div className=" md:hidden mt-24 dark:text-white  fixed right-0">
            {" "}
            <ChevronRight />
          </div>
        </button>
      </div>
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Header title="Drawer" />
        <Drawer.Items>
          <AdviserMenu />
        </Drawer.Items>
      </Drawer>
    </>
  );
}
