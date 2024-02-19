import { useState } from 'react'
import Urls from './Urls';
import GenerateShort from './GenerateShort'; 


export default function Resume() {
 
    const [ type , setType ] = useState('listUrls');

    const changeType = ( str )=>{
        setType( str );
    }

    const types = {
        'listUrls':<Urls changeType={changeType} type={type}/>,
        'generateShort':<GenerateShort changeType={changeType}/>,
        'MyUrls':<Urls changeType={changeType} type={type}/>
    }

    return (
        <div className='min-w-[350px]'>
            { types[type] }
        </div>
    )
}
