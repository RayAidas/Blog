import React, { Component} from 'react';
import {Form,Input,Button,Select,Radio,Upload,Icon,message} from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import {addBlog,updateBlog} from '../../action/BlogAction';
import Types from '../../data/tag.json';
const FormItem = Form.Item;
const {TextArea} = Input;
const type = [];
let tags = [];
  
for(let i = 0;i<Types.length;i++){
  type.push(<Select.Option key={Types[i].type}>{Types[i].type}</Select.Option>)
}

for(let l = 0;l<Types[0].tags.length;l++){
  tags.push(<Select.Option key={Types[0].tags[l].tag}>{Types[0].tags[l].tag}</Select.Option>)
}

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
        if (!err) {
          const updateData = {
            id:values.id,
            title: values.title,
            type: values.type,
            tag: values.tag,
            description: values.description,
            content: values.content.toHTML() 
          }

          updateBlog(updateData);
          alert('修改成功');
        }
      });
    };

    const saveFormData = (event) => {
      event.preventDefault()
      form.validateFields((error, values) => {
        if (!error) {
          const submitData = {
            author:values.author,
            authorId:values.authorId,
            title: values.title,
            type: values.type,
            tag: values.tag,
            description: values.description,
            content: values.content.toHTML() 
          }

          addBlog(submitData);
          window.location.href = '/#/myBlog';
        }
      })
    };

    const handleChange = value => {
      for(let j=0;j<Types.length;j++){
        let children = Types[j].tags;
        if(Types[j].type == value){
          tags = [];
          for(let k = 0;k<children.length;k++)
          tags.push(<Select.Option key={children[k].tag}>{children[k].tag}</Select.Option>);
        }
      }
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
        <Form {...formItemLayout} autoComplete='off'>
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
                <Select 
                  style={{ width: 120 }}  
                  onChange={handleChange}
                >
                  {type}
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
               <Select 
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="Please select"
                >
                  {tags}
               </Select> 
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
                initialValue:initData.content?BraftEditor.createEditorState(initData.content):'',
                rules: [{
                  required: true,
                  message: 'Please input your Content',
                }],
              })(<BraftEditor
                  style={{border:'1px solid #d9d9d9',borderRadius:'4px'}}
                  className="my-editor"
                  placeholder="请输入正文内容"
                />)
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