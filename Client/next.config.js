module.exports = {
   webpackDevMiddleware: (config) => {
      config.watchOptions = {
         poll: true,
      };
      return config;
   },
};
