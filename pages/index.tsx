import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import mqtt from 'mqtt';

const Home: NextPage = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected')
  const [temp, setTemp] = useState('nan')
  const [hum, setHum] = useState('nan')
  const options = {
    clientId: 'web_client',
  }
  useEffect(() => {
    if (connectionStatus == 'disconnected') {
      const client = mqtt.connect('mqtt://192.168.43.61:1884', options);
      client.on('connect', () => {
        setConnectionStatus('Connected');
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
          setTemp(message.toString())
        } else if (topic == 'ESP8266/DHT22/HUM') {
          setHum(message.toString())
        }
      })
    }
  })
  // useEffect(() => {
  //  const client = mqtt.connect('mqtt://192.168.100.8:1884', options)
  //setClient(client);
  //})

  return (
    <div className={styles.container}>
      <Head>
        <title>MQTT Broker!</title>
        <meta name="description" content="Read temperature and humidity from IOT device" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to MQTT
        </h1>

        <p className={styles.description}>
          Broker source code
          <code className={styles.code}>https://github.com/Ridnois/mqtt_broker</code>
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Temperature </h2>
            <p>{temp}°C</p>
          </div>
          <div className={styles.card}>
            <h2>Humidity </h2>
            <p>{hum}%</p>
          </div>
          <div className={styles.card}>
            <h2>Status</h2>
            <p>{connectionStatus}</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
export default Home
