const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');
const https = require('https');

const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/alojamientos', async (req, res) => {
  try {
    const alojamientos = await scrapeAlojamientos();
    res.json(alojamientos);
  } catch (error) {
    console.error('Error al obtener alojamientos:', error);
    res.status(500).json({ error: 'Error al obtener alojamientos' });
  }
});
async function scrapeAlojamientos() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.google.com/search?q=alojamientos');
  await page.waitForSelector('div.g');

  const alojamientos = await page.evaluate(() => {
    const resultados = [];
    const elementos = document.querySelectorAll('div.g');

    elementos.forEach(elemento => {
      const nombre = elemento.querySelector('h3')?.innerText || 'Sin nombre';
      const puntuacion = elemento.querySelector('span.aqK')?.innerText || 'Sin puntuación';
      const imagen = elemento.querySelector('img')?.src || 'Sin imagen';
      const descripcion = elemento.querySelector('span.st')?.innerText || 'Sin descripción';
      const precio = elemento.querySelector('span .swlyg')?.innerText || 'Sin precio';

      // Obtener información adicional
      const direccion = elemento.querySelector('span.LrzXr')?.innerText || 'Sin dirección';
      const telefono = elemento.querySelector('span.LrzXr:nth-child(3)')?.innerText || 'Sin teléfono';
      const sitioWeb = elemento.querySelector('div.kno-ecr-pt a')?.href || 'Sin sitio web';

      resultados.push({ nombre, puntuacion, imagen, descripcion, precio, direccion, telefono, sitioWeb });
    });

    return resultados;
  });

  await browser.close();
  return alojamientos;
}

app.get('/restaurantes', async (req, res) => {
  try {
    const restaurantes = await scrapeRestaurantes();
    res.json(restaurantes);
  } catch (error) {
    console.error('Error al obtener restaurantes:', error);
    res.status(500).json({ error: 'Error al obtener restaurantes' });
  }
});
async function scrapeRestaurantes() {
  const url = 'https://traveltriangle.com/blog/michelin-rated-restaurants-around-the-world/';
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  const restaurantes = [];

  $('h3').each((index, element) => {
    const nombre = $(element).text().trim();
    const imagen = $(element).next().find('img').attr('data-src');
    const descripcion = $(element).next().next().text().trim();
    const locationCost = $(element).next().next().next().text().trim();
    const cuisines = $(element).next().next().next().next().text().trim();
    const mustTry = $(element).next().next().next().next().next().text().trim();
    const openingHours = $(element).next().next().next().next().next().next().text().trim();

    const restaurante = {
      nombre,
      imagen,
      descripcion,
      locationCost,
      cuisines,
      mustTry,
      openingHours
    };

    restaurantes.push(restaurante);
  });

  return restaurantes;
}

app.get('/actividades', async (req, res) => {
  try {
    const actividades = await scrapeActividades();
    res.json(actividades);
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    res.status(500).json({ error: 'Error al obtener actividades' });
  }
});
async function scrapeActividades() {
  const url = 'https://travel1tours.com/lugares-turisticos-de-peru/';
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  const actividades = [];

  $('figure').each((index, element) => {
    const nombre = $(element).find('figcaption').text().trim();
    const imagen = $(element).find('img').attr('data-lazy-src');
    const descripcion = $(element).next('p').first().text().trim();
    const ubicacion = $(element).nextAll('ul').first().find('li').first().text().trim();

    const actividad = {
      nombre,
      imagen,
      descripcion,
      ubicacion
    };

    actividades.push(actividad);
  });

  return actividades;
}
app.get('/vuelos', async (req, res) => {
  try {
    const vuelos = await scrapeVuelos();
    res.json(vuelos);
  } catch (error) {
    console.error('Error al obtener vuelos:', error);
    res.status(500).json({ error: 'Error al obtener vuelos' });
  }
});

async function scrapeVuelos() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'https://www.lima-airport.com/pasajeros/vuelos';
    await page.goto(url);

    const html = await page.content();
    const $ = cheerio.load(html);

    const vuelos = [];

    const flightElements = $('.col-number .textInformationFlight').toArray();

    for (const element of flightElements) {
      try {
        const numeroVuelo = $(element).find('h4').text().trim();
        const detalleUrl = `https://www.lima-airport.com/pasajeros/vuelos/detalle/${numeroVuelo.substring(3)}?day=today`;

        const vueloDetalle = await scrapeVueloDetalle(detalleUrl);
        vuelos.push(vueloDetalle);
      } catch (error) {
        console.error('Error al obtener detalle de vuelo:', error);
      }
    }

    await browser.close();

    return vuelos;
  } catch (error) {
    console.error('Error al obtener vuelos:', error);
    throw error;
  }
}

async function scrapeVueloDetalle(url) {
  try {
    // Ignorar la verificación del certificado SSL
    const agent = new https.Agent({
      rejectUnauthorized: false
    });

    // Realizar la solicitud HTTP con Axios
    const response = await axios.get(url, { httpsAgent: agent });
    const html = response.data;
    const $ = cheerio.load(html);

    const aerolinea = $('.titulo-aerolinea img').attr('src').replace(/^.*[\\/]/, '');
    const estado = $('.titulo-aerolinea h2').text().trim();
    const refVuelo = $('.titulo-aerolinea .ref-vuelo').text().trim();
    const fechaHoraProgramada = $('.texto-vuelo-detalle .hora-salida p').text().trim();
    const destino = $('.texto-vuelo-detalle .ciudad p').text().trim();
    const fechaHoraEstimada = $('.texto-vuelo-detalle .hora-llegada p').text().trim();
    const counterCheckIn = $('.detalles .counter').text().trim();

    return {
      aerolinea,
      estado,
      refVuelo,
      fechaHoraProgramada,
      destino,
      fechaHoraEstimada,
      counterCheckIn
    };
  } catch (error) {
    console.error('Error al obtener detalle de vuelo:', error);
    throw error;
  }
}
app.listen(port, () => {
  console.log(`Servidor de la API escuchando en http://localhost:${port}`);
});
