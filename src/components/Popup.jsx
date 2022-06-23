import React, {useState, useEffect} from 'react'
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
import Button from '@mui/material/Button'
import { useParams } from 'react-router-dom';
import { data } from '../App';
import styled from '@emotion/styled'

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    margin-left: 15px;
    
`
const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`


const Popup = props => {
    let [rows, setRows] = useState([...data])
    const [form, setForm] = useState({
        value: 0,
        date: new Date().toLocaleDateString(),
        user: rows[0].user,
        comment: "",
      });

    const params = useParams()

    useEffect(() => {
        let data = props.showRows(params.id)
        if(data && JSON.stringify(data) !== JSON.stringify(rows)) setRows(data)
    }, [props, rows, params.id])
    
    function userList() {
        let result = []
        let arr = rows.map(row => row.user)
        for(let i = 0; i < arr.length; i++) {
            if(!result.includes(arr[i])) result.push(arr[i])
        }
        return result
      }

    const onChangeSelect = e => {
        e.stopPropagation()
        setForm({...form, user: e.target.value})
      }

    const changeForm = e => {
        let id = e.target.id
    let value = e.target.value
    if(id === 'value') {
        setForm({...form, value})
    }
    if(id === 'comment') {
        setForm({...form, comment: value})
    }
    }

    const addRow = () => {
        let id = params.id
        if(form.comment) {
            props.addRow(id, {...form})
            setForm({
                value: 0,
                date: new Date().toLocaleDateString(),
                user: rows[0].user,
                comment: "",
              })
        }
    }

    return (
        <Wrapper>
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
              key={row.date+row.comment}
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
        <TableFooter onChange={changeForm}>
          <TableRow>
            <TableCell align="center">
              <TextField
                value={form.value}
                id="value"
                type="number"
                label="Value"
                variant="standard"
                InputLabelProps={{ shrink: true }}
              />
            </TableCell>
            <TableCell align="center">
              <TextField
                value={form.date}
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
          value={form.user}
            onChange={onChangeSelect}
          label="User"
        >
            {(userList().map(item => <MenuItem key={item} value={item}>{item}</MenuItem>))}
        </Select>
      </FormControl>
            </TableCell>
            <TableCell align="center">
              <TextField
                value={form.comment}
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
    <ButtonWrapper>
    <Button onClick={addRow}>Add</Button>
    <Button onClick={()=>{window.close()}}>Close</Button>
    </ButtonWrapper>
    </Wrapper>
    )
}

export default Popup