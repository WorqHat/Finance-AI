import { Button, Spinner } from "flowbite-react";

export function Loading() {
  return (
    <div className="flex flex-row gap-3 justify-center items-center  ">
      <Spinner aria-label="Alternate spinner button example" size="sm" />
    </div>
  );
}
