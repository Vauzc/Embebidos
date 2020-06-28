const Nightmare = require('nightmare')
const cheerio = require('cheerio');
const nightmare = Nightmare({ show: true });
const url = 'https://autenticasia.unal.edu.co/oam/server/obrareq.cgi?encquery%3Db4SB5OKQWEniVEAxs079%2BwM3TPxL9mP3FNsTXPwW0Qd11OQXD%2FARnMGTOSKdXjmjTb7EKkee5lX6Ct5g%2FA%2B%2B3HwSri3taSdrgBg7LjoCBmh8HNV3SrJhWCZTM915etxAEWSBktueipDj8Lkq3KpFttGwT0dHZoriwZaf1gSLbpjavhQR44HQjgrqySkLoxrDl3wQUBHPM9HtZxH%2BJgdVPmUmNbDRG3dklTn29mFoo07ZrPhMRGDNjdoQbiV6F7UdEtFT5Z8C54mCyMvfETTA1CNBpnKBJQJsxSgqsgmlkr0AB8yiNBQMMvXqMewzXj%2BH%2F9LgTJXspm25KR4TnlRfnfE%2FQIhwgAQN%2BmajU6x8fzbUXLftlSh8St%2Fr7mtT1nP6O1zx8hugnl03aGb0QKxvdhwznBin69h90u%2BnAvMWWliziKEz2dT%2FfQorV%2BwQbmZmzjz3zpBLgzwTfJ5swA6%2BeeA4if%2B91KwUCSiE9XfrbMkvGf2PF4PV8l3dEDkUJ%2F8RVSoEW1aSM9Fn92JSNpXJdUsYLZ%2FShZPEbTFDMLRlzRS5lgO0YlLYfV7AoWY2C7rqCL2gUBPuPe3sAtipXvxPHZZreIT%2FNqMihcFAOxJXJV49AQjTaweFE2fa2LMB5uhqiIVwLl2188ooVPZOrOceMyT19gL6A7ZXs%2B372j35aUhojtE4O%2FQE2k1SE8zHIy%2FidAauIloOcg3nLTJbZwJCPzCnb2eT5UweaIy1NS3Rcpvl2y4oa3HC2jWc7d5qxN8804o0boUiQQjOuNhs3dZsAeHxPBVnkPuQuuwGSnNyR%2F4nfglGzWvh27G205MmQTrWifECiyIQGRjas0ICpC6j%2B5tCJ6rLG1RNCXgjcNeiQZw7fbBSlm4VZinNlIyd4anHEzXYCwei23DfiZjbngQVRJtnAaAcTxp1%2FaM5I%2B1jTLb3Th8LesFPUxCcCTR4CW6yhh1GHm987cfxasuFOf8ueWk8CaiH%2Fk%2BfHDaqBH3LK3InwlXFEBrEKcoLtI2LSl5r8mVIOvs1JKcXzWehpcoJeTzIZfZjRiu6PGO8NpzJagY6ideMWu1z1W6%2FnT465Z8i%2BiR5QmPiTSSvow8cZXermtWWhUPjUBdfTgN%2Few%2FSqKlF1ygzK%2BqVbv%2FElj6LWwGycfkXQ9Tck%2BeQHFIzlbll%2FRYMThwL3e%2F6am3JbFZWe%2F9jhFOIo66r1pPqVylp9tYO%2FeNBsJezGVM%2Bc1ZPzKX9oheJubSpUlRWR8Nkiy5QuqA7fAIJBbjCBVpF454T87sXg%2FN3gnU%2FetK9X%2FEhvqdwUA%3D%3D%20agentid%3DWT_uncuxwebX%20ver%3D1%20crmethod%3D2&ECID-Context=1.005bmxqKv5O6qIRMyYNa6G000UzU005v4s%3BkXjE';
data_o = [];
td=[];
cantidad=[7,8,1,3,16,2,1,10,6,2,1,1]

