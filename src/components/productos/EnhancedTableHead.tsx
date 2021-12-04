import React, { useState, useEffect } from "react";
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { TableCell, TableHead, TableRow, TableBody, IconButton, Table,  TextField, TablePagination, InputAdornment, OutlinedInput, InputLabel, Chip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "#1976D2",
    color: theme.palette.common.white,
  },

}));


interface Data {
    description: string;
    stock: number;
    precio: number;
    name: string;
    precioSinIva: number;
  }

  type Order = 'asc' | 'desc';

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }
  

  interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
  }
  
  const headCells: readonly HeadCell[] = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Nombre',
    },
    {
      id: 'description',
      numeric: true,
      disablePadding: false,
      label: 'Descripcion',
    },
    {
      id: 'stock',
      numeric: true,
      disablePadding: false,
      label: 'Stock',
    },
    {
      id: 'precio',
      numeric: true,
      disablePadding: false,
      label: 'Precio',
    },
    {
      id: 'precioSinIva',
      numeric: true,
      disablePadding: false,
      label: 'Precio Sin Iva',
    },
  ];

 const EnhancedTableHead = (props: EnhancedTableProps)=> {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            < StyledTableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </ StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  export default EnhancedTableHead