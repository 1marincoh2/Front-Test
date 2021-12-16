import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { Checkbox, DialogActions, DialogContent, DialogContentText, Divider, FormControlLabel, InputLabel, Select, TextField, FormControl } from '@mui/material';
import url from "../../common/api.service";

import { SucursalType } from '../../types/sucursal.type';
import { purple, lime, pink } from '@mui/material/colors';
import MenuItem from '@mui/material/MenuItem';
import { Form, useFormik, Field } from 'formik'

export interface DialogProps {
  openModal: boolean;
  onCloseModal: (value: boolean) => void;
  edit: any;

}

function ModalClasificacion(props: DialogProps) {

  const { onCloseModal, openModal, edit } = props;


  const handleClose = () => {
    onCloseModal(false)
    reset();

  };

  const [clasificacion, setClasificacion] = useState({
    id: 0,
    name: '',
    active: false,
    sucursal:{}

  });

  const [suc, setSuc] = useState<any>([]);
 
  const [checked, setChecked] = React.useState(true);

  const handleChangeChecked = (event: any) => {
    setChecked(event.target.checked);
  };

 

  const saveClassificacion = (data: any) => {
    const datoenviar = {
      name: data.name,
      sucursal:{name:data.sucursal},
      active: data.active
    }
    url.post('classification', datoenviar).then(response => {

    }).catch(error => {
      console.error(error);
    })

    handleClose();

  };

  const getsuc = () => {
    url.get('sucursal').then(response => {
      const data = response.data.data
      setSuc(data)
      console.log("suc", data)
    }).catch(error => {
      console.error(error);
    })



  };

  const updateClasificacion = (data: any) => {
    url.put('Classification/' + data.id, data).then((reponse) => {
      console.log(reponse.data)
      // @ts-ignore
      setClasificacion((...prevState) => {
        // @ts-ignore
        const Prev = [...prevState]
        // @ts-ignore
        const index = Prev.findIndex((editar) => editar.id === data.id)
        if (index > -1) {
          // @ts-ignore
          Prev.splice(index, 1, reponse.data)
        }

        return Prev;
      })

    })
    handleClose()
    reset();



  }

  const formik = useFormik({
    initialValues: clasificacion,
    onSubmit: (values, action) => {
      console.log(values)
      if (values.id === 0) {
        saveClassificacion(values)
        console.log("yo estoy agregando")
      } else {
        updateClasificacion(values)
        console.log("yo me estoy actualizando")

      }

      action.resetForm({
        values: {
          // the type of `values` inferred to be Blog
          id: 0,
          name: "",
          active:false,
          sucursal:{}
        },
        // you can also set the other form states here
      })
    }

  })



  const reset = () => {
    setClasificacion({
      id: 0,
      name: "",
      active:false,
      sucursal:{}
    })
  }



  useEffect(() => {
    getsuc()

    if (openModal && edit.id !== 0) {

      formik.setValues(edit)
      console.log("en el modal", edit)

    }
  }, [openModal, edit])




  return (

    <div>
      <Dialog style={{ borderRadius: "55px" }} fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={openModal}>

        <DialogTitle sx={{ color: "#F8FBFE", background: "#1976D2" }}>{formik.values.id === 0 ? "Agregando Sucursal" : "Editando Sucursal"} </DialogTitle>
        <Divider />
        <DialogContent>

          <form onSubmit={formik.handleSubmit}>

            <TextField
              autoFocus
              id="name"
              label="Clasificacion"
              type="text"
              fullWidth
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.name}

            />

                 {JSON.stringify(formik.values)}
            <TextField
              sx={{ mt: 5 }}
              name="sucursal"
              id="sucursal"
              select
              label="Sucursal"
              value={formik.values.sucursal}
              onChange={formik.handleChange}
              fullWidth
             
            >
              {suc.map((option:any) => (
              
                <MenuItem key={option._id} value={option.name}>
                  
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            
        

            <FormControlLabel sx={{ mt: 5 }} control={<Checkbox    onChange={formik.handleChange} />} label={formik.values.active === true ? "Activo" : "Inactivo"}   name="active"  id="active" value={formik.values.active}    />

          </form>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button disableElevation onClick={handleClose} style={{ background: "#424242" }} size="large" variant="contained" >
            Cancelar
          </Button>

          <Button disableElevation size="large" variant="contained" color="primary" onClick={() => formik.handleSubmit()}>
            {formik.values.id === 0 ? "agregar" : "editar"}
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default ModalClasificacion
