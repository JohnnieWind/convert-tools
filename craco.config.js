const CracoLessPlugin = require('craco-less')

const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  webpack: {
    alias: {
      '@@': resolve('.'),
      '@': resolve('src'),
      '@assets': resolve('src/assets'),
      '@common': resolve('src/common'),
      '@components': resolve('src/components'),
      '@hooks': resolve('src/hooks'),
      '@pages': resolve('src/pages'),
      '@store': resolve('src/store'),
      '@utils': resolve('src/utils')
    }
  },
  babel: {
    plugins: [
      ['import', { libraryName: 'antd', style: true }],
      ['@babel/plugin-proposal-decorators', { legacy: true }]
    ]
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#F6743D'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}