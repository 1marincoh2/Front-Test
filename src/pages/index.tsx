import * as React from 'react';
import type { NextPage } from 'next'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from '../styles/Home.module.css'
import Stack from '@mui/material/Stack';

const Home: NextPage = () => {
  return (
    
    <div className={styles.container}>
    <p>hola mundo desde home</p>
    </div>
  )
}

export default Home
