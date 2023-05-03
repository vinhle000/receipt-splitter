import  React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function UserInfoCard({username, data}) {

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">{username}</Typography>
        <Typography variant="body2">
          Subtotal: {`$${data.subtotal}`}
          <br />
          Tax: {`$${data.tax}`}
          <br />
          Tip: {`$${data.tip}`}
          <br />
         </Typography>
         <Typography variant="h7" component="div">  TOTAL: {`$${data.owedTotal}`} </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Send Request</Button>
      </CardActions> */}
    </Card>
  )
}

export default UserInfoCard;