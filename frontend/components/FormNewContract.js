import { Button, Checkbox, Form, Input,DatePicker, message, notification } from 'antd'
import axios from 'axios';
import moment from 'moment';
import React from 'react'

export default function FormNewContract({GetData,auth}) {
    const onFinish = (values) => {
        // extract undifiend value
      message.loading({ content: 'Loading...', key:'create' });
        values.birthDate = values.birthDate?moment(values.birthDate).format('YYYY-MM-DD'):undefined;
        values.contractStartDate=   values.contractStartDate?moment(values.contractStartDate).format('YYYY-MM-DD'):undefined;
        values.contractEndDate= values.contractEndDate?moment(values.contractEndDate).format('YYYY-MM-DD'):undefined;

        let data = Object.keys(values).reduce((acc, key) => {
            if (values[key] !== undefined) {
                acc[key] = values[key];
            }
            return acc;
        }
            ,{} );
            axios .post("http://localhost:8000/contract/crud/", data,auth) .then((res) => { 
                message.success({ content: 'Contract Created Successfully', key:'create', duration: 2 });
                GetData();
            }) .catch((err) => { 

              notification.error({
                message: 'Error',
                description: JSON.stringify(err.response.data),
              });
            
             });
    

      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
  return (
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"

  >
    <div className='grid grid-cols-2 gap2'>
    <Form.Item
      label="name"
      name="name"
      rules={[{ required: true, message: 'Please input your name!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="mobile"
      name="mobile"
      rules={[{ required: true, message: 'Please input your name!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="country"
      name="country"
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="city"
      name="city"
    >
      <Input />
    </Form.Item>
    <Form.Item label="birthDate" name='birthDate'>
          <DatePicker 
          />
        </Form.Item>
    <Form.Item label="contractStartDate" name='contractStartDate'>
          <DatePicker />
        </Form.Item>
    <Form.Item label="contractEndDate" name='contractEndDate'>
          <DatePicker />
        </Form.Item>

    <Form.Item name="status" valuePropName="checked"
     wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>status</Checkbox>
    </Form.Item>

    
    </div>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}
    className='flex justify-center'
    >
      <Button  htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  )
}
