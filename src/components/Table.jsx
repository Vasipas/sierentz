import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ data }) {
  let [fields, setFields] = useState({});

  useEffect(() => {
    function checkTableData() {
      const cells = JSON.parse(localStorage.getItem("cells"));
      if (cells) {
        setFields({ ...cells });
      }
    }
    window.addEventListener("storage", checkTableData);
    return () => {
      window.removeEventListener("storage", checkTableData);
    };
  }, []);

  console.log(fields)

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

  function fieldsList() {
    let result = {};
    for (let region in data) {
      let years = data[region].G;
      for (let year in years) {
        for (let attribute in years[year]) {
          if (!result[attribute]) result = { ...result, [attribute]: {} };
        }
      }
    }
    return result;
  }

  function renderRegions() {
    let result = {};
    let years = {};
    let list = yearsList();
    let fields = fieldsList();
    for (let i = 0; i < list.length; i++) {
      years = { ...years, [list[i]]: { ...fields } };
    }
    for (let region in data) {
      let yearsData = data[region].G;
      if (!result) result = { [region]: { ...years } };
      else
        result = JSON.parse(
          JSON.stringify({ ...result, [region]: { ...years } })
        );
      for (let year in yearsData) {
        for (let attribute in yearsData[year]) {
          let value = yearsData[year][attribute];
          result[region][year][attribute] = value;
        }
      }
    }
    return result;
  }

  function renderRows() {
    const rows = renderRegions();
    let result = [];
    for (let row in rows) {
      let array = [row];
      for (let items in rows[row]) {
        for (let item in rows[row][items]) {
          array.push(JSON.parse(JSON.stringify(rows[row][items][item])));
        }
      }
      result.push(array);
    }
    let tableBody = [];
    for (let i = 0; i < result.length; i++) {
      let row = (
        <TableRow
          key={result[i][0]}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          {result[i].map((item, index) => {
            if (index === 0) {
              return (
                <TableCell
                  key={result[i][0] + index}
                  component="th"
                  scope="row"
                >
                  {item}
                </TableCell>
              );
            } else {
              let identifier = result[i][0] + index;
              let value;
              let storage = JSON.parse(localStorage.getItem("cells"));
              if (storage && storage[identifier]) {
                let lastIndex = storage[identifier].length;
                value = `${storage[identifier][lastIndex - 1].value} ${
                  storage[identifier][lastIndex - 1].date
                }`;
              } else {
                value = `${item.value ? item.value : ""} ${
                  item.dateRelease === undefined ? "" : item.dateRelease
                }`;
              }
              return (
                <TableCell id={identifier} key={identifier} align="center">
                  {value}
                </TableCell>
              );
            }
          })}
        </TableRow>
      );
      tableBody.push(row);
    }
    return tableBody;
  }

  function renderHeaderFields() {
    let fields = fieldsList();
    return Object.keys(fields).map((field, index) => {
      return (
        <TableCell key={index} align="center">
          {field}
        </TableCell>
      );
    });
  }

  const onClickHandler = (e) => {
    if (e.target.id && e.target.innerText) {
      window.open(`/popup/${e.target.id}`, "Popup", "toolbar=no, menubar=no");
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" rowSpan={2}>
                Region
              </TableCell>
              {yearsList().map((year, index) => (
                <TableCell
                  key={index}
                  align="center"
                  colSpan={Object.keys(fieldsList()).length}
                >
                  {year}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {yearsList().map((year) => renderHeaderFields())}
            </TableRow>
          </TableHead>
          <TableBody onClick={onClickHandler}>{renderRows()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
