import webpack from 'webpack'
import { loggerError, loggerInfo, loggerSuccess, loggerTiming } from '../../utils'
import webpackConfig from './webpack.base.config'

export const buildWebpack = () => {
  loggerTiming('WEBPACK BUILD')

  const compiler = webpack(webpackConfig())

  try {
    compiler.run((err: any, stats: any) => {
      if (err) {
        loggerError(err)
      } else {
        loggerSuccess('WEBPACK SUCCESS!')
      }
      compiler.close(() => {
        loggerInfo('WEBPACK GENERATE CACHE')
      })
      loggerTiming('WEBPACK BUILD', false)
    })
  } catch (error: any) {
    loggerError(error)
  }
}
