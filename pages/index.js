import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import EventCard from '../components/EventCard'
import FormTitle from "../components/Form/FormTitle";


export default function Home() {

  let events = [
    {
      'id': 1,
      'image': 'event1.jpg',
      'title': 'Chicago Art Exhibition 2022',
      'date': 'Dec 12,2021',
      'url': '1',
      'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },

    {
      'id': 2,
      'image': 'event2.jpg',
      'title': 'Chicago Art Exhibition 2022',
      'date': 'Dec 12,2021',
      'url': '2',
      'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    }
  ]


  return (
      <div>
        <h1 className="h1">Newsfeed</h1>
        <EventCard event={events[0]}/>
        <EventCard event={events[1]}/>
      </div>
  )
}
