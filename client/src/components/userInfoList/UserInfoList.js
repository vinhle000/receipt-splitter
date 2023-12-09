import  React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import UserInfoCard from './UserInfoCard';

function UserInfoList({userInfo, data}) {
  let remainderTotalInfoCard = null;

  return (
    <ul className='UserInfoListContainer'>

      {userInfo && (
        Object.entries(userInfo).map( (item, index) => {
          if ( item[0] === '') {
            remainderTotalInfoCard = <UserInfoCard username="Remaining Total" data={item[1]} key={index}/>
          } else {
            return <UserInfoCard username={item[0]} data={item[1]} />
          }
        })

      )}
      {remainderTotalInfoCard}

    </ul>
  )
}

export default UserInfoList;