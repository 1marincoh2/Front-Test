import React, { useState, useEffect } from "react";
import type { NextPage } from 'next'
import { TableCell, Button, Card, CardContent, Divider, Grid, TableContainer, Paper, TableHead, TableRow, TableBody, IconButton, CardActions, Table, Pagination, TextField, TablePagination, InputAdornment, OutlinedInput, InputLabel, Chip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import EnhancedTableToolbar from '../../components/productos/EnhancedTableToolbar';
import EnhancedTableHead from '../../components/productos/EnhancedTableHead';
import RegistroModal from '../../components/productos/RegitroModal';


interface Data {
  description: string;
  stock: number;
  precio: number;
  name: string;
  precioSinIva: number;
}

function createData(
  name: string,
  description: string,
  stock: number,
  precio: number,
  precioSinIva: number,
  
): Data {
  return {
    name,
    description,
    stock,
    precio,
    precioSinIva,
  
  };
}

const rows = [
  createData('Cupcake','Cupcake', 305, 3.7,  4.3),
  createData('Donut','Donut', 452, 25.0,  4.9),
  createData('Eclair','Eclair', 262, 16.0, 6.0),
  createData('Frozen yoghurt','Frozen', 159, 6.0,  4.0),
  createData('Gingerbread','Gingerbread', 356, 16.0,  3.9),
  createData('Honeycomb','Honeycomb', 408, 3.2,  6.5),
  createData('Ice cream sandwich','Ice cream sandwich', 237, 9.0,  4.3),
  createData('Jelly Bean','Jelly Bean', 375, 0.0,  0.0),
  createData('KitKat','KitKat', 518, 26.0,  7.0),
  createData('Lollipop','Lollipop', 392, 0.2, 0.0),
  createData('Marshmallow','Marshmallow', 318, 0, 2.0),
  createData('Nougat','Nougat', 360, 19.0,  37.0),
  createData('Oreo','Oreo', 437, 18.0,  4.0),
];

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

 

type Order = 'asc' | 'desc';


const Productos: NextPage = () => {

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('description');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dense, setDense] = React.useState(false);
  const [RegOpen, setRegOpen] = useState(false);

  const handleClickOpenModal = () => {
    setRegOpen(true);
  };
  const handleCloseModal = (value: boolean) => {
    setRegOpen(false);
    };



  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

 

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;





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
                  <Button sx={{ml: 3, mt:2}} style={{ background: "#424242" }} size="large" variant="contained" >
                    Buscar
                  </Button>
                  <Button sx={{ ml: 2 , mt:2}} size="large" variant="contained"  onClick={handleClickOpenModal} >
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
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='medium' 
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                      <TableCell align="right">{row.stock}</TableCell>
                      <TableCell align="right">{row.precio}</TableCell>
                      <TableCell align="right">{row.precioSinIva}</TableCell>
                     
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    
    </Box>


            </Card>
          </Grid>

        </Grid>
      </Box>
   
     <RegistroModal   open={RegOpen}
          onClose={handleCloseModal}/>
    </div>
  )
}

export default Productos