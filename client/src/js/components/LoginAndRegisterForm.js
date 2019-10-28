import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class NormalLoginForm extends React.Component {
  getItemsValue(){   
    const values= this.props.form.getFieldsValue();      
    return values;
  }
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form className="login-form" autoComplete='off'>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalForm