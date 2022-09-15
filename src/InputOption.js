import React from 'react'
import './InputOption.css';
function InputOption({Icon, title, color}) {
  return (
    <div className='inputOption'>
        {Icon && 
            <div className='inputOption__icon'>
                <Icon style={{ color: color}} />
                <h4>{ title }</h4>
            </div>
        }
    </div>
  )
}

export default InputOption