import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = () => {
  return (
    <div>
         <Button variant="secondary">Current Location</Button>{' '}
         <Button variant="secondary">paris</Button>{' '}
         <Button variant="secondary">new york</Button>{' '}

    </div>
  )
}

export default WeatherButton