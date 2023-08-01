import "./SignUp.css";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

async function createUser(name, username, password,setUserId) {
  const data = {
    name: name,
    username: username,
    password: password,
  };

  try{
   const response = await axios
    .post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const userId = response.data._id;
    setUserId(userId)
    
   return <Navigate to={{
      pathname:"/user",
      state:{userId:userId}
   }} />
    }
    catch(error) {
      var input = document.getElementById("username");
      var message = document.createElement("div");
      message.className = "invalidMessage";
      message.innerHTML = `<p> Username unavailable</p>`;

      input.insertAdjacentElement("afterend", message);
    }
}

const { RangePicker } = DatePicker;
const { TextArea } = Input;



function SignUp({setUserId}) {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSignup = async () => {
   try{
      const values = await form.validateFields();
        const { fullname, username, password } = values;
        const userId = await createUser(fullname, username, password,setUserId);
            navigate("/user", { state: { userId: userId.props.to.state } });

          }
          catch(error) {
            console.log(error);
          };
      }

  return (
    <div className="signUpForm">
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <Form.Item name="fullname" label="Your Name">
          <Input />
        </Form.Item>
        <Form.Item name="username" label="Username">
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Re-enter Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className="button">
          <Button onClick={handleSignup}>Create your BookTrackr account</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignUp;
