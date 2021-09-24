import getBaseConfig from './webpack.base.config'
import { getCwdPath } from '../../utils'

interface IWebpackConfig {
    entry: {
        app: string
    }
    output: {
        filename: string
        path: string
    }
    template: string
}

export const getProconfig = (config: IWebpackConfig) => {
    const { entry: { app }, template, output: { filename, path }, ...rest } = config

    return {
        ...getBaseConfig({
            mode: 'production',
            entry: {
                app: getCwdPath(app || './src/index.js')
            },
            output: {
                filename: filename || 'build.js',
                path: getCwdPath(path || './dist')
            },
            template: getCwdPath(template || 'public/index.html')
        }),
        ...rest
    }
}