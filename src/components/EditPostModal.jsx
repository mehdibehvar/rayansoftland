/* eslint-disable react/prop-types */
import { Box, Button, TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { editPost } from '../utils/httpclient';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditPostModal = ({row}) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(row.title);
    const [body, setBody] = useState(row.body);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const handleEditPost=async (e)=>{
e.preventDefault();
 const response=await editPost(row.id,{title,body});
 setOpen(false);
}
  return (
    <div>
    <Button onClick={handleOpen} sx={{p:0}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 23.7q-.825 0-1.413-.587T3 21.7v-14q0-.825.588-1.413T5 5.7h8.925l-2 2H5v14h14v-6.95l2-2v8.95q0 .825-.588 1.413T19 23.7H5Zm7-9Zm4.175-8.425l1.425 1.4l-6.6 6.6V15.7h1.4l6.625-6.625l1.425 1.4l-6.625 6.625q-.275.275-.638.438t-.762.162H10q-.425 0-.713-.288T9 16.7v-2.425q0-.4.15-.763t.425-.637l6.6-6.6Zm4.275 4.2l-4.275-4.2l2.5-2.5q.6-.6 1.438-.6t1.412.6l1.4 1.425q.575.575.575 1.4T22.925 8l-2.475 2.475Z"/></svg>
    </Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          edit post {row.id} in a modal
        </Typography>
       <form onSubmit={handleEditPost}>
   <Box sx={{display:"flex",flexDirection:"column",mt:2,gap:1}}>
   <TextField value={title} onChange={(e)=>setTitle(e.target.value)} id="outlined-basic" label="title" variant="outlined" />

<TextField
   id="outlined-multiline-static"
   label="Multiline"
   multiline
   rows={10}
   value={body}
   onChange={(e)=>setBody(e.target.value)}
 />
<Button variant="outlined" type='submit'>edit</Button>
   </Box>
       </form>
      </Box>
    </Modal>
  </div>
  )
}

export default EditPostModal