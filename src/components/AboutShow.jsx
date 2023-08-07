import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

let initialbookingdata = {
  name: '',
  ticketno: '',
  date: '',
  timing: '',
}

function AboutShow({ data }) {
  const [currentshow, setCurrentShow] = useState(null)
  const [bookingdets, setBookingDets] = useState(initialbookingdata)
  const [showform, setShowform] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    // console.log(showlist)

    id && filterdata()
  }, [])
  const filterdata = async () => {
    try {
      console.log(data)
      const showlist = await data?.filter((eachshow) => {
        // console.log(eachshow.show.id)
        return eachshow.show.id == id
      })
      console.log(showlist)
      setCurrentShow(showlist[0].show)
      setBookingDets({ ...bookingdets, name: showlist[0].show.name })

      const summary = document.getElementById('summary')
      summary.innerHTML = showlist[0].show.summary
    } catch (error) {
      console.log(error)
    }
  }
  const openform = () => {
    setShowform(true)
    setTimeout(() => {
      const skillspage = document.getElementById('bookform')
      skillspage.scrollIntoView({ behavior: 'smooth' })
    }, 500)
  }
  const handlesubmit = (e) => {
    e.preventDefault()
  }
  const handleactualsubmit = (e) => {
    e.preventDefault()
    const stat = document.getElementById('status')
    stat.innerHTML = '<p>Tickets Booked!</p>'
  }
  return (
    <div className='aboutpage'>
      <section className='topsection'>
        <div className='imgandtitle'>
          <div className='shadowbox'></div>
          {currentshow?.image !== null ? (
            <img src={currentshow?.image?.original}></img>
          ) : (
            <span className='title'>{currentshow?.name}</span>
          )}
        </div>

        <div className='rightsection'>
          <div className='info'>
            <span className='title'>{currentshow?.name}</span>
            <span className='genres'>
              {currentshow?.genres.map((genre, index) => (
                <span className='genre' key={index}>
                  {genre}
                </span>
              ))}
            </span>
          </div>
          <div className='summary' id='summary'></div>
          {currentshow?.rating.average !== null ? (
            <span className='desc'>
              Ratings- {currentshow?.rating.average}{' '}
              <i className='fa fa-star'></i>
            </span>
          ) : (
            <></>
          )}
          {currentshow?.premiered !== null ? (
            <span className='desc'>Premiered on- {currentshow?.premiered}</span>
          ) : (
            <></>
          )}
          {currentshow?.status === 'Ended' ? (
            <span className='desc'>Ended on- {currentshow?.ended}</span>
          ) : (
            <span className='desc'>{currentshow?.status}</span>
          )}
          <span className='desc'>Language- {currentshow?.language}</span>
          {currentshow?.network !== null ? (
            <span className='desc'>
              Network- {currentshow?.network?.name}
              <a
                href={currentshow?.network?.officialSite}
                target='blank'
                style={{ textDecoration: 'none' }}
                className='linkbut'
              >
                <i className='fa fa-external-link'></i>
              </a>
            </span>
          ) : (
            <></>
          )}
          {currentshow?.runtime !== null ? (
            <span className='desc'>
              Average runtime- {currentshow?.runtime} mins
            </span>
          ) : (
            <></>
          )}
          {currentshow?.status !== 'In Development' ? (
            <span className='desc'>
              New episode every:{' '}
              {currentshow?.schedule.days.map((day, index) => (
                <span key={index}>{day} </span>
              ))}{' '}
              at {currentshow?.schedule.time}
            </span>
          ) : (
            <></>
          )}
          <span className='desc'>
            <a
              href={currentshow?.url}
              target='blank'
              style={{ textDecoration: 'none' }}
            >
              More Info<i className='fa fa-external-link'></i>
            </a>
          </span>
        </div>
      </section>
      <div className='bookticket'>
        <button className='bookbutton' onClick={openform}>
          Book Tickets
        </button>
        {showform && (
          <form className='bookform' id='bookform' onSubmit={handlesubmit}>
            <input type='text' value={bookingdets?.name} />
            <input type='text' placeholder='Number of tickets' />
            <input type='text' placeholder='theater..' />
            <span className='formdets'>
              Date:{' '}
              <input
                type='text'
                className='input2'
                value={bookingdets.date}
              ></input>
            </span>

            <div className='optionbuttons'>
              <button
                className='optionbut'
                id='feb10'
                onClick={() =>
                  setBookingDets({ ...bookingdets, date: '10 Feb,2023' })
                }
              >
                10 Feb,2023
              </button>
              <button
                className='optionbut'
                id='feb11'
                onClick={() =>
                  setBookingDets({ ...bookingdets, date: '11 Feb,2023' })
                }
              >
                11 Feb,2023
              </button>
              <button
                className='optionbut'
                id='feb12'
                onClick={() =>
                  setBookingDets({ ...bookingdets, date: '12 Feb,2023' })
                }
              >
                12 Feb,2023
              </button>
              <button
                className='optionbut'
                id='feb13'
                onClick={() =>
                  setBookingDets({ ...bookingdets, date: '13 Feb,2023' })
                }
              >
                13 Feb,2023
              </button>
            </div>
            <span className='formdets'>
              Timing:{' '}
              <input
                type='text'
                className='input2'
                value={bookingdets.timing}
              ></input>
            </span>
            <div className='optionbuttons'>
              <button
                className='optionbut'
                id='10am'
                onClick={() =>
                  setBookingDets({ ...bookingdets, timing: '10 A.M.' })
                }
              >
                10 A.M
              </button>
              <button
                className='optionbut'
                id='1pm'
                onClick={() =>
                  setBookingDets({ ...bookingdets, timing: '1 P.M.' })
                }
              >
                1 P.M.
              </button>
              <button
                className='optionbut'
                id='4pm'
                onClick={() =>
                  setBookingDets({ ...bookingdets, timing: '4 P.M.' })
                }
              >
                1 P.M
              </button>
              <button
                className='optionbut'
                id='8pm'
                onClick={() =>
                  setBookingDets({ ...bookingdets, timing: '8 P.M.' })
                }
              >
                8 P.M
              </button>
            </div>
            <button
              type='submit'
              className='bookbutton'
              onClick={handleactualsubmit}
            >
              Book
            </button>
          </form>
        )}
        <div className='status' id='status'></div>
      </div>
    </div>
  )
}

export default AboutShow
