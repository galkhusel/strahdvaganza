import { Navigate } from 'react-router-dom';
export const TreasonOnTheCastle = () => {
  const userCredentials = JSON.parse(localStorage.getItem('userCredentials') ?? "{}");
  
  return (!userCredentials?.name) ? <Navigate to="/login" /> :  (
  <>
    <div>Durante la velada se dispondran de breacks sociales. durante estos breaks se jugara un minijuego que sera determinante para la pelea final.</div>
    <div>En este juego todos interpretaran un rol, simil blood on the clock tower, los roles seran distribuidos al comenzar el evento.</div>
    <div>Los jugadores deberan de hallar a los roles de "haunted one" y "criminal".</div>
    <div>Ya que el primero sin saberlo se esta convirtiendo en un demonio aliado de strahd</div>
    <div>El segundo ha robado una reliquia que lo esta convirtiendo en un no muerto del que acererak se apoderara</div>
    <div>De ser descubiertos estos roles no moriran pero sufriran penalizadores letales durante la ultima pelea... uds quieren vivir.</div>
    <div>los roles son los siguientes...</div>
    <div>Criminal - Mecanica: Debe evitar que le saquen la reliquia. - Resultados: si lo salvan pierde todos sus items magicos / si no lo salvan se convierte en un nomuerto a favor de acererak</div>
    <div>Investigador - Mecanica: Debe encarcelar al criminal. al final de la cena va a tener una oportunidad para señalar al criminal</div>
    <div>Charlatan - Mecanica: Cree que es el criminal</div>
    <div>Haunted One - Mecanica: Debe evitar que le frustren el ritual - Resultado: si lo salvan comienza la pelea de strahd con la mitad de sus puntos de vida / si no lo salvan se convierte en un demonio a favor de strahd</div>
    <div>Acolyte - Mecanica: Debe frustrar el ritual del Haunted One. al final de la cena va a tener una oportunidad para señalar al Haunted One</div>
    <div>Outlander - Mecanica: Cree que es el Haunted One</div>
    <div>Courier - Mecanica: Tiene 2 cartas. Durante la jornada puede entregar cada una a una persona, indicando el rol que cree que tiene esa persona. Al entregar la carta se confirma la deducción del Courier en caso de ser correcto. Si es incorrecta no aprende el rol.</div>
    <div>Actor de metodo - Mecanica: Se hace pasar por otro rol, indicándole a los masters cual es el elegido. Si recibe una carta del Courier destinada al rol que eligieron, cumple su objetivo.</div>
    <div>Entertainer - Mecanica: Debe hacer reir a los 3 masters </div>
    <div>Knight - Mecanica: Debe realizar actos de caballerosidad, apegándose a las siguientes virtudes: Generosidad, Amistad, Misericordia, y Justicia. Al realizar uno de estos actos, debe indicárselo a uno de los masters, para que lo juzguen.</div>
    <div>Noble - Mecanica: Hacer y cumplir un trato con strahd </div>
    <div>Sage - Mecanica: Durante la jornada, el Sage puede hacer dos preguntas de si o no a los masters. Las misma seran respondidas de forma correcta.</div>
    <div>Sailor - Mecanica: En su borrachera, el Sailor cree ser el Sage. Tiene la misma habilidad que el Sage, pero la informacion que recibe puede ser incorrecta.</div>
  </>
)
}

