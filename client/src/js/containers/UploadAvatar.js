import React from 'react';
import TopBar from '../components/TopBar';
import FileUpload from './upload/FileUpload';
import {findByName,updateAvatarPath} from '../action/UserAction'

class UploadAvatar extends React.Component{
  constructor(props){
    super(props);
  }

  async updateAvatar(filePath,fileName){
    const res = await findByName(localStorage.getItem('name'));
    const tag = await updateAvatarPath(localStorage.getItem('id'),filePath,fileName,res.avatarName);
    console.log(tag);
  }
  render() {
    return (
      <div>
        <TopBar/>
        <div className='wrap'>
          <div className='main'>
            <h1>上传头像</h1>
            <FileUpload
              updateAvatar = {this.updateAvatar.bind(this)}
            />
          </div>
        </div>    
      </div>
    );
  }
}

export default UploadAvatar;