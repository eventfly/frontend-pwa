import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import ImageHeader from '../../components/ImageHeader'
import SponsorContainer from '../../components/SponsorContainer'
import EventDesc from '../../components/EventDesc'
import FAQ from '../../components/FAQ'
import EventNewsFeed from '../../components/EventNewsFeed'

import CONFIG from "../../config/config.json";
import { getData } from '../../services/HttpService'


function EventDetails()
{
	const router = useRouter();

	const [ event, setEvent ] = useState(null);
	const [ posts, setPosts ] = useState(null);
	const [ loaded, setLoaded ] = useState(false);

	useEffect(() => {

		if (!router.isReady)
		{
			return;
		}
		else 
		{
			const { event_id } = router.query;
			const eventInfoUrl = `${CONFIG.BASE_URL.EVENT}/api/event/${event_id}`;
			
			if (!loaded)
			{
				getData(eventInfoUrl)
				.then((res) => {
					console.log("Event Info GET:", res);
					setEvent(res);
					setPosts(res.posts);
					setLoaded(true);
				})
				.catch((err) => {
					console.error(err);
				})	
			}
		}
	});

	// let posts = [
	// 	{
	// 		'creator': {
	// 			'id': 1,
	// 			'name': 'Purba',
	// 			'role': 'Organizer',
	// 			'avatar': '../event2.jpg'
	// 		},
	// 		'content': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
	// 		'created_at': 'Dec 12,2020',
	// 		'updated_at': 'Dec 12,2021',
	// 		'like_count': 5,
	// 		'view_count': 10,
	// 		'is_deleted': false,
	// 		'medias': [
	// 			{
	// 				'url': '../event2.jpg',
	// 				'type': '',
	// 				'caption': 'coverphoto'
	// 			},
	// 			{
	// 				'url': '../event1.jpg',
	// 				'type': '',
	// 				'caption': 'Profile photo'
	// 			}

	// 		],
	// 		'questions': [
	// 			{
	// 				'question': 'why not?',
	// 				'answers': [{
	// 					'answer': 'human',
	// 					'is_correct': true
	// 				},
	// 				{
	// 					'answer': 'bird',
	// 					'is_correct': false
	// 				}
	// 				]
	// 			}
	// 		],
	// 		'poll_options': [
	// 			{
	// 				'option': 'human',
	// 				'description': 'this is a human'
	// 			},
	// 			{
	// 				'option': 'bird',
	// 				'description': 'this is a bird'
	// 			}
	// 		],
	// 		'comments': [
	// 			{
	// 				'creator': {
	// 					'id': 1,
	// 					'name': 'Purba',
	// 					'role': 'Organizer',
	// 					'avatar': '../event1.jpg'
	// 				},
	// 				'content': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
	// 				'created_at': 'Dec 12,2020',
	// 				'updated_at': 'Dec 12,2021',
	// 				'like_count': 5,
	// 				'is_deleted': false
	// 			},
	// 			{
	// 				'creator': {
	// 					'id': 2,
	// 					'name': 'Rabid',
	// 					'role': 'Organizer',
	// 					'avatar': '../event2.jpg'
	// 				},
	// 				'content': 'hello.',
	// 				'created_at': 'Dec 12,2020',
	// 				'updated_at': 'Dec 12,2021',
	// 				'like_count': 5,
	// 				'is_deleted': false
	// 			}
	// 		]
	// 	},
	// 	{
	// 		'creator': {
	// 			'id': 1,
	// 			'name': 'Purba',
	// 			'role': 'Organizer',
	// 			'avatar': '../event2.jpg'
	// 		},
	// 		'content': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
	// 		'created_at': 'Dec 12,2020',
	// 		'updated_at': 'Dec 12,2021',
	// 		'like_count': 5,
	// 		'view_count': 10,
	// 		'is_deleted': false,
	// 		'medias': [
	// 			{
	// 				'url': '../event2.jpg',
	// 				'type': '',
	// 				'caption': ''
	// 			},
	// 			{
	// 				'url': '../event1.jpg',
	// 				'type': '',
	// 				'caption': ''
	// 			}

	// 		],
	// 		'questions': [
	// 		],
	// 		'poll_options': [
	// 		],
	// 		'comments': [
	// 			{
	// 				'creator': {
	// 					'id': 1,
	// 					'name': 'Purba',
	// 					'role': 'Organizer',
	// 					'avatar': '../event1.jpg'
	// 				},
	// 				'content': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
	// 				'created_at': 'Dec 12,2020',
	// 				'updated_at': 'Dec 12,2021',
	// 				'like_count': 5,
	// 				'is_deleted': false
	// 			},
	// 			{
	// 				'creator': {
	// 					'id': 2,
	// 					'name': 'Rabid',
	// 					'role': 'Organizer',
	// 					'avatar': '../event2.jpg'
	// 				},
	// 				'content': 'hello.',
	// 				'created_at': 'Dec 12,2020',
	// 				'updated_at': 'Dec 12,2021',
	// 				'like_count': 5,
	// 				'is_deleted': false
	// 			}
	// 		]
	// 	},
	// 	{
	// 		'creator': {
	// 			'id': 1,
	// 			'name': 'Purba',
	// 			'role': 'Organizer',
	// 			'avatar': '../event2.jpg'
	// 		},
	// 		'content': 'POLL QUESTION: Who are you?',
	// 		'created_at': 'Dec 12,2020',
	// 		'updated_at': 'Dec 12,2021',
	// 		'like_count': 5,
	// 		'view_count': 10,
	// 		'is_deleted': false,
	// 		'medias': [
	// 		],
	// 		'questions': [
	// 		],
	// 		'poll_options': [
	// 			{
	// 				'option': 'human',
	// 				'description': 'this is a human'
	// 			},
	// 			{
	// 				'option': 'bird',
	// 				'description': 'this is a bird'
	// 			}
	// 		],
	// 		'comments': [
	// 			{
	// 				'creator': {
	// 					'id': 1,
	// 					'name': 'Purba',
	// 					'role': 'Organizer',
	// 					'avatar': '../event1.jpg'
	// 				},
	// 				'content': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
	// 				'created_at': 'Dec 12,2020',
	// 				'updated_at': 'Dec 12,2021',
	// 				'like_count': 5,
	// 				'is_deleted': false
	// 			},
	// 			{
	// 				'creator': {
	// 					'id': 2,
	// 					'name': 'Rabid',
	// 					'role': 'Organizer',
	// 					'avatar': '../event2.jpg'
	// 				},
	// 				'content': 'hello.',
	// 				'created_at': 'Dec 12,2020',
	// 				'updated_at': 'Dec 12,2021',
	// 				'like_count': 5,
	// 				'is_deleted': false
	// 			}
	// 		]
	// 	},
	// 	{
	// 		'creator': {
	// 			'id': 1,
	// 			'name': 'Purba',
	// 			'role': 'Organizer',
	// 			'avatar': '../event2.jpg'
	// 		},
	// 		'content': 'Take the quiz!',
	// 		'created_at': 'Dec 12,2020',
	// 		'updated_at': 'Dec 12,2021',
	// 		'like_count': 1,
	// 		'view_count': 10,
	// 		'is_deleted': false,
	// 		'medias': [
	// 		],
	// 		'questions': [
	// 			{
	// 				'question': 'why not?',
	// 				'answers': [{
	// 					'answer': 'human',
	// 					'is_correct': true
	// 				},
	// 				{
	// 					'answer': 'bird',
	// 					'is_correct': false
	// 				}
	// 				]
	// 			},
	// 			{
	// 				'question': 'why though?',
	// 				'answers': [{
	// 					'answer': 'nothing',
	// 					'is_correct': true
	// 				},
	// 				{
	// 					'answer': 'no',
	// 					'is_correct': false
	// 				}
	// 				]
	// 			}

	// 		],
	// 		'poll_options': [
	// 		],
	// 		'comments': [
	// 			{
	// 				'creator': {
	// 					'id': 1,
	// 					'name': 'Purba',
	// 					'role': 'Organizer',
	// 					'avatar': '../event1.jpg'
	// 				},
	// 				'content': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
	// 				'created_at': 'Dec 12,2020',
	// 				'updated_at': 'Dec 12,2021',
	// 				'like_count': 0,
	// 				'is_deleted': false
	// 			},
	// 			{
	// 				'creator': {
	// 					'id': 2,
	// 					'name': 'Rabid',
	// 					'role': 'Organizer',
	// 					'avatar': '../event2.jpg'
	// 				},
	// 				'content': 'hello.',
	// 				'created_at': 'Dec 12,2020',
	// 				'updated_at': 'Dec 12,2021',
	// 				'like_count': 5,
	// 				'is_deleted': true
	// 			}
	// 		]
	// 	}

	// ]

	let sponsors = [
		{
			'id': 1,
			'image': '/github.svg',
		},
		{
			'id': 2,
			'image': '/stackbit.svg',
		},
		{
			'id': 3,
			'image': '/netlify.svg',
		},
		{
			'id': 4,
			'image': '/sticker-mule.svg',
		},
	]

	let faqs = [
		{
			'id': 1,
			'question': 'How can I get to the venue?',
			'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet elit at nibh ultrices, molestie ullamcorper leo sodales. Pellentesque vehicula ut ipsum sed sodales. Integer finibus scelerisque leo et semper.'
		},
		{
			'id': 2,
			'question': 'What about accomodation for attendees?',
			'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet elit at nibh ultrices, molestie ullamcorper leo sodales. Pellentesque vehicula ut ipsum sed sodales. Integer finibus scelerisque leo et semper.'
		},
		{
			'id': 3,
			'question': 'What about accomodation for attendees?',
			'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet elit at nibh ultrices, molestie ullamcorper leo sodales. Pellentesque vehicula ut ipsum sed sodales. Integer finibus scelerisque leo et semper.'
		},
		{
			'id': 4,
			'question': 'How can I get to the venue?',
			'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet elit at nibh ultrices, molestie ullamcorper leo sodales. Pellentesque vehicula ut ipsum sed sodales. Integer finibus scelerisque leo et semper.'
		},
	]

	return (
		loaded ?
			<div className="event_page_style">
				<ImageHeader />
				<EventDesc />
				<EventNewsFeed posts={posts} />
				<SponsorContainer sponsors={sponsors} />
				<FAQ faqs={faqs} />
			</div>
		:
			<></>
	);
}

export default EventDetails;