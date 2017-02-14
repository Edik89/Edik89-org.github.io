import gulpLoadPlugins from 'gulp-load-plugins';
import gulp from 'gulp';

export const $ = gulpLoadPlugins({
    DEBUG: false, // when set to true, the plugin will log info to console. Useful for bug reporting and issue debugging
    pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for
    scope: ['dependencies', 'devDependencies'], // which keys in the config to look within
    replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
    camelize: true, // if true, transforms hyphenated plugins names to camel case
    lazy: true // whether the plugins should be lazy loaded on demand
});

export default gulp;
