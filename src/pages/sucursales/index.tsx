import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, IconButton, CardActionArea, CardActions, PaginationItem
} from '@mui/material'
import type { NextPage } from 'next'
import React, { useState, useEffect } from "react";
import { tableCellClasses } from '@mui/material/TableCell';
import Addmodal from '../../components/sucursal/Addmodal';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';
import url from "../../common/api.service";
import { SucursalType } from '../../types/sucursal.type';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { SpaceBar } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "#1976D2",
    color: theme.palette.common.white,
  },

}));


const Sucursales: NextPage = () => {

  const [branch, setBranch] = useState<any>([])
  const [sucur, setSucur] = useState({
    id: 0,
    type: "",
    location: "",
    name: ""
  });

  const [Addopen, setAddOpen] = useState(false);
  const [page, setPage] = useState(1)
  const [numberPage, setNumberPage] = useState(0)


  const handleClickOpen = () => {
    setAddOpen(true);
  };
  const handleClose = (value: boolean) => {
    setAddOpen(false);
    reset();
    getSucursal()
  };

  const handleChange = (page:number) => {
    getSucursal(page)
    console.log("page", page)

  }

  const getSucursal = (p: number = 1) => {
    url.get(`sucursal?query={"limit":2 , "page":${p}}`).then(response => {
      const date = response.data
      setBranch(date.data)
      if (p === 1) {
        setNumberPage(date.lastPage)
        console.log("lo que trae p", p)
      }
      console.log(date.data)

    }).catch(error => {
      console.error(error);
    })

  };

  const delitSucursal = (data: any) => {
    url.delete('sucursal/' + data)
      .then(response => {
        // @ts-ignore
        setBranch(prevState => {
          const SucPrev = [...prevState]
          // @ts-ignore
          const position = SucPrev.findIndex((suc) => suc.id === data)
          if (position > -1) {
            SucPrev.splice(position, 1)
          }
          return SucPrev;
        })

        console.log(data);

      })
      .catch(e => {
        console.log(e);
      });

  };

  const editar = (data: any) => {
    setSucur({
      id: data._id, name: data.name, type: data.type, location: data.location
    });

    handleClickOpen()

  }
  const reset = () => {
    setSucur({
      id: 0,
      type: "",
      location: "",
      name: ""
    })
  }


  useEffect(() => {
    getSucursal()
    console.log(getSucursal)

  }, [])






  return (
    <div >
      <Grid>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: 'fit-content',
                bgcolor: 'background.paper',
                color: 'text.secondary',
                '& svg': {
                  m: 1.5,
                },
                '& hr': {
                  mx: 2.5,
                },
              }}
            >
              <h3>sucursal</h3>
              <Divider orientation="vertical" flexItem />

              <Button sx={{ ml: 130 }} size="medium" variant="contained" onClick={handleClickOpen}>
                Agregar
              </Button>

            </Box>

          </CardContent>
          <Paper sx={{ width: '100%' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow >
                    <StyledTableCell>Nombre</StyledTableCell>
                    <StyledTableCell align="right">Tipo</StyledTableCell>
                    <StyledTableCell align="right">Ubicacion</StyledTableCell>
                    <StyledTableCell align="right">Fecha de Creacion</StyledTableCell>
                    <StyledTableCell align="right">Operaciones</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {branch.map((suc: any) => (

                    <TableRow
                      key={suc.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {suc.name}
                      </TableCell>
                      <TableCell align="right">{suc.type}</TableCell>
                      <TableCell align="right">{suc.location}</TableCell>
                      <TableCell align="right">{suc.createdAt}</TableCell>
                      <TableCell align="right"><IconButton onClick={() => editar(suc)} color="primary" aria-label="upload picture" component="span">
                        <EditIcon />
                      </IconButton>
                        <IconButton onClick={() => delitSucursal(suc._id)} color="primary" aria-label="upload picture" component="span">
                          <ListAltIcon />
                        </IconButton></TableCell>
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

        </Card>



        <Addmodal
          open={Addopen}
          onClose={handleClose}
          edit={sucur}
        />

      </Grid>
    </div>
  )
}

export default Sucursales



