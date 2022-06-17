import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function createData(value, date, user, comment) {
  return { value, date, user, comment };
}

const date = () => {
  return new Date().toLocaleDateString();
}

export default function BasicTable(props) {
  const [data, setData] = React.useState([
    [1, "10.11.2020", "Jack", "lorem ipsum"],
    [2, "11.01.2000", "Andrew", "lorem ipsum"],
    [3, "23.12.2010", "Magda", "lorem ipsum"],
    [4, "22.07.2018", "Kate", "lorem ipsum"],
  ]);

  const userList = () => {
    let result = []
    let arr = data.map(row => row[2])
    for(let i = 0; i < arr.length; i++) {
        if(!result.includes(arr[i])) result.push(arr[i])
    }
    return result
  }

  const [formData, setFormData] = useState({
    value: 0,
    date: date(),
    user: userList()[0],
    comment: "",
  });

  const addNewRow = () => {
    if(props.addRow && formData.user && formData.comment) {
        setData([...data, [formData.value, formData.date, formData.user, formData.comment]])
        setFormData({...formData, value: 0, comment: ""})
    }
    props.setNewRow(false)

  }

  const onChangeHandler = e => {
    let id = e.target.id
    let value = e.target.value
    if(id === 'value') {
        setFormData({...formData, value})
    }
    if(id === 'comment') {
        setFormData({...formData, comment: value})
    }
  };

  const onChangeSelectHandler = e => {
    e.stopPropagation()
    setFormData({...formData, user: e.target.value})
  }

  const rows = data.map((row) => createData(...row))

  useEffect(()=>{
    addNewRow()
  })

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Value</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">User</TableCell>
            <TableCell align="center">Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.date}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.value}
              </TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">{row.user}</TableCell>
              <TableCell align="center">{row.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter onChange={onChangeHandler}>
          <TableRow>
            <TableCell align="center">
              <TextField
                value={formData.value}
                id="value"
                type="number"
                label="Value"
                variant="standard"
                InputLabelProps={{ shrink: true }}
              />
            </TableCell>
            <TableCell align="center">
              <TextField
                value={formData.date}
                id="date"
                label="Date"
                variant="standard"
                InputLabelProps={{ shrink: true }}
              />
            </TableCell>
            <TableCell>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="standard-label">User</InputLabel>
        <Select
          labelId="standard-label"
          id="user"
          value={formData.user}
          onChange={onChangeSelectHandler}
          label="User"
        >
            {(userList().map(item => <MenuItem key={item} value={item}>{item}</MenuItem>))}
        </Select>
      </FormControl>
            </TableCell>
            <TableCell align="center">
              <TextField
                value={formData.comment}
                id="comment"
                label="Comment"
                type="text"
                variant="standard"
                InputLabelProps={{ shrink: true }}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
