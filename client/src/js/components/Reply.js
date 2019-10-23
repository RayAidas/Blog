import React from 'react';
import {Form,Input,Tooltip,Icon,Cascader,Select,Row,Col,Checkbox,Button,AutoComplete} from 'antd';
import {addReply} from '../action/ReplyAction'

const FormItem = Form.Item;
const {TextArea} = Input;

const Reply = Form.create()(
  (props) => {
    const {form} = props;
    const {getFieldDecorator} = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 0 },
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
    const replyChange = () => {
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        if(!values.toUserContent){
          alert('评论不能为空');
        }else{
          addReply(values);
          props.replyChange(props.ArticleId);
          props.form.setFields({"toUserContent":""});
        }
      });
    }

    return(
      <div className='reply' style={{marginLeft:'15px'}}>
        <Form {...formItemLayout}>
        <FormItem label = "articleId" style={{display:'none'}}> 
              {
                getFieldDecorator('articleId', {
                  initialValue:props.ArticleId
                })( 
                  <Input readOnly />
                )
              } 
            </FormItem>
          <FormItem label = "topicId" style={{display:'none'}}> 
              {
                getFieldDecorator('topicId', {
                  initialValue:props.comment._id
                })( 
                  <Input readOnly />
                )
              } 
            </FormItem>
            <FormItem label = "fromUserName" style={{display:'none'}}> 
              {
                getFieldDecorator('fromUserName', {
                  initialValue:props.userInfo.name
                })( 
                  <Input readOnly />
                )
              } 
            </FormItem>
            <FormItem label = "toUserName" style={{display:'none'}}> 
              {
                getFieldDecorator('toUserName', {
                  initialValue:props.comment.userName
                })( 
                  <Input readOnly />
                )
              } 
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              {
                getFieldDecorator('toUserContent')( 
                  <TextArea
                    rows={1}
                    placeholder='在这里畅所欲言你的看法吧!'
                  />
                )
              } 
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button 
                type = "primary"
                onClick = {
                  replyChange
              }> 回复 </Button>
            </FormItem>
        </Form>
      </div>
    )
  }
)

export default Reply;