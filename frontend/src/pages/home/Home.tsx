// import { redirect } from "react-router-dom";PHB, Xanathar, Tashas, Fizban
import { Navigate } from 'react-router-dom';
export const Home = () => {
    const userCredentials = JSON.parse(localStorage.getItem('userCredentials') ?? "{}");
    
    return (!userCredentials?.name) ? <Navigate to="/login" /> :  (
    <div className="min-h-screen bg-elegant-black text-white p-4">
      <div className="text-4xl font-bold mb-4">Welcome {userCredentials.name}</div>
      <div>AVAILABLE MANUALS: Players Handbook, Xanathar's Guide To Everything, Tasha's Cauldron of Everything, Fizban's Treasury of Dragons, Matthew Mercer Blood Hunter.</div>
      <div>CHARACTER LEVEL: 10</div>
      <div>HP: MAX</div>
      <div>STANDARD ARRAY: 18, 16, 14, 12, 10, 8</div>
      <div>MULTICLASSING: The chosen class must be the most represented in levels, this means thing like :</div>
      <div>The first class level must be the of the chosen class.</div>
      <div>There must be more levels in that class than in the other ones.</div>
      <div>There must be at least 6 levels in that class.</div>
      <div>Levels 4 and 8: If multiclassing, you still get the ASI.</div>
      <div>FLANKING: +2 to attack rolls when two allies are in line with an enemy in between.</div>
      <div>SUERTE: Players can automatically succeed on a roll by sacrificing a Tarot card.</div>
      <div>Stack of dice: 2d6 per person, react to grab quantity x, adds to any roll, also deals damage to a random party member.</div>
      <div>The stack replenishes when none are left.</div>
      <div>POCIONES: Bonus action to consume, action to give to someone else.</div>
      <div>SPELL SCROLLS: Must be in the spell list of one of your classes.</div>
      <div>SORCERERS: Use Magic Points (MP) to cast a spell: Cost = spell_level.</div>
      <div>
        <div>lvl | Magic Points</div>
        <div>1 | 2</div>
        <div>2 | 3</div>
        <div>3 | 8</div>
        <div>4 | 10</div>
        <div>5 | 16</div>
        <div>6 | 19</div>
        <div>7 | 23</div>
        <div>8 | 27</div>
        <div>9 | 36</div>
        <div>10 | 41</div>
      </div>
      <div>MONKS: At level 9 their martial dice = 1d8.</div>
      <div>PATRONAL CONTRIBUTIONS: Please contribute $10000 to CBU: 0000003100042114778468 (Ramiro Vicedo), payday limit : 21/10/2021 .</div>
      <div>Due to inflation in Argentina, this amount will cover food expenses.</div>
      <div>We'll create a WhatsApp group to coordinate transportation.</div>
      <div>DECORUM IS EXPECTED AT THE ESTABLISHMENT.</div>
      <div>
        <a
          href="https://maps.app.goo.gl/os1iKZpmbuEoKhHs9"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blood-red underline"
        >
          View Location: Uruguay 528, Haedo
        </a>
      </div>
    </div>
  )
}
