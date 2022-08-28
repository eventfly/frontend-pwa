import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import CONFIG from "../../../config/config.json";
import { getData } from '../../../services/HttpService'
import EventBanner from "../../../components/Event/EventBanner";
import EventBody from '../../../components/Event/EventBody';

function EventDetails()
{
	const router = useRouter();

	const [ event, setEvent ] = useState(null);
	const [ loaded, setLoaded ] = useState(false);
	const [ eventId, setEventId ] = useState("");

	useEffect(() => {

		if (!router.isReady)
		{
			return;
		}
		else 
		{
			const { event_id } = router.query;
			setEventId(event_id);
 			const eventInfoUrl = `${CONFIG.BASE_URL.PARTICIPANT}/api/participant/event/${event_id}`;
			
			if (!loaded)
			{
				getData(eventInfoUrl)
				.then((res) => {
					if (res)
					{
						console.log("Event Info GET:", res);
						setEvent(res);
						setLoaded(true);	
					}
				})
				.catch((err) => {
					console.error(err);
				})	
			}
		}
	});

	
	return (
		loaded ?
		<>
			<EventBanner event={event}/>
			<EventBody event={event}/>
		</>
		:
		<>
		</>
	);
}

export default EventDetails;