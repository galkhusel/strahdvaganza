// import { redirect } from "react-router-dom";
import { Navigate } from 'react-router-dom';
export const Home = () => {
    const userCredentials = JSON.parse(localStorage.getItem('userCredentials') ?? "{}");
    
    return (!userCredentials?.name) ? <Navigate to="/login" /> :  (
    <>
      <div>Welcome {userCredentials.name}</div>
      <div> CHARACTER LEVEL = 10.</div>
      <div> </div>
      <div>HP = MAX.</div>
      <div> </div>
      <div>STANDARD ARRAY = 18,16,14,12,10,8.</div>
      <div> </div>
      <div>MANUALES PERMITIDOS : PHB, Xanathar, Tashas, Fizban.</div>
      <div> </div>
      <div>MULTICLASSING: si o si la clase que eligen en la pagina tiene que ser la mas representada en los niveles.</div>
      <div>En los niveles 4 y 8, si estan multiclaseando obtienen igualmente el asi.</div>
      <div> </div>
      <div>FLANQUEO: al estar 2 personas aliadas en linea con un enemigo entre medio obtienen +2 a las tiradas de ataque.</div>
      <div> </div>
      <div>SUERTE</div>
      <div>Los jugadores pueden tener éxito automatico en una tirada si sacrifican una carta de tarot.</div>
      <div>Pila de dados igual a 2d6 por persona, reaccion para agarrar cantidad x, se agrega a cualquier tipo de tirada, </div>
      <div>el resultado de los d6 también le hace daño a alguien random de la party. </div>
      <div>La pila se repone cuando ya no quedan más.</div>
      <div>POCIONES: para ingerir una pocion se utiliza bonus action, y una accion para darsela a alguien mas.</div>
      <div> </div>
      <div>SPELL SCROLLS: este tiene que estar dentro de la lista de hechizos de alguna de sus clases.</div>
      <div> </div>
      <div>SORCERERS: utilizan Magic Points(MP) para castear un spell: el coste = spell_level.</div>
      <div>  lvl  | Magic Points </div>
      <div>   1   |      2       </div>
      <div>   2   |      3       </div>
      <div>   3   |      8       </div>
      <div>   4   |      10      </div>
      <div>   5   |      16      </div>
      <div>   6   |      19      </div>
      <div>   7   |      23      </div>
      <div>   8   |      27      </div>
      <div>   9   |      36      </div>
      <div>   10  |      41      </div>
      <div> </div>
      <div>MONKS: en lvl 9 hacen su martial dice = 1d8.</div>
      <div> </div>
      <div>CONTRIBUCIONES PATRONALES: se debera abonar la suma de $10000 al siguiente cbu: 0000003100042114778468 (Ramiro Vicedo).</div>
      <div> </div>
      <div>ESPERAMOS EL MAYOR DECORO EN EL ESTABLECIMIENTO.</div>
    </>
  )
}
