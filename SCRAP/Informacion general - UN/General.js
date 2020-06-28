const Nightmare = require("nightmare");
const cheerio = require("cheerio");
const nightmare = Nightmare({ show: true, waitTimeout: 10000 });
const bodyParser = require('body-parser');

const selec = ['#node-246', '#node-342', '#node-250', '#node-362', '#node-251', '#node-252', '#node-254', '#node-255', '#node-312', '#node-247', '#node-248', '#node-249'];
var a;
var i = 0;



const url_MyB = "https://bogota.unal.edu.co/convocatorias/monitores/archivo/";
const url_L = "https://bogota.unal.edu.co/convocatorias/oportunidades-laborales-externas/oportunidades/cerradas/";
const url_DME = "https://admisiones.unal.edu.co/posgrado/oferta-de-programas-curriculares/";
const url_Not_1 = "https://agenciadenoticias.unal.edu.co";
const url_Not_2 = "https://bogota.unal.edu.co/circular-un-bogota/";
const url_Not_3 = "https://bogota.unal.edu.co/noticias/eventos-academicos/";
const url_Not_4 = "http://patrimoniocultural.bogota.unal.edu.co";
const url_tut_1 = "http://diracad.bogota.unal.edu.co/gruposestudioautonomo";
const Gder = 'http://derecho.bogota.unal.edu.co/investigacion/grupos-semilleros-y-observatorios/';
const Gcien = 'http://ciencias.bogota.unal.edu.co/menu-principal/investigacion/grupos-de-investigacion/';
const Gagro = ['http://www.cienciasagrarias.bogota.unal.edu.co/agricultura-ambiente-y-sociedad-agras', 'http://www.cienciasagrarias.bogota.unal.edu.co/grupo-interinstitucional-de-investigación-biogénesis', 'http://www.cienciasagrarias.bogota.unal.edu.co/grupo-de-investigación-en-papa', 'http://www.cienciasagrarias.bogota.unal.edu.co/agrogestik', 'http://www.cienciasagrarias.bogota.unal.edu.co/horticultura', 'http://www.cienciasagrarias.bogota.unal.edu.co/manejo-integrado-de-plagas', 'http://www.cienciasagrarias.bogota.unal.edu.co/sistemas-integrales-de-producción-agrícola-y-forestal-sipaf', 'http://www.cienciasagrarias.bogota.unal.edu.co/sistemática-de-insectos-agronomía-sia', 'http://www.cienciasagrarias.bogota.unal.edu.co/análisis-espacial-del-territorio-y-del-cambio-global-aet-cg', 'http://www.cienciasagrarias.bogota.unal.edu.co/desarrollo-sostenible-y-gestión-ambiental', 'http://www.cienciasagrarias.bogota.unal.edu.co/genética-de-rasgos-de-interés-agronómico', 'http://www.cienciasagrarias.bogota.unal.edu.co/gestión-y-desarrollo-rural'];

const Sagro = 'http://www.cienciasagrarias.bogota.unal.edu.co/semilleros-de-investigación'
const Tuting = 'https://ingenieria.bogota.unal.edu.co/es/dependencias/vicedecanatura-academica/tutorias-academicas.html#perfil-3-circuitos-senales-y-controlhttps://ingenieria.bogota.unal.edu.co/es/dependencias/vicedecanatura-academica/tutorias-academicas.html';

var mqtt = require('mqtt')



data_G_MyB = [];
data_G_L = [];
data_G_DME = [];
data_Not = [];
data_tut = [];
data_Gru = [];
data_o = [];



