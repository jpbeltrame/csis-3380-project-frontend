import "./SignUp.css";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
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
  message
} from "antd";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

async function createUser(name, username, password) {
  const data = {
    name: name,
    username: username,
    password: password,
  };
  console.log(data);
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
        // Check if the response indicates a successful registration
        if (response.status === 200) {
          return true; // Registration successful
        } else {
          return false; // Registration failed
        }
  } 
  catch(error) {
    console.log(error);
    return false; // Registration failed
    // var input = document.getElementById("username");
    // var message = document.createElement("div");
    // message.className = "invalidMessage";
    // message.innerHTML = `<p> Username unavailable</p>`;

    // input.insertAdjacentElement("afterend", message);
    }
}

const { RangePicker } = DatePicker;
const { TextArea } = Input;

function SignUp() {
  // const navigate = useNavigate();
  const [form] = Form.useForm();
  // const { setUserId } = useUserContext(); // Access the setUserId function from the context

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSignup = async () => {
   try{
      const values = await form.validateFields();
        const { fullname, username, password } = values;
        const isSuccess = await createUser(fullname, username, password);

        if (isSuccess) {
          message.success("Registration successful! You can now log in.");
          // Clear the form fields
          form.resetFields();
          // Set the registrationSuccess state to true to show the success card
          setRegistrationSuccess(true);
        }
        // navigate("/user", { state: { userId: userId.props.to.state } });
        // navigate("/"); // Navigate to "/" route directly after successful signup
      }
      catch(error) {
        console.log(error);
      };
    }

  return (
    <div className="signUpForm">
      {registrationSuccess ? (
        // Show the success card wrapped inside the container for centering
        <div className="registrationSuccessContainer">
          <Card className="registrationSuccessCard" title="Registration Successful">
            <p>You can now log in.</p>
          </Card>
        </div>
      ) : (
        // Show the registration form if registrationSuccess state is false
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
                  return Promise.reject(new Error("The new password that you entered do not match!"));
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
      )}
    </div>
  );
}

export default SignUp;
