import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { DialogActions, DialogContent, Divider, Grid, TextField, Paper, Box, Card, CardMedia, Typography, DialogContentText } from '@mui/material';
import url from "../../common/api.service";
import { Form, useFormik } from 'formik'
import { SucursalType } from '../../types/sucursal.type';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { TextFields } from "@mui/icons-material";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import productos from "../../pages/productos";



const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export interface DialogProps {
  open: boolean;
  onClose: (value: boolean) => void;

}
const Input = styled('input')({
  display: 'none',
});


function RegistroModal(props: DialogProps) {

  const { onClose, open, } = props;

  //console.log("en el modal", edit)
  const handleClose = () => {
    onClose(false)

  };
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const [productos, setProductos] = useState({
    name: "",
    medidaUnidad: "",
    tipoClasificacion: "",
    descripcion: "",
    codigoBusqueda: "",
    codigoBarra: "",
    precio: 0,
    precioIVA: 0,
    stock: 0,
    minStock: 0,
    maxStock: 0,
    listaPrecios: "",
    facturacion: "",

  });

  const saveProductos = (data: any) => {
    const datoenviar = {
      name: data.name,
      medidaUnidad: data.medidaUnidad,
      tipoClasificacion: data.tipoClasificacion,
      descripcion: data.descripcion,
      codigoBusqueda: data.codigoBusqueda,
      codigoBarra: data.codigoBarra,
      precio: data.precio,
      precioIVA: data.precioIVA,
      stock: data.stock,
      minStock: data.minStock,
      maxStock: data.maxStock,
      listaPrecios: data.listaPrecios,
      facturacion: data.facturacion,
    }
    url.post('productos', datoenviar).then(response => {

    }).catch(error => {
      console.error(error);
    })

    handleClose();

  };






  // you can also set the other form states here




  const formik = useFormik({
    initialValues: productos,
    onSubmit: (values, action) => {
      console.log(values)
      //   if (values.id === 0) {
      saveProductos(values)
      console.log("yo estoy agregando")
      // } else {
      // updateClasificacion(values)
      // console.log("yo me estoy actualizando")

    }

    /* action.resetForm({
       values: {
         // the type of `values` inferred to be Blog
         id: 0,
         name: "",
         active:false,
         sucursal:{}
       },
       // you can also set the other form states here
     })*/
    // }

  })












  return (

    <div>

      <Dialog fullScreen={fullScreen} onClose={handleClose} open={open}>
  
        <DialogTitle sx={{ color: "#F8FBFE", background: "#1976D2" }}>
          <Grid container spacing={2}>
            <Grid item xs={8} >
              <Typography variant="h5">   <FastfoodIcon /> Nombre del Producto
              </Typography>
              <Button style={{ color: "#1E1E1E", background: "#FFFFFF" }} size="small" variant="contained" onClick={handleClose}>
                Datos
              </Button>
              <Button style={{ color: "#1E1E1E", background: "#FFFFFF" }} size="small" variant="contained" onClick={handleClose} sx={{ ml: 1 }}>
                Calculo      </Button>

            </Grid>

            <Grid item xs={4}>  <IconButton onClick={handleClose} sx={{ ml: 19, mt: -2, color: "#FFFFFF", }}><CloseIcon /> </IconButton>
              <IconButton onClick={handleClose} sx={{ ml: 19, mt: 0, color: "#FFFFFF", }}><StarIcon /> </IconButton>
            </Grid>

          </Grid>




        </DialogTitle>
        <Divider />

        <DialogContent dividers>
          <Box sx={{ width: 550, height: 450 }}>
          <form onSubmit={formik.handleSubmit}>
        
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <Grid container spacing={2} >


                  <Grid xs={3}>

                    <Card sx={{ width: 120, height: 100 }}>
                      <label htmlFor="icon-button-file">
                        <Input accept="image/*" id="icon-button-file" type="file" />
                        <IconButton color="primary" aria-label="upload picture" component="span">
                          <PhotoCamera />
                        </IconButton>
                      </label>

                    </Card>

                  </Grid>
               
                  <Grid container xs={9} spacing={2} direction="row" >
                
                    <Grid item xs={4}>
                 


                        <TextField
                         name="medidaUnidad"
                          select
                          autoFocus
                          id="medidaUnidad"
                          label="Unidad de Medida"
                          type="text"
                          fullWidth
                          variant="outlined"
                          onChange={formik.handleChange}
                          value={formik.values.medidaUnidad}

                        />
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        name="tipoClasificacion"
                        select
                        autoFocus
                        id="tipoClasificacion"
                        label="Tipos de Clasificacion"
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.tipoClasificacion}


                      />

                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                      name="name"
                        autoFocus
                        id="name"
                        label="Nombre Del Producto"
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.name}


                      />
                    </Grid>
                  

                  </Grid>
                  
                </Grid>
              
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  name="descripcion"
                  id="descripcion"
                  label="Descripcion"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.descripcion}


                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  name="codigoBusqueda"
                  id="codigoBusqueda"
                  label="Codigo de Busqueda"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.codigoBusqueda}


                />
              </Grid>
              <Grid item xs={6} >
                <TextField
                  autoFocus
                  name="codigoBarra"
                  id="codigoBarra"
                  label="Codigo de Barra"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.codigoBarra}


                />
              </Grid>
              <Grid item xs={3} >
                <TextField
                  autoFocus
                  name="precio"
                  id="precio"
                  label="Precio"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.precio}


                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  autoFocus
                  name="precioIVA"
                  id="precioIVA"
                  label="Precio con Iva"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.precioIVA}


                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  autoFocus
                  name="stock"
                  id="stock"
                  label="Stock"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.stock}

                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  autoFocus
                  name="minStock"
                  id="minStock"
                  label="Min Stock"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.minStock}


                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  autoFocus
                  name="maxStock"
                  id="maxStock"
                  label="Max Stock"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.maxStock}


                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="listaPrecios"
                  select
                  autoFocus
                  id="listaPrecios"
                  label="Lista de Precios"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.listaPrecios}


                />
              </Grid>
              <Grid item xs={6}>
                <TextField

                  select
                  autoFocus
                  name="facturacion"
                  id="facturacion"
                  label="Serie de Facturacion"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.facturacion}


                />
              </Grid>
              <Grid item xs={12}>
                <TextField

                  select
                  autoFocus
                  id="type"
                  label="Agregar este Producto a Otras Sucursales"
                  type="text"
                  fullWidth
                  variant="outlined"

                />

             
            </Grid>
           
          </Grid>
        </form>
        </Box>

      </DialogContent>

      <Divider />

      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleClose}>Cancelar</Button>

        <Button color="primary" variant="outlined" onClick={() => formik.handleSubmit()}>
          Agregar
        </Button>
      </DialogActions>

    </Dialog>

    </div >
  );
}

export default RegistroModal
