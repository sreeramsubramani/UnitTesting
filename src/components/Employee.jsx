import axios from "axios";
import { useEffect, useState } from "react";
import InputTag from "./InputTag";
const Employee = () => {
  const [customers, setCustomers] = useState([]);
  const [values, setValues] = useState({
    customerId: "",
    customerName: "",
    customerAddress: "",
    mobile: "",
  });
  // console.log(values);
  useEffect(() => {
    // (async () => await Load())();
    // Load();
    console.log("1");
  },[]);

  async function Load() {
    const result = await axios.get("http://localhost:8088/api/v1/customer/get");
    setCustomers(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8088/api/v1/customer/save", {
        customerName: values.customerName,
        customerAddress: values.customerAddress,
        mobile: values.mobile,
      });
      alert("Employee Registation Successful");
      setValues({
        customerId: "",
        customerName: "",
        customerAddress: "",
        mobile: "",
      });
      Load();
      // setValues({ ...values, ["customerId"]: "" });
      // setValues({ ...values, ["customerName"]: "" });
      // setValues({ ...values, ["customerAddress"]: "" });
      // setValues({ ...values, ["mobile"]: "" });
    } catch (error) {
      alert("User Registation Failed" + error);
    }
  }
  async function editEmployee(customer) {
    setValues({
      customerId: customer.customerId,
      customerName: customer.customerName,
      customerAddress: customer.customerAddress,
      mobile: customer.mobile,
    });
    // setValues({ ...values, ["customerId"]: customer.customerId});
    // setValues({ ...values, ["customerName"]: customer.customerName });
    // setValues({ ...values, ["customerAddress"]: customer.customerAddress });
    // setValues({ ...values, ["mobile"]: customer.mobile });
  }
  async function deleteEmployee(customerId) {
    await axios.delete(
      "http://localhost:8088/api/v1/customer/delete/" + customerId
    );
    alert("Employee deleted successfully");
    Load();
  }

  const update = async (event) => {
    event.preventDefault();
    try {
      await axios.put("http://localhost:8088/api/v1/customer/update", {
        customerId: values.customerId,
        customerName: values.customerName,
        customerAddress: values.customerAddress,
        mobile: values.mobile,
      });
      alert("Updated Successful");
      setValues({
        customerId: "",
        customerName: "",
        customerAddress: "",
        mobile: "",
      });
      Load();
    } catch (error) {
      alert("Update Failed" + error);
    }
  }

  const inputs = [
    {
      id: 1,
      tag_id: "customerName",
      type: "text",
      label: "Customer Name",
      name: "customerName",
    },
    {
      id: 2,
      tag_id: "customerAddress",
      type: "text",
      label: "Customer Address",
      name: "customerAddress",
    },
    {
      id: 3,
      tag_id: "mobile",
      type: "number",
      label: "Customer Mobile No",
      name: "mobile",
    },
  ];

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };
  return (
    <div>
      <div className="container mt-4">
        <h1>Customer Details</h1>
        <form>
          <input
            type="number"
            className="form-control"
            id="customerId"
            name="customerId"
            hidden
            value={values.customerId}
            onChange={handleOnChange}
            required
          />
          {inputs.map((input) => (
            <InputTag
              key={input.id}
              {...input}
              value={values[input.name]}
              handleOnChange={handleOnChange}
            />
          ))}
          <input
            type="submit"
            className="btn btn-primary"
            onClick={save}
            value="Register"
          />
          <button className="btn btn-warning" onClick={update}>
            Update
          </button>
        </form>

        <table className="table mt-3">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Customer Address</th>
              <th scope="col">Mobile No</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          {customers.map((customer) => {
            return (
              <tbody>
                <tr>
                  <th scope="row">{customer.customerId}</th>
                  <td>{customer.customerName}</td>
                  <td>{customer.customerAddress}</td>
                  <td>{customer.mobile}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => editEmployee(customer)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteEmployee(customer.customerId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Employee;


// usestate
// useMemo
// usecallBack
// useref
// usecontext