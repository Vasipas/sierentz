import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Popup from './Popup'

export default function BasicTable({ data }) {
  function createData(
    region,
    xx2017,
    yy2017,
    zz2017,
    xx2018,
    yy2018,
    zz2018,
    xx2019,
    yy2019,
    zz2019
  ) {
    return {
      region,
      xx2017,
      yy2017,
      zz2017,
      xx2018,
      yy2018,
      zz2018,
      xx2019,
      yy2019,
      zz2019,
    };
  }

  function yearsList() {
    let result = [];
    for (let region in data) {
      let years = data[region].G;
      for (let year in years) {
        if (!result.includes(year)) result.push(year);
      }
    }
    return result.sort((a, b) => a - b);
  }

  function renderRegions() {
    let result = []
    let yearsCount = yearsList().length
    for (let region in data) {
      let years = data[region].G
      let row = new Array(yearsCount * 3).fill(null)
      for (let year in years) {
        let xxyyzz = []
        for (let attribute in years[year]) {
          let value = years[year][attribute].value
          let release = years[year][attribute].dateRelease
          xxyyzz.push([value, release])
        }
        for (let i = 0; i < yearsCount; i++) {
          if (year == yearsList()[i]) {
            row.splice(i * 3, 3, ...xxyyzz)
          }
        }
      }
      result.push(createData(region, ...row))
    }
    return result
  }

  const rows = renderRegions();

  const onClickHandler = e => {
    if(e.target.dataset.info) {
      window.open()
    }
    
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" rowSpan={2}>
              Region
            </TableCell>
            {yearsList().map((year) => (
              <TableCell align="center" colSpan={3}>
                {year}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {yearsList().map((year) => {
              return (
                <>
                  <TableCell align="center">XX</TableCell>
                  <TableCell align="center">YY</TableCell>
                  <TableCell align="center">ZZ</TableCell>
                </>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody onClick={onClickHandler}>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.region}
              </TableCell>
              <TableCell data-info={row.xx2017} align="center">{!row.xx2017 ? null : (<>{row.xx2017[0]} {row.xx2017[1]}</>)}</TableCell>
              <TableCell data-info={row.yy2017} align="center">{!row.yy2017 ? null : (<>{row.yy2017[0]} {row.yy2017[1]}</>)}</TableCell>
              <TableCell data-info={row.zz2017} align="center">{!row.zz2017 ? null : (<>{row.zz2017[0]} {row.zz2017[1]}</>)}</TableCell>

              <TableCell data-info={row.xx2018} align="center">{!row.xx2018 ? null : (<>{row.xx2018[0]} {row.xx2018[1]}</>)}</TableCell>
              <TableCell data-info={row.yy2018} align="center">{!row.yy2018 ? null : (<>{row.yy2018[0]} {row.yy2018[1]}</>)}</TableCell>
              <TableCell data-info={row.zz2018} align="center">{!row.zz2018 ? null : (<>{row.zz2018[0]} {row.zz2018[1]}</>)}</TableCell>

              <TableCell data-info={row.xx2019} align="center">{!row.xx2019 ? null : (<>{row.xx2019[0]} {row.xx2019[1]}</>)}</TableCell>
              <TableCell data-info={row.yy2019} align="center">{!row.yy2019 ? null : (<>{row.yy2019[0]} {row.yy2019[1]}</>)}</TableCell>
              <TableCell data-info={row.zz2019} align="center">{!row.zz2019 ? null : (<>{row.zz2019[0]} {row.zz2019[1]}</>)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Popup/>
    </>
  );
}
