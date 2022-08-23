export { fetch } from './lib/util.js'
export { buildRequest } from './lib/query.js'

import { buildRequest, buildFragment } from './lib/query.js'
import { fetch } from './lib/util.js'
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import infos from './lib/options.js'

const defaultRepl = ['id', 'title', 'timeCreated', 'imageUrl', 'description', 'commentCount'];

export function getRepl({ id, url, fields = defaultRepl }) {
  return new Promise((resolve, reject) => {
    fetch(buildRequest({
      fields,
      target: 'Repl',
      variables: {
        Repl: {
          id: id ? id : '',
          url: url ? url: ''
        }
      }
    })).then(d => resolve(d.data || { repl:null }));
  });
}

export function getUser({ username, fields = ['id', 'fullName', 'username', 'bio', 'image', 'url'] }) {
  return new Promise((resolve, reject) => {
    fetch(buildRequest({
      fields,
      target: 'User',
      variables: {
        User: {
          username: username ? username: ''
        }
      }
    })).then(d => resolve({ user: d.data.userByUsername || null }));
  });
}

export function getInfosOnTarget (t) {
  if (!t || !(t in infos)) {
    return {
      error: `Unknown target, get: ${t}`
    }
  }
  return Object.assign(infos[t], { typeName: t });
}

export function getPossibleTargets () {
  return Object.keys(infos).filter(i => infos[i].operationName)
}
