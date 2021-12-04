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



  const [branch, setBranch] = useState<SucursalType>({
    id: 0,
    type: "",
    location: "",
    name: ""

  });
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));





  // you can also set the other form states here
















  return (

    <div>

<Dialog fullScreen={fullScreen} onClose={handleClose} open={open}>
    
    <DialogTitle sx={{ color: "#F8FBFE", background: "#1976D2" }}>
      <Grid container spacing={2}>
        <Grid item xs={8} >
          <Typography variant="h5">   <FastfoodIcon /> Nombre del Producto
          </Typography>
          <Button   style={{color: "#1E1E1E", background: "#FFFFFF" }} size="small" variant="contained"onClick={handleClose}>
        Agregar
      </Button>
      <Button    style={{color: "#1E1E1E", background: "#FFFFFF" }} size="small" variant="contained"onClick={handleClose}>
        Agregar
      </Button>
      <Button    style={{color: "#1E1E1E", background: "#FFFFFF" }} size="small" variant="contained"onClick={handleClose}>
        Agregar
      </Button>
        </Grid>

        <Grid item xs={4}>  <IconButton onClick={handleClose} sx={{ ml: 19, mt: -2, color: "#FFFFFF", }}><CloseIcon /> </IconButton> 
        <IconButton onClick={handleClose} sx={{ ml: 19, mt: 0, color: "#FFFFFF", }}><StarIcon /> </IconButton>
        </Grid>
     
      </Grid>




    </DialogTitle>
    <Divider />
 
    <DialogContent dividers>
      <Box sx={{ width: 550, height: 450 }}>
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

                  select
                  autoFocus
                  id="type"
                  label="Unidad de Medida"
                  type="text"
                  fullWidth
                  variant="outlined"

                />
              </Grid>
              <Grid item xs={8}>
                <TextField

                  select
                  autoFocus
                  id="type"
                  label="Tipos de Clasificacion"
                  type="text"
                  fullWidth
                  variant="outlined"

                />

              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  id="name"
                  label="Nombre Del Producto"
                  type="text"
                  fullWidth
                  variant="outlined"

                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoFocus
            id="name"
            label="Descripcion"
            type="text"
            fullWidth
            variant="outlined"

          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            autoFocus
            id="name"
            label="Codigo de Busqueda"
            type="text"
            fullWidth
            variant="outlined"

          />
        </Grid>
        <Grid item xs={6} >
          <TextField
            autoFocus
            id="name"
            label="Codigo de Barra"
            type="text"
            fullWidth
            variant="outlined"

          />
        </Grid>
        <Grid item xs={3} >
          <TextField
            autoFocus
            id="name"
            label="Precio"
            type="text"
            fullWidth
            variant="outlined"

          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            autoFocus
            id="name"
            label="Precio con Iva"
            type="text"
            fullWidth
            variant="outlined"

          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            autoFocus
            id="name"
            label="Stock"
            type="text"
            fullWidth
            variant="outlined"

          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            autoFocus
            id="name"
            label="Min Stock"
            type="text"
            fullWidth
            variant="outlined"

          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            autoFocus
            id="name"
            label="Max Stock"
            type="text"
            fullWidth
            variant="outlined"

          />
        </Grid>
        <Grid item xs={6}>
          <TextField

            select
            autoFocus
            id="type"
            label="Lista de Precios"
            type="text"
            fullWidth
            variant="outlined"

          />
        </Grid>
        <Grid item xs={6}>
          <TextField

            select
            autoFocus
            id="type"
            label="Serie de Facturacion"
            type="text"
            fullWidth
            variant="outlined"

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
   </Box>
   
    </DialogContent>
  
    <Divider />

    <DialogActions>
      <Button variant="outlined" color="error" onClick={handleClose}>Cancelar</Button>

      <Button color="primary" variant="outlined" onClick={handleClose}>
        Agregar
      </Button>
    </DialogActions>
  
  </Dialog>

    </div>
  );
}

export default RegistroModal
