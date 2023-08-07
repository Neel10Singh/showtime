import axios from 'axios'
import React, { useEffect, useState } from 'react'
import noimg from '../images/no-image.png'
import { Link } from 'react-router-dom'

function MenuPage({ data, setData }) {
  const getdata = async () => {
    try {
      const moviedata = await axios('https://api.tvmaze.com/search/shows?q=all')
      setData(moviedata.data)
      // console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getdata()
  }, [])

  return (
    <div className='menupage'>
      {data?.map((showdata) => {
        const { show } = showdata
        // console.log(show.image)
        return (
          <Link
            to={`/show/${show.id}`}
            style={{ textDecoration: 'none' }}
            key={show.id}
          >
            <button className='showcard'>
              {show.image !== null ? (
                <img src={show.image.original} />
              ) : (
                <img src={noimg} />
              )}
              <div className='showname'>
                <span className='showtitle'>{show.name}</span>
                <span className='showgenres'>
                  {show.genres.map((genre, index) => (
                    <span className='showgenre' key={index}>
                      {genre}
                    </span>
                  ))}
                </span>
                {show.rating.average !== null ? (
                  <span className='showrating'>
                    Rating-{show.rating.average} <i className='fa fa-star'></i>
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </button>
          </Link>
        )
      })}
    </div>
  )
}

export default MenuPage
