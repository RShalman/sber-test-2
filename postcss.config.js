module.exports = ({ options }) => ({
  plugins: [
    require('postcss-import'),

    require('postcss-url')({
      url: asset => asset.url,
    }),

    require('autoprefixer'),

    require('postcss-preset-env')({
      stage: 1,
    }),
  ],
});
