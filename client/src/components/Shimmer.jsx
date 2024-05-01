import React from "react";

const Shimmer = () => {
  return (
    <div class="  shadow rounded-md p-4 h-full w-full ">
      <div class="animate-pulse  space-x-4">
        <div class="rounded bg-slate-200 h-24"></div>
        <div class="flex-1 space-y-6 py-1">
          <div class="h-8 bg-slate-200 rounded"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="h-8 bg-slate-200 rounded col-span-2"></div>
              <div class="h-8 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div class="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
