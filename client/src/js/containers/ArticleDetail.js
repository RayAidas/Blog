import React from 'react';
import TopBar from '../components/TopBar';
import {getArticleById} from '../action/BlogAction';

class ArticleDetail extends React.Component{
  constructor(props){
    super(props);
    this.state={
      article:[],
      content:null
    };
  }

  async componentDidMount(){
    const id = this.props.match.params.id;
    const tag = await getArticleById(id);
    let filter = tag.content.replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
    this.setState({
      article:tag,
      content:filter
    });
  }
  
  render() {
    const {article,content} = this.state;
    return (
      <div>
        <TopBar/>
        <div className='wrap'>
        <div className='main' style={{
          minHeight:document.body.clientHeight-50
          }}>
            <blockquote>
              <p>{article.description}</p>
            </blockquote>
            <div 
              dangerouslySetInnerHTML={{ __html: content }} 
              style={{whiteSpace:'pre-wrap',fontWeight:' 400',marginBottom: '1.5rem'}}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleDetail;