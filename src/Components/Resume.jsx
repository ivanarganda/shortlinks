import React,{ useState } from 'react'
import Urls from './Urls';
import GenerateShort from './GenerateShort'; 


export default function Resume() {
 
    const [ type , setType ] = useState('listUrls');

    const changeType = ( str )=>{
        setType( str );
    }

    const types = {
        'listUrls':<Urls changeType={changeType}/>,
        'generateShort':<GenerateShort changeType={changeType}/>
    }

    return (
        <div className='min-w-[350px]'>
            { types[type] }
        </div>
    )
}
