import React, { Component} from 'react';
import {Form,Input,Button,Select,Radio,Upload,Icon,message} from 'antd';
import {addBlog,updateBlog} from '../action/BlogAction';
const FormItem = Form.Item;
const {TextArea} = Input;

const WriteBlogForm = Form.create()(
  (props) => {
    const initData = props.article;
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
    const reviseData = () => {
      form.validateFields((err,values) => {
        if (err) {
          return;
        }
        const tag = updateBlog(values);
        console.log(tag);
        alert('修改成功');
      });
    };
    const saveFormData = () => {
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        const tag = addBlog(values);
        console.log(tag);
        window.location.href = '/#/myBlog';
      });
    };
    const handleChange = value => {
      console.log(`selected ${value}`);
    };
    const statement = getFieldDecorator('statement', {
      initialValue: props.article.statement?props.article.statement:"原创",
    })(
      <Select style={{ width: 100 }}>
        <Select.Option value="#原创">#原创</Select.Option>
        <Select.Option value="#转载">#转载</Select.Option>
      </Select>,
    );

    return ( 
      <div>
        <Form {...formItemLayout}>
          {
            initData?
              <FormItem label = "articleId" style={{display:'none'}}> 
                {
                  getFieldDecorator('id',{
                    initialValue:initData._id
                  })( 
                    <Input />
                  )
                } 
              </FormItem>:
              null
          }
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
                initialValue:initData.title,
                rules: [{
                  required: true,  
                  message: 'Please input your Title'
                }],
              })( 
                <Input
                  addonBefore={statement}
                  placeholder = "标题" 
                />
              )
            } 
          </FormItem>
          <FormItem label='类型'>
            {
              getFieldDecorator('type',{
                initialValue:initData.type?initData.type:"前端",
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
                initialValue:initData.tag,
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
                initialValue:initData.description,
                rules: [{
                  required: true,  
                  message: 'Please input your Description'
                }],
              })( 
                <TextArea 
                  rows = {2}
                  placeholder = "描述" 
                />
              )
            } 
          </FormItem>
          <FormItem label = "正文" >
            {
              getFieldDecorator('content',{
                initialValue:initData.content,
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
            {
              props.tag!="write"?
                <Button 
                  type = "primary"
                  onClick = {
                    reviseData
                }>修改</Button>:
                <Button 
                  type = "primary"
                  onClick = {
                    saveFormData
                }> 发布 </Button>
            }
          </FormItem>
        </Form> 
      </div>
    )
  }
)

export default WriteBlogForm;