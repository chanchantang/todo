import "./styles.css";
import "./reset-styles.css";


// import { addListeners } from "./modules/eventListeners";
import * as domManipulation from "./modules/domManipulation";

domManipulation.displayAllTaskCards();
domManipulation.displayAllCategories();
domManipulation.appendAllCategoriesDialog();
// addListeners();