const Nightmare = require('nightmare')
const cheerio = require('cheerio');
const nightmare = Nightmare({ show: true });
const url = 'https://autenticasia.unal.edu.co/oam/server/obrareq.cgi?encquery%3Db4SB5OKQWEniVEAxs079%2BwM3TPxL9mP3FNsTXPwW0Qd11OQXD%2FARnMGTOSKdXjmjTb7EKkee5lX6Ct5g%2FA%2B%2B3HwSri3taSdrgBg7LjoCBmh8HNV3SrJhWCZTM915etxAEWSBktueipDj8Lkq3KpFttGwT0dHZoriwZaf1gSLbpjavhQR44HQjgrqySkLoxrDl3wQUBHPM9HtZxH%2BJgdVPmUmNbDRG3dklTn29mFoo07ZrPhMRGDNjdoQbiV6F7UdEtFT5Z8C54mCyMvfETTA1CNBpnKBJQJsxSgqsgmlkr0AB8yiNBQMMvXqMewzXj%2BH%2F9LgTJXspm25KR4TnlRfnfE%2FQIhwgAQN%2BmajU6x8fzbUXLftlSh8St%2Fr7mtT1nP6O1zx8hugnl03aGb0QKxvdhwznBin69h90u%2BnAvMWWliziKEz2dT%2FfQorV%2BwQbmZmzjz3zpBLgzwTfJ5swA6%2BeeA4if%2B91KwUCSiE9XfrbMkvGf2PF4PV8l3dEDkUJ%2F8RVSoEW1aSM9Fn92JSNpXJdUsYLZ%2FShZPEbTFDMLRlzRS5lgO0YlLYfV7AoWY2C7rqCL2gUBPuPe3sAtipXvxPHZZreIT%2FNqMihcFAOxJXJV49AQjTaweFE2fa2LMB5uhqiIVwLl2188ooVPZOrOceMyT19gL6A7ZXs%2B372j35aUhojtE4O%2FQE2k1SE8zHIy%2FidAauIloOcg3nLTJbZwJCPzCnb2eT5UweaIy1NS3Rcpvl2y4oa3HC2jWc7d5qxN8804o0boUiQQjOuNhs3dZsAeHxPBVnkPuQuuwGSnNyR%2F4nfglGzWvh27G205MmQTrWifECiyIQGRjas0ICpC6j%2B5tCJ6rLG1RNCXgjcNeiQZw7fbBSlm4VZinNlIyd4anHEzXYCwei23DfiZjbngQVRJtnAaAcTxp1%2FaM5I%2B1jTLb3Th8LesFPUxCcCTR4CW6yhh1GHm987cfxasuFOf8ueWk8CaiH%2Fk%2BfHDaqBH3LK3InwlXFEBrEKcoLtI2LSl5r8mVIOvs1JKcXzWehpcoJeTzIZfZjRiu6PGO8NpzJagY6ideMWu1z1W6%2FnT465Z8i%2BiR5QmPiTSSvow8cZXermtWWhUPjUBdfTgN%2Few%2FSqKlF1ygzK%2BqVbv%2FElj6LWwGycfkXQ9Tck%2BeQHFIzlbll%2FRYMThwL3e%2F6am3JbFZWe%2F9jhFOIo66r1pPqVylp9tYO%2FeNBsJezGVM%2Bc1ZPzKX9oheJubSpUlRWR8Nkiy5QuqA7fAIJBbjCBVpF454T87sXg%2FN3gnU%2FetK9X%2FEhvqdwUA%3D%3D%20agentid%3DWT_uncuxwebX%20ver%3D1%20crmethod%3D2&ECID-Context=1.005bmxqKv5O6qIRMyYNa6G000UzU005v4s%3BkXjE';
data_o = [];

