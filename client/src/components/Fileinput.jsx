import { FileInput, Label } from "flowbite-react";

export function Fileinput() {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="file-upload" value="Upload file" />
      </div>
      <FileInput id="file-upload" />
    </div>
  );
}
