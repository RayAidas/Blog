import React from 'react';
import {  Modal, Button,Form, Icon, Input, Checkbox  } from 'antd';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import WrappedNormalForm from './LoginAndRegisterForm';
import {register, login,findByName} from '../action/UserAction';

class Model extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      user:{
        id:null,
        name:null,
        description:'这个人很懒.',
        age:null,
        sex:null,
        email:null,
        tel:null,
      },
      visible: false,
      username:localStorage.getItem('name')
    };
  }
  
  showModal (){
    this.setState({
      visible: true
    });
  };

  removeUser(){
    localStorage.removeItem("name");
    window.location.href="/client";
  }


  async handleOk(e) {
    e.preventDefault();
    if(this.props.tag=='login'){
      const flag1 = await login(this.formRef.getItemsValue());
      if(flag1){
        this.setState({
          user:{
            name:this.formRef.getItemsValue().name
          }
        });
        const res = await findByName(this.state.user.name);
        this.setState({
          visible: false,
          user:res,
        });
        location.reload();
      }else{
        alert('用户名或密码错误');
      }
    }else{
      if(this.formRef.getItemsValue().name==null){
        alert('用户名不能为空');
      }else if(this.formRef.getItemsValue().password==null){
        alert('密码不能为空');
      }else{
        const flag2 = await register(this.formRef.getItemsValue());
        if(flag2){
          this.setState({
            visible: false,
          });
        }else{
          alert('该用户已存在');
        }
      }
    }
    
  };
  
  handleCancel(e){
    e.preventDefault();
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        {
          this.props.tag=='login'?
          (localStorage.getItem("name")?
            <Link to='/userInfo'>
              {localStorage.getItem("name")}
            </Link> :
            <a onClick={this.showModal.bind(this)}>
              登录
            </a>
          ):
          (localStorage.getItem("name")?
            <a onClick={this.removeUser.bind(this)}>注销</a>:
            <a onClick={this.showModal.bind(this)}>
              注册
            </a>
          )
        }
        
        <Modal
          title={this.props.tag=='login'?'Login':'Register'}
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <WrappedNormalForm
            wrappedComponentRef={(form) => this.formRef = form}
          />
        </Modal>
      </div>
    );
  }
}
export default Model;