async function scrapeChannel(user, pass) {
  nightmare
    .goto(url)
    .type('#username', user)
    .type('#password', pass)
    .click('.btn.btn-success.btn-lg')
    .wait(20000)
    .wait('.container-wrapper.af_panelGridLayout')
    .click('.af_panelAccordion_header-toolbar')
    .wait('.container-wrapper.af_panelGridLayout')
    .wait(1000)
    .click('.ocu-menuVerticalItem.AC_EXP_ALU.af_commandNavigationItem')
    .wait('.bloque-opciones.af_panelBorderLayout')
    .wait(100)
    .evaluate(() => document.querySelector('body').innerHTML)
    .then(response => {
      data_o.push(getData_HA(response));
      nightmare
        .click('.ocu-menuVerticalItem.AC_DAT_PER.af_commandNavigationItem')
        .wait('.af_inputText_content')
        .wait(100)
        .evaluate(() => document.querySelector('body').innerHTML)

        .then(response => {
          data_o = (getData_DP(response)).concat(data_o);
          nightmare
            .click('.af_panelAccordion_header-end')
            .wait(5000)
            .click('.af_panelAccordion_header-subsequent')
            .wait(5000)
            .click('.ocu-menuVerticalItem.AC_MIS_CIT.af_commandNavigationItem')
            .wait(5000)

            .evaluate(() => document.querySelector('body').innerHTML)
            .then(response => {
              data_o = (getData_cita(response)).concat(data_o);
              nightmare
                .click('.ocu-menuVerticalItem.AC_MI_HOR.af_commandNavigationItem')
                .wait(5000)
                .click('.af_button.p_AFIconOnly.p_AFLeading[title="Semana"]')
                .wait(5000)
                .evaluate(() => document.querySelector('body').innerHTML)
                .end()
                .then(response => {
                  data_o = (getData_Hor(response)).concat(data_o);
                  console.log(data_o);

                }).catch(err => {
                  console.log(err);
                });
            }).catch(err => {
              console.log(err);
            });
        }).catch(err => {
          console.log(err);
        });
    }).catch(err => {
      console.log(err);
    })


  let getData_HA = html => {
    data = [];
    const $ = cheerio.load(html);
    data.push({
      TITLE: "PAPA",
      VALOR: parseFloat(($('.promedios-valor').text()).replace(',', '.'), 10)
    });
    data.push({
      TITLE: 'Carrera',
      VALOR: $('.h2.af_panelGroupLayout > h2').text()
    });
    data.push({
      TITLE: "Facultad",
      VALOR: ($('.margin-t.salto').text()).replace('Facultad: ', '')
    });
    data.push({
      TITLE: "Porcentaje de avance",
      VALOR: parseFloat(($('.bloque-r.estado-aceptado.af_panelGroupLayout > span').text()).replace(',', '.'), 10)
    });
    return data;
  }

  let getData_DP = html => {
    data = [];
    const $ = cheerio.load(html);
    data.push({
      TITLE: "Nombre",
      VALOR: ($('.AFPanelFormLayoutContentCell > span[id="pt1:r1:2:ot4::content"]').text()).replace('                                   ', ' ')
    });

    return data;
  }
  let getData_cita = html => {
    data = [];
    const $ = cheerio.load(html);

    const col1 = $('.af_panelBox_center > div>div').find('span');
    data.push({
      TITLE: "Citación",
      VALOR: $(col1[8]).text().replace('De', ' De ')
    });






    return data;
  }

  let getData_Hor = html => {
    data = [];
    data2 = [];
    Dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    const $ = cheerio.load(html);
    $('.af_calendar_time-activities-cell ').each((i, elem_1) => {
      $(elem_1).find('div >.af_calendar_time-activity-outer-container').each((j, elem) => {
        const col1 = $(elem).find('div > dl > dd');
        const col2 = $(elem).find('div > dl > dt');
        const col3 = $(elem).find('div > dl')
        const fin = $(col3).attr('style')
        data2.push({
          Nomgrupo: $(col1).text(),
          numero: Dias[i],
          Hor_ini: $(col2).text(),
          Duracion: (parseFloat(((fin.replace("height:", "")).replace(".", ",")).replace("em;", ""), 10) / 3)
        });
      });


    });
    data.push({
      TITLE: 'Horario',
      VALOR: data2
    });
    return data;
  }

  const Nom = data_o[2].VALOR;
  const Fac = data_o[3][2].VALOR;
  const Car = data_o[3][1].VALOR;
  const PA = data_o[3][0].VALOR;
  const Av = data_o[3][3].VALOR;
  const Hor = data_o[0].VALOR;
  const Cit = data_o[1].VALOR;



  //console.log(Car);
  return { Nom, Fac, Car, PA, Av, Hor, Cit }

}

module.exports = {
  scrapeChannel
}
