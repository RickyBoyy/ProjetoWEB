import React, { useEffect } from "react";
import "../styles/home.css";

const Home = () => {
  useEffect(() => {
    const monthsPt = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const tableDays = document.getElementById('dias');
  
    if (tableDays) {
      let now = new Date();
      let mes = now.getMonth();
      let ano = now.getFullYear();
  
      const GetDaysCalendar = (mes, ano) => {
        const monthElement = document.getElementById('mes');
        const yearElement = document.getElementById('ano');
  
        if (monthElement && yearElement) {
          monthElement.innerHTML = monthsPt[mes];
          yearElement.innerHTML = ano;
  
          let firstDayofWeek = new Date(ano, mes, 1).getDay() - 1;
          let getLastDayThisMonth = new Date(ano, mes + 1, 0).getDate();
  
          for (let i = firstDayofWeek, index = 0; i < (42 - firstDayofWeek); i++, index++) {
            let dt = new Date(ano, mes, i);
            let dtNow = new Date();
            let dayTable = tableDays.getElementsByTagName('td')[index];
            if (dayTable) {
              dayTable.classList.remove('mes-anterior');
              dayTable.classList.remove('mes-proximo');
              dayTable.classList.remove('dia-atual');
              dayTable.innerHTML = dt.getDate();
  
              if (dt.getFullYear() === dtNow.getFullYear() && dt.getMonth() === dtNow.getMonth() && dt.getDate() === dtNow.getDate()) {
                dayTable.classList.add('dia-atual');
              }
  
              if (i < 1) {
                dayTable.classList.add('mes-anterior');
              }
              if (i > getLastDayThisMonth) {
                dayTable.classList.add('proximo', 'mes');
              }
            }
          }
        }
      }
  
      GetDaysCalendar(mes, ano);
  
      let botao_proximo = document.getElementById('btn_proximo');
      let botao_anterior = document.getElementById('btn_anterior');
  
      botao_proximo.onclick = function () {
        mes++;
        if (mes > 11) {
          mes = 0;
          ano++;
        }
        GetDaysCalendar(mes, ano);
      }
      botao_anterior.onclick = function () {
        mes--;
        if (mes < 0) {
          mes = 11;
          ano--;
        }
        GetDaysCalendar(mes, ano);
      }
    }
  }, []);
  
  return (
    <div>
      {/* Games Section */}
      <section className="home-section">
        <h1 className="section-title">Games</h1>
        <div className="slider-wrapper">
          <div className="image-list">
            {[...Array(7).keys()].map((index) => (
              <div key={index} className="image-item-wrapper">
                <img
                  src={`https://via.placeholder.com/300x550?text=Game-${index + 1}`}
                  alt={`Game-${index + 1}`}
                  className="image-item"
                />
                <p className="item-name">Game {index + 1} Name</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communities Section */}
      <section className="home-section">
        <h1 className="section-title">Communities</h1>
        <div className="slider-wrapper">
          <div className="image-list">
            {[...Array(7).keys()].map((index) => (
              <div key={index} className="image-item-wrapper">
                <img
                  src={`https://via.placeholder.com/300x550?text=Community-${index + 1}`}
                  alt={`Community-${index + 1}`}
                  className="image-item"
                />
                <p className="item-name">Community {index + 1} Name</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section>
        <div className="conteudo">
          <div className="calendario">
            <header>
              <h2 id="mes"></h2>
              <a className="btn-ant" id="btn_anterior"></a>
              <a className="btn-pro" id="btn_proximo"></a>
            </header>
            <table>
              <thead>
                <tr>
                  <td>Dom</td>
                  <td>Seg</td>
                  <td>Ter</td>
                  <td>Qua</td>
                  <td>Qui</td>
                  <td>Sex</td>
                  <td>Sab</td>
                </tr>
              </thead>
              <tbody id="dias">
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                </tr>
                
                
                {/* Add more rows if needed */}
              </tbody>
            </table>
           <h2 id="ano">ano</h2>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