var mqtt = require('mqtt')



  var i_1 = 0;
  
  nightmare
    .goto(url)
    .type('#username', '')
    .type('#password', '')
    .click('.btn.btn-success.btn-lg')
    .wait(20000)
    .wait('.af_panelAccordion_header-title[title="Otros"]')
    .click('.af_panelAccordion_header-title[title="Otros"]')
    .wait('.ocu-menuVerticalItem.AS_ASS_CAT.af_commandNavigationItem[title="Catálogo de asignaturas"]')
    .click('.ocu-menuVerticalItem.AS_ASS_CAT.af_commandNavigationItem[title="Catálogo de asignaturas"]')
    .wait('#pt1\\:r1\\:1\\:soc1\\:\\:content')
    .click('#pt1\\:r1\\:1\\:soc1\\:\\:content')
    .select('#pt1\\:r1\\:1\\:soc1\\:\\:content',0)
    .wait(5000)

    .wait('#pt1\\:r1\\:1\\:soc9\\:\\:content')
    .click('#pt1\\:r1\\:1\\:soc9\\:\\:content')
    .select('#pt1\\:r1\\:1\\:soc9\\:\\:content',2)
    .wait(4000);
  scrap(0,0)



async function scrap(i,i_1){ 
  var i_2=i
  var i_3=i_1
    
      nightmare
        .wait('#pt1\\:r1\\:1\\:soc2\\:\\:content')
        .click('#pt1\\:r1\\:1\\:soc2\\:\\:content')
        .select('#pt1\\:r1\\:1\\:soc2\\:\\:content',i_1)
        .wait(6000)
        .wait('#pt1\\:r1\\:1\\:soc3\\:\\:content')
        .click('#pt1\\:r1\\:1\\:soc3\\:\\:content')
        .select('#pt1\\:r1\\:1\\:soc3\\:\\:content',i)
        .wait(6000)
        .click('#pt1\\:r1\\:1\\:cb1')
        .wait(6000)  
        .evaluate(() => document.querySelector('body').innerHTML)
        .then(response => {
            data_o=(getData(response)).concat(data_o)
            console.log(data_o)
            i_2=i_2+1;
            if(i_2<=cantidad[i_3]){
              scrap(i_2,i_3)
            }else{
              i_3=i_3+1;
              if(i_3<=12){
                scrap(0,i_3)
              }else{
                nightmare
                  .end()
                  .then(response =>{
                    console.log('al menos llegué acá')
                    var j=0;
                    var client = mqtt.connect('http://aulal.org:1883', {
                      username: 'mqtt',
                      password: 'mqtt'
                    });
                    client.on('connect', function () {
                      client.subscribe('/TIUN/v/', function (err) {
                        if (!err) {
                          const all = setInterval(function () {
                            try  {
                              client.publish('/TIUN/v/', "insert into materia (codigo, nombre, creditos, tipologia, descripcion, facultad, carrera) values('" + (data_o)[j].Codigo + "','" + (data_o)[j].Asignatura + "'," + (data_o)[j].Creditos + ",'" + (data_o)[j].Tipologia + "','" + (data_o)[j].Descripcion + "','" + (data_o)[j].Facultad + "','" + (data_o)[j].Carrera + "');");
                              j = j + 1;
                            }catch {
                              clearInterval(all);
                              client.end();
                            }
                          }, 10);


                        }
                      })

                    })
                    client.on('message', function (topic, message) {
                      console.log(message.toString());
                      console.log(data_o.length);
                    })

                    return
                  }).catch(err => {
                    console.log(err);
                  });
              }
            }
          }).catch(err => {
            console.log(err);
          });
        
}


let getData = html => {
  data = []
  const $ = cheerio.load(html);
  const tds =$('#pt1\\:r1\\:1\\:t4\\:\\:db > table > tbody').find('tr')
  for(var i = 1;i<tds.length+1;i++){
    data.push({
      Codigo: $('#pt1\\:r1\\:1\\:t4\\:\\:db > table > tbody > tr:nth-child('+ i +') > td:nth-child(1) > span > a').text(),
      Asignatura: ($('#pt1\\:r1\\:1\\:t4\\:\\:db > table > tbody > tr:nth-child('+ i +') > td:nth-child(2) > span > span').text()).trim(),
      Creditos: parseFloat($('#pt1\\:r1\\:1\\:t4\\:\\:db > table > tbody > tr:nth-child('+ i +') > td:nth-child(3) > span > span').text(),10),
      Tipologia: ($('#pt1\\:r1\\:1\\:t4\\:\\:db > table > tbody > tr:nth-child('+ i +') > td:nth-child(4) > span > span').text()).trim(),
      Descripcion: ($('#pt1\\:r1\\:1\\:t4\\:\\:db > table > tbody > tr:nth-child('+ i +') > td:nth-child(5) > span > span').text()).trim(),
      Facultad: $('#pt1\\:r1\\:1\\:soc2\\:\\:content').attr("title"),
      Carrera: $('#pt1\\:r1\\:1\\:soc3\\:\\:content').attr("title")
    })
  }
  return data
}

