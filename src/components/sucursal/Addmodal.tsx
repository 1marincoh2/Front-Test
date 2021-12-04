import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { DialogActions, DialogContent, DialogContentText, Divider, TextField } from '@mui/material';
import url from "../../common/api.service";
import { Form, useFormik } from 'formik'
import { SucursalType } from '../../types/sucursal.type';

export interface DialogProps {
  open: boolean;
  onClose: (value: boolean) => void;
  edit:any
}

function Addmodal(props: DialogProps) {

  const { onClose, open, edit } = props;

  

  //console.log("en el modal", edit)
  
  
  const handleClose = () => {
    onClose(false)
   
     };



  const [branch, setBranch] = useState<SucursalType>({
    id:0,
    type: "",
    location: "",
    name: ""

  });



  const saveSucursal = (data: any) => {
    const datoenviar = {
      type: data.type,
      location: data.location,
      name: data.name

    }
    url.post('sucursal', datoenviar).then(response => {
     
    }).catch(error => {
      console.error(error);
    })
    reset();
    handleClose();

  };

  const updateSucursal = (data:any) => {
    url.put('sucursal/' + data.id, data).then((reponse) => {
        console.log(reponse.data)
        // @ts-ignore
        setBranch((...prevState) => {
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
    initialValues: branch,
    onSubmit: (values,action) => {
      console.log(values)
      if (values.id === 0) {
        saveSucursal(values)
          console.log("yo estoy agregando")
      } else {
          updateSucursal(values)
          console.log("yo me estoy actualizando")

      }

      action.resetForm({
          values: {
              // the type of `values` inferred to be Blog
              id:0,
              type: "",
              location: "",
              name: ""
          },
          // you can also set the other form states here
      })
    }

  })

 


  const reset = () => {
    setBranch({
      id:0,
      type: "",
      location: "",
      name: ""
    })
}


useEffect(() => {
  if (open && edit.id !== 0){ 

    formik.setValues(edit)
    console.log("en el modal",edit)
   
  }
}, [open])







  return (

    <div>
      <Dialog fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle>{formik.values.id === 0 ? "Agregando Sucursal" : "Editando Sucursal"}</DialogTitle>
        <Divider />
        <DialogContent>

        <form onSubmit={formik.handleSubmit}>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nombre"
              type="text"
              fullWidth
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.name}
            />

            <TextField
              autoFocus
              margin="dense"
              id="location"
              label="Ubicacion"
              type="text"
              fullWidth
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.location}
            />

            <TextField
              autoFocus
              margin="dense"
              id="type"
              label="Tipo"
              type="text"
              fullWidth
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.type}
            />
          </form>

        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>

          <Button variant="contained" color="primary" onClick={() => formik.handleSubmit()}>
          {formik.values.id === 0 ? "agregar" : "editar"}
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default Addmodal
