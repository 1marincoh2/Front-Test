import React, { useState, useEffect } from "react";
import type { NextPage } from 'next'
import { TableCell, Button, Card, CardContent, Divider, Grid, TableContainer, Paper, TableHead, TableRow, TableBody, IconButton, CardActions, Table, Pagination, TextField, TablePagination, InputAdornment, OutlinedInput, InputLabel, Chip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import ModalClasificacion from '../../components/clasificacion/ModalClasificacion';
import url from "../../common/api.service";





const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "#1976D2",
    color: theme.palette.common.white,
  },

}));


const Clasificion: NextPage = () => {

 
  const [clasificacion, setClasificacion] = useState([]);
  const [classi, setClassi] = useState({
    id: 0,
    name: "",
    active:""
  });
  const [ currency,  setCurrency] = useState();
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  

  const handleChangeselect = (event: any) => {
    setCurrency(event.target.value);
  };


  const [ModalOpen, setModalOpen] = useState(false);
  
  const handleClickOpenModal= () => {
    setModalOpen(true);
  
  };
  const handleCloseModal = (value: boolean) => {
    setModalOpen(false);
    getClassi(),
    reset()
  };

 
  const getClassi = () => {
    url.get('Classification').then(response => {
      const date = response.data
      setClasificacion(date.data)
    
      console.log(date.data)

    }).catch(error => {
      console.error(error);
    })

  };


  const editar = (data: any) => {
    setClassi({
      id: data._id, name: data.name,  active: data.active  });

    handleClickOpenModal()
      console.log("en en index", data)
  }

  
  useEffect(() => {
    getClassi()
    console.log(getClassi)

  }, [])

  const reset = () => {
    setClassi({
      id:0,     
      name: "",
      active:"",
    })
}

  return (
    <div >
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
         <Grid item xs={12}>
            <Card elevation={10} style={{ borderRadius: "10px" }}>
           
              <CardContent>
            
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: 'background.paper',
                  color: 'text.secondary',

                }}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Clasificacion"
                    type="text"
                    fullWidth
                    variant="outlined"
                    sx={{ paddingRight: 80 }}
                  />
                  <Button disableElevation style={{ background: "#424242" }} size="large" variant="contained" >
                    Buscar
                  </Button>
                  <Button sx={{ ml: 2 }}  onClick={handleClickOpenModal} size="large" variant="contained" >
                    Registrar
                  </Button>
                </Box>

              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
                   <Card elevation={10} style={{ borderRadius: "10px" }}>
                        <CardContent>
                          <Typography  variant="h5">Clasificaciones</Typography>
                       
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
             
                  <Grid item xs={3}>
                
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Rows Per Page"
                      value={rowsPerPage}
                      onChange={handleChangeselect}
                      fullWidth



                    >
                     
                    </TextField>
                  </Grid>
                  <Grid item xs={9}>

                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Filtrar Actividades</InputLabel>
                      <OutlinedInput

                        id="input-with-icon-textfield"
                        endAdornment={<InputAdornment position="end"> <IconButton><SearchIcon /></IconButton>  </InputAdornment>}
                        aria-describedby="standard-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                        label="Filtrar Actividades"
                      />
                    </FormControl>
                  </Grid>
                </Grid>



              </CardContent>
              <Paper sx={{ width: '100%' }}>
             
                <TableContainer component={Paper} sx={{ p: 2 }}>
             
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                
                    <TableHead>
                      <TableRow >
                        <StyledTableCell align="left">Nombre</StyledTableCell>

                        <StyledTableCell align="left">Estado</StyledTableCell>

                        <StyledTableCell align="left">Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {clasificacion.map((clas: any) => (

                        <TableRow
                          key={clas.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {clas.name}
                          </TableCell>
                          <TableCell align="left" >
                            <Chip label={clas.active} color="success" />                          </TableCell>

                          <TableCell align="left"><IconButton  onClick={() => editar(clas)}color="primary" aria-label="upload picture" component="span">
                            <EditIcon />
                          </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={clasificacion.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>


            </Card>
          </Grid>

        </Grid>
      </Box>
      
         <ModalClasificacion
            openModal={ModalOpen}
          onCloseModal={handleCloseModal}
          edit={classi}
          />

    </div>
  )
}

export default Clasificion