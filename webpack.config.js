const path = require('path');
const html = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // Entry nos permite decir el punto de entrada de nuestra aplicación
  entry: './src/index.js',
  // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
  output: {
    // path es donde estará la carpeta donde se guardará los archivos
    // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
    path: path.resolve(__dirname, 'dist'),
    // filename es el nombre del archivo que se va a crear
    filename: 'main.js'
  },
  resolve: {
    // extensions nos permite decir que extensiones de archivos queremos que webpack pueda reconocer
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        // Test declara que extensión de archivos aplicara el loader
        test: /\.m?.js$/,
        // Exclude permite omitir archivos o carpetas especificas
        exclude: /node_modules/,
        // Use es un arreglo u objeto donde dices que loader aplicaras
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css|\.styl$/i,
        use: [miniCssExtractPlugin.loader,
          "css-loader",
          "stylus-loader"] // for sass "sass-loader"
      }
    ]
  },
  // SECCION DE PLUGINS

  plugins: [
    new html({
      // CONFIGURACIÓN DEL PLUGIN
      // INYECTA EL BUNDLE AL TEMPLATE HTML
      inject: true,
      // LA RUTA AL TEMPLATE HTML
      template: './public/index.html',
      // NOMBRE FINAL DEL ARCHIVO
      filename: './index.html'
    }),
    new miniCssExtractPlugin()
  ]
};