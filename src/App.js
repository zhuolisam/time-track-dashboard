import { useEffect, useState } from 'react'
import Card from './components/Card'
import Badge from './components/Badge'
import './scss/main.scss'

function App() {
  const [times, setTimes] = useState([])
  const [activeTimeframe, setActiveTimeframe] = useState('Weekly')

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleClick = (timeframe) => {

    setActiveTimeframe(timeframe);
    const currentTimes = document.querySelectorAll('.card__current-hours');
    currentTimes.forEach(async (time) => {
      time.classList.add("animation-FadeIn")
      await sleep(1000)
      time.classList.remove("animation-FadeIn")
    })
  }

  const fetchData = () => {
    fetch('data/data.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setTimes(data)
      }
      );
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <main>
        <div className='container'>
          <Badge
            activeTimeframe={activeTimeframe}
            handleClick={handleClick}
          />
          <div className='cards'>
            {times.map((time, index) => {
              return (
                <Card time={time} activeTimeframe={activeTimeframe} key={index} className='dashboard-items' />
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}

export default App;
