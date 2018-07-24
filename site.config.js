// const weeks = require('./src/data/weeks');

module.exports = {
  site: {
    title: '',
    description: '',
    basePath: process.env.NODE_ENV === 'production' ? '/public' : '/public'
  },
  build: {
    outputPath: process.env.NODE_ENV === 'production' ? './public' : './public'
  }
};
