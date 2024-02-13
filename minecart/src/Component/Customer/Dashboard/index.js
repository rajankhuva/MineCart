import React, { useEffect, useState } from "react";
import Header from "./header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  Divider,
  TableSortLabel,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ProductDetails from "./Details";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const getProducts = async () => {
    setProducts(
      await fetch("https://fakestoreapi.com/products?limit=7").then((res) =>
        res.json()
      )
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  const columns = [
    { field: "title", headerName: "Name", width: 233 },
    { field: "description", headerName: "description", width: 233 },
    { field: "price", headerName: "Price", width: 233 },
    { field: "Commands", headerName: "Commands", width: 233 },
  ];

  const createData = (
    id,
    title,
    description,
    price,
    category,
    isAddedToCart,
    qty
  ) => {
    return {
      id,
      title,
      description,
      price,
      category,
      isAddedToCart,
      qty,
    };
  };

  const convertData = (products) => {
    const data = products.map((singleProduct) => {
      return createData(
        singleProduct.id,
        singleProduct.title,
        singleProduct.description,
        singleProduct.price,
        singleProduct.category,
        false,
        1
      );
    });
    setRows(data);
    return data;
  };

  useEffect(() => {
    if (products && products.length > 0) {
      convertData(products);
    }
  }, [products]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const openDetailsPopUp = (row) => {
    setOpen(true);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleAddToCart = (row) => {
    const tempData = [...rows];
    let findProduct = tempData.find((data) => data.id === row.id);
    if (findProduct) {
      findProduct.isAddedToCart = !findProduct.isAddedToCart;
      findProduct.qty = 1;
    }
    setRows(tempData);
  };

  const handleLess = (row) => {
    const tempData = [...rows];
    let findProduct = tempData.find((data) => data.id === row.id);
    if (findProduct) {
      if (findProduct.qty > 1) {
        findProduct.qty--;
      }
    }
    setRows(tempData);
  };

  const handleAdd = (row) => {
    const tempData = [...rows];
    let findProduct = tempData.find((data) => data.id === row.id);
    if (findProduct) {
      findProduct.qty++;
    }
    setRows(tempData);
  };

  const handleTotal = () => {
    let total = 0;
    rows.map((product) => {
      if (product.isAddedToCart) {
        total += Math.floor(product.price * product.qty);
      }
    });
    return (
      <div style={{ fontSize: "16px", backgroundColor: "black", color:"white" }}>
        <span>Total</span>
        <span style={{ marginLeft: "50px" }}>${total}</span>
      </div>
    );
  };
  return (
    <div className="App">
      <Header />
      {rows.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableBody className="products">
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.category}</TableCell>
                  <TableCell align="left">${row.price}</TableCell>
                  <TableCell>
                    <VisibilityIcon
                      onClick={() => {
                        openDetailsPopUp(row);
                      }}
                    />

                    <Button
                      style={{ marginLeft: "10px" }}
                      variant="contained"
                      onClick={() => {
                        handleAddToCart(row);
                      }}
                    >
                      {row.isAddedToCart ? "Remove from cart" : "Add to cart"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <div className="footer">
        <Typography style={{ fontSize: "16px", backgroundColor: "black", color:"white" }}>
          Cart
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableBody className="cart">
              {rows.map(
                (row, index) =>
                  row.isAddedToCart && (
                    <TableRow key={index}>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">{row.category}</TableCell>
                      <TableCell align="left">${row.price * row.qty}</TableCell>
                      <TableCell className="action">
                        <RemoveIcon
                          onClick={() => {
                            handleLess(row);
                          }}
                        />
                        {row.qty}
                        <AddIcon
                          onClick={() => {
                            handleAdd(row);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div>{handleTotal()}</div>

      {open && (
        <ProductDetails
          open={open}
          handleClose={handleClose}
          data={selectedRow}
        />
      )}
    </div>
  );
};

export default Dashboard;
