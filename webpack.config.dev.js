const path = require('path');
const Html = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnv = require('dotenv-webpack');

module.exports = {
  // Entry nos permite decir el punto de entrada de nuestra aplicación
  entry: './src/index.js',
  // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
  output: {
    // path es donde estará la carpeta donde se guardará los archivos
    // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
    path: path.resolve(__dirname, 'dist'),
    // filename es el nombre del archivo que se va a crear
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]',
  },
  mode: 'development',
  watch: true, //You can use --watch  this is better 
  resolve: {
    // extensions nos permite decir que extensiones de archivos queremos que webpack pueda reconocer
    extensions: ['.js', '.jsx'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
      '@config': path.resolve(__dirname, 'src/config/enviroment')
    }

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
        use: [MiniCssExtractPlugin.loader,
          "css-loader",
          "stylus-loader"] // for sass "sass-loader"
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000, // O LE PASAMOS UN BOOLEANOS TRUE O FALSE
            // Habilita o deshabilita la transformación de archivos en base64.
            mimetype: 'application/font-woff',
            // Especifica el tipo MIME con el que se alineará el archivo. 
            // Los MIME Types (Multipurpose Internet Mail Extensions)
            // son la manera standard de mandar contenido a través de la red.
            name: "[name].[contenthash].[ext]",
            // Especifica el nombre del archivo generado.
            outputPath: './assets/fonts/',
            // EL DIRECTORIO DE SALIDA
            publicPath: '../assets/fonts/',
            esModule: false
          }
        }
      }
    ]
  },
  // SECCION DE PLUGINS

  plugins: [
    new Html({
      // CONFIGURACIÓN DEL PLUGIN
      // INYECTA EL BUNDLE AL TEMPLATE HTML
      inject: true,
      // LA RUTA AL TEMPLATE HTML
      template: './public/index.html',
      // NOMBRE FINAL DEL ARCHIVO
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
        // new copyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'src', 'assets/images'),
    //       to: './assets/images'
    //     }
    //   ]
    // })
    new DotEnv()
  ],
};