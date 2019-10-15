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
      total:0,
      content:null
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
      articles: res
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
  
  filterHTMLTag(msg) {  
    var msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
    msg = msg.replace(/[|]*\n/, '') //去除行尾空格
    msg = msg.replace(/&npsp;/ig, ''); //去掉npsp
    return msg;
  }

  render() {
    let filterHTMLTag;
    const {	articles } = this.state;
    return (
      <div className='wrap'>
         <div className='main'>
            <ul style={{margin:0}}> 
              {
                articles.map((article, index) => ( 
                  <li className='list' key = {index} >
                    <Link to={{
                      pathname:`/detail/${article._id}`,
                    }}>
                      <h3>
                        <span className='statement'>{article.statement}</span>
                        <span className='title'>{article.title}</span>
                      </h3>
                    </Link>
                    <span>{article.tag}</span>
                    <p className='content'>
                      {filterHTMLTag=this.filterHTMLTag(article.content)}
                    </p> 
                    <p className='info'>
                      {
                        article.author==localStorage.getItem('name')?
                          <Link to='/myBlog'>
                            <span className='first'>by {article.author} </span>
                          </Link>:
                          <Link to={{
                            pathname:`/list/${article.author}`
                          }}>
                            <span className='first'>by {article.author} </span>
                          </Link>
                      }
                      <span>{moment(article.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                      <span>浏览次数:{article.views}</span>
                      <span>评论:{article.comment}</span>
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