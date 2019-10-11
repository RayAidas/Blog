import React from 'react';
import {Button,Pagination } from 'antd';
import moment from 'moment';
import {Link} from 'react-router-dom';
import '../../css/base.css';
import { getAllList,getList } from '../action/BlogAction';

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state=({
      articles:[],
      total:0
    })
  }

  async componentDidMount() {
    const total = await getAllList();
    const res = await getList();
    this.setState({
      articles:res,
      total:total.length
    })
  }
  
  async onShowSizeChange(current, pageSize) {
		console.log(current, pageSize);	
		let c=current;
		let p=pageSize;
		const res = await getList(c,p);
		console.log(res);
		this.setState({
			articles: res,
		});
	}

	async onClick(current,pageSize){
		let c=current;
		let p=pageSize;
		const res = await getList(c,p);
		console.log(res);
		this.setState({
			articles: res,
		});
	}

  render() {
    const {	articles } = this.state;
    return (
      <div className='wrap'>
         <div className='main' style={{
          minHeight:document.body.clientHeight-50
          }}>
            <ul style={{margin:0}}> 
              {
                articles.map((article, index) => ( 
                  <li className='list' key = {index} >
                    <Link to={{
                      pathname:`/detail/${article._id}`,
                      state:article
                    }}>
                      <h3 className='title'>{article.title}</h3>
                    </Link>
                    <span>{article.tag}</span>
                    <p className='content'>{article.content}</p>
                    <p className='info'>
                      <span>by {article.author} </span>
                      <span> {article.createTime}</span>
                    </p>
                  </li>
                ))
              } 
            </ul>
            <div>
              <Pagination
                style={{textAlign:'center',paddingBottom:'0px'}}
                showSizeChanger
                onShowSizeChange={this.onShowSizeChange.bind(this)}
                defaultCurrent={1}
                total={this.state.total}
                onChange={this.onClick.bind(this)}
                hideOnSinglePage={ true }
              />
            </div>
            
          </div>
      </div>
    );
  }
}

export default Main;