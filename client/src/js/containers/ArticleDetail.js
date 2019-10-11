import React from 'react';
import TopBar from '../components/TopBar';

class ArticleDetail extends React.Component{
  render() {
    return (
      <div>
        <TopBar/>
        <div className='wrap'>
        <div className='main' style={{
          minHeight:document.body.clientHeight-50
          }}>
            <div style={{whiteSpace:'pre-wrap'}}>
              {this.props.location.state.content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleDetail;