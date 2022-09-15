import { Avatar } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import './Sidebar.css';

function Sidebar() {

  const user = useSelector(selectUser);

  const recentItem = (item) => (
    <div className="sidebar__recentItem">
        <span className='sidebar__hash'>#</span>
        <p>{ item }</p>
    </div>
    );

  return (
    <div className='sidebar'>

        <div className='sidebar__top'>
            <img src="https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-2430.jpg?size=626&ext=jpg&ga=GA1.2.795402181.1649162916" alt="" />
            <Avatar src={user.photoUrl} className='sidebar__avatar'>{user.email[0]}</Avatar>
            <h2>{ user.displayName}</h2>
            <h4>{ user.email }</h4>
        </div>

        <div className="sidebar__stats">
            <div className="sidebar__stat">
                <p>Who viewed you</p>
                <p className="sidebar__statNumber">
                    2,543
                </p>
            </div>
            <div className="sidebar__stat">
                <p>Views on post</p>
                <p className="sidebar__statNumber">
                    2448
                </p>
            </div>
        </div>

        <div className="sidebar__bottom">
            <p>Recent</p>
            {recentItem('reactjs')}
            {recentItem('software engineering')}
            {recentItem('design')}
            {recentItem('developer')}
            {recentItem('web')}
        </div>
    </div>
  )
}

export default Sidebar