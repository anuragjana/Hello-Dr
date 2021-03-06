import React from "react";  
import {Button,Form,Input} from 'antd'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast"
import {showLoading,hideLoading} from "../redux/alertsSlice";
import { useDispatch, useSelector } from "react-redux";


function Register() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/register", values);
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        toast.success("Redirecting to login page");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="authentication">
        <div className="authentication-form card p-3">
          <h1 className="card-title">Nice to meet You</h1>
            <Form layout="vertical" onFinish={onFinish} >
                <Form.Item label="Name" name="name">
                    <Input placeholder="Name" />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input placeholder="Password" type="password" />
                </Form.Item>

                <div className="d-flex justify-content-between align-items-center">
                  <Button className="primary-button my-2" htmlType="submit">REGISTER</Button>
                  <Link to='/login' className="anchor">CLICK HERE TO LOGIN</Link>
                </div>

            </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
