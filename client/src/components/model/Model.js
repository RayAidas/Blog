import React from 'react';
import {  Modal, Button,Form, Icon, Input, Checkbox  } from 'antd';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import WrappedNormalForm from '../login/LoginAndRegisterForm';
import {register, login,findByName} from '../../action/UserAction';
import defaultAvatar from '../../img/default.jpg';

class Model extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      user:{},
      avatarPath:null,
      visible: false,
      username:localStorage.getItem('name'),
      userId:localStorage.getItem('id')
    };
  }
  
  showModal (){
    this.setState({
      visible: true
    });
  };

  removeUser(){
    localStorage.removeItem("name");
    window.location.href="/";
  }


  async handleOk(e) {
    e.preventDefault();
    if(this.props.tag=='login'){
      const flag1 = await login(this.formRef.getItemsValue());
      if(flag1){
        const res = await findByName(this.formRef.getItemsValue().name);
        console.log('res:',res)
        this.setState({
          visible: false,
          user:res
        });
        localStorage.setItem('id',res._id);
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
          localStorage.setItem('name',this.formRef.getItemsValue().name);
          alert('注册成功');
        }else{
          alert('该用户已存在');
        }
      }
    }
  };

  async user(){
    if(localStorage.getItem('name')){
      const res = await findByName(name);
      this.setState({
        user:res
      })
    }else{
      return null;
    }
  }
  
  handleCancel(e){
    e.preventDefault();
    this.setState({
      visible: false,
    });
  };

  

  render() {
    const avatar = {
      width:'30px',
      height:'30px',
      borderRadius:'50%',
      marginRight:'10px'
    }
    return (
      <div>
        {
          this.props.tag=='login'?
          (localStorage.getItem("name")?
            <p style={{display:'inline'}}>
              <Link to='/avatar'>
                <img style={avatar} src={this.props.avatarPath?this.props.avatarPath:defaultAvatar}/>
              </Link>
              <Link to='/userInfo'>
                {localStorage.getItem("name")}
              </Link>
            </p> :
            <a onClick={this.showModal.bind(this)}>
              <img style={avatar} src={defaultAvatar}/>
              <span>登录</span> 
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