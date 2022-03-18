module.exports = {
  devServer: {
    proxy: "https://rockstar-api.azurewebsites.net/api/",
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/main.scss";
          `,
      },
    },
  },
};
