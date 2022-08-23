import { getType } from './util.js'
import infos from './options.js'

import { jsonToGraphQLQuery } from 'json-to-graphql-query';

function getProperty (target, prop) {
  return infos[target].options.filter(i => typeof i === 'string' ? i === prop : i.name === prop)[0];
}

export function buildFragment ({ target, variables, fields }) {
  const obj = {
    __on: [
      {
        __typeName: target,
      }
    ]
  }
  
  fields.forEach(i => {
    const field = getProperty(target, i.name || i);
    if (Boolean(field)) {
      if (typeof field === 'string') {
        obj.__on[0][i] = true;
      } else {
        obj.__on[0][i.name] = buildFragment({
          target: field.type, 
          variables,
          fields: i.fields
        });
        if (field.search) {
          infos[field.type].required.forEach(j => {
            if (
              j.filter(
                k => k in variables[field.type]
              ).length === j.length
            ) {
              obj.__on[0][i.name].__args = {};
              j.forEach(k => {
                obj.__on[0][i.name].__args[k] = variables[field.type][k]
              })
              //console.log(obj.__args)
            }
          });
        }
      }
    } else {
      console.log(`\x1b[33m Unknown property in ${target}: ${i.name || i} \x1b[0m`);
    }
  });
  return obj;
}

export function buildQuery ({ target, variables, fields }) {
  const query = {
    __name: infos[target].operationName
  };

  query[infos[target].queryName] = Object.assign({
    __args: variables[target]
  }, buildFragment(arguments[0]))
  
  
  return { query };
}

export function buildRequest ({ target, variables, fields }) {
  if (!(target in infos) ||  !infos[target].operationName) {
    return {
      error: 'Unknown target'
    }
  }
  
  return {
    query: jsonToGraphQLQuery(buildQuery(arguments[0])),
    operationName: infos[target].operationName,
    variables: {}
  }
}