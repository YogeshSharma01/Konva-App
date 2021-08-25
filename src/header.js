import React from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const Uper = () =>{
    return (
        <>
        <div className="main_header">
        <div>
            <h1>Edit Post</h1>
            <p>Saved</p>
        </div>
        <span className="container_2">
            <p>
            <DeleteOutlineIcon/>
            </p>
            <p>Undo</p>
        </span>

        </div>
        </>
    )
}

export default Uper;