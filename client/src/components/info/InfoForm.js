import React from 'react';
import {Form,Input,Tooltip,Icon,Cascader,Select,Row,Col,Checkbox,Button,AutoComplete} from 'antd';
import { updateUser } from '../../action/UserAction';
const FormItem = Form.Item;
const {TextArea} = Input;

const InfoForm = Form.create()(
  (props) => {
    const {form} = props;
    const {getFieldDecorator} = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 2 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18},
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };
    const saveFormData = () => {
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        var tag = updateUser(values);
        if(tag){
          alert('修改成功');
        }else{
          alert('出错了!')
        }
      });
    }

    return(
      <div>
        <Form {...formItemLayout} autoComplete='off'>
        <FormItem label = "userId" style={{display:'none'}}> 
            {
              getFieldDecorator('id', {
                initialValue:props.userInfo._id
              })( 
                <Input readOnly />
              )
            } 
          </FormItem>
          <FormItem label = "Username" > 
            {
              getFieldDecorator('name', {
                initialValue:props.userInfo.name
              })( 
                <Input readOnly />
              )
            } 
          </FormItem>
          <FormItem label="Age">
            {getFieldDecorator('age', {
              initialValue:props.userInfo.age,
              rules: [
                {
                  pattern: new RegExp(/^[1-9]\d*$/, "g"),
                  message: 'The input is not valid Number!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(
              <Input style={{ width: 100 }}/>
            )}
          </FormItem>
          <FormItem label = "Sex" > 
            {
              getFieldDecorator('sex', {
                initialValue:props.userInfo.sex,
                rules:[{
                  required: true,
                  message: 'Please input your Sex!',
                }],
              })( 
                <Select  style={{ width: 100 }}>
                  <Select.Option value="男">男</Select.Option>
                  <Select.Option value="女">女</Select.Option>
                  <Select.Option value="保密">保密</Select.Option>
                </Select>
              )
            } 
          </FormItem>
          <FormItem label = "Description" > 
            {
              getFieldDecorator('description', {
                initialValue:props.userInfo.description,
                rules: [{
                  required: true,  
                  message: 'Please input your Description'
                }],
              })( 
                <TextArea />
              )} 
          </FormItem>
          <FormItem label="E-mail">
            {getFieldDecorator('email', {
              initialValue:props.userInfo.email,
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Phone">
            {getFieldDecorator('tel', {
              initialValue:props.userInfo.tel,
              rules: [
                {
                  pattern: new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/),
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your Phone!',
                },
              ],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem  {...tailFormItemLayout}>
              <Button 
                type = "primary"
                onClick = {
                  saveFormData
              }> 修改 </Button>
            </FormItem>
        </Form>
      </div>
    )
  }
)

export default InfoForm;