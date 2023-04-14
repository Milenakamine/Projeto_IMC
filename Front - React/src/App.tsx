import React, { useEffect, useState } from 'react'
import '../src/style/style.css';

// Components utilizados
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import { url } from 'node:inspector';
import { url } from '../src/utils/constants';


export const App = () => {

  const [nome, setNome] = React.useState('');
  const [altura, setAltura] = React.useState('');
  const [peso, setPeso] = React.useState('');
  const [idade, setIdade] = React.useState('');
  const [idEdicao, setIdEdicao] = React.useState('');
  const [listUsuarios, setListUsuarios] = React.useState([]);
  const [botao, setBotao] = React.useState('Registrar');

  useEffect(() => {
    listar()
  }, [])

  const controlador = (event : any) => {
    if(botao == 'Registrar'){
      handleClick(event)
    }else{
      edicao_banco(event)
    }
  }

  const listar = () => {
    fetch(url + 'v1/usuario', {
      method: 'GET'
    }).then(response => response.json())
      .then(date => setListUsuarios(date))
      .catch(error => console.log(error))
  }

  const handleClick = (event: React.SyntheticEvent) => {
    console.log('oi')
    const target = event.target
      fetch(url + 'v1/usuario',{
        method : 'POST',
        body : JSON.stringify({
            Nome : nome,
            Altura : altura,
            Peso : peso,
            Idade : idade
        }),headers : {
            'content-type' : 'application/json'
        }
      }).then(response => {response.json(); 
        listar();
        setNome('');
        setAltura('');
        setPeso('');
        setIdade('');
      })
        

  };

  const exclusao = (event : any) => {
    fetch(url + 'v1/usuario/' + event.target.value, {
      method: 'DELETE'
    }).then(response => {response.json() ; listar()})
      .catch(error => console.log(error))
  }

  const edicao = (event: any ) =>{
    const index = listUsuarios.findIndex(x => x['idUsuario'] == event.target.value);
    console.log(listUsuarios[index])
    setNome(listUsuarios[index]['nome']);
    setAltura(listUsuarios[index]['altura']);
    setPeso(listUsuarios[index]['peso']);
    setIdade(listUsuarios[index]['idade']);  
    setIdEdicao(event.target.value);  
    setBotao('Editar')
  }


  const edicao_banco = (event: any) => {
      fetch(url + 'v1/usuario/' + idEdicao,{
        method : 'PUT',
        body : JSON.stringify({
            Nome : nome,
            Altura : altura,
            Peso : peso,
            Idade : idade
        }),headers : {
            'content-type' : 'application/json'
        }
      }).then(response => {response.json(); 
        listar();
        setNome('');
        setAltura('');
        setPeso('');
        setIdade('');
        setBotao('Registrar')
      })
        

  };


  return (
    <div className="App" id='component'>

      <div id='menu'>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton>
              </IconButton>

              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Saúde
              </Typography>
              <Button color="inherit">IMC</Button>
              <Button color="inherit">Cálculo IMC</Button>
            </Toolbar>
          </AppBar>
        </Box>

      </div>

      <div id='information' style={{ display: 'flex' }}>
        <div id='img_information'>
          <img src="https://cdn-icons-png.flaticon.com/512/83/83698.png" alt="" />
        </div>
        <div id='text_information'>
          <h1>Índice de Massa Corpórea</h1>
          <h3>O Índice de Massa Corporal (IMC) é, na verdade, uma referência. Ao fazer o cálculo, é possível identificar se o seu peso está acima ou abaixo do indicado.O Índice de Massa Corporal (IMC) é, na verdade, uma referência. Ao fazer o cálculo, é possível identificar se o seu peso está acima ou abaixo do indicado.</h3>
        </div>
      </div>

      <div id='formulario_component'>

        <h4>Calcule agora seu IMC</h4>

        <div id='formulario'>
          <Box component="form" sx={{ '& > :not(style)': { m: 1 }, }} noValidate autoComplete="off">
            <TextField value={nome} onChange={event => setNome(event.target.value)} type='text' sx={{ '& > :not(style)': { width: '40ch' }, }} id="name" label="Nome Completo" variant="outlined" required />
            <TextField value={idade} onChange={event => setIdade(event.target.value)} type='number' id="idade" label="Idade" variant="outlined" required />
            <TextField value={peso} onChange={event => setPeso(event.target.value)} id="peso" label="Peso(kg)" variant="outlined" required />
            <TextField value={altura} onChange={event => setAltura(event.target.value)} id="altura" label="Altura(m)" variant="outlined" required />
          </Box>

          <Stack direction="row" spacing={2}>
            {/* <Button id='botaocalcular' onClick={e => edicao_banco(e)} variant="contained" >Registrar</Button> */}
            <Button id='botaocalcular' onClick={e => controlador(e)} variant="contained" >{botao}</Button>
            {/* <Button id='botaocalcular' onClick={e => handleClick(e)}  variant="contained" >Registrar</Button> */}
          </Stack>
        </div>
      </div>

      <div id='tabela_container'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Nome Completo</TableCell>
                <TableCell align="right">Idade</TableCell>
                <TableCell align="right">Peso</TableCell>
                <TableCell align="right">Altura</TableCell>
                <TableCell align="right">IMC</TableCell>
                <TableCell align="right">Cálculo</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

                { listUsuarios.map((usuario, index) => {
                    return ( 
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{usuario['nome']}</TableCell>
                        <TableCell align="right" component="th" scope="row">{usuario['idade']}</TableCell>
                        <TableCell align="right" component="th" scope="row">{usuario['peso']}</TableCell>
                        <TableCell align="right" component="th" scope="row">{usuario['altura']}</TableCell>
                        <TableCell align="right" component="th" scope="row">{parseFloat((usuario['peso']/(usuario['altura'] * usuario['altura'])).toFixed(2))}</TableCell>
                        <TableCell align="right" component="th" scope="row"> {usuario['peso']} / {usuario['altura']} * {usuario['altura']}  </TableCell>
                        <TableCell align="right">
                          <Button onClick={e => exclusao(e)} value={usuario['idUsuario']}  color="inherit">Excluir</Button>
                          <Button onClick={e => edicao(e)} value={usuario['idUsuario']}  color="inherit">Editar</Button>
                        </TableCell>
                      </TableRow>

                    )
                  })
                }
             

            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div id='footer'>
        <div id='container' style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="https://www.zarla.com/images/zarla-centro-vital-1x1-2400x2400-20210608-pg98m6ty6pf3ypjvm7j3.png?crop=1:1,smart&width=250&dpr=2" alt="" />
        </div>
        <p style={{ textAlign: 'center' }}>© 2023 Milena Akamine • Todos os direitos reservados • (11) 9999-9999 Política de Privacidade</p>
      </div>


    </div>
  );
}


