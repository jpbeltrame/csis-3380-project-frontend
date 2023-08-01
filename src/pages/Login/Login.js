import "./Login.css";
import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import axios from "axios";
import jwt_decode from "jwt-decode";


function validateLogin(username,password,setUsername,setUserId){
  const data = {
   username: username,
   password: password
  };

  axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/signin/`,JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    var token = response.data.jwtToken;
    var decoded = jwt_decode(token);
    var userId = decoded.id;
   
    var login = document.getElementById('loginDiv');
    login.style.visibility="hidden";
    setUserId(userId);
    setUsername(decoded.name);
    console.log(decoded.name);

  })
  .catch((error) => {
    const span = document.getElementById('signUp');
    span.innerText=`User or Password invalid`
    span.style.cssText='color: #00BAD3; padding:0 20%';
    const message = document.getElementById('horizontal_login');
    message.insertAdjacentElement( 'afterend',span);
  });
};

function Login({setUsername, setUserId}) {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  return (
    <div id="loginDiv" >
      <div className="loginForm">
    <Form form={form} name="horizontal_login" layout="inline" >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
          onClick={()=>{
            const user = form.getFieldValue('username');
            const pass = form.getFieldValue('password')
            validateLogin(user,pass,setUsername,setUserId)

          }
            }
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Log in
          </Button>
       
        )}
      </Form.Item>
      <p id="signUp" className="signUp">
            New to BookTrackr?
            <a href="/signup"> Sign up </a>
            </p>
    </Form>
    
          </div>
    </div>
  );
};


export default Login;