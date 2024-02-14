import React from "react";

function ReceiptStats({ receiptInfo }) {


  // TODO 2.13.24
  // Make the tax rate  a user filed

  return (
    <div className="md:container md:mx-auto px-8  border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
      <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
        <div
          className={`flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8`}
        >
          <dt className="text-sm font-medium leading-6 text-gray-500">Total</dt>
          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
            {receiptInfo.Total}
          </dd>
        </div>
        <div
          className={`flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8`}
        >
          <dt className="text-sm font-medium leading-6 text-gray-500">
            Subtotal
          </dt>
          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
            {receiptInfo.Subtotal}
          </dd>
        </div>
        <div
          className={`flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8`}
        >
          <dt className="text-sm font-medium leading-6 text-gray-500">Tax</dt>
          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
            {receiptInfo["Total Tax"]}
          </dd>
        </div>
        <div
          className={`flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8`}
        >
          <dt className="text-sm font-medium leading-6 text-gray-500">Tip</dt>
          <dd
            className={`${receiptInfo.tipRateSource === "scanned" || receiptInfo.tipRateSource === "auto" ? "text-gray-700" : "text-green-500"} text-xs font-medium`}
          >
            Scanned, Auto, or Adjusted
            {/* {receiptInfo.tipRateSource} */}
          </dd>
          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
            {receiptInfo["Tip"]}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default ReceiptStats;
