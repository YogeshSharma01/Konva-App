import React,{useState} from 'react';
import { IconButton } from '@material-ui/core';
import { FeedbackDialog } from 'mui-feedback-dialog';


const Button = () => {
  const [dialogVisible, setDialogVisible] =useState(false);

  return (
    <>

            <IconButton onClick={() => setDialogVisible(true)} size='medium'>
               <button className="footer_btn">Schedule Post ></button>
            </IconButton>
      
        <FeedbackDialog
            open={dialogVisible}
            onClose={() => setDialogVisible(false)}
            onSubmit={console.log} />

    </>
  );
};

export default Button;
