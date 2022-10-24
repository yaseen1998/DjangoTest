import { Button, Checkbox, Form, Input,DatePicker, message, notification } from 'antd'
import axios from 'axios';
import moment from 'moment';
import React, { useEffect } from 'react'

export default function FormEditContract({GetData,detail,auth}) {
  const [form] = Form.useForm();
    const onFinish = (values) => {
            // extract undifiend value
            message.loading({ content: 'Loading...', key:'update' });
            values.birthDate = values.birthDate?moment(values.birthDate).format('YYYY-MM-DD'):undefined;
            values.contractStartDate=   values.contractStartDate?moment(values.contractStartDate).format('YYYY-MM-DD'):undefined;
            values.contractEndDate= values.contractEndDate?moment(values.contractEndDate).format('YYYY-MM-DD'):undefined;
    
            let data = Object.keys(values).reduce((acc, key) => {
                if (values[key] !== undefined || values[key] !== null) {
                    acc[key] = values[key];
                }
                return acc;
            }
                ,{} );
                axios .put(`http://localhost:8000/contract/crud/${detail.id}/`, data,auth) .then((res) => { 
                    message.success({ content: 'Contract Updated Successfully', key:'update', duration: 2 });
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
    form = {form}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"

  >
    <div className='grid grid-cols-2 gap2'>
    <Form.Item
    initialValue={detail.name}
      label="name"
      name="name"
      rules={[{ required: true, message: 'Please input your name!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
    initialValue={detail.mobile}
      label="mobile"
      name="mobile"
      rules={[{ required: true, message: 'Please input your name!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
    initialValue={detail.email}
      label="email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
    initialValue={detail.country}
      label="country"
      name="country"
    >
      <Input />
    </Form.Item>
    <Form.Item
    initialValue={detail.city}
      label="city"
      name="city"
    >
      <Input />
    </Form.Item>
    <Form.Item 
    initialValue={detail.birthDate&&moment(detail.birthDate)}
    label="birthDate" name='birthDate'>
          <DatePicker 
          />
        </Form.Item>
    <Form.Item 
    initialValue = {detail.contractStartDate&&moment(detail.contractStartDate)}
    label="contractStartDate" name='contractStartDate'>
          <DatePicker />
        </Form.Item>
    <Form.Item
    initialValue={detail.contractEndDate&&moment(detail.contractEndDate)}
    label="contractEndDate" name='contractEndDate'>
          <DatePicker />
        </Form.Item>

    <Form.Item 
    initialValue={detail.status}
    name="status" valuePropName="checked"
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
