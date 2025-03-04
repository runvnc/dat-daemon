#!/usr/bin/env node
const setup = require('./init').setup;
const getstdin = require('get-stdin');
const readline = require('readline-promise').default;
 
console.log(readline);

const rlp = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});
 
let client;

async function go() {
  console.log("Starting..");
  client = await setup();
  let cmd, tokens, tokenstr, resp;
  do {
    tokenstr = await rlp.questionAsync('>');
    tokens = tokenstr.split(' ');
    [cmd, arg] = tokens;
    let st = Date.now();
    switch (cmd) {
      case 'list':	
        let list = await client.list();
        for (let dat of list)
          console.log(`${dat.path} ${dat.key}`);
        break;
      case 'add':
        console.log('Adding',arg);
        resp = await client.add('dats/'+arg, arg);
        console.log('Daemon reply: ',resp);
        break;
      case 'remove':
        console.log('Removing',arg);
        resp = await client.removeList(arg);
        console.log(resp);
        break;
      case 'info':
        const answer = await client.info(arg)
        console.log(JSON.stringify(answer.statistics));
        break; 
      case 'q':
        process.exit();
        break;
    }
    console.log('Done in',Date.now()-st,'ms.');
  } while (cmd != 'q');

}

go().catch(console.error)
