import React, {useState} from 'react';



function UserInfoList({ userInfo, data }) {
  const [receiptRemainder , setReceiptRemainder] = useState(null);

  console.log('userInfo ---> ', userInfo);
  return (
    <React.Fragment>
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-8">
      {userInfo &&
        Object.entries(userInfo).map((user, index) => {

          console.log('user ---> ', user[0])
          let isNameAssigned = user[0].length > 0 ? true : false;

          return (
            (isNameAssigned && (
              <li
                key={index}
                className="col-span-1 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-x-4 border-b border-gray-200 bg-indigo-50 p-4">
                  <div className="text-sm font-medium leading-6 text-indigo-600">
                    {user[0]
                      .split(' ')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </div>
                </div>
                <dl className="divide-y divide-gray-100 px-4 py-1 text-sm leading-6">
                  <div className="flex justify-between gap-x-4 py-2">
                    <dt className="text-gray-500">Tip</dt>
                    <dd className="text-gray-900">
                      {user[1].tip}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-x-4 py-2">
                    <dt className="text-gray-500">Tax:</dt>
                    <dd className="flex items-start gap-x-2">
                      {user[1].tax}
                    </dd>
                  </div>
                  <div className="flex justify-between font-bold gap-x-4 py-2">
                    <dt className="text-gray-500">Total:</dt>
                    <dd className="flex items-start gap-x-2">
                      {user[1].owedTotal}
                    </dd>
                  </div>

                </dl>
              </li>
          )));
        })}

            {(userInfo && (
              < div
                className="col-span-1 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-x-4 border-b border-gray-200 bg-indigo-50 p-4">
                  <div className="text-sm font-medium leading-6 text-indigo-600">
                    Remainder
                  </div>
                </div>
                <dl className="divide-y divide-gray-100 px-4 py-1 text-sm leading-6">
                  <div className="flex justify-between gap-x-4 py-2">
                    <dt className="text-gray-500">Tip</dt>
                    <dd className="text-gray-900">
                      {userInfo[''].tip}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-x-4 py-2">
                    <dt className="text-gray-500">Tax:</dt>
                    <dd className="flex items-start gap-x-2">
                      {userInfo[''].tax}
                    </dd>
                  </div>
                  <div className="flex justify-between font-bold gap-x-4 py-2">
                    <dt className="text-gray-500">Total:</dt>
                    <dd className="flex items-start gap-x-2">
                      {userInfo[''].owedTotal}
                    </dd>
                  </div>

                </dl>
              </div>
            ))}
    </ul>
  </React.Fragment>
  )
}

export default UserInfoList;

