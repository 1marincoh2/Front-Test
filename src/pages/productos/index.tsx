import React, { useState, useEffect } from "react";
import type { NextPage } from 'next'
import { TableCell, Button, Card, CardContent, Divider, Grid, TableContainer, Paper, TableHead, TableRow, TableBody, IconButton, CardActions, Table, Pagination, TextField, TablePagination, InputAdornment, OutlinedInput, InputLabel, Chip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import EnhancedTableToolbar from '../../components/productos/EnhancedTableToolbar';
import EnhancedTableHead from '../../components/productos/EnhancedTableHead';
import RegistroModal from '../../components/productos/RegitroModal';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell'; import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';
import url from "../../common/api.service";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "#1976D2",
    color: theme.palette.common.white,
  },

}));

const Productos: NextPage = () => {

  const [productos, setProductos] = useState([]);
  const [RegOpen, setRegOpen] = useState(false);
  const [numberPage, setNumberPage] = useState(0)


  const handleClickOpenModal = () => {
    setRegOpen(true);
  };
  const handleCloseModal = (value: boolean) => {
    setRegOpen(false);
  };


  const getProductos = () => {
    url.get('productos').then(response => {
      const date = response.data
      setProductos(date.data)
      console.log(date.data)

    }).catch(error => {
      console.error(error);
    })

  };


  useEffect(() => {
    getProductos();

  }, [])

  return (
    <div >
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <Card elevation={10} style={{ borderRadius: "10px" }}>
              <CardContent>
                <Grid item xs={12} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                  <Grid item xs={3}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Nombre del Producto"
                      type="text"
                      fullWidth
                      variant="outlined"

                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      select
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Tipo de Clasificacion"
                      type="text"
                      fullWidth
                      variant="outlined"

                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      select
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Lista de precios"
                      type="text"
                      fullWidth
                      variant="outlined"

                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button sx={{ ml: 3, mt: 2 }} style={{ background: "#424242" }} size="large" variant="contained" >
                      Buscar
                    </Button>
                    <Button sx={{ ml: 2, mt: 2 }} size="large" variant="contained" onClick={handleClickOpenModal} >
                      Registrar
                    </Button>
                  </Grid>

                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card elevation={10} style={{ borderRadius: "10px" }}>

              <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%' }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow >
                          <StyledTableCell>Nombre</StyledTableCell>
                          <StyledTableCell align="right">Descripcion</StyledTableCell>
                          <StyledTableCell align="right">Stock</StyledTableCell>
                          <StyledTableCell align="right">Precio</StyledTableCell>
                          <StyledTableCell align="right">Precio sin IVA</StyledTableCell>
                          <StyledTableCell align="right">Acciones</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {productos.map((product: any) => (

                          <TableRow
                            key={product.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {product.name}
                            </TableCell>
                            <TableCell align="right">{product.descripcion}</TableCell>
                            <TableCell align="right">{product.stock}</TableCell>
                            <TableCell align="right">{product.precio}</TableCell>
                            <TableCell align="right">{product.precioIVA}</TableCell>
                            <TableCell align="right">
                              <IconButton color="primary" aria-label="upload picture" component="span">
                                <ListAltIcon />
                              </IconButton>
                              <IconButton color="primary" aria-label="upload picture" component="span">
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Pagination

                    color="primary"
                    //@ts-ignore
                    onChange={(e, value) => handleChange(value)}
                    count={numberPage}
                    size="large"
                  />
                </Paper>

              </Box>


            </Card>
          </Grid>

        </Grid>
      </Box>

      <RegistroModal open={RegOpen}
        onClose={handleCloseModal} />
    </div>
  )
}

export default Productos