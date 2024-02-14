import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import UserInfoCard from './UserInfoCard';

function UserInfoList({ userInfo, data }) {
  let remainderTotalInfoCard = null;

  return (
    <React.Fragment>
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {userInfo &&
          Object.entries(userInfo).map((user, index) => {
            return (
              <li
                key={index}
                className="col-span-1 divide-y divide-gray-200 rounded-xl border border-grey-200 bg-white shadow"
              >
                <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                  <div className="text-sm font-medium leading-6 text-gray-900">
                    {user[0]
                      .split(' ')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </div>
                </div>
           <dl className="  -my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">

            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Last invoice</dt>
              <dd className="text-gray-700">
                {/* <time dateTime={client.lastInvoice.dateTime}>{client.lastInvoice.date}</time> */}
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Amount</dt>
              <dd className="flex items-start gap-x-2">
                {/* <div className="font-medium text-gray-900">{client.lastInvoice.amount}</div> */}
                {/* <div
                  className={classNames(
                    statuses[client.lastInvoice.status],
                    'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                  )}
                >
                  {client.lastInvoice.status}
                </div> */}
              </dd>
              </div>
              </dl>

              </li>
            );
          })}
        {remainderTotalInfoCard}
      </ul>
    </React.Fragment>
  );
}

export default UserInfoList;

