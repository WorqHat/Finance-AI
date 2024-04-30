import { Button, Spinner } from "flowbite-react";

export function Loading() {
  return (
    <div className="flex flex-row gap-3 justify-center items-center  ">
      <Button className="flex justify-center items-center" color="gray">
        <Spinner aria-label="Alternate spinner button example" size="sm" />
        <span className="pl-3">Loading...</span>
      </Button>
    </div>
  );
}
