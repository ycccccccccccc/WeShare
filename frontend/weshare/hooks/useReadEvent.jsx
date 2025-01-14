import { useState } from 'react';
import Cookies from "js-cookie"
import axios from 'axios';

function useReadEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState(null);
  const accessToken = Cookies.get("accessToken");
  const readEvent = async (eventId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/events/${eventId}`, {
        headers: {
            'Authorize': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
      });
      setEvent(response.data.data.event);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, event, readEvent };
}

export default useReadEvent;
