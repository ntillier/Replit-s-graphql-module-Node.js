import https from 'https';

const options = {
  hostname: 'replit.com',
  path: '/graphql',
  method: 'POST',
  headers: {
    'X-Requested-With': 'replit',
    'Origin': 'https://replit.com',
    'Accept': 'application/json',
    'Referrer': 'https://replit.com',
    'Content-Type': 'application/json',
    'Connection': 'keep-alive',
    'Host': 'replit.com',
    'x-requested-with': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0'
  }
}

export function fetch (json = {}) {
  return new Promise((resolve, reject) => {
    if (!json || !json.query || !json.variables) {
      return resolve({ error: 'Must provide a query and some variables' })
    }
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (d) => {
        data += d;
      });
  
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });
    
    req.on('error', (e) => {
      console.error(e);
    })
    req.write(JSON.stringify(json))
    req.end();
  });
}



export function getType (o) {
  const t = typeof o;
  switch (t) {
    case 'string': 
      return 'String!';
    case 'boolean':
      return 'Boolean';
    case 'number':
      if (o % 1 === 0) {
        return 'Int';
      } else {
        return 'Float'
      }
  }
}