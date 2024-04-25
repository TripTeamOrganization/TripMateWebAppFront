const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3001;

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

      resultados.push({ nombre, puntuacion, imagen, descripcion, precio });
    });

    return resultados;
  });

  await browser.close();

  return alojamientos;
}

app.listen(port, () => {
  console.log(`Servidor de la API escuchando en http://192.168.1.34:${port}`);
});
