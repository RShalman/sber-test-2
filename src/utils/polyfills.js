import 'core-js/features/promise';
import 'whatwg-fetch';

const polyfills = {
  symbol: () =>
    import(
      /* webpackChunkName: 'core-js-symbol' */
      'core-js/features/symbol'
    ),
  from: () =>
    import(
      /* webpackChunkName: 'core-js-from' */
      'core-js/features/array/from'
    ),
  find: () =>
    import(
      /* webpackChunkName: 'core-js-find' */
      'core-js/features/array/find'
    ),
  findIndex: () =>
    import(
      /* webpackChunkName: 'core-js-find-index' */
      'core-js/features/array/find-index'
    ),
  includes: () =>
    import(
      /* webpackChunkName: 'core-js-array-includes' */
      'core-js/features/array/includes'
    ),
  assign: () =>
    import(
      /* webpackChunkName: 'core-js-assign' */
      'core-js/features/object/assign'
    ),
  keys: () =>
    import(
      /* webpackChunkName: 'core-js-keys' */
      'core-js/features/object/keys'
    ),
  values: () =>
    import(
      /* webpackChunkName: 'core-js-values' */
      'core-js/features/object/values'
    ),

  entries: () =>
    import(
      /* webpackChunkName: 'core-js-entries' */
      'core-js/features/object/entries'
    ),
};

const conds = {
  from: Array.from,
  find: [].find,
  findIndex: [].findIndex,
  includes: [].includes,
  assign: Object.assign,
  values: Object.values,
  keys: Object.keys,
  entries: Object.entries,
  symbol: typeof Symbol == 'function',
};

const promises = Object.keys(conds)
  .reduce((acc, key) => {
    return conds[key] ? acc : [...acc, polyfills[key]];
  }, [])
  .map(x => x());

export default Promise.all(promises);
