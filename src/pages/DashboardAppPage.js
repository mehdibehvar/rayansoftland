import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box, Button } from '@mui/material';
// components

// sections



import { authContext } from '../contexts/authContext';
import { deletePost, getPosts } from '../utils/httpclient';
import EditPostModal from '../components/EditPostModal';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
const {state}=useContext(authContext);

useEffect(() => {
const getPostsFun=async()=>{
  const response=await getPosts();
  setRows(response.slice(0,20));
};
getPostsFun();

}, [])

const handleDeletePost=async(id)=>{
const delPostFun=async()=>{
  const res=await deletePost(id);
  const response=await getPosts();
  setRows(response.slice(0,20));
};
delPostFun();
}
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>
{state.email? 
 <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
    
          <Grid item xs={12} md={12} lg={12}>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell sx={{border:"2px solid black"}}>#</TableCell>
            <TableCell sx={{border:"2px solid black"}} align="left">title</TableCell>
            <TableCell sx={{border:"2px solid black"}} align="left">body</TableCell>
            <TableCell sx={{border:"2px solid black"}} align="left">   </TableCell>
  
        
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border:3} }}
            >
              <TableCell sx={{border:"2px solid black"}} component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell sx={{border:"2px solid black"}} align="left">
                {row.title}
              </TableCell>
              <TableCell sx={{border:"2px solid black"}} align="left">{row.body}</TableCell>
              <TableCell sx={{border:"2px solid black"}} align="left" >
           <Box sx={{display:"flex",alignItems:"center"}}>
     
<EditPostModal row={row}/>
         <Button onClick={()=>handleDeletePost(row.id)} sx={{p:0}}>
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"/></svg>
         </Button>
           </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </Grid>
        </Grid>
      </Container>:<h4>you should login</h4>}
    
    </>
  );
}
