import  React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import _ from 'lodash';

function UserInfoCard({username, data}) {

  return (

    <Card variant="outlined">
      <CardContent>

        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
        <div className="p-8 flex">
            <div className="pr-4 w-/10">
              <p className="text-3xl font-bold">{username}</p>
            </div>
            <div>
            <div className="uppercase tracking-wide text-sm text-indigo-500 ">Subtotal:
              <text className="font-semibold">
                {`$${data.subtotal}`}
              </text>
            </div>
            <p className="mt-2 text-gray-500"> Tax: {`$${data.tax}`}</p>
            <p className="mt-2 text-gray-500">Tip: {`$${data.tip}`}</p>
            </div>
        </div>
        </div>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Send Request</Button>
      </CardActions> */}
    </Card>
  )
}

export default UserInfoCard;

