import Table from "./components/Table";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Popup from './components/Popup';
import {useState} from 'react'

let testData = {
  Kyivska: {
    G: {
      2017: {
        XX: {
          value: 150000,
          dateRelease: "2017-12-31",
        },
        YY: {
          value: 100000,
          dateRelease: "2017-12-31",
        },
        ZZ: {
          value: 77,
          dateRelease: "2017-12-31",
        },
      },
      2018: {
        XX: {
          value: 160000,
          dateRelease: "2018-12-31",
        },
        YY: {
          value: 110000,
          dateRelease: "2018-12-31",
        },
        ZZ: {
          value: 72,
          dateRelease: "2018-12-31",
        },
      },
      2019: {
        XX: {
          value: 130000,
          dateRelease: "2019-12-31",
        },
        YY: {
          value: 85000,
          dateRelease: "2019-12-31",
        },
        ZZ: {
          value: 72,
          dateRelease: "2019-12-31",
        },
      },
    },
  },
  Odeska: {
    G: {
      2017: {
        XX: {
          value: 10000,
          dateRelease: "2017-12-31",
        },
        YY: {
          value: 5000,
          dateRelease: "2017-12-31",
        },
        ZZ: {
          value: 45,
          dateRelease: "2017-12-31",
        },
      },
      2019: {
        XX: {
          value: 15000,
          dateRelease: "2019-12-01",
        },
        YY: {
          value: 0,
          dateRelease: "2022-02-18",
        },
        ZZ: {
          value: 0,
          dateRelease: "2022-02-18",
        },
      },
    },
  },
  Lvivska: {
    G: {
      2017: {
        XX: {
          value: 640000,
          dateRelease: "2017-12-31",
        },
        YY: {
          value: 510000,
          dateRelease: "2017-08-01",
        },
        ZZ: {
          value: 67,
          dateRelease: "2017-08-01",
        },
      },
      2018: {
        XX: {
          value: 740000,
          dateRelease: "2018-12-31",
        },
        YY: {
          value: 530000,
          dateRelease: "2018-08-01",
        },
        ZZ: {
          value: 61,
          dateRelease: "2018-08-01",
        },
      },
    },
  },
};

let data = [
  {value: 1, date: "10.11.2020", user: "Jack", comment: "lorem ipsum"},
  {value: 2, date: "10.12.2020", user: "Nika", comment: "lorem ipsum dolor"},
  {value: 3, date: "10.01.2020", user: "Elsa", comment: "lorem ipsum sit"},
  {value: 4, date: "10.09.2020", user: "John", comment: "lorem ipsum fina"},
  {value: 5, date: "10.07.2020", user: "Richard", comment: "lorem ipsum erre"},
]

function App() {
  let [cells, setCells] = useState({})

  // const addRow = (cellId, cellValue) => {
  //   let cell = cells[cellId]
  //   if(cell) {
  //     localStorage.setItem('cells', JSON.stringify({...cells, [cellId]: [...cell, cellValue]}))
  //   setCells({...cells, [cellId]: [...cell, cellValue]})
  //   } else {
  //     localStorage.setItem('cells', JSON.stringify({...cells, [cellId]: [...data, cellValue]}))
  //     setCells({...cells, [cellId]: [...data, cellValue]})
  //   }
  // }

  // const showRows = (cellId) => {
  //   return cells[cellId]
  // }


  const addRow = (cellId, cellValue) => {
    let items = JSON.parse(localStorage.getItem('cells'))
    if(items === null) items = cells
    if(items[cellId]) {
      localStorage.setItem('cells', JSON.stringify({...items, [cellId]: [...items[cellId], cellValue]}))
    setCells({...items, [cellId]: [...items[cellId], cellValue]})
    } else {
      localStorage.setItem('cells', JSON.stringify({...items, [cellId]: [...data, cellValue]}))
      setCells({...items, [cellId]: [...data, cellValue]})
    }
  }

  const showRows = (cellId) => {
    let items = JSON.parse(localStorage.getItem('cells'))
    if(items === null) return cells[cellId]
    else return items[cellId]
  }
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Table data={testData}/>}/>
      <Route path='/popup/:id' element={<Popup addRow={addRow} showRows={showRows}/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
export {data}
