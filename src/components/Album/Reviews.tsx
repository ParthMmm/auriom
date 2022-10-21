import React from "react";

type Props = {};

function Reviews({}: Props) {
  return (
    <div className="mb-12 md:mb-24 ">
      <h2 className="text-4xl font-bold">reviews</h2>

      <div className=" border-2 shadow-[6px_6px_0px_rgb(255,255,255)]">
        <div className=" ">
          <div className="flex flex-row justify-between space-x-2 space-y-2 ">
            <div className="m-4 space-x-1">write a review</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