nightmare
  .goto(url_MyB)
  .wait(".tx-monitores")
  .evaluate(() => document.querySelector("body").innerHTML)
  .then(response => {
    data_G_MyB = data_G_MyB.concat(getData_MyB_UN(response));
    nightmare
      .goto(url_L)
      .wait(".tx_ofertaslaborales")
      .evaluate(() => document.querySelector("body").innerHTML)
      .then(response => {
        data_G_L = data_G_L.concat(getData_L_UN(response));
        var texto =
          (".row.text-center.row-eq-height > div:nth-child(1) > div > header > h3 > a");
        nightmare
          .goto(url_DME)
          .wait("body")
          .click(texto)
          .wait('#programas > div > button[data-target="#BOGOTÁ"]')
          .click('#programas > div > button[data-target="#BOGOTÁ"]')
          .wait("#BOGOTÁ > h3")
          .evaluate(() => document.querySelector("body").innerHTML)
          .then(response => {
            data_G_DME = data_G_DME.concat(getData_DME(response, "Doctorado"));
            var texto =
              (".row.text-center.row-eq-height > div:nth-child(2) > div > header > h3 > a");
            nightmare
              .goto(url_DME)
              .wait("body")
              .click(texto)
              .wait('#programas > div > button[data-target="#BOGOTÁ"]')
              .click('#programas > div > button[data-target="#BOGOTÁ"]')
              .wait("#BOGOTÁ > h3")
              .evaluate(() => document.querySelector("body").innerHTML)
              .then(response => {
                data_G_DME = data_G_DME.concat(
                  getData_DME(response, "Maestria")
                );
                var texto =
                  (".row.text-center.row-eq-height > div:nth-child(3) > div > header > h3 > a");
                nightmare
                  .goto(url_DME)
                  .wait("body")
                  .click(texto)
                  .wait('#programas > div > button[data-target="#BOGOTÁ"]')
                  .click('#programas > div > button[data-target="#BOGOTÁ"]')
                  .wait("#BOGOTÁ > h3")
                  .evaluate(() => document.querySelector("body").innerHTML)
                  .then(response => {
                    data_G_DME = data_G_DME.concat(
                      getData_DME(response, "Especializacion")
                    );
                    var texto =
                      (".row.text-center.row-eq-height > div:nth-child(4) > div > header > h3 > a");
                    nightmare
                      .goto(url_DME)
                      .wait("body")
                      .click(texto)
                      .wait('#programas > div > button[data-target="#BOGOTÁ"]')
                      .click(
                        '#programas > div > button[data-target="#BOGOTÁ"]'
                      )
                      .wait("#BOGOTÁ > h3")
                      .evaluate(() => document.querySelector("body").innerHTML)
                      .then(response => {
                        data_G_DME = data_G_DME.concat(
                          getData_DME(response, "Especializacion")
                        );
                        nightmare
                          .goto(url_Not_1)
                          .wait("body")
                          .evaluate(() => document.querySelector("body").innerHTML)
                          .then(response => {
                            data_Not = data_Not.concat(
                              getData_Not_1(response)
                            );
                            nightmare
                              .goto(url_Not_2)
                              .wait("body")
                              .evaluate(() =>
                                document.querySelector("body").innerHTML
                              )
                              .then(response => {
                                data_Not = data_Not.concat(
                                  getData_Not_2(response)
                                );
                                nightmare
                                  .goto(url_Not_3)
                                  .wait("body")
                                  .evaluate(() =>
                                    document.querySelector("body").innerHTML
                                  )
                                  .then(response => {
                                    data_Not = data_Not.concat(
                                      getData_Not_3(response)
                                    );
                                    nightmare
                                      .goto(url_Not_4)
                                      .wait("body")
                                      .evaluate(() =>
                                        document.querySelector("body")
                                          .innerHTML
                                      )
                                      .then(response => {
                                        data_Not = data_Not.concat(
                                          getData_Not_4(response)
                                        );
                                        nightmare
                                          .goto(url_tut_1)
                                          .wait("body")
                                          .click("#btn_asignaturas_apoyadas")
                                          .wait("#div_asignaturas_apoyadas")
                                          .evaluate(() =>
                                            document.querySelector("body")
                                              .innerHTML
                                          )
                                          .then(response => {
                                            data_tut = data_tut.concat(
                                              getData_tut_1(response)
                                            );
                                            nightmare//inicia derecho
                                              .goto(Gder)
                                              .wait('body')
                                              .evaluate(() => document.querySelector('body').innerHTML)
                                              .then(response => {
                                                a = '#c66 > div > div>div';
                                                data_Gru = data_Gru.concat((getGder(response)));
                                                nightmare
                                                  .click('body > main > div > div.col-md-offset-1.col-md-10 > div > ul > li:nth-child(2) > a')
                                                  .wait('#c1850 > div > div')
                                                  .evaluate(() => document.querySelector('body').innerHTML)
                                                  .then(response => {
                                                    a = '#c1850 > div > div>div';
                                                    data_Gru.concat(getGder(response));
                                                    nightmare
                                                      .click('body > main > div > div.col-md-offset-1.col-md-10 > div > ul > li.active > a')
                                                      .wait('#c1851 > div > div')
                                                      .evaluate(() => document.querySelector('body').innerHTML)
                                                      .then(response => {
                                                        a = '#c1851 > div > div>div';
                                                        data_Gru =data_Gru.concat(getGder(response));
                                                        nightmare //ciencias
                                                          .goto(Gcien)
                                                          .wait('body')
                                                          .evaluate(() => document.querySelector('body').innerHTML)
                                                          .then(response => {
                                                            data_Gru =data_Gru.concat((getGcien(response)));
                                                            nightmare // Grupos agronomía
                                                              .goto(Gagro[i])
                                                              .wait('body')
                                                              .evaluate(() => document.querySelector('body').innerHTML)
                                                              .then(response => {
                                                                data_Gru =data_Gru.concat(getGagro(response));
                                                                i++;
                                                                nightmare
                                                                  .goto(Gagro[i])
                                                                  .wait('body')
                                                                  .evaluate(() => document.querySelector('body').innerHTML)
                                                                  .then(response => {
                                                                    data_Gru =data_Gru.concat(getGagro(response));
                                                                    i++;
                                                                    nightmare
                                                                      .goto(Gagro[i])
                                                                      .wait('body')
                                                                      .evaluate(() => document.querySelector('body').innerHTML)
                                                                      .then(response => {
                                                                        data_Gru =data_Gru.concat(getGagro(response));
                                                                        i++;
                                                                        nightmare
                                                                          .goto(Gagro[i])
                                                                          .wait('body')
                                                                          .evaluate(() => document.querySelector('body').innerHTML)
                                                                          .then(response => {
                                                                            data_Gru =data_Gru.concat(getGagro(response));
                                                                            i++;
                                                                            nightmare
                                                                              .goto(Gagro[i])
                                                                              .wait('body')
                                                                              .evaluate(() => document.querySelector('body').innerHTML)
                                                                              .then(response => {
                                                                                data_Gru = data_Gru.concat(getGagro(response));
                                                                                i++;
                                                                                nightmare
                                                                                  .goto(Gagro[i])
                                                                                  .wait('body')
                                                                                  .evaluate(() => document.querySelector('body').innerHTML)
                                                                                  .then(response => {
                                                                                    data_Gru =data_Gru.concat(getGagro(response));
                                                                                    i++;
                                                                                    nightmare
                                                                                      .goto(Gagro[i])
                                                                                      .wait('body')
                                                                                      .evaluate(() => document.querySelector('body').innerHTML)
                                                                                      .then(response => {
                                                                                        data_Gru =data_Gru.concat(getGagro(response));
                                                                                        i++;
                                                                                        nightmare
                                                                                          .goto(Gagro[i])
                                                                                          .wait('body')
                                                                                          .evaluate(() => document.querySelector('body').innerHTML)
                                                                                          .then(response => {
                                                                                            data_Gru =data_Gru.concat(getGagro(response));
                                                                                            i++;
                                                                                            nightmare
                                                                                              .goto(Gagro[i])
                                                                                              .wait('body')
                                                                                              .evaluate(() => document.querySelector('body').innerHTML)
                                                                                              .then(response => {
                                                                                                data_Gru =data_Gru.concat(getGagro(response));
                                                                                                i++;
                                                                                                nightmare
                                                                                                  .goto(Gagro[i])
                                                                                                  .wait('body')
                                                                                                  .evaluate(() => document.querySelector('body').innerHTML)
                                                                                                  .then(response => {
                                                                                                    data_Gru =data_Gru.concat(getGagro(response));
                                                                                                    i++;
                                                                                                    nightmare
                                                                                                      .goto(Gagro[i])
                                                                                                      .wait('body')
                                                                                                      .evaluate(() => document.querySelector('body').innerHTML)
                                                                                                      .then(response => {
                                                                                                        data_Gru =data_Gru.concat(getGagro(response));
                                                                                                        i++;
                                                                                                        nightmare
                                                                                                          .goto(Gagro[i])
                                                                                                          .wait('body')
                                                                                                          .evaluate(() => document.querySelector('body').innerHTML)
                                                                                                          .then(response => {
                                                                                                            data_Gru =data_Gru.concat(getGagro(response));
                                                                                                            nightmare //Semilleros agronomía
                                                                                                              .goto(Sagro)
                                                                                                              .wait('body')
                                                                                                              .evaluate(() => document.querySelector('body').innerHTML)
                                                                                                              .then(response => {
                                                                                                                data_Gru =data_Gru.concat(getSagro(response));
                                                                                                                nightmare //Tutorias ingenieria
                                                                                                                  .goto(Tuting)
                                                                                                                  .wait('body')
                                                                                                                  .evaluate(() => document.querySelector('body').innerHTML)
                                                                                                                  .end()
                                                                                                                  .then(async (response) => {
                                                                                                                    data_tut = data_tut.concat((getTuti(response)));
                                                                                                                    data_o = [
                                                                                                                      data_G_MyB,
                                                                                                                      data_G_L,
                                                                                                                      data_G_DME,
                                                                                                                      data_Not,
                                                                                                                      data_tut,
                                                                                                                      data_Gru
                                                                                                                    ];
                                                                                                                    // //////////////////////////////CONEXION CON RASPI ////////////////////////////////////////////
                                                                                                                    var j = 0;
                                                                                                                    var j2 = 0;
                                                                                                                    var j3 = 0;
                                                                                                                    var j4 = 0;
                                                                                                                    var j5 = 0;
                                                                                                                    var j6 = 0;
                                                                                                                    var max = Math.max(data_o[0].length, data_o[1].length, data_o[2].length, data_o[3].length, data_o[4].length, data_o[5].length);


                                                                                                                    var client = mqtt.connect('http://aulal.org:1883', {
                                                                                                                      username: 'mqtt',
                                                                                                                      password: 'mqtt'
                                                                                                                    });
                                                                                                                    /*client.on('connect', function () {
                                                                                                                      client.subscribe('/TIUN/v/', function (err) {
                                                                                                                        if (!err) {
                                                                                                                          const all = setInterval(function () {
                                                                                                                            if (j < data_o[0].length) {
                                                                                                                              client.publish('/TIUN/v/', "insert into convocatorias values(" + (data_o[0])[j].Numero + ",'" + (data_o[0])[j].Facultad + "','" + (data_o[0])[j].Modalidad + "','" + (data_o[0])[j].Dirigida_a + "','" + (data_o[0])[j].Tipo + "','" + (data_o[0])[j].Nombre + "'," + (data_o[0])[j].Est_req + "," + (data_o[0])[j].CS + "," + (data_o[0])[j].Recurso + ");");
                                                                                                                              j = j + 1;
                                                                                                                            } else if (j < max && j >= data_o[0].length) {
                                                                                                                              j = j + 1;
                                                                                                                            } else {
                                                                                                                              clearInterval(all);
                                                                                                                              client.end();
                                                                                                                            }
                                                                                                                          }, 10);


                                                                                                                        }
                                                                                                                      })

                                                                                                                    })
                                                                                                                    client.on('message', function (topic, message) {
                                                                                                                      console.log(message.toString());
                                                                                                                    })
*/
                                                                                                                    /*client.subscribe('/TIUN/v/', function (err) {
                                                                                                                      if (!err) {
                                                                                                                        const all2 = setInterval(function () {
                                                                                                                          if (j2 < data_o[1].length) {
                                                                                                                            client.publish('/TIUN/v/', "insert into laboral values(" + (data_o[1])[j2].Numero + ",'" + (data_o[1])[j2].Cargo + "','" + (data_o[1])[j2].Tiempo + "'," + (data_o[1])[j2].Cantidad + ",'" + (data_o[1])[j2].Avance + "','" + (data_o[1])[j2].Fecha + "','" + (data_o[1])[j2].link + "');");
                                                                                                                            j2 = j2 + 1;
                                                                                                                          } else if (j2 < max && j2 >= data_o[1].length) {
                                                                                                                            j2 = j2 + 1;
                                                                                                                          } else {
                                                                                                                            clearInterval(all2);
                                                                                                                            client.end();
                                                                                                                          }

                                                                                                                        }, 10);

                                                                                                                      }
                                                                                                                    })
                                                                                                                    client.subscribe('/TIUN/v/', function (err) {
                                                                                                                      if (!err) {
                                                                                                                        const all3 = setInterval(function () {
                                                                                                                          if (j3 < data_o[2].length) {
                                                                                                                            client.publish('/TIUN/v/', "insert into posgrado (tipologia, facultad, nombre) values('" + (data_o[2])[j3].Tipologia + "','" + (data_o[2])[j3].Nombre + "','" + (data_o[2])[j3].Facultad + "');");

                                                                                                                            j3 = j3 + 1;
                                                                                                                          } else if (j3 < max && j3 >= data_o[2].length) {
                                                                                                                            j3 = j3 + 1;
                                                                                                                          } else {
                                                                                                                            clearInterval(all3);
                                                                                                                            client.end();
                                                                                                                          }
                                                                                                                        }, 10);

                                                                                                                      }
                                                                                                                    })
                                                                                                                    client.subscribe('/TIUN/v/', function (err) {
                                                                                                                      if (!err) {
                                                                                                                        const all4 = setInterval(function () {
                                                                                                                          if (j4 < data_o[3].length) {
                                                                                                                            client.publish('/TIUN/v/', "insert into noticias (fecha, nombre,imagen,link) values('" + (data_o[3])[j4].Fecha + "','" + (data_o[3])[j4].Nombre + "','" + (data_o[3])[j4].Imagen + "','" + (data_o[3])[j4].Link + "');");

                                                                                                                            j4 = j4 + 1;
                                                                                                                          } else if (j4 < max && j4 >= data_o[3].length) {
                                                                                                                            j4 = j4 + 1;
                                                                                                                          } else {
                                                                                                                            clearInterval(all4);
                                                                                                                            client.end();
                                                                                                                          }
                                                                                                                        }, 10);

                                                                                                                      }
                                                                                                                    })
                                                                                                                    client.subscribe('/TIUN/v/', function (err) {
                                                                                                                      if (!err) {
                                                                                                                        const all5 = setInterval(function () {
                                                                                                                          if (j5 < data_o[4].length) {
                                                                                                                            client.publish('/TIUN/v/', "insert into tutorias_institucionales (area,materia,fecha,dia,hora,lugar) values('" + (data_o[4])[j5].Tema + "','" + (data_o[4])[j5].Materia + "','" + (data_o[4])[j5].Fecha + "','" + (data_o[4])[j5].Dia + "','" + (data_o[4])[j5].Hora + "','" + (data_o[4])[j5].Lugar + "');");

                                                                                                                            j5 = j5 + 1;
                                                                                                                          } else if (j5 < max && j5 >= data_o[4].length) {
                                                                                                                            j5 = j5 + 1;
                                                                                                                          } else {
                                                                                                                            clearInterval(all5);
                                                                                                                            client.end();
                                                                                                                          }
                                                                                                                        }, 10);

                                                                                                                      }
                                                                                                                    })*/
                                                                                                                    client.subscribe('/TIUN/v/', function (err) {
                                                                                                                      if (!err) {
                                                                                                                        const all6 = setInterval(function () {
                                                                                                                          if (j6 < data_o[5].length) {
                                                                                                                            client.publish('/TIUN/v/', "insert into gruposu(nombre,descripcion, lineas,dept,link,facultad,tipo) values('" + (data_o[5])[j6].Nomgrupo + "','" + (data_o[5])[j6].Descrip + "','" + (data_o[5])[j6].Lineas + "','" + (data_o[5])[j6].Dpto + "','" + (data_o[5])[j6].Link + "','" + (data_o[5])[j6].Facultad + "','" + (data_o[5])[j6].Tipo + "');");
                                                                                                                            j6 = j6 + 1;
                                                                                                                          } else if (j6 < max && j6 >= data_o[5].length) {
                                                                                                                            j6 = j6 + 1;
                                                                                                                          } else {
                                                                                                                            clearInterval(all6);
                                                                                                                            client.end();
                                                                                                                          }
                                                                                                                        }, 10);

                                                                                                                      }
                                                                                                                    })
                                                                                                                    console.log(data_o[5].length)
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
                                                                                                      });
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
                                                                                      });
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
                                                                      });
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
                                                      });
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
                                      });
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
                      });
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
      });
  }).catch(err => {
    console.log(err);
  });



let getData_MyB_UN = html => {
  data = [];
  const $ = cheerio.load(html);
  $("#solicitudes_archive > tbody > tr").each((row, raw_element) => {
    const tds = $(raw_element).find("td");
    const Numero = $(tds[0]).text();
    const Facultad = $(tds[1]).text();
    const Modalidad = $(tds[2]).text();
    const Dirigida_a = $(tds[3]).text();
    const Tipo = $(tds[4]).text();
    var Nombre = "";
    if ($(tds[5]).contents().length > 1) {
      Nombre = $(tds[4]).text();
    } else {
      Nombre = $(tds[5]).text();
    }
    const Est_req = $(tds[6]).text();
    const CS = $(tds[7]).text();
    const Recurso = $(tds[8]).text();
    const tableRow = {
      Numero: parseFloat(Numero.replace("-", ""), 10),
      Facultad: Facultad,
      Modalidad: Modalidad.trim(),
      Dirigida_a: Dirigida_a.trim(),
      Tipo: Tipo.trim(),
      Nombre: Nombre.trim(),
      Est_req: parseFloat(Est_req.trim(), 10),
      CS: parseFloat(CS.trim(), 10),
      Recurso: parseFloat(
        ((Recurso.trim().replace("$ ", "")).replace(".", "").replace(".", "")),
        10
      )
    };
    data.push(tableRow);
  });
  return data;
};

let getData_L_UN = html => {
  data = [];
  const $ = cheerio.load(html);
  $("#c253 > div > table > tbody > tr").each((row, raw_element) => {
    const tds = $(raw_element).find("td");
    const Numero = $(tds[0]).text();
    const Cargo = $(tds[1]).text();
    const Tiempo = $(tds[2]).text();
    const Cantidad = $(tds[3]).text();
    const Avance = $(tds[4]).text();
    const Fecha = $(tds[5]).text();
    const link = $(tds[6]).find("a").attr("href");
    const tableRow = {
      Numero: parseFloat(Numero.replace("-", ""), 10),
      Cargo: Cargo.trim(),
      Tiempo: Tiempo.trim(),
      Cantidad: parseFloat(Cantidad.trim(), 10),
      Avance: Avance.trim(),
      Fecha: Fecha.trim(),
      link: ("https://bogota.unal.edu.co/" + link.trim())
    };
    data.push(tableRow);
  });
  return data;
};

function getData_DME(html, cont) {
  data = [];
  const $ = cheerio.load(html);
  const tds = $("#BOGOTÁ").find("h3");
  for (var i = 1; i < tds.length + 1; i++) {
    const list_group = $("#BOGOTÁ").find(
      "div:nth-child(" + 2 * i + ') > a[class="list-group-item"]'
    );
    for (var j = 0; j < list_group.length; j++) {
      data.push({
        Tipologia: cont,
        Nombre: $(list_group[j]).text(),
        Facultad: $(tds[i - 1]).text()
      });
    }
  }
  return data;
}

let getData_Not_1 = html => {
  data = [];
  data_2 = [];
  const $ = cheerio.load(html);
  const tds = $(".news-list-item-wrapper").find("div");
  for (var i = 1; i < tds.length + 1; i++) {
    data.push({
      Fecha: $(
        ".news-list-item-wrapper > div:nth-child(" + i +
        ") > div:nth-child(2) > div > span "
      ).text(),
      Nombre: $(
        ".news-list-item-wrapper > div:nth-child(" + i +
        ") > div:nth-child(2) > h2 > a"
      ).attr("title"),
      Imagen: $(
        ".news-list-item-wrapper > div:nth-child(" + i +
        ") > div:nth-child(1) > a > img"
      ).attr("src"),
      Link: $(
        ".news-list-item-wrapper > div:nth-child(" + i +
        ") > div:nth-child(1) > a"
      ).attr("href")
    });
  }
  for (var i = 0; i < data.length; i++) {
    if (data[i].Fecha != "") {
      data_2.push(data[i]);
    }
  }
  return data_2;
};

let getData_Not_2 = html => {
  data = [];
  data_2 = [];
  const $ = cheerio.load(html);
  const tds = $(".news").find("div");
  for (var i = 1; i < tds.length + 1; i++) {
    data.push({
      Fecha: ((((($(
        ".news > div:nth-child(" + i +
        ") > div > div:nth-child(4) > div:nth-child(1)"
      ).text()).trim()).replace("Fecha y hora:\n", "")).trim()).replace(
        "                \n                    ",
        " "
      )).replace(",  ", " "),
      Nombre: $(
        ".news > div:nth-child(" + i + ") > div > div:nth-child(2) > a > span"
      ).text(),
      Imagen: $(
        ".news > div:nth-child(" + i + ") > div > div:nth-child(1) > a > img"
      ).attr("src"),
      Link: "https://bogota.unal.edu.co/" +
        $(".news > div:nth-child(" + i + ") > div > div:nth-child(2) > a ")
          .attr("href")
    });
  }
  for (var i = 0; i < data.length; i++) {
    if (data[i].Nombre != "") {
      data_2.push(data[i]);
    }
  }
  return data_2;
};

let getData_Not_3 = html => {
  data = [];
  data_2 = [];
  const $ = cheerio.load(html);
  const tds = $(".news").find("div");
  for (var i = 1; i < tds.length + 1; i++) {
    data.push({
      Fecha: $(".news > div:nth-child(" + i + ") > p > time").attr("datetime"),
      Nombre: $(".news > div:nth-child(" + i + ") > div:nth-child(2) > a > h2")
        .text(),
      Imagen: $(
        ".news > div:nth-child(" + i + ") > div:nth-child(3) > div > a > img"
      ).attr("src"),
      Link: "https://bogota.unal.edu.co/" +
        $(".news > div:nth-child(" + i + ") > div:nth-child(2) > a").attr(
          "href"
        )
    });
  }
  for (var i = 0; i < data.length; i++) {
    if (data[i].Nombre != "") {
      data_2.push(data[i]);
    }
  }
  return data_2;
};

let getData_Not_4 = html => {
  data = [];
  data_2 = [];
  const $ = cheerio.load(html);
  const tds = $("#news-list-456").find("div");
  for (var i = 1; i < tds.length + 1; i++) {
    data.push({
      Fecha: $("#news-list-456 > div:nth-child(" + i + ") > div > span")
        .text(),
      Nombre: $("#news-list-456 > div:nth-child(" + i + ") > div > h2 > a ")
        .text(),
      Imagen: $(
        "#news-list-456 > div:nth-child(" + i +
        ") > div > div:nth-child(2) > a > img"
      ).attr("src"),
      Link: $("#news-list-456 > div:nth-child(" + i + ") > div > h2 > a ")
        .attr("href")
    });
  }
  for (var i = 0; i < data.length; i++) {
    if (data[i].Nombre != "") {
      data_2.push(data[i]);
    }
  }
  return data_2;
};

let getData_tut_1 = html => {
  data = [];
  data_2 = [];
  const $ = cheerio.load(html);
  const tds = $(".contenedor_diracad.div_menu > div").find("div");
  for (var i = 1; i < tds.length + 1; i++) {
    const tds_2 = $(
      ".contenedor_diracad.div_menu > div > div:nth-child(" + i + ")"
    ).find("h3");
    for (var j = 1; j < tds_2.length + 1; j++) {
      const tds_2 = $(
        ".contenedor_diracad.div_menu > div > div:nth-child(" + i + ") > ol"
      ).find("li");
      for (var k = 1; k < tds_2.length + 1; k++) {
        data.push({
          Materia: $(
            ".contenedor_diracad.div_menu > div > div:nth-child(" + i +
            ") > ol:nth-child(" + (3 * j) + ") > li:nth-child(" + k + ")"
          ).text(),
          Tema: $(
            ".contenedor_diracad.div_menu > div > div:nth-child(" + i +
            ") > h3:nth-child(" + ((3 * j) - 1) + ")"
          ).text(),
          Fecha: "Entre semana",
          Horario: null
        });
      }
    }
  }
  for (var i = 0; i < data.length; i++) {
    if (data[i].Materia != "") {
      data_2.push(data[i]);
    }
  }
  return data_2;
};

let getGcien = html => {
  data = [];
  const $ = cheerio.load(html);
  $('#c4306 > div > div > div').each((i, elem) => {
    const col1 = $(elem).find('div.title');
    const col2 = $(elem).find('div.description');
    const link = $(elem).find('div.see-more');
    data.push({
      Nomgrupo: $(col1[0]).text().trim(),
      Descrip: $(col2[0]).find('p').text().trim(),
      Lineas: null,
      Dpto: null,
      Link: $(link[0]).find('a').attr('href'),
      Facultad: 'Ciencias',
      Tipo: 'Grupo de investigacion'
    });

  });
  return data;
}

let getGder = html => {
  data = [];
  const $ = cheerio.load(html);
  $(a).each((i, elem) => {
    const col1 = $(elem).find(' div.col-md-3.researchgroup-basicinfo >div');
    const col2 = $(elem).find('div.col-md-5.researchgroup-lines >ul');
    const col3 = $(elem).find('div.col-md-3.researchgroup-additionalinfo >div');
    if (a == '#c66 > div > div>div') {
      data.push({
        Nomgrupo: $(col1[0]).text().trim(),
        Descrip: null,
        Tipo: 'Grupo de investigacion',
        Lineas: ($(col2[0]).text().trim()).replace(/\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t/gi, ', '),
        Dpto: $(col3[0]).text().trim(),
        Facultad: 'Derecho y ciencias políticas',
        Link: null

      });
    } else {
      data.push({
        Nomgrupo: $(col1[0]).text().trim(),
        Lineas: null,
        Descrip: null,
        Dpto: $(col3[0]).text().trim(),
        Facultad: 'Derecho y ciencias políticas',
        Tipo: 'Grupo de investigacion',
        Link: null
      });
    }
  });
  return data;
}

let getGagro = html => {
  data = [];
  const $ = cheerio.load(html);
  $(selec[i]).each((j, elem) => {
    const nomg = $(elem).find('div > div > div > div > h1 > strong > span') + $(elem).find('div > div > div > div > h1 > span>strong ');
    const lin = $(elem).find('div > div > div > div > div > div.col-xs-12.col-sm-12.col-md-4.col-lg-4 > div > ul');
    const lin2 = $(elem).find('div > div > div > div > div > div.col-xs-12.col-sm-12.col-md-4.col-lg-4 > div>ol>li>ul')
    if (i != 1) {
      data.push({
        Nomgrupo: $(nomg).text().trim(),
        Lineas: $(lin).text().trim().replace(/\n\n\t\t\t\t\t/gi, ', '),
        Link: Gagro[i],
        Facultad: 'Ciencias Agrarias',
        Tipo: 'Grupo de investigacion',
        Dpto: null,
        Descrip: null
      });
    } else {
      data.push({
        Nomgrupo: $(nomg).text().trim(),
        Lineas: $(lin2).text().trim().replace(/\n\n\t\t\t\t\t\t\t/gi, ', '),
        Link: Gagro[i],
        Facultad: 'Ciencias Agrarias',
        Tipo: 'Grupo de investigacion',
        Dpto: null,
        Descrip: null
      });

    }
  });


  return data;
}

let getSagro = html => {
  data = [];
  const $ = cheerio.load(html);
  $('#node-317 > div > div > div > div > table > tbody>tr').each((i, elem) => {
    const col1 = $(elem).find('td');
    const col2 = $(elem).find('td');
    data.push({
      Nomgrupo: $(col1[0]).text().trim(),
      Profesor: $(col1[1]).text().trim(),
      Lineas: $(col1[2]).text().trim().replace(/\n\n\t\t\t\t\t\t/gi, ', '),
      Facultad: 'Ciencias agrarias',
      Tipo: 'Semillero',
      Dpto: null,
      Descrip: null
    });

  });
  return data;
}

let getTuti = html => {
  data = [];
  data_2 = [];
  Dias = ['Horario', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
  const $ = cheerio.load(html);
  const tds = $("#set-rl_sliders-1").find('.accordion-group.panel.rl_sliders-group.nn_sliders-group');
  for (var i = 2; i < tds.length + 3; i++) {
    const tds_2 = $(
      "#set-rl_sliders-1 > div:nth-child(" + i + ") > div:nth-child(3) > div > div:nth-child(2) > div > ul"
    ).find("li");
    for (var j = 1; j < tds_2.length + 2; j++) {
      var tds_3 = $(
        "#set-rl_sliders-1 > div:nth-child(" + i + ") > div:nth-child(3) > div > div:nth-child(3) > div "
      ).find(".row.content_horario");
      for (var k = 3; k < tds_3.length + 1; k++) {
        var tds_4 = $(
          "#set-rl_sliders-1 > div:nth-child(" + i + ") > div:nth-child(3) > div > div:nth-child(3) > div > div:nth-child(" + k + ")"
        ).find("div");
        for (var z = 2; z < tds_4.length; z++) {
          var tds_5 = $("#set-rl_sliders-1 > div:nth-child(" + i + ") > div:nth-child(3) > div > div:nth-child(3) > div > div:nth-child(" + k + ") > div:nth-child(" + z + ")").find("p");
          var Hora = "";
          if (tds_5.length > 0) {
            if (k == 3) {
              Hora = "9 a 11"
            } else if (k == 4) {
              Hora = "11 a 1"
            } else if (k == 5) {
              Hora = "14 a 16"
            }
            var Materia = $(tds_2).text().trim().split('.');
            data.push({
              Materia: Materia[(j - 1)],
              Tema: $("#set-rl_sliders-1 > div:nth-child(" + i + ") > div:nth-child(2) > a> span").text(),
              Fecha: null,
              Dia: Dias[(z - 1)],
              Hora: Hora,
              Lugar: $("#set-rl_sliders-1 > div:nth-child(" + i + ") > div:nth-child(3) > div > div:nth-child(3) > div > div:nth-child(" + k + ") > div:nth-child(" + z + ") > p").text()
            });
          }
        }
      }
    }
  }
  for (var i = 0; i < data.length; i++) {
    if ((data[i].Materia != undefined)) {
      data_2.push(data[i]);
    }
  }
  return data_2;
}






