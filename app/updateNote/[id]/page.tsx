
import React, { useEffect } from 'react'
import { getNoteData } from '../actions'


interface props {
    params : {id:string}
}

const page = ({params}:props) => {
    const fetchData = async()=>{
        const data = await getNoteData(params.id)
     
    }
fetchData()
  return (
    <div>
      // Todo implement the next Form here
    </div>
  )
}

export default page
