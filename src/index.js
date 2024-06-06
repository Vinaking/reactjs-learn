import ReactDOM from 'react-dom/client';
import Game from './tic_tac_toe.js'; 
import Product from './thinking_in_react.js'
import Hook from './hook.js';
import StateVocj from './vocj.js';
import Todo from './managing_state/Todo.js';
import { VideoPlayer } from './escape_hatches/VideoPlayer.js';
import { Search } from './escape_hatches/Search.js';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Search />);