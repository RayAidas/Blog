import React, { Component} from 'react';
import {Form,Input,Button,Select,Radio,Upload,Icon,message} from 'antd';
import {addBlog} from '../action/BlogAction';
const FormItem = Form.Item;
const {TextArea} = Input;

const WriteBlogForm = Form.create()(
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
        const tag = addBlog(values);
        console.log(tag);
        window.location.href = '/client';
      });
    }
    const handleChange = value => {
      console.log(`selected ${value}`);
    }

    return ( 
      <div>
        <Form {...formItemLayout}>
          <FormItem label = "作者" style={{display:'none'}}> 
            {
              getFieldDecorator('author',{
                initialValue:localStorage.getItem("name")
              })( 
                <Input />
              )
            } 
          </FormItem>
          <FormItem label = "UserId" style={{display:'none'}}> 
            {
              getFieldDecorator('authorId',{
                initialValue:props.id
              })( 
                <Input />
              )
            } 
          </FormItem>
          <FormItem label = "标题" > 
            {
              getFieldDecorator('title', {
                rules: [{
                  required: true,  
                  message: 'Please input your Title'
                }],
              })( 
                <Input placeholder = "标题" />
              )
            } 
          </FormItem>
          <FormItem label='类型'>
            {
              getFieldDecorator('type',{
                initialValue:'前端',
                rules: [{
                  required: true,  
                  message: 'Please select your Type'
                }],
              })(
                <Select style={{ width: 120 }}  onChange={handleChange}>
                  <Select.Option value="前端">前端</Select.Option>
                  <Select.Option value="后台">后台</Select.Option>
                  <Select.Option value="数据库">数据库</Select.Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem label = "标签" >
            {
              getFieldDecorator('tag', {
                rules: [{
                  required: true,
                  message: 'Please input your Tag'
                }],
              })( 
                <Input placeholder = "多个标签以逗号分隔" />
              )
            }
          </FormItem> 
          <FormItem label = "描述" > 
            {
              getFieldDecorator('description', {
                rules: [{
                  required: true,  
                  message: 'Please input your Description'
                }],
              })( 
                <Input placeholder = "描述" />
              )
            } 
          </FormItem>
          <FormItem label = "正文" >
            {
              getFieldDecorator('content',{
                rules: [{
                  required: true,
                  message: 'Please input your Content'
                }],
              })( 
                <TextArea 
                  rows = {10}
                  placeholder = "正文" 
                />
              )
            } 
          </FormItem> 
          <FormItem  {...tailFormItemLayout}>
            <Button 
              type = "primary"
              onClick = {
                saveFormData
            }> 发布 </Button>
          </FormItem>
        </Form> 
      </div>
    )
  }
)

export default WriteBlogForm;