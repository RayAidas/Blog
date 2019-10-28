import React from 'react';
import {Form,Input,Tooltip,Icon,Cascader,Select,Row,Col,Checkbox,Button,AutoComplete} from 'antd';
import {addComment} from '../action/CommentAction'

const FormItem = Form.Item;
const {TextArea} = Input;

const Comment = Form.create()(
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
    const commentChange = () => {
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        if(!values.commentContent){
          alert('评论不能为空');
        }else{
          addComment(values);
          props.commentChange(props.ArticleId);
          props.form.setFields({"commentContent":""});
        }
      });
    }

    return(
      <div>
        <Form {...formItemLayout} autoComplete='off'>
          <FormItem label = "userId" style={{display:'none'}}> 
              {
                getFieldDecorator('userId', {
                  initialValue:props.userInfo._id
                })( 
                  <Input readOnly />
                )
              } 
            </FormItem>
            <FormItem label = "userName" style={{display:'none'}}> 
              {
                getFieldDecorator('userName', {
                  initialValue:props.userInfo.name
                })( 
                  <Input readOnly />
                )
              } 
            </FormItem>
            <FormItem label = "articleId" style={{display:'none'}}> 
              {
                getFieldDecorator('articleId', {
                  initialValue:props.ArticleId
                })( 
                  <Input readOnly />
                )
              } 
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              {
                getFieldDecorator('commentContent')( 
                  <TextArea
                    rows={8}
                    placeholder='在这里畅所欲言你的看法吧!'
                  />
                )
              } 
            </FormItem>
            <FormItem  {...tailFormItemLayout}>
              <Button 
                type = "primary"
                onClick = {
                  commentChange
              }> 评论 </Button>
            </FormItem>
        </Form>
      </div>
    )
  }
)

export default Comment;