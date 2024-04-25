const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');
const https = require('https');
const iconv = require('iconv-lite');

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

  // Buscar elementos HTML que coincidan con el patrón específico
  $('h2.wp-block-heading').each((index, element) => {
    const nombre = $(element).text().trim();
    const imagen = $(element).next('.wp-block-image').find('img').attr('data-lazy-src');
    const descripcion = $(element).nextUntil('ul').filter('p').text().trim();

    // Extraer la ubicación
    const ubicacionElement = $(element).nextAll('ul').first().find('li').text().trim(); // Se cambió nextUntil por nextAll
    const ubicacionParts = ubicacionElement.split(':');
    const ubicacion = ubicacionParts.length > 1 ? ubicacionParts[1].trim() : ubicacionElement.trim();

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
    const vuelos = await scrapeViajes();
    res.json(vuelos);
  } catch (error) {
    console.error('Error al obtener vuelos:', error);
    res.status(500).json({ error: 'Error al obtener vuelos' });
  }
});
async function scrapeViajes() {
  const url = 'https://www.atrapalo.pe/viajes/';
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const html = iconv.decode(response.data, 'iso-8859-1');
    const $ = cheerio.load(html);

    const viajes = [];

    $('.js-box-offer').each((index, element) => {
      const nombre = $(element).find('.name').text().trim();
      const imagen = $(element).find('img').attr('data-src');
      const tipo = $(element).find('.product-type').text().trim();
      const duracion = $(element).find('.product-duration').text().trim();
      const precio = $(element).find('.price').text().trim();
      const ubicacion = $(element).find('.module-content a').attr('title');

      const viaje = {
        nombre,
        imagen,
        tipo,
        duracion,
        precio,
        ubicacion
      };

      viajes.push(viaje);
    });

    return viajes;
  } catch (error) {
    throw error;
  }
}


app.listen(port, () => {
  console.log(`Servidor de la API escuchando en http://localhost:${port}`);
});
