import { useState, useEffect } from 'react'
import MQTT from 'mqtt'

export const useESP8266 = (host, options) => {
	const [lecture, setLecture] = useState({
		temperature: 'NaN',
		humidity: 'NaN',
		timestamp: new Date(),
	});
	const [status, setStatus] = useState('disconnected')
	useEffect(() => {
		const client = MQTT.connect(host, options)
		client.on('connect', () => {
			setStatus('Connected')
			client.subscribe('ESP8266/DHT22/TEMP', (err) => {
        if (err) {
					console.log(err)
        }
			})
      client.subscribe('ESP8266/DHT22/HUM', (err) => {
        if (err) {
          console.log(err)
        }
      })
		})
		client.on('message', (topic, message) => {
      console.log(topic, message.toString())
			if (topic == 'ESP8266/DHT22/TEMP') {
				setLecture( old => ({...old, temperature: message.toString()}))
      } else if (topic == 'ESP8266/DHT22/HUM') {
				setLecture( old => ({...old, humidity: message.toString()}))
      }
    })
	})
	return {
		lecture,
		status
	}
}
