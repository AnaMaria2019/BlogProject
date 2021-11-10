import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';


const WritersTable = (props) => {
  const { rows } = props;
  
  return (
    <React.Fragment>
      <Container maxWidth="md" component="main">
        <h1>Writers Summary - Dashboard</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="writers-summary">
            <TableHead>
              <TableRow>
                <TableCell>Writer</TableCell>
                <TableCell align="right">Total Articles Written</TableCell>
                <TableCell align="right">Total Articles Last 30</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.totalArticles}</TableCell>
                  <TableCell align="right">{row.totalArticlesLast30}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </React.Fragment>
  );
}

export default WritersTable;